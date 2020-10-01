import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { ActionWithPayload, RootState } from './../../../models/index';
import { apiCallBegan } from './../../../api';

export interface SingleProductPageSlice {
	id: string;
	title: string;
	description: string;
	ldc: number;
	rating: number;
	isWishlist: boolean;
	isDisabled: boolean;
	bindingType: string;
	inkStains: string;
	bookFoxed: string;
	bindingCondition: string;
	coverCondition: string;
	bookRepaired: number;

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
	mrp: string;
	binding_type: string;
	ink_stains: string;
	book_foxed: string;
	binding_condition: string;
	front_back_condition: string;
	number_of_time_book_repaired: number;
}

const mapToViewModel = (
	data: FetchedProduct,
	userId: string
): SingleProductPageSlice => {
	return {
		id: data.productid,
		title: data.title,
		description: data.description,
		ldc: data.ldc,
		rating: data.rating,
		isDisabled: userId ? !data.barternow : false,
		isWishlist: data.wishlist,
		bindingType: data.binding_type,
		inkStains: data.ink_stains,
		bookFoxed: data.book_foxed,
		bindingCondition: data.binding_condition,
		coverCondition: data.front_back_condition,
		bookRepaired: data.number_of_time_book_repaired,
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
		description: '',
		ldc: 0,
		rating: 0,
		isWishlist: false,
		isDisabled: false,
		bindingType: '',
		inkStains: '',
		bookFoxed: '',
		bindingCondition: '',
		coverCondition: '',
		bookRepaired: 0,
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

export const getBookProduct = (id: string) => async (
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
			data: { productid: id, userid: userId, producttype: 'books' },
			onStart: productInitiated.type,
			onSuccess: productReceived.type,
			onError: productFailed.type,
		})
	);
};

export const resetBookProduct = () => clearProduct();
