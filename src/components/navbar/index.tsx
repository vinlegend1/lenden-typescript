import * as React from 'react';
import SideNavbar from './sideNav';
import MainNavbar from './mainNav';

export interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
	return (
		<React.Fragment>
			<SideNavbar />
			<MainNavbar />
		</React.Fragment>
	);
};

export default Navbar;
