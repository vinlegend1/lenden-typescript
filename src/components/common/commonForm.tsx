import React, { Component, ChangeEvent } from 'react';
import { Form, InputGroup, Alert } from 'react-bootstrap';
import Joi from 'joi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { BarLoader } from 'react-spinners';
import { Action } from 'redux';

export interface ErrorContainer {
	[key: string]: string;
}

export type PassType = 'password' | 'text';
interface FormState {
	data: {
		[key: string]: string;
	};
	errors: ErrorContainer;
	passType?: PassType;
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

	validate = (): null | ErrorContainer => {
		const { error } = Joi.object(this.schema).validate(this.state.data, {
			abortEarly: false,
		});
		if (!error) return null;

		let errors: ErrorContainer = {};
		error.details.forEach(item => (errors[item.path[0]] = item.message));
		return errors;
	};

	handleSubmit = async (e: React.MouseEvent) => {
		e.preventDefault();

		if (this.props.updateError) this.props.updateError('');
		if (this.props.updateSuccess) this.props.updateSuccess('');

		const errors = this.validate();
		if (errors) return this.setState({ errors });

		await this.setState({ errors: {} });
		this.doSubmit();
	};

	renderLoader = () => (
		<BarLoader
			height={4}
			css='display:block;margin:2vh auto'
			color={'#1a2639'}
			loading={this.props.loading}
		/>
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
		placeholder?: string
	) => {
		if (name === 'password')
			return this.renderPassInput(label, errorMessage, placeholder);
		if (name === 'mobileNumber')
			return this.renderMobileNumberInput(label, errorMessage);
		return (
			<Form.Group controlId={name}>
				<Form.Label>{label}</Form.Label>
				<Form.Control
					className='input email'
					name={name}
					type={type || name}
					value={this.state.data[name]}
					onChange={this.handleChange}
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
		errorMessage?: string,
		placeholder?: string
	) => {
		return (
			<Form.Group controlId={'password'}>
				<Form.Label>{label}</Form.Label>
				<InputGroup>
					<Form.Control
						className='input passwordInput'
						name='password'
						type={this.state.passType}
						value={this.state.data.password}
						onChange={this.handleChange}
					/>

					<InputGroup.Append>
						<InputGroup.Text
							className='passwordInputText'
							onClick={() => {
								if (this.state.passType === 'password')
									return setTimeout(() => this.setState({ passType: 'text' }));

								if (this.state.passType === 'text')
									return setTimeout(() =>
										this.setState({ passType: 'password' })
									);
							}}
							onMouseDown={(e: React.MouseEvent) => e.preventDefault()}>
							{this.state.passType === 'password' && (
								<FontAwesomeIcon icon={faEye} />
							)}
							{this.state.passType === 'text' && (
								<FontAwesomeIcon icon={faEyeSlash} />
							)}
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
									<img src='/icons/info.svg' alt='' />
									{placeholder}
								</React.Fragment>
							)) ||
						''}
				</Form.Text>
			</Form.Group>
		);
	};

	private renderMobileNumberInput = (label: string, errorMessage?: string) => (
		<Form.Group controlId='mobileNumber'>
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
