import React, { Component, ChangeEvent } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import Joi from 'joi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

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

abstract class CommonForm<T, U extends FormState> extends Component<T, U> {
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

	handleSubmit = (e: React.MouseEvent) => {
		e.preventDefault();
		const errors = this.validate();
		if (errors) return this.setState({ errors });

		this.setState({ errors: {} });
		this.doSubmit();
	};

	renderInput = (
		label: string,
		name: string,
		errorMessage: string,
		type?: string,
		placeholder?: string
	) => {
		console.log(placeholder);
		if (name === 'password')
			return this.renderPassInput(label, errorMessage, placeholder);
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
						className='input'
						name='password'
						type={this.state.passType}
						value={this.state.data.password}
						onChange={this.handleChange}
					/>

					<InputGroup.Append>
						<InputGroup.Text
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
					{errorMessage
						? errorMessage
						: Object.keys(this.state.errors).includes('password') && (
								<React.Fragment>
									<img src='/icons/info.svg' alt='' />
									{placeholder}
								</React.Fragment>
						  )}
				</Form.Text>
			</Form.Group>
		);
	};
}

export default CommonForm;
