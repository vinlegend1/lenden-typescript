export type PassType = 'password' | 'text';
export interface SignSlice {
	error: string;
	success: string;
	loading: boolean;
	loadingPage?: boolean;
	modalLoading?: boolean;
}

export interface UserAddress {
	city: string;
	country: string;
	houseNumber: string;
	area: string;
	state: string;
	landmark?: string;
	postalCode: string;
}
export interface UserDetails {
	userId: string;
	name: string;
	token: string;
	email: string;
	mobileNumber: string;
	gravatarId: string;
	address?: UserAddress;
}
export interface UserSlice {
	user: UserDetails;
	error: string;
	success: string;
	loading: boolean;
}
