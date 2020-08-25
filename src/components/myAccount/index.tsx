import React from 'react';
import MyAccountNav from './myAccountNav';
import SideNav from '../navbar/sideNav';
import ProfileBanner from './profileBanner';
import UserDetails from './userDetails';

export interface myAccountProps {}

const myAccount: React.FC<myAccountProps> = () => {
	return (
		<React.Fragment>
			<SideNav />
			<MyAccountNav />
			<ProfileBanner />
			<UserDetails />
		</React.Fragment>
	);
};

export default myAccount;
