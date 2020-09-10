import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import CommonForm, { ErrorContainer } from '../../common/commonForm';
import { RootState } from '../../../app/models';
import { Dispatch } from '@reduxjs/toolkit';

import { connect, ConnectedProps } from 'react-redux';
import {
	updatePage2Details,
	Page2,
} from './../../../app/entities/postProduct/bookForm';
import GenericIcons from '../../../icons/generic';
import FileBox from '../../common/FileBox';

export interface BookPage2Props extends RouteComponentProps, ReduxProps {
	loading: boolean;
	error: string;
}

export interface BookPage2State {
	data: {
		ques6: number;
		ques7: number;
		ques8: number;
		ques9: number;
		ques10: number;
	};
	errors: ErrorContainer;

	images: {
		[key: string]: File;
	};
}

class BookPage2 extends CommonForm<BookPage2Props, BookPage2State> {
	fileInput: any;
	state = {
		data: { ques6: 0, ques7: 0, ques8: 0, ques9: 0, ques10: -1 },
		errors: { ques6: '', ques7: '', ques8: '', ques9: '', ques10: '' },
		images: {},
	};

	doSubmit = () => {};
	schema = {};
	render() {
		// if (!this.props.data.ques1)
		// 	this.props.history.replace('/post-product/book/1');
		return (
			<div className='newBook'>
				<div className='container mainContainer'>
					<p className='foxing'>
						As a sign of ageing, clean pages of a book tend to develop certain
						spots or turn brown like this. This process is called FOXING.
					</p>
					{this.renderRadioInput(
						'Is your book foxed such that it has visible spots and browning?',
						'ques6',
						'No spots/browning',
						'Visible spots and browning'
					)}
					{this.renderRadioInput(
						'What is the condition of the binding of your book?',
						'ques7',
						'Undamaged',
						'Light wrinkles',
						'Heavy Breaks'
					)}
					{this.renderRadioInput(
						'What is the condition of the front and back side of your book? ',
						'ques8',
						'Not damaged at all',
						'Slight wear and tear due to normal usage',
						'Visible tear/cracks and/or bent and worn out edges'
					)}
					{this.renderRadioInput(
						'What is the condition of the binding of your book?',
						'ques9',
						'Undamaged',
						'Light wrinkles',
						'Heavy Breaks'
					)}
					{this.renderRadioInputWithField(
						'Has your book ever been repaired earlier? If yes, mention the number of times it has been repaired.',
						'ques10',
						'Yes',
						'No'
					)}
					<div style={{ width: 'fit-content', margin: '0 auto' }}>
						<div style={{ display: 'flex', justifyContent: '' }}></div>
						<div style={{ display: 'flex' }}>
							{this.renderFileBox('image1')}
							{this.renderFileBox('image2')}
						</div>
					</div>
					{this.renderProgressBar(2, 2)}
					<div className='darkButton'>Post Now</div>
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
	updatePage2Details: (data: Page2) => dispatch(updatePage2Details(data)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(BookPage2);
