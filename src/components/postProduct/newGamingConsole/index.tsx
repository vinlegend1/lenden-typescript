import * as React from 'react';
import PostProductForm, {
	PostProductFormState,
} from '../../../classes/postProductForm';
import Joi from 'joi';
import { RouteComponentProps } from 'react-router-dom';
import SubNav from '../../common/subNav';
import { Form } from 'react-bootstrap';
import gamingConsolesData from '../../../data/forms/gamingConsolesData';

export interface NewGamingConsoleProps extends RouteComponentProps {
	loading: boolean;
	error: string;
}

export interface NewGamingConsoleState extends PostProductFormState {
	data: {
		// title: string;
		// deviceCompatible: string;
		// originalCase: number;
		// scratches: number;
		checkbox: number[];
		brand: number | string;
		model: string;
	};
	errors: {};
}

class NewGamingConsole extends PostProductForm<
	NewGamingConsoleProps,
	NewGamingConsoleState
> {
	state = {
		data: {
			// title: '', deviceCompatible: '', originalCase: 0, scratches: 0
			checkbox: [] as number[],
			brand: 0,
			model: '',
		},
		errors: {
			// title: '',
			// deviceCompatible: '',
			// originalCase: '',
			// scratches: '',
		},
	};

	componentDidMount() {
		const preloadImg = [
			'../../../icons/generic/down-black.svg',
			'../../../icons/generic/tick.svg',
		];

		preloadImg.forEach(src => {
			const img = new Image();
			img.src = src;
		});
	}

	schema = {
		// title: Joi.string().required().label('Title'),
		// deviceCompatible: Joi.string().required().label('Compatible Device'),
		// originalCase: Joi.number()
		// 	.min(1)
		// 	.required()
		// 	.error((errors: any) => {
		// 		errors.forEach((err: any) => {
		// 			if (err.code === 'number.min')
		// 				err.message = 'This question is required';
		// 		});
		// 		return errors;
		// 	}),
		// scratches: Joi.number()
		// 	.min(1)
		// 	.required()
		// 	.error((errors: any) => {
		// 		errors.forEach((err: any) => {
		// 			if (err.code === 'number.min')
		// 				err.message = 'This question is required';
		// 		});
		// 		return errors;
		// 	}),
	};
	doSubmit = () => {};
	render() {
		return (
			<React.Fragment>
				<SubNav title='Post your product' />
				<div className='postProduct'>
					<div className='container selectedChoice'>
						<h2>Selected Category</h2>
						<div>
							<h3>Gaming Consoles</h3>
							<p onClick={() => this.props.history.goBack()}> Change</p>
						</div>
					</div>
					<div className='container mainContainer'>
						<p>
							Note:
							<span>
								Please fill this form ONLY IF you have a Gaming Console that is
								in a condition to be used by a new user.
							</span>
						</p>

						{this.renderRadioInputWithOthers(
							gamingConsolesData.brand.name,
							'brand',
							...gamingConsolesData.brand.options
						)}

						{!gamingConsolesData.brand.options.includes(
							this.state.data.brand.toString()
						) && this.renderInput(gamingConsolesData.model.name, 'model', '')}

						{gamingConsolesData.brand.options.includes(
							this.state.data.brand.toString()
						) && (
							<Form.Group controlId='exampleForm.SelectCustom'>
								<Form.Label>{gamingConsolesData.model.name}</Form.Label>
								<Form.Control as='select' custom>
									{gamingConsolesData.model.options[this.state.data.brand].map(
										(model: string) => (
											<option>{model}</option>
										)
									)}
								</Form.Control>
							</Form.Group>
						)}
						{/* 
						{typeof this.state.data.model === 'number' &&
							this.renderInput(
								'Mention the device your game is compatible with.',
								'deviceCompatible',
								''
							)} */}

						{typeof this.state.data.model === 'number' && (
							<Form.Group controlId='exampleForm.SelectCustom'>
								<Form.Label>
									Mention the device your game is compatible with.
								</Form.Label>
								<Form.Control as='select' custom>
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
								</Form.Control>
							</Form.Group>
						)}

						{/*
					{this.renderInput(
						'Mention the device your game is compatible with.',
						'deviceCompatible',
						this.state.errors.deviceCompatible
					)}

					{this.renderRadioInput(
						'Do you have the original case of the gaming cd?',
						'originalCase',
						'No',
						'Yes'
					)}
					{this.renderRadioInput(
						'Does your video game have any scratches?',
						'scratches',
						'No',
						'Yes'
					)} */}

						{this.renderCheckBoxInput(
							'Do you have the original case of the gaming cd?',
							'checkbox',
							'No',
							'Yes'
						)}

						{this.renderProgressBar(1, 1)}
						<div className='darkButton' onClick={this.handleSubmit}>
							Post Now
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default NewGamingConsole;
