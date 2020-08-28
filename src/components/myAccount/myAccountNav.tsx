import React from 'react';
import { useDispatch } from 'react-redux';
import { action as toggleMenu } from 'redux-burger-menu';
import GenericIcons from '../../icons/generic';

export interface AccountNavProps {}

const AccountNav: React.FC<AccountNavProps> = () => {
	const dispatch = useDispatch();
	return (
		<div id='myAccountNav'>
			<div className='imgContainer' onClick={() => dispatch(toggleMenu(true))}>
				<GenericIcons className='icon' name='menu' />
			</div>
			<h1>My Account</h1>
		</div>
	);
};

export default AccountNav;
