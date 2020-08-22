import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

export interface SignNavProps {}

const SignNav: React.FC<SignNavProps> = () => {
	return (
		<div
			style={{
				height: '3.5rem',
				backgroundColor: '#1a2639',
				display: 'flex',
				alignItems: 'center',
				boxShadow: '0px 2px 4px rgba(26, 38, 57, 0.25)',
			}}>
			<LinkContainer to='/' style={{ margin: 'auto 1.5rem' }}>
				<img src='/icons/navLogo.svg' style={{ width: '2.5rem' }} alt='' />
			</LinkContainer>
		</div>
	);
};

export default SignNav;
