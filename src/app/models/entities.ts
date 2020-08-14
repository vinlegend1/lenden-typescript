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

export interface ProductsSlice {
	list: Array<Product>;
	page: number;
	limit: number;
	showButton: boolean;
	loading: boolean;
	loadingPage: boolean;
	category: 'books' | 'gaming' | 'mobile' | '';
}
