import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../api';
import { ProductsSlice, Product } from './../models/entities';
import { RootState } from '../models';
import { Dispatch } from 'redux';

interface FetchedProduct {
	productid: string;
	title: string;
	producttype: string;
	description: string;
	ldc: number;
	rating: number;
	image: string;
	wishlist: boolean;
	barternow: boolean;
}

const mapToViewModel = (data: FetchedProduct, userId: string): Product => {
	return {
		id: data.productid,
		name: data.title,
		category: data.producttype.toLowerCase(),
		desc: data.description,
		ldc: data.ldc,
		rating: data.rating,
		src: data.image,
		wishlist: data.wishlist,
		canBarter: userId ? data.barternow : true,
	};
};

const initialState: ProductsSlice = {
	list: [],
	limit: 5,
	page: 0,
	showButton: false,
	loading: false,
	loadingPage: false,
	category: '',
};

const slice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		limitChanged: (products, action: { type: string; payload: number }) => {
			products.limit = action.payload;
		},
		pageChanged: (products, action: { type: string; payload: number }) => {
			products.page = action.payload;
		},
		productsInitiated: products => {
			if (products.list.length === 0) products.loadingPage = true;
			else products.loading = true;

			products.showButton = false;
		},
		productsReceived: (
			products,
			action: {
				type: string;
				payload: {
					data: Array<any>;
					userId: string;
				};
			}
		) => {
			products.list = products.list.concat(
				action.payload.data.map(product =>
					mapToViewModel(product, action.payload.userId)
				)
			);

			if (action.payload.data.length < products.limit)
				products.showButton = false;
			else products.showButton = true;
		},
		buttonStatusChanged: (
			products,
			action: { type: string; payload: boolean }
		) => {
			products.showButton = action.payload;
		},
		loadingStatusChanged: (
			products,
			action: { type: string; payload: boolean }
		) => {
			products.loading = action.payload;
			products.loadingPage = action.payload;
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
} = slice.actions;

export const getProducts = () => async (
	dispatch: Dispatch,
	getState: () => RootState
) => {
	const userId = getState().auth.user.userId ? getState().auth.user.userId : '';
	let { list, page, limit, category } = getState().entities.products;

	const currPage = Math.ceil(list.length / limit) + 1;
	if (page !== currPage) await dispatch(pageChanged(currPage));

	await dispatch(
		apiCallBegan({
			method: 'post',
			url: `products/product/?page=${currPage}&limit=${limit}`,
			data: {
				userid: userId,
				categorytype: category,
			},
			onStart: productsInitiated.type,
			onSuccess: productsReceived.type,
		})
	);
	// setTimeout(() => dispatch(loadingStatusChanged(false)), 0);
	dispatch(loadingStatusChanged(false));
};

export const changeButtonStatus = (value: boolean) =>
	buttonStatusChanged(value);
