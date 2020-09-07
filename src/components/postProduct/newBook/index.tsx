import * as React from 'react';
import SubNav from '../../common/subNav';
import { Switch, Route } from 'react-router-dom';
import BookPage1 from './bookPage1';
import BookPage2 from './bookPage2';

export interface NewBookProps {}

const NewBook: React.FC<NewBookProps> = () => {
	React.useEffect(() => {
		return () => {
			console.log('heh');
			// dispatch cleanup request
		};
	}, []);
	return (
		<React.Fragment>
			<SubNav title='Post your product' />
			<Switch>
				<Route exact path='/post-product/book/1' component={BookPage1} />
				<Route exact path='/post-product/book/2' component={BookPage2} />
			</Switch>
		</React.Fragment>
	);
};

export default NewBook;
