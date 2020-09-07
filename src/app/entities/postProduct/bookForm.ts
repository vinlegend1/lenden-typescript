import { createSlice } from '@reduxjs/toolkit';
import { ActionWithPayload } from './../../models/index';

export interface Page1 {
	ques1: string;
	ques2: string;
	ques3: number;
	ques4: number;
	ques5: number;
}

export interface Page2 {
	ques6: number;
	ques7: number;
	ques8: number;
	ques9: number;
	ques10: number;
}

const initialState: Page1 & Page2 = {
	ques1: '',
	ques2: '',
	ques3: -1,
	ques4: 0,
	ques5: 0,
	ques6: 0,
	ques7: 0,
	ques8: 0,
	ques9: 0,
	ques10: 0,
};

const slice = createSlice({
	name: 'bookForm',
	initialState,
	reducers: {
		page1DetailsUpdated: (state, action: ActionWithPayload<Page1>) => {
			const { ques1, ques2, ques3, ques4, ques5 } = action.payload;

			state.ques1 = ques1;
			state.ques2 = ques2;
			state.ques3 = ques3;
			state.ques4 = ques4;
			state.ques5 = ques5;
		},
		page2DetailsUpdated: (state, action: ActionWithPayload<Page2>) => {
			const { ques6, ques7, ques8, ques9, ques10 } = action.payload;

			state.ques6 = ques6;
			state.ques7 = ques7;
			state.ques8 = ques8;
			state.ques9 = ques9;
			state.ques10 = ques10;
		},

		formCleared: state => Object.keys(state).forEach(key => (state[key] = '')),
	},
});

export default slice.reducer;

const { page1DetailsUpdated, page2DetailsUpdated } = slice.actions;

export const updatePage1Details = (data: Page1) => page1DetailsUpdated(data);
export const updatePage2Details = (data: Page2) => page2DetailsUpdated(data);
