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
	deviceCompatible: string;
	originalCase: string;
	scratches: string;
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
	devicename: string;
	originalcase: string;
	anyscratches: string;
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
		deviceCompatible: data.devicename,
		originalCase: data.originalcase,
		scratches: data.anyscratches,
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
		deviceCompatible: '',
		originalCase: '',
		scratches: '',
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

export const getGamingCdProduct = (id: string) => async (
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
			data: { productid: id, userid: userId, producttype: 'gaming_cd' },
			onStart: productInitiated.type,
			onSuccess: productReceived.type,
			onError: productFailed.type,
		})
	);
};

export const resetGamingCdProduct = () => clearProduct();
