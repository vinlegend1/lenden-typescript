import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { apiCallBegan } from '../api';
import { NewProductSlice, Category } from './../models/entities';
import { ActionWithPayload, RootState } from '../models';

interface BookForm {
	mrp: number;
	title: string;
	description: string;
	cover: string;
	ques1: string;
	ques2: string;
	ques3: string;
	ques4: string;
	ques5: string;
}

const mapToViewModel = (
	data: BookForm,
	product: { id: string; imageLinks: string[] }
) => ({
	mrp: data.mrp,
	title: data.title,
	binding: data.cover,
	description: data.description,
	conditionquestion1: data.ques1,
	conditionquestion2: data.ques2,
	conditionquestion3: data.ques3,
	conditionquestion4: data.ques4,
	conditionquestion5: data.ques5,
	productid: product.id,
	productimageentity: product.imageLinks.map(name => ({ imagelink: name })),
});

const initialState: NewProductSlice = {
	error: '',
	success: '',
	loading: false,
	preparing: false,
	category: '',
};

const slice = createSlice({
	name: 'newProduct',
	initialState,
	reducers: {
		categoryUpdated: (state, action: ActionWithPayload<Category>) => {
			state.category = action.payload;
		},
		errorUpdated: (state, action: ActionWithPayload<string>) => {
			state.error = action.payload;
		},
		successUpdated: (state, action: ActionWithPayload<string>) => {
			state.success = action.payload;
		},
		preparingUpdated: (state, action: ActionWithPayload<boolean>) => {
			state.preparing = action.payload;
		},

		uploadInitiated: state => {
			state.loading = true;
			delete state.product;
		},
		uploadSuccess: (
			state,
			action: ActionWithPayload<{
				data: {
					productid: string;
					imagelinks: string[];
				};
			}>
		) => {
			const { productid, imagelinks } = action.payload.data;
			state.loading = false;
			state.product!.id = productid;
			state.product!.imageLinks = imagelinks;
		},
		uploadFailed: (state, action: ActionWithPayload<string>) => {
			state.loading = false;
			state.error = action.payload;
		},

		postInitiated: state => {
			state.loading = true;
		},

		postSuccess: state => {
			state.success = 'Successfully posted your product!';
			state.loading = false;
		},
		postFailed: (state, action: ActionWithPayload<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export default slice.reducer;

const {
	categoryUpdated,
	errorUpdated,
	preparingUpdated,
	uploadFailed,
	uploadInitiated,
	uploadSuccess,
	postInitiated,
	postSuccess,
	postFailed,
} = slice.actions;

export const updateError = (error: string) => errorUpdated(error);
export const updateCategory = (category: Category) => categoryUpdated(category);
export const prepareUpload = (value: boolean) => preparingUpdated(value);

const uploadImages = (images: File[]) => {
	const formData = new FormData();
	images.forEach(image => formData.append('image', image));

	return apiCallBegan({
		method: 'post',
		url: 'products/upload/image',
		data: formData,
		onStart: uploadInitiated.type,
		onSuccess: uploadSuccess.type,
		onError: uploadFailed.type,
	});
};

export const postBook = (data: BookForm, images: File[]) => async (
	dispatch: Dispatch,
	getState: () => RootState
) => {
	await dispatch(uploadImages(images));
	const userId = getState().auth.user.userId;
	const product = getState().entities.newProduct.product;

	if (product) {
		const body = mapToViewModel(data, product);
		await dispatch(
			apiCallBegan({
				method: 'post',
				url: `products/book/${userId}`,
				data: body,
				onStart: postInitiated.type,
				onSuccess: postSuccess.type,
				onError: postFailed.type,
			})
		);
	}

	if (getState().entities.newProduct.success)
		setTimeout(() => {
			window.location.replace('/my-products');
		}, 2000);
};
