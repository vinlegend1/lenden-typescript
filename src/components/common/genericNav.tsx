import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import LendenIcons from '../../icons/lenden';

export interface GenericNavProps {}

const GenericNav: React.FC<GenericNavProps> = () => {
	return (
		<div id='genericNav'>
			<LinkContainer to='/'>
				<LendenIcons name='nav-logo' />
			</LinkContainer>
		</div>
	);
};

export default GenericNav;
