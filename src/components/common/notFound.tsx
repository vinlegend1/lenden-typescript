import React from 'react';
import GenericIcons from '../../icons/generic';
import GenericNav from './genericNav';
import { useHistory } from 'react-router-dom';

export interface NotFoundProps {}

const NotFound: React.FC<NotFoundProps> = () => {
	const history = useHistory();

	return (
		<React.Fragment>
			<GenericNav />
			<div className='notFoundContainer'>
				<div className='notFoundInnerContainer'>
					<GenericIcons name='not-found' />
					<p>We can't seem to find the page you are looking for.</p>
					<div onClick={() => history.goBack()} className='darkButton'>
						Go back
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default NotFound;
