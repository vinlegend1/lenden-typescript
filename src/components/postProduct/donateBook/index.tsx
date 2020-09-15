import * as React from 'react';
import SubNav from '../../common/subNav';
import PostProductForm, {
	PostProductFormState,
} from './../../../classes/postProductForm';
import { RouteComponentProps } from 'react-router-dom';
import Joi from 'joi';
import { RootState } from '../../../app/models';
import { ThunkDispatch, Action } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import {
	DonateBookSlice,
	updateDonateBookDetails,
	postDonateBookForm,
	clearDonateBookForm,
} from './../../../app/entities/postProduct/donateBook';

export interface DonateBookProps extends RouteComponentProps, ReduxProps {}

export interface DonateBookState extends PostProductFormState {
	data: {
		title: string;
		confirmation: string;
		mobileNumber: string;
	};
}

class DonateBook extends PostProductForm<DonateBookProps, DonateBookState> {
	state = {
		data: {
			title: '',
			confirmation: '',
			mobileNumber: '',
		},
		errors: {
			title: '',
			confirmation: '',
			mobileNumber: '',
		},
	};

	schema = {
		title: Joi.string().required().label('Title'),
		confirmation: Joi.string()
			.required()
			.error((errors: any) => {
				errors.forEach((err: any) => {
					if (err.code === 'string.empty')
						err.message = 'This question is required';
				});
				return errors;
			}),
		mobileNumber: Joi.string()
			.length(10)
			.pattern(/^[0-9]+$/)
			.error(() => 'first message')
			.required()
			.label('Mobile Number')
			.error((errors: any) => {
				errors.forEach((err: any) => {
					switch (err.code) {
						case 'string.pattern.base':
							err.message = '"Mobile Number" should be a valid Mobile Number';
							break;
					}
				});
				return errors;
			}),
	};
	doSubmit = () => {
		this.props.updateDetails(this.state.data);
		this.props.postForm();
	};
	componentWillUnmount() {
		this.props.clearForm();
	}

	render() {
		return (
			<React.Fragment>
				<SubNav title='Donate a Book' />
				<div className='postProduct donateBook'>
					<div className='container mainContainer'>
						<p>
							You are a hero that this world needs. You are passing on knowledge
							which will empower today and tomorrow for someone who lacks it .
						</p>
						<h4>
							We cannot be more proud and thankful to have you by our side.
						</h4>
						{this.renderInput(
							'What is the title of the book? (If more than one, separate each book with a comma)',
							'title',
							this.state.errors.title
						)}
						{this.renderRadioInput(
							'Please confirm that your book(s) has no missing pages and is in a condition to be reused.',
							'confirmation',
							'Yes, I confirm',
							'No, I do not confirm'
						)}
						{this.renderMobileNumberInput(
							'Please share your contact details for our team to get in touch with you.',
							this.state.errors.mobileNumber
						)}

						{this.renderErrorAlert()}
						{this.renderLoader(this.props.loading)}
						<div className='darkButton' onClick={this.handleSubmit}>
							Post Now
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: RootState) => {
	const { data, loading, error } = state.entities.postProduct.donateBook;
	return {
		data,
		loading,
		error,
	};
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, Action>) => ({
	updateDetails: (data: DonateBookSlice) =>
		dispatch(updateDonateBookDetails(data)),
	postForm: () => dispatch(postDonateBookForm()),
	clearForm: () => dispatch(clearDonateBookForm()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(DonateBook);
