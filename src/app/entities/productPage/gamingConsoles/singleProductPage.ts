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
	functionalIssues: string;
	accessories: string;
	consoleAge: string;
	ldc: number;
	rating: number;
	isWishlist: boolean;
	isDisabled: boolean;
	condition: string;
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
	functionalissue: string;
	accessories: string;
	age: string;
	overallcondition: string;
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
		consoleAge: data.age,
		workingCondition:
			data.workingcondition === 'Yes' ? 'Working' : 'Not Working',
		functionalIssues: data.functionalissue,
		accessories: data.accessories,
		isDisabled: userId ? !data.barternow : false,
		isWishlist: data.wishlist,
		condition: data.overallcondition,
	};
};

interface InitialState {
	loading: boolean;
	product: SingleProductPageSlice;
	productFound: boolean;
}

const initialState: InitialState = {
	loading: true,
	product: {
		id: '',
		title: '',
		brand: '',
		model: '',
		description: '',
		workingCondition: '',
		functionalIssues: '',
		accessories: '',
		consoleAge: '',
		condition: '',
		ldc: 0,
		rating: 0,
		isWishlist: false,
		isDisabled: false,
	},
	productFound: false,
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
			state.productFound = true;
		},
		productFailed: state => {
			state.loading = false;
			state.productFound = false;
		},
		clearProduct: state => {
			state.loading = true;
			state.productFound = false;
			state.product = { ...initialState.product };
		},
	},
});

const {
	productFailed,
	productInitiated,
	productReceived,
	clearProduct,
} = slice.actions;

export default slice.reducer;

export const getGamingConsoleProduct = (id: string) => async (
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
			data: { productid: id, userid: userId, producttype: 'gaming_console' },
			onStart: productInitiated.type,
			onSuccess: productReceived.type,
			onError: productFailed.type,
		})
	);
};

export const resetGamingConsoleProduct = () => clearProduct();
