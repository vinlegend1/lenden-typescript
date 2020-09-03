import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { apiCallBegan } from '../api';
import { ProductPageSlice, FetchedProductPage } from './../models/entities';
import { ActionWithPayload, RootState } from '../models';

const mapToViewModel = (data: FetchedProductPage, userId: string) => {
	const images = data.images.map(img => img.image);

	return {
		id: data.productid,
		name: data.title,
		category: data.producttype,
		src: images,
		rating: data.rating,
		ldc: data.ldc,
		desc: data.description,
		wishlist: data.wishlist,
		canBarter: userId ? data.barternow : true,
	};
};

const initialState: ProductPageSlice = {
	loadingPage: true,
	productFound: true,
	product: {
		id: '',
		name: '',
		category: '',
		src: [],
		rating: 0,
		ldc: 0,
		wishlist: true,
		desc: '',
		canBarter: true,
	},
};

const slice = createSlice({
	name: 'productPage',
	initialState,

	reducers: {
		productInitiated: state => {
			state.loadingPage = true;
		},
		productReceived: (
			state,
			action: ActionWithPayload<{
				data: FetchedProductPage;
				userId: string;
			}>
		) => {
			state.product = mapToViewModel(
				action.payload.data,
				action.payload.userId
			);
			state.productFound = true;
			state.loadingPage = false;
		},
		productFailed: state => {
			state.productFound = false;
			state.loadingPage = false;
		},
		loadingPageChanged: (state, action: ActionWithPayload<boolean>) => {
			state.loadingPage = action.payload;
		},
	},
});

export default slice.reducer;

const {
	productReceived,
	productInitiated,
	productFailed,
	loadingPageChanged,
} = slice.actions;

export const setLoadingPage = (status: boolean) => loadingPageChanged(status);
export const getProduct = (id: string) => (
	dispatch: Dispatch,
	getState: () => RootState
) => {
	const userId = getState().auth.userDetails.user.userId
		? getState().auth.userDetails.user.userId
		: '';
	const { id: idInState } = getState().entities.productPage.product;
	if (idInState === id) return dispatch(setLoadingPage(false));

	dispatch(
		apiCallBegan({
			method: 'post',
			url: `products/product/${id}`,
			data: {
				userid: userId,
			},
			onStart: productInitiated.type,
			onSuccess: productReceived.type,
			onError: productFailed.type,
		})
	);
};
