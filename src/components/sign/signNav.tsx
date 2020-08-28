import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import LendenIcons from '../../icons/lenden';

export interface SignNavProps {}

const SignNav: React.FC<SignNavProps> = () => {
	return (
		<div id='signNav'>
			<LinkContainer to='/'>
				<LendenIcons name='nav-logo' />
			</LinkContainer>
		</div>
	);
};

export default SignNav;
