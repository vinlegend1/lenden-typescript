import * as React from 'react';
import SubNav from '../../common/subNav';
import { Switch, Route, Redirect } from 'react-router-dom';
// import BookPage1 from './bookPage1';
import MobilePage1 from './mobilePage1';
import MobilePage2 from './mobilePage2';

// import BookPage2 from './bookPage2';
import { useDispatch } from 'react-redux';
import { clearMobileForm } from '../../../app/entities/postProduct/mobileForm';

export interface NewMobileProps {}

const NewMobile: React.FC<NewMobileProps> = () => {
	const dispatch = useDispatch();

	React.useEffect(() => {
		return () => {
			dispatch(clearMobileForm());
		};
	}, []);
	return (
		<React.Fragment>
			<SubNav title='Post your product' />
			<Switch>
				<Route exact path='/post-product/mobile/1' component={MobilePage1} />
				<Route exact path='/post-product/mobile/2' component={MobilePage2} />
				<Redirect to='/not-found' />
			</Switch>
		</React.Fragment>
	);
};

export default NewMobile;
