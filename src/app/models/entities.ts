export interface Product {
	id: string;
	name: string;
	category: string;
	desc: string;
	ldc: number;
	rating: number;
	src: string;
	wishlist: boolean;
	canBarter: boolean;
}

type Category = 'books' | 'gaming' | 'mobile' | '';

export interface BaseFetchedProduct {
	productid: string;
	title: string;
	producttype: Category;
	description: string;
	ldc: number;
	rating: number;
	wishlist: boolean;
	barternow: boolean;
}

export interface FetchedProduct extends BaseFetchedProduct {
	image: string;
}

export interface FetchedProductPage extends BaseFetchedProduct {
	images: { image: string }[];
}

export interface ProductsSlice {
	list: Array<Product>;
	page: number;
	limit: number;
	showButton: boolean;
	loading: boolean;
	loadingPage: boolean;
	category: Category;
}

export interface ProductPageSlice {
	loadingPage: boolean;
	productFound: boolean;
	product: {
		id: string;
		name: string;
		category: Category;
		src: string[];
		rating: number;
		ldc: number;
		wishlist: boolean;
		desc: string;
		canBarter: boolean;
	};
}
