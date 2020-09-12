import * as React from 'react';
import CommonForm, { CommonFormProps, CommonFormState } from './commonForm';
import { Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import GenericIcons from '../icons/generic';

export interface UserFormProps extends CommonFormProps {}

export interface UserFormState extends CommonFormState {}

abstract class UserForm<
	T extends UserFormProps,
	U extends UserFormState
> extends CommonForm<T, U> {
	renderPassInput = (
		label: string,
		name: string,
		errorMessage: string,
		placeholder?: string,
		eyeRequired?: boolean,
		submitOnEnter?: boolean
	) => {
		if (eyeRequired)
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
		else return this.renderInput(label, name, errorMessage, 'password');
	};

	renderMobileNumberInput = (
		label: string,
		errorMessage?: string,
		submitOnEnter?: boolean
	) => {
		return (
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
	};
}

export default UserForm;
