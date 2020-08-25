import React from 'react';
import { useDispatch } from 'react-redux';
import { action as toggleMenu } from 'redux-burger-menu';

export interface AccountNavProps {}

const AccountNav: React.SFC<AccountNavProps> = () => {
	const dispatch = useDispatch();
	return (
		<div id='myAccountNav'>
			<div className='imgContainer' onClick={() => dispatch(toggleMenu(true))}>
				<img className='icon' src='/icons/menu.svg' alt='' />
			</div>
			<h1>My Account</h1>
		</div>
	);
};

export default AccountNav;
