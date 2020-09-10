import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import CommonForm, { ErrorContainer } from '../../common/commonForm';
import { RootState } from '../../../app/models';
import { ThunkDispatch, Action } from '@reduxjs/toolkit';

import { connect, ConnectedProps } from 'react-redux';
import {
	updatePage2Details,
	Page2,
	questionDetails,
	postBookForm,
} from './../../../app/entities/postProduct/bookForm';
import Joi from 'joi';

export interface BookPage2Props extends RouteComponentProps, ReduxProps {
	loading: boolean;
	error: string;
}

export interface BookPage2State {
	data: {
		bookFoxed: number;
		bindingCondition: number;
		coverCondition: number;
		bookRepaired: number;
	};
	errors: ErrorContainer;

	images: {
		[key: string]: File;
	};
}

class BookPage2 extends CommonForm<BookPage2Props, BookPage2State> {
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
		bookFoxed: Joi.number()
			.min(1)
			.required()
			.error((errors: any) => {
				errors.forEach((err: any) => {
					if (err.code === 'number.min')
						err.message = 'This question is required';
				});
				return errors;
			}),
		bindingCondition: Joi.number()
			.min(1)
			.required()
			.error((errors: any) => {
				errors.forEach((err: any) => {
					if (err.code === 'number.min')
						err.message = 'This question is required';
				});
				return errors;
			}),
		coverCondition: Joi.number()
			.min(1)
			.required()
			.error((errors: any) => {
				errors.forEach((err: any) => {
					if (err.code === 'number.min')
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
			<div className='newBook'>
				<div className='container mainContainer'>
					<p className='foxing'>
						As a sign of ageing, clean pages of a book tend to develop certain
						spots or turn brown like this. This process is called FOXING.
					</p>
					{this.renderRadioInput(
						questionDetails.bookFoxed.name,
						'bookFoxed',
						...questionDetails.bookFoxed.options
					)}
					{this.renderRadioInput(
						questionDetails.bindingCondition.name,
						'bindingCondition',
						...questionDetails.bindingCondition.options
					)}
					{this.renderRadioInput(
						questionDetails.coverCondition.name,
						'coverCondition',
						...questionDetails.coverCondition.options
					)}
					{this.renderRadioInputWithRange(
						questionDetails.bookRepaired.name,
						'bookRepaired'
					)}
					<div style={{ width: 'fit-content', margin: '0 auto' }}>
						<div style={{ display: 'flex', justifyContent: '' }}></div>
						<div style={{ display: 'flex' }}>
							{this.renderFileBox('image1')}
							{this.renderFileBox('image2')}
						</div>
					</div>
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
	const data = state.entities.postProduct.bookForm;
	return {
		data,
	};
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, Action>) => ({
	updatePage2Details: (data: Page2) => dispatch(updatePage2Details(data)),
	postBookForm: () => dispatch(postBookForm()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(BookPage2);
