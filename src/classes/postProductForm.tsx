import * as React from 'react';
import CommonForm, {
	CommonFormProps,
	CommonFormState,
} from './../classes/commonForm';
import { Form, ProgressBar, Modal } from 'react-bootstrap';
import FileBox from '../components/common/FileBox';
import GenericIcons from '../icons/generic';
import { RouteComponentProps } from 'react-router-dom';

export interface PostProductFormProps
	extends CommonFormProps,
		RouteComponentProps {}

export interface PostProductFormState extends CommonFormState {
	images?: {
		[key: string]: File;
	};
}

abstract class PostProductForm<
	T extends PostProductFormProps,
	U extends PostProductFormState
> extends CommonForm<T, U> {
	radioInputField = React.createRef<HTMLInputElement>();

	renderTextArea = (
		label: string,
		name: string,
		errorMessage: string,
		placeholder?: string,
		type?: string
	) => {
		const { data } = this.state;
		return (
			<Form.Group id={name}>
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
			<Form.Group className='radioInput' id={name}>
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

	renderProgressBar = (currValue: number, totalValue: number) => {
		return (
			<div className='progressBar'>
				<ProgressBar variant='success' now={(currValue / totalValue) * 100} />
				<span>
					Page {currValue} of {totalValue}
				</span>
			</div>
		);
	};

	renderRadioInputWithRange = (label: string, name: string) => {
		return (
			<Form.Group className='radioInput' id={name}>
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

	renderRadioInputWithOthers = (
		label: string,
		name: string,
		callbackFn?: () => void,
		...rest: string[]
	) => {
		return (
			<Form.Group className='radioInput' id={name}>
				<Form.Label>{label}</Form.Label>
				<div className='radioGroup'>
					{rest.map((option, index) => {
						return (
							<label
								className='radio'
								key={index}
								onClick={async e => {
									e.preventDefault();
									const data: any = { ...this.state.data };
									data[name] = option;
									await this.setState({ data });
									if (callbackFn) callbackFn();
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
						);
					})}
					<label
						className='radio'
						onClick={async e => {
							e.preventDefault();
							const data: any = { ...this.state.data };
							if (rest.includes(data[name]) || data[name] === 0) {
								data[name] = '';
								await this.setState({ data });
							}
							setTimeout(
								() =>
									(this.radioInputField.current! as HTMLInputElement).focus(),
								50
							);
							this.radioInputField.current?.focus();

							if (
								callbackFn &&
								(rest.includes(data[name]) || data[name] === '')
							)
								callbackFn();
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

	renderFileBox = (name: string, angleName?: string) => {
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
					label={angleName}
				/>
			);
	};

	renderCheckBoxInput = (label: string, name: string, ...rest: string[]) => {
		return (
			<Form.Group className='checkBoxInput' id={name}>
				<Form.Label>{label}</Form.Label>
				<div className='checkBoxGroup'>
					{rest.map((option, index) => (
						<label
							key={index}
							className='checkbox'
							onClick={e => {
								e.preventDefault();
								let checkboxArray: any = [...this.state.data[name]];
								if (checkboxArray.includes(option)) {
									checkboxArray = checkboxArray.filter(
										(c: string) => c !== option
									);
								} else checkboxArray.push(option);
								this.setState({
									data: {
										...this.state.data,
										[name]: checkboxArray,
									},
								});
							}}>
							<input
								type='checkbox'
								checked={this.state.data[name].includes(option) ? true : false}
								readOnly
							/>
							<div>
								<span className='check'></span>
							</div>
							<span
								className={
									this.state.data[name].includes(option) ? 'active' : ''
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

	renderDropdownInput = (
		label: string,
		name: string,
		ref?: React.Ref<HTMLSelectElement>,
		callbackFn?: () => void,
		...rest: string[]
	) => {
		return (
			<Form.Group controlId='' id={name}>
				<Form.Label>{label}</Form.Label>
				<Form.Control
					as='select'
					custom
					value={this.state.data[name]}
					onChange={async e => {
						const data: any = { ...this.state.data };
						data[name] = e.currentTarget.value;
						await this.setState({ data });
						if (callbackFn) callbackFn();
					}}
					ref={ref ? ref : null}>
					{rest.map((opt: string, index: number) => (
						<option key={index}>{opt}</option>
					))}
				</Form.Control>
			</Form.Group>
		);
	};
	renderSuccessModal = (formPagesCount: number) => (
		<Modal
			className='notificationMessage'
			size='lg'
			centered
			show={this.props.success ? true : false}
			backdrop='static'
			onHide={() => console.log('asd')}
			keyboard={false}>
			<Modal.Body>
				<GenericIcons name='success' />
				Your product has been posted successfully. Continue to my Products or
				post another product
				<div
					onClick={() => this.props.history.push('/my-products')}
					className='darkButton'>
					My Products
				</div>
				<div
					onClick={() => this.props.history.go(formPagesCount)}
					className='lightButton'>
					Post another Product
				</div>
			</Modal.Body>
		</Modal>
	);

	renderImageInput = (configObject: {
		label: string;
		note?: string;
		imagesRequired: Array<{
			name: string;
			label: string;
		}>;
	}) => {
		const { label, note, imagesRequired } = configObject;
		return (
			<div className='imageInput'>
				<h2>{label}</h2>
				<p>
					Note:
					{note && <span>{note}</span>}
				</p>
				<div className='imageInputsContainer'>
					{imagesRequired.map(image =>
						this.renderFileBox(image.name, image.label)
					)}
				</div>
			</div>
		);
	};
}

export default PostProductForm;
