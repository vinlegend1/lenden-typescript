import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import CommonForm, { ErrorContainer } from '../../common/commonForm';
import Joi from 'joi';
import { Dispatch } from '@reduxjs/toolkit';
import {
	updatePage1Details,
	Page1,
} from '../../../app/entities/postProduct/bookForm';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../app/models';

export interface BookPage1Props extends RouteComponentProps, ReduxProps {
	loading: boolean;
	error: string;
}

export interface BookPage1State {
	data: {
		ques1: string;
		ques2: string;
		ques3: number;
		ques4: number;
		ques5: number;
	};
	errors: ErrorContainer;
}

class BookPage1 extends CommonForm<BookPage1Props, BookPage1State> {
	state = {
		data: {
			ques1: this.props.data.ques1,
			ques2: this.props.data.ques2,
			ques3: this.props.data.ques3,
			ques4: this.props.data.ques4,
			ques5: this.props.data.ques5,
		},
		errors: { ques1: '', ques2: '', ques3: '', ques4: '', ques5: '' },
	};

	doSubmit = () => {
		this.props.updatePage1Details(this.state.data);
		this.props.history.push('/post-product/book/2');
	};
	schema = {
		ques1: Joi.string().required().label('Title'),
		ques2: Joi.string().required().label('Description'),
		ques3: Joi.number()
			.min(1)
			.required()
			.error((errors: any) => {
				errors.forEach((err: any) => {
					if (err.code === 'number.min') err.message = '"Price" is required';
				});
				return errors;
			}),
		ques4: Joi.number()
			.min(1)
			.required()
			.error((errors: any) => {
				errors.forEach((err: any) => {
					if (err.code === 'number.min')
						err.message = 'This question is required';
				});
				return errors;
			}),
		ques5: Joi.number()
			.min(1)
			.required()
			.error((errors: any) => {
				errors.forEach((err: any) => {
					if (err.code === 'number.min')
						err.message = 'This question is required';
				});
				return errors;
			}),
	};
	render() {
		return (
			<div className='newBook'>
				<div className='container selectedChoice'>
					<h2>Selected Category</h2>
					<div>
						<h3>Books</h3>
						<p onClick={() => this.props.history.goBack()}> Change</p>
					</div>
				</div>
				<div className='container mainContainer'>
					<p>
						Note:
						<span>
							Please fill this form ONLY IF you have a book that is in a
							condition to be used by a new reader.
						</span>
					</p>

					{this.renderInput(
						'What is the title of your book?',
						'ques1',
						this.state.errors.ques1
					)}
					{this.renderTextArea(
						'Describe your book in few words',
						'ques2',
						this.state.errors.ques2
					)}
					{this.renderInput(
						' What is the MRP as printed on/in the book? (refer back side/inside the book)',
						'ques3',
						this.state.errors.ques3,
						'number'
					)}
					{this.renderRadioInput(
						'What is your book’s binding type?',
						'ques4',
						'Paperback',
						'Hardbound'
					)}
					{this.renderRadioInput(
						'Are there any ink stain inside and outside the book? ',
						'ques5',
						'No stains',
						'Personal marks',
						'Marks of Ink/Pencil/Highlighter/Whitener, etc.'
					)}

					{this.renderProgressBar(1, 2)}
					<div className='darkButton' onClick={this.handleSubmit}>
						Next
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: RootState) => {
	const data = state.entities.postProduct.bookForm;
	return {
		data,
	};
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
	updatePage1Details: (data: Page1) => dispatch(updatePage1Details(data)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(BookPage1);
