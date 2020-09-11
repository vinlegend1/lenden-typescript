import * as React from 'react';
import CommonForm, { ErrorContainer } from './../../common/commonForm';
import Joi from 'joi';
import { RouteComponentProps } from 'react-router-dom';
import SubNav from '../../common/subNav';

export interface NewGamingConsoleProps extends RouteComponentProps {
	loading: boolean;
	error: string;
}

export interface NewGamingConsoleState {
	data: {
		// title: string;
		// deviceCompatible: string;
		// originalCase: number;
		// scratches: number;
		checkbox: number[];
	};
	errors: ErrorContainer;
}

class NewGamingConsole extends CommonForm<
	NewGamingConsoleProps,
	NewGamingConsoleState
> {
	state = {
		data: {
			// title: '', deviceCompatible: '', originalCase: 0, scratches: 0
			checkbox: [] as number[],
		},
		errors: {
			// title: '',
			// deviceCompatible: '',
			// originalCase: '',
			// scratches: '',
		},
	};
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

						{/* {this.renderInput(
						'What is the title of your Video game ?',
						'title',
						this.state.errors.title
					)}
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
