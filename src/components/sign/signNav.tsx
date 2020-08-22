import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

export interface SignNavProps {}

const SignNav: React.FC<SignNavProps> = () => {
	return (
		<div id='signNav'>
			<LinkContainer to='/'>
				<img src='/icons/navLogo.svg' alt='' />
			</LinkContainer>
		</div>
	);
};

export default SignNav;
