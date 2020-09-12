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

export type PassType = 'password' | 'text';

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
	passType?: {
		[key: string]: PassType;
	};
	images?: {
		[key: string]: File;
	};
}

abstract class CommonForm<
	T extends CommonFormProps,
	U extends CommonFormState
> extends Component<T, U> {
	abstract schema: {};
	abstract doSubmit: () => void;
	// abstract clearMessages?: () => void;

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

		// if (this.clearMessages) this.clearMessages();

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
								data[name] = option;
								this.setState({ data });
							}}>
							<input
								type='radio'
								checked={this.state.data[name] === option ? true : false}
								readOnly
							/>
							<div>
								<span className='check'></span>
							</div>
							<span
								className={this.state.data[name] === option ? 'active' : ''}>
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

	renderRadioInputWithRange = (label: string, name: string) => {
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
							No
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
							Yes
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

	renderFileBox = (name: string) => {
		if (this.state.images)
			return (
				<FileBox
					file={this.state.images[name]}
					handleFileChange={(event: any) => {
						const images = { ...this.state.images };
						if (images) {
							images[name] = event.target.files[0];
							this.setState({ images });
						}
					}}
					deleteFile={() => {
						const images = { ...this.state.images };
						if (images) {
							delete images[name];
							this.setState({ images });
						}
					}}
				/>
			);
	};

	renderCheckBoxInput = (label: string, name: string, ...rest: string[]) => {
		return (
			<Form.Group className='checkBoxInput'>
				<Form.Label>{label}</Form.Label>
				<div className='checkBoxGroup'>
					{rest.map((option, index) => (
						<label
							className='checkbox'
							onClick={e => {
								e.preventDefault();
								const data: any = { ...this.state.data };
								if (data[name].includes(index + 1)) {
									data[name] = data[name].filter(
										(c: number) => c !== index + 1
									);
								} else data[name].push(index + 1);

								this.setState({ data });
							}}>
							<input
								type='checkbox'
								checked={
									this.state.data[name].includes(index + 1) ? true : false
								}
								readOnly
							/>
							<div>
								<span className='check'></span>
							</div>
							<span
								className={
									this.state.data[name].includes(index + 1) ? 'active' : ''
								}>
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

	renderRadioInputWithOthers = (
		label: string,
		name: string,
		...rest: string[]
	) => {
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
								data[name] = option;
								this.setState({ data });
							}}>
							<input
								type='radio'
								checked={this.state.data[name] === option ? true : false}
								readOnly
							/>
							<div>
								<span className='check'></span>
							</div>
							<span
								className={this.state.data[name] === option ? 'active' : ''}>
								{option}
							</span>
						</label>
					))}
					<label
						className='radio'
						onClick={() => {
							const data: any = { ...this.state.data };

							// if (typeof data[name] !== 'string') {
							setTimeout(
								() =>
									(this.radioInputField.current! as HTMLInputElement).focus(),
								50
							);
							this.radioInputField.current?.focus();
							data[name] = '';
							this.setState({ data });
							// }
						}}>
						<input
							type='radio'
							checked={
								rest.includes(this.state.data[name]) ||
								this.state.data[name] === 0
									? false
									: true
							}
							readOnly
						/>
						<div>
							<span className='check'></span>
						</div>
						<span
							className={
								rest.includes(this.state.data[name]) ||
								this.state.data[name] === 0
									? ''
									: 'active'
							}>
							Others
						</span>
						<div>
							<Form.Control
								ref={this.radioInputField}
								className='othersInput'
								type='text'
								value={
									rest.includes(this.state.data[name]) ||
									this.state.data[name] === 0
										? ''
										: this.state.data[name]
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

	renderDropdownInput = (label: string, name: string, ...rest: string[]) => {};
}

export default CommonForm;
