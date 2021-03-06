import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import PostProductForm, {
	PostProductFormState,
} from '../../../classes/postProductForm';
import Joi from 'joi';
import { Dispatch } from '@reduxjs/toolkit';
import {
	updateBookFormPage1Details,
	BookFormSlicePage1,
} from '../../../app/entities/postProduct/bookForm';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../app/models';
import { animateScroll as scroll } from 'react-scroll';
import bookForm from '../../../data/forms/bookFormData';

export interface BookPage1Props extends RouteComponentProps, ReduxProps {}

export interface BookPage1State extends PostProductFormState {
	data: BookFormSlicePage1;
}

class BookPage1 extends PostProductForm<BookPage1Props, BookPage1State> {
	state = {
		data: {
			title: this.props.data.title,
			description: this.props.data.description,
			mrp: this.props.data.mrp,
			bindingType: this.props.data.bindingType,
			inkStains: this.props.data.inkStains,
		},
		errors: {
			title: '',
			description: '',
			mrp: '',
			bindingType: '',
			inkStains: '',
		},
	};

	doSubmit = () => {
		this.props.updatePage1Details(this.state.data);
		this.props.history.push('/post-product/book/2');
		scroll.scrollToTop({
			duration: 200,
			smooth: 'linear',
		});
	};
	schema = {
		title: Joi.string().required().label('Title'),
		description: Joi.string().required().label('Description'),
		mrp: Joi.number()
			.min(1)
			.required()
			.error((errors: any) => {
				errors.forEach((err: any) => {
					if (err.code === 'number.min') err.message = '"Price" is required';
				});
				return errors;
			}),
		bindingType: Joi.string()
			.required()
			.error((errors: any) => {
				errors.forEach((err: any) => {
					if (err.code === 'string.empty')
						err.message = 'This question is required';
				});
				return errors;
			}),
		inkStains: Joi.string()
			.required()
			.error((errors: any) => {
				errors.forEach((err: any) => {
					if (err.code === 'string.empty')
						err.message = 'This question is required';
				});
				return errors;
			}),
	};
	render() {
		return (
			<div className='postProduct newBook'>
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
						bookForm.title.name,
						'title',
						this.state.errors.title
					)}
					{this.renderTextArea(
						bookForm.description.name,
						'description',
						this.state.errors.description
					)}
					{this.renderInput(
						bookForm.mrp.name,
						'mrp',
						this.state.errors.mrp,
						'number'
					)}
					{this.renderRadioInput(
						bookForm.bindingType.name,
						'bindingType',
						...bookForm.bindingType.options
					)}
					{this.renderRadioInput(
						bookForm.inkStains.name,
						'inkStains',
						...bookForm.inkStains.options
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
	const { data, loading, error } = state.entities.postProduct.bookForm;
	return {
		data,
		loading,
		error,
	};
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
	updatePage1Details: (data: BookFormSlicePage1) =>
		dispatch(updateBookFormPage1Details(data)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(BookPage1);
