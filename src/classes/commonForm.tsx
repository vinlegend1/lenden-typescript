import React, { Component, ChangeEvent, createRef } from 'react';
import { Form, Alert, InputGroup } from 'react-bootstrap';
import Joi from 'joi';
import { BarLoader } from 'react-spinners';
import { ActionWithPayload } from './../app/models/index';
import { scroller as scroll } from 'react-scroll';

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
		if (errors) {
			await this.setState({ errors });

			return scroll.scrollTo(Object.keys(this.state.errors)[0], {
				duration: 500,
				delay: 100,
				smooth: true,
				// containerId: 'ContainerElementID',
				offset: -50,
			});
		}

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
		let inputRef = createRef<HTMLInputElement>();
		return (
			<Form.Group controlId={name} id={name}>
				<Form.Label>{label}</Form.Label>
				<Form.Control
					ref={inputRef}
					className='input email'
					name={name}
					type={type || name}
					value={this.state.data[name] === -1 ? '' : this.state.data[name]}
					onChange={this.handleChange}
					onKeyPress={(event: React.KeyboardEvent) => {
						if (event.key === 'Enter')
							if (submitOnEnter) this.handleSubmit(event);
							else inputRef.current?.blur();
					}}
					autoComplete={'off'}
				/>
				<Form.Text
					className={errorMessage ? 'active' : ''}
					style={{ marginLeft: '1rem' }}>
					{errorMessage}
				</Form.Text>
			</Form.Group>
		);
	};
	renderMobileNumberInput = (
		label: string,
		errorMessage?: string,
		submitOnEnter?: boolean
	) => {
		let inputRef = React.createRef<HTMLInputElement>();
		return (
			<Form.Group
				controlId='mobileNumber'
				className='mobileNumberFormGroup'
				id='mobileNumber'>
				<Form.Label>{label}</Form.Label>

				<InputGroup>
					<InputGroup.Prepend>
						<InputGroup.Text className='mobileNumberInputText'>
							+91
						</InputGroup.Text>
					</InputGroup.Prepend>
					<Form.Control
						ref={inputRef}
						className='input mobileNumberInput'
						name='mobileNumber'
						type='number'
						value={this.state.data.mobileNumber}
						onChange={this.handleChange}
						onKeyPress={(event: React.KeyboardEvent) => {
							if (event.key === 'Enter')
								if (submitOnEnter) this.handleSubmit(event);
								else inputRef.current?.blur();
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
	};
}

export default CommonForm;
