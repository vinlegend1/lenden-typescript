export type PassType = 'password' | 'text';
export interface SignSlice {
	error: string;
	success: string;
	loading: boolean;
	// passType: PassType;
}

export interface UserSlice {
	userId: string;
	name: string;
	token: string;
	email: string;
	address?: {
		city: string;
		country: string;
		houseNumber: string;
		streetName: string;
		state: string;
		landmark?: string;
		postalCode: number;
		mobileNumber: number;
	};
}
