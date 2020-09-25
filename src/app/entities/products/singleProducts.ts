import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../../api';
import { RootState, ActionWithPayload } from '../../models';
import { Dispatch } from 'redux';

interface FetchedProduct {
	productid: string;
	title: string;
	producttype: string;
	description: string;
	ldc: number;
	rating: number;
	wishlist: boolean;
	barternow: boolean;
	image: string;
}

const mapToViewModel = (
	data: FetchedProduct,
	userId: string
): SingleProductSlice => {
	return {
		id: data.productid,
		title: data.title,
		category: data.producttype.toLowerCase(),
		description: data.description,
		ldc: data.ldc,
		rating: data.rating,
		// src: data.image,
		isWishlist: data.wishlist,
		isDisabled: userId ? !data.barternow : false,
	};
};

export interface SingleProductSlice {
	id: string;
	title: string;
	category: string;
	description: string;
	ldc: number;
	// src: string;
	rating: number;
	isWishlist: boolean;
	isDisabled: boolean;
}

interface InitialState {
	list: Array<SingleProductSlice>;
	page: number;
	limit: number;
	showButton: boolean;
	loading: boolean;
	loadingPage: boolean;
	productsReceived: boolean;
	// category: string;
}

const initialState: InitialState = {
	list: [],
	limit: 5,
	page: 0,
	showButton: false,
	loading: false,
	loadingPage: false,
	productsReceived: false,
	// category: '',
};

const slice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		limitChanged: (products, action: ActionWithPayload<number>) => {
			products.limit = action.payload;
		},
		pageChanged: (products, action: ActionWithPayload<number>) => {
			products.page = action.payload;
		},
		productsInitiated: products => {
			if (products.list.length === 0) products.loadingPage = true;
			else products.loading = true;

			products.showButton = false;
		},
		productsReceived: (
			products,
			action: ActionWithPayload<{
				data: Array<FetchedProduct>;
				userId: string;
			}>
		) => {
			products.list = products.list.concat(
				action.payload.data.map(product =>
					mapToViewModel(product, action.payload.userId)
				)
			);

			if (action.payload.data.length < products.limit)
				products.showButton = false;
			else products.showButton = true;
			products.productsReceived = true;
		},
		buttonStatusChanged: (products, action: ActionWithPayload<boolean>) => {
			products.showButton = action.payload;
		},
		loadingStatusChanged: (products, action: ActionWithPayload<boolean>) => {
			products.loading = action.payload;
			products.loadingPage = action.payload;
		},
		listReset: products => {
			products.page = 0;
			products.list = [];
			products.productsReceived = false;
			products.showButton = false;
			products.loading = false;
			products.loadingPage = false;
		},
	},
});

export default slice.reducer;

const {
	productsReceived,
	productsInitiated,
	pageChanged,
	buttonStatusChanged,
	loadingStatusChanged,
	listReset,
} = slice.actions;

const returnRequestData = (userId: string, category?: string) => {
	let type: string;
	switch (category) {
		case 'books':
			type = 'books';
			break;
		case 'mobiles':
			type = 'mobile_phone';
			break;
		case 'gaming-consoles':
			type = 'gaming_console';
			break;
		case 'gaming-cd':
			type = 'gaming_cd';
			break;
		default:
			type = '';
	}

	return {
		userid: userId,
		producttype: type,
	};
};

export const getProducts = (category?: string) => async (
	dispatch: Dispatch,
	getState: () => RootState
) => {
	const userId = getState().auth.userDetails.user.userId
		? getState().auth.userDetails.user.userId
		: '';
	let { list, page, limit } = getState().entities.products.singleProducts;

	const currPage = Math.ceil(list.length / limit) + 1;
	if (page !== currPage) await dispatch(pageChanged(currPage));

	const data = returnRequestData(userId, category);

	await dispatch(
		apiCallBegan({
			method: 'post',
			url: `products/singlelist?page=${currPage}&limit=${limit}`,
			data,
			onStart: productsInitiated.type,
			onSuccess: productsReceived.type,
		})
	);
	dispatch(loadingStatusChanged(false));
};

export const changeButtonStatus = (value: boolean) =>
	buttonStatusChanged(value);

export const resetProductList = () => listReset();
