export type PassType = 'password' | 'text';
export interface SignSlice {
	error: string;
	success: string;
	loading: boolean;
	loadingPage?: boolean;
	modalLoading?: boolean;
}

export interface UserSlice {
	userId: string;
	name: string;
	token: string;
	email: string;
	mobileNumber: string;
	gravatarId: string;
	address?: {
		city: string;
		country: string;
		houseNumber: string;
		streetName: string;
		state: string;
		landmark?: string;
		postalCode: string;
		// mobileNumber: number;
	};
}
