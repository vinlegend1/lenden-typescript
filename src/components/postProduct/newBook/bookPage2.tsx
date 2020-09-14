import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import PostProductForm, {
	PostProductFormState,
} from '../../../classes/postProductForm';
import { RootState } from '../../../app/models';
import { ThunkDispatch, Action } from '@reduxjs/toolkit';

import { connect, ConnectedProps } from 'react-redux';
import {
	updateBookFormPage2Details,
	BookFormSlicePage2,
	postBookForm,
} from './../../../app/entities/postProduct/bookForm';
import Joi from 'joi';
import bookForm from '../../../data/forms/bookFormData';

export interface BookPage2Props extends RouteComponentProps, ReduxProps {}

export interface BookPage2State extends PostProductFormState {
	data: BookFormSlicePage2;
	images: {
		[key: string]: File;
	};
}

class BookPage2 extends PostProductForm<BookPage2Props, BookPage2State> {
	fileInput: any;
	state = {
		data: {
			bookFoxed: this.props.data.bookFoxed,
			bindingCondition: this.props.data.bindingCondition,
			coverCondition: this.props.data.coverCondition,
			bookRepaired: this.props.data.bookRepaired,
		},
		errors: {
			bookFoxed: '',
			bindingCondition: '',
			coverCondition: '',
			bookRepaired: '',
		},
		images: {},
	};

	doSubmit = () => {
		this.props.updatePage2Details(this.state.data);
		this.props.postBookForm();
	};
	schema = {
		bookFoxed: Joi.string()
			.required()
			.error((errors: any) => {
				errors.forEach((err: any) => {
					if (err.code === 'string.empty')
						err.message = 'This question is required';
				});
				return errors;
			}),
		bindingCondition: Joi.string()
			.required()
			.error((errors: any) => {
				errors.forEach((err: any) => {
					if (err.code === 'string.empty')
						err.message = 'This question is required';
				});
				return errors;
			}),
		coverCondition: Joi.string()
			.required()
			.error((errors: any) => {
				errors.forEach((err: any) => {
					if (err.code === 'string.empty')
						err.message = 'This question is required';
				});
				return errors;
			}),
		bookRepaired: Joi.number()
			.min(0)
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
		if (!this.props.data.title)
			this.props.history.replace('/post-product/book/1');
		return (
			<div className='postProduct newBook'>
				<div className='container mainContainer'>
					<p className='foxing'>
						As a sign of ageing, clean pages of a book tend to develop certain
						spots or turn brown like this. This process is called FOXING.
					</p>
					{this.renderRadioInput(
						bookForm.bookFoxed.name,
						'bookFoxed',
						...bookForm.bookFoxed.options
					)}
					{this.renderRadioInput(
						bookForm.bindingCondition.name,
						'bindingCondition',
						...bookForm.bindingCondition.options
					)}
					{this.renderRadioInput(
						bookForm.coverCondition.name,
						'coverCondition',
						...bookForm.coverCondition.options
					)}
					{this.renderRadioInputWithRange(
						bookForm.bookRepaired.name,
						'bookRepaired'
					)}
					<div style={{ width: 'fit-content', margin: '0 auto' }}>
						<div style={{ display: 'flex', justifyContent: '' }}></div>
						<div style={{ display: 'flex' }}>
							{this.renderFileBox('image1')}
							{this.renderFileBox('image2')}
						</div>
					</div>
					{this.renderErrorAlert()}
					{this.renderLoader(this.props.loading)}
					{this.renderProgressBar(2, 2)}
					<div className='darkButton' onClick={this.handleSubmit}>
						Post Now
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: RootState) => {
	const { data, loading, error } = state.entities.postProduct.bookForm;
	return {
		data,
		loading,
		error,
	};
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, Action>) => ({
	updatePage2Details: (data: BookFormSlicePage2) =>
		dispatch(updateBookFormPage2Details(data)),
	postBookForm: () => dispatch(postBookForm()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(BookPage2);
