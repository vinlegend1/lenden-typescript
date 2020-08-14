import { UserSlice, SignSlice } from './auth';

export default interface RootState {
	auth: {
		user: UserSlice;
		signup: SignSlice;
		login: SignSlice;
	};
}
