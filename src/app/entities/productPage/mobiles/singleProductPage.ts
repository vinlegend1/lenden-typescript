import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { ActionWithPayload, RootState } from './../../../models/index';
import { apiCallBegan } from './../../../api';

export interface SingleProductPageSlice {
	id: string;
	title: string;
	brand: string;
	model: string;
	description: string;
	workingCondition: string;
	phoneDamaged: string;
	screenIssues: string;
	functionalIssues: string;
	accessories: string;
	mobileAge: string;
	ldc: number;
	rating: number;
	isWishlist: boolean;
	isDisabled: boolean;
	// images:string;
}

interface FetchedProduct {
	productid: string;
	producttype: string;
	title: string;
	description: string;
	ldc: number;
	rating: number;
	wishlist: boolean;
	barternow: boolean;
	brand: string;
	model: string;
	workingcondition: string;
	bodydamage: string;
	problems: string;
	functionalissues: string;
	accessories: string;
	age: string;
}

const mapToViewModel = (
	data: FetchedProduct,
	userId: string
): SingleProductPageSlice => {
	return {
		id: data.productid,
		title: data.title,
		brand: data.brand,
		model: data.model,
		description: data.description,
		ldc: data.ldc,
		rating: data.rating,
		mobileAge: data.age,
		workingCondition:
			data.workingcondition === 'Yes' ? 'Working' : 'Not Working',
		functionalIssues: data.functionalissues,
		accessories: data.accessories,
		phoneDamaged: data.bodydamage,
		screenIssues: data.problems,
		isDisabled: userId ? !data.barternow : false,
		isWishlist: data.wishlist,
	};
};

interface InitialState {
	loading: boolean;
	product: SingleProductPageSlice;
}

const initialState: InitialState = {
	loading: false,
	product: {
		id: '',
		title: '',
		brand: '',
		model: '',
		description: '',
		workingCondition: '',
		phoneDamaged: '',
		screenIssues: '',
		functionalIssues: '',
		accessories: '',
		mobileAge: '',
		ldc: 0,
		rating: 0,
		isWishlist: false,
		isDisabled: false,
	},
};

const slice = createSlice({
	name: 'singleProductPage',
	initialState,
	reducers: {
		productInitiated: state => {
			state.loading = true;
		},
		productReceived: (
			state,
			action: ActionWithPayload<{
				data: FetchedProduct;
				userId: string;
			}>
		) => {
			state.product = mapToViewModel(
				action.payload.data,
				action.payload.userId
			);
			state.loading = false;
		},
		productFailed: state => {
			state.loading = false;
		},
	},
});

const { productFailed, productInitiated, productReceived } = slice.actions;

export default slice.reducer;

export const getMobileProduct = (id: string) => async (
	dispatch: Dispatch,
	getState: () => RootState
) => {
	const userId = getState().auth.userDetails.user.userId
		? getState().auth.userDetails.user.userId
		: '';

	dispatch(
		apiCallBegan({
			method: 'post',
			url: `products/single`,
			data: { productid: id, userid: userId },
			onStart: productInitiated.type,
			onSuccess: productReceived.type,
			onError: productFailed.type,
		})
	);
};
