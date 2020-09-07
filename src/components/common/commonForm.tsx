import React, { Component, ChangeEvent } from 'react';
import { Form, InputGroup, Alert, ProgressBar } from 'react-bootstrap';
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
	loading?: boolean;
	error?: string;
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

	radioInputField = React.createRef<HTMLInputElement>();

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

	renderLoader = (isLoading?: boolean) => (
		<div className='loader'>
			<BarLoader
				height={4}
				css='display:block;margin:2vh auto'
				color={'#1a2639'}
				loading={isLoading}
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
					value={this.state.data[name] === -1 ? '' : this.state.data[name]}
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
	renderTextArea = (
		label: string,
		name: string,
		errorMessage: string,
		placeholder?: string,
		type?: string
	) => {
		const { data } = this.state;
		return (
			<Form.Group>
				<Form.Label>{label}</Form.Label>
				<Form.Control
					className='input'
					as='textarea'
					rows={5}
					name={name}
					onChange={this.handleChange}
					value={data[name]}
					placeholder={placeholder}
					style={{ resize: 'none' }}
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

	renderRadioInput = (label: string, name: string, ...rest: string[]) => {
		return (
			<Form.Group className='radioInput'>
				<Form.Label>{label}</Form.Label>
				<div className='radioGroup'>
					{rest.map((option, index) => (
						<label
							className='radio'
							key={index}
							onClick={() => {
								const data: any = { ...this.state.data };
								data[name] = index + 1;
								this.setState({ data });
							}}>
							<input
								type='radio'
								checked={this.state.data[name] === index + 1 ? true : false}
								readOnly
							/>
							<div>
								<span className='check'></span>
							</div>
							<span
								className={this.state.data[name] === index + 1 ? 'active' : ''}>
								{option}
							</span>
						</label>
					))}
				</div>
				<Form.Text
					className={this.state.errors[name] ? 'active' : ''}
					style={{ marginLeft: '1rem' }}>
					{this.state.errors[name]}
				</Form.Text>
			</Form.Group>
		);
	};

	renderProgressBar = (currValue: number, totalValue: number) => (
		<div className='progressBar'>
			<ProgressBar variant='success' now={(currValue / totalValue) * 100} />
			<span>
				Page {currValue} of {totalValue}
			</span>
		</div>
	);

	renderRadioInputWithField = (
		label: string,
		name: string,
		yes: string,
		no: string
	) => {
		return (
			<Form.Group className='radioInput'>
				<Form.Label>{label}</Form.Label>
				<div className='radioGroup'>
					<label
						className='radio'
						onClick={() => {
							const data: any = { ...this.state.data };
							data[name] = 0;
							this.setState({ data });
						}}>
						<input
							type='radio'
							checked={this.state.data[name] === 0 ? true : false}
							readOnly
						/>
						<div>
							<span className='check'></span>
						</div>
						<span className={this.state.data[name] === 0 ? 'active' : ''}>
							{no}
						</span>
					</label>
					<label
						className='radio'
						onClick={() => {
							const data: any = { ...this.state.data };

							if (data[name] === 0 || data[name] === -1) {
								setTimeout(
									() =>
										(this.radioInputField.current! as HTMLInputElement).focus(),
									50
								);
								this.radioInputField.current?.focus();
								data[name] = 1;
								this.setState({ data });
							}
						}}>
						<input
							type='radio'
							checked={this.state.data[name] > 0 ? true : false}
							readOnly
						/>
						<div>
							<span className='check'></span>
						</div>
						<span className={this.state.data[name] > 0 ? 'active' : ''}>
							{yes}
						</span>
						<div>
							<Form.Control
								ref={this.radioInputField}
								className='timesInput'
								type='number'
								value={
									this.state.data[name] === -1 ? '' : this.state.data[name]
								}
								onChange={(e: React.ChangeEvent) => {
									const data: any = { ...this.state.data };
									data[name] = (e.currentTarget as HTMLInputElement).value;
									this.setState({ data });
								}}
							/>
						</div>
					</label>
				</div>
				<Form.Text
					className={this.state.errors[name] ? 'active' : ''}
					style={{ marginLeft: '1rem' }}>
					{this.state.errors[name]}
				</Form.Text>
			</Form.Group>
		);
	};
}

export default CommonForm;
