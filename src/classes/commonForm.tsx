import React, { Component, ChangeEvent } from 'react';
import { Form, InputGroup, Alert, ProgressBar } from 'react-bootstrap';
import Joi from 'joi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { BarLoader } from 'react-spinners';
import { Action } from 'redux';
import GenericIcons from '../icons/generic';
import FileBox from '../components/common/FileBox';
import { ActionWithPayload } from './../app/models/index';

export interface ErrorContainer {
	[key: string]: string;
}

export interface CommonFormProps {
	loading?: boolean;
	error?: string;
	success?: string;
	updateSuccess?: (success: string) => ActionWithPayload<string>;
	updateError?: (error: string) => ActionWithPayload<string>;
}

export interface CommonFormState {
	data: {
		[key: string]: any;
	};
	errors: ErrorContainer;
}

abstract class CommonForm<
	T extends CommonFormProps,
	U extends CommonFormState
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
		// placeholder?: string,
		// eyeRequired?: boolean,
		submitOnEnter?: boolean
	) => {
		// if (name === 'password' || eyeRequired)
		// 	return this.renderPassInput(
		// 		label,
		// 		name,
		// 		errorMessage,
		// 		placeholder,
		// 		submitOnEnter
		// 	);
		// if (name === 'mobileNumber')
		// 	return this.renderMobileNumberInput(label, errorMessage, submitOnEnter);
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
}

export default CommonForm;
