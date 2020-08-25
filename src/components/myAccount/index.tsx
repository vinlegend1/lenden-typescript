import React from 'react';
import MyAccountNav from './myAccountNav';
import SideNav from '../navbar/sideNav';
import ProfileBanner from './profileBanner';

export interface myAccountProps {}

const myAccount: React.FC<myAccountProps> = () => {
	return (
		<React.Fragment>
			<SideNav />
			<MyAccountNav />
			<ProfileBanner />
		</React.Fragment>
	);
};

export default myAccount;
