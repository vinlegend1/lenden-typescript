import React, { Component, ChangeEvent } from 'react';
import { Form, InputGroup, Alert } from 'react-bootstrap';
import Joi from 'joi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { BarLoader } from 'react-spinners';
import { Action } from 'redux';
import GenericIcons from '../../icons/generic';

export interface ErrorContainer {
	[key: string]: string;
}

export type PassType = 'password' | 'text';
interface FormState {
	data: {
		[key: string]: any;
	};
	errors: ErrorContainer;
	passType?: {
		[key: string]: PassType;
	};
}

interface FormProps {
	loading: boolean;
	error: string;
	success?: string;

	updateSuccess?: (success: string) => Action;
	updateError?: (success: string) => Action;
}

abstract class CommonForm<
	T extends FormProps,
	U extends FormState
> extends Component<T, U> {
	abstract schema: {};
	abstract doSubmit: () => void;

	handleChange = (event: ChangeEvent) => {
		const input = event.currentTarget as HTMLInputElement;
		const data: any = { ...this.state.data };

		data[input.name] = input.value;
		this.setState({ data });
	};

	componentDidMount() {
		if (this.props.updateError) this.props.updateError('');
		if (this.props.updateSuccess) this.props.updateSuccess('');
	}

	validate = (): null | ErrorContainer => {
		const { error } = Joi.object(this.schema).validate(this.state.data, {
			abortEarly: false,
		});
		if (!error) return null;

		let errors: ErrorContainer = {};
		error.details.forEach(item => (errors[item.path[0]] = item.message));
		return errors;
	};

	handleSubmit = async (e: React.MouseEvent | React.KeyboardEvent) => {
		e.preventDefault();

		if (this.props.updateError) this.props.updateError('');
		if (this.props.updateSuccess) this.props.updateSuccess('');

		const errors = this.validate();
		if (errors) return this.setState({ errors });

		await this.setState({ errors: {} });
		this.doSubmit();
	};

	renderLoader = () => (
		<div className='loader'>
			<BarLoader
				height={4}
				css='display:block;margin:2vh auto'
				color={'#1a2639'}
				loading={this.props.loading}
			/>
		</div>
	);

	renderErrorAlert = () => {
		const error = this.props.error;
		return (
			error && (
				<Alert
					style={{ textAlign: 'center' }}
					className='error-alert'
					variant='danger'>
					{error}
				</Alert>
			)
		);
	};

	renderSuccessAlert = () => {
		const success = this.props.success;
		return (
			success && (
				<Alert
					style={{ textAlign: 'center' }}
					className='success-alert'
					variant='primary'>
					{success}
				</Alert>
			)
		);
	};

	renderInput = (
		label: string,
		name: string,
		errorMessage: string,
		type?: string,
		placeholder?: string,
		eyeRequired?: boolean,
		submitOnEnter?: boolean
	) => {
		if (name === 'password' || eyeRequired)
			return this.renderPassInput(
				label,
				name,
				errorMessage,
				placeholder,
				submitOnEnter
			);
		if (name === 'mobileNumber')
			return this.renderMobileNumberInput(label, errorMessage, submitOnEnter);
		return (
			<Form.Group controlId={name}>
				<Form.Label>{label}</Form.Label>
				<Form.Control
					className='input email'
					name={name}
					type={type || name}
					value={this.state.data[name]}
					onChange={this.handleChange}
					onKeyPress={(event: React.KeyboardEvent) => {
						if (submitOnEnter && event.key === 'Enter')
							this.handleSubmit(event);
					}}
				/>
				<Form.Text
					className={errorMessage ? 'active' : ''}
					style={{ marginLeft: '1rem' }}>
					{errorMessage}
				</Form.Text>
			</Form.Group>
		);
	};

	private renderPassInput = (
		label: string,
		name: string,
		errorMessage?: string,
		placeholder?: string,
		submitOnEnter?: boolean
	) => {
		return (
			<Form.Group controlId={name}>
				<Form.Label>{label}</Form.Label>
				<InputGroup>
					<Form.Control
						className='input passwordInput'
						name={name}
						type={this.state.passType![name]}
						value={this.state.data[name]}
						onChange={this.handleChange}
						onKeyPress={(event: React.KeyboardEvent) => {
							if (submitOnEnter && event.key === 'Enter')
								this.handleSubmit(event);
						}}
					/>

					<InputGroup.Append>
						<InputGroup.Text
							className='passwordInputText'
							onClick={() => {
								if (this.state.passType![name] === 'password') {
									let passType = { ...this.state.passType }!;
									passType[name] = 'text';
									return setTimeout(() => this.setState({ passType }));
								}

								if (this.state.passType![name] === 'text') {
									let passType = { ...this.state.passType }!;
									passType[name] = 'password';
									return setTimeout(() => this.setState({ passType }));
								}
							}}
							onMouseDown={(e: React.MouseEvent) => e.preventDefault()}>
							<div>
								{this.state.passType![name] === 'password' ? (
									<FontAwesomeIcon icon={faEye} />
								) : (
									<FontAwesomeIcon icon={faEyeSlash} />
								)}
							</div>
						</InputGroup.Text>
					</InputGroup.Append>
				</InputGroup>
				<Form.Text
					className={errorMessage ? 'active' : ''}
					style={{
						opacity: placeholder ? 1 : 0,
						color: errorMessage ? '' : '#b4b4b4',
					}}>
					{errorMessage ||
						(placeholder &&
							Object.keys(this.state.errors).includes('password') && (
								<React.Fragment>
									<GenericIcons name='info' />
									{placeholder}
								</React.Fragment>
							)) ||
						''}
				</Form.Text>
			</Form.Group>
		);
	};

	private renderMobileNumberInput = (
		label: string,
		errorMessage?: string,
		submitOnEnter?: boolean
	) => (
		<Form.Group controlId='mobileNumber' className='mobileNumberFormGroup'>
			<Form.Label>{label}</Form.Label>

			<InputGroup>
				<InputGroup.Prepend>
					<InputGroup.Text className='mobileNumberInputText'>
						+91
					</InputGroup.Text>
				</InputGroup.Prepend>
				<Form.Control
					className='input mobileNumberInput'
					name='mobileNumber'
					type='number'
					value={this.state.data.mobileNumber}
					onChange={this.handleChange}
					onKeyPress={(event: React.KeyboardEvent) => {
						if (submitOnEnter && event.key === 'Enter')
							this.handleSubmit(event);
					}}
				/>
			</InputGroup>

			<Form.Text
				className={errorMessage ? 'active' : ''}
				style={{ marginLeft: '1rem' }}>
				{errorMessage}
			</Form.Text>
		</Form.Group>
	);
}

export default CommonForm;
