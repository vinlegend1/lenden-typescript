import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import CommonForm, { ErrorContainer } from '../../common/commonForm';
import Joi from 'joi';
import { Dispatch } from '@reduxjs/toolkit';
import {
	updatePage1Details,
	Page1,
	questionDetails,
} from '../../../app/entities/postProduct/bookForm';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../app/models';
import { animateScroll as scroll } from 'react-scroll';

export interface BookPage1Props extends RouteComponentProps, ReduxProps {
	loading: boolean;
	error: string;
}

export interface BookPage1State {
	data: {
		title: string;
		description: string;
		mrp: number;
		bindingType: number;
		inkStains: number;
	};
	errors: ErrorContainer;
}

class BookPage1 extends CommonForm<BookPage1Props, BookPage1State> {
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
		bindingType: Joi.number()
			.min(1)
			.required()
			.error((errors: any) => {
				errors.forEach((err: any) => {
					if (err.code === 'number.min')
						err.message = 'This question is required';
				});
				return errors;
			}),
		inkStains: Joi.number()
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
						questionDetails.title.name,
						'title',
						this.state.errors.title
					)}
					{this.renderTextArea(
						questionDetails.description.name,
						'description',
						this.state.errors.description
					)}
					{this.renderInput(
						questionDetails.mrp.name,
						'mrp',
						this.state.errors.mrp,
						'number'
					)}
					{this.renderRadioInput(
						questionDetails.bindingType.name,
						'bindingType',
						...questionDetails.bindingType.options
					)}
					{this.renderRadioInput(
						questionDetails.inkStains.name,
						'inkStains',
						...questionDetails.inkStains.options
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
