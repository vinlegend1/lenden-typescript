import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { ActionWithPayload, RootState } from './../../models/index';
import { apiCallBegan } from './../../api';

export interface Page1 {
	title: string;
	description: string;
	mrp: number;
	bindingType: number;
	inkStains: number;
}

export interface Page2 {
	bookFoxed: number;
	bindingCondition: number;
	coverCondition: number;
	bookRepaired: number;
}

export const questionDetails = {
	title: {
		key: 'title',
		name: 'What is the title of your book?',
	},
	description: {
		key: 'description',
		name: 'Describe your book in few words',
	},
	mrp: {
		key: 'mrp',
		name:
			'What is the MRP as printed on/in the book? (refer back side/inside the book)',
	},
	bindingType: {
		key: 'binding_type',
		name: 'What is your book’s binding type?',
		options: ['Paperback', 'Hardbound'],
	},
	inkStains: {
		key: 'ink_stains',
		name: 'Are there any ink stain inside and outside the book?',
		options: [
			'No stains',
			'Personal marks',
			'Marks of Ink/Pencil/Highlighter/Whitener, etc.',
		],
	},
	bookFoxed: {
		key: 'book_foxed',
		name: 'Is your book foxed such that it has visible spots and browning?',
		options: ['No spots/browning', 'Visible spots and browning'],
	},
	bindingCondition: {
		key: 'binding_condition',
		name: 'What is the condition of the binding of your book?',
		options: ['Undamaged', 'Light wrinkles', 'Heavy Breaks'],
	},
	coverCondition: {
		key: 'front_back_condition',
		name: 'What is the condition of the front and back side of your book? ',
		options: [
			'Not damaged at all',
			'Slight wear and tear due to normal usage',
			'Visible tear/cracks and/or bent and worn out edges',
		],
	},
	bookRepaired: {
		key: 'book_repaired_earlier',
		name:
			'Has your book ever been repaired earlier? If yes, mention the number of times it has been repaired.',
	},
};

const initialState: Page1 & Page2 = {
	title: '',
	description: '',
	mrp: -1,
	bindingType: 0,
	inkStains: 0,
	bookFoxed: 0,
	bindingCondition: 0,
	coverCondition: 0,
	bookRepaired: -1,
};

const slice = createSlice({
	name: 'bookForm',
	initialState,
	reducers: {
		page1DetailsUpdated: (state, action: ActionWithPayload<Page1>) => {
			const {
				title,
				description,
				mrp,
				bindingType,
				inkStains,
			} = action.payload;

			state.title = title;
			state.description = description;
			state.mrp = mrp;
			state.bindingType = bindingType;
			state.inkStains = inkStains;
		},
		page2DetailsUpdated: (state, action: ActionWithPayload<Page2>) => {
			const {
				bookFoxed,
				bindingCondition,
				coverCondition,
				bookRepaired,
			} = action.payload;

			state.bookFoxed = bookFoxed;
			state.bindingCondition = bindingCondition;
			state.coverCondition = coverCondition;
			state.bookRepaired = bookRepaired;
		},

		formCleared: state => Object.keys(state).forEach(key => (state[key] = '')),
	},
});

export default slice.reducer;

const { page1DetailsUpdated, page2DetailsUpdated, formCleared } = slice.actions;

export const updatePage1Details = (data: Page1) => page1DetailsUpdated(data);
export const updatePage2Details = (data: Page2) => page2DetailsUpdated(data);

export const postBookForm = () => (
	dispatch: Dispatch,
	getState: () => RootState
) => {
	const state = getState().entities.postProduct.bookForm;
	let derivedState = {};

	for (let item in state) {
		if (typeof state[item] === 'number' && questionDetails[item].options) {
			derivedState[questionDetails[item].key] =
				questionDetails[item].options[state[item] - 1];
		} else {
			derivedState[questionDetails[item].key] = state[item];
		}
	}
	console.log(derivedState);

	dispatch(
		apiCallBegan({
			method: 'post',
			url: 'products/book',
			data: derivedState,
		})
	);
};

export const clearForm = () => formCleared();
