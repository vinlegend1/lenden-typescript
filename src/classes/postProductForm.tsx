import * as React from 'react';
import CommonForm, {
	CommonFormProps,
	CommonFormState,
} from './../classes/commonForm';
import { Form, ProgressBar } from 'react-bootstrap';
import FileBox from '../components/common/FileBox';

export interface PostProductFormProps extends CommonFormProps {}

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

export default PostProductForm;
