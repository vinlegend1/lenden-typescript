import * as React from 'react';
import SubNav from '../../common/subNav';
import { Switch, Route, Redirect } from 'react-router-dom';
import BookPage1 from './bookPage1';
import BookPage2 from './bookPage2';
import { useDispatch } from 'react-redux';
import { clearBookForm } from '../../../app/entities/postProduct/bookForm';

export interface NewBookProps {}

const NewBook: React.FC<NewBookProps> = () => {
	const dispatch = useDispatch();

	React.useEffect(() => {
		return () => {
			dispatch(clearBookForm());
		};
	}, []);
	return (
		<React.Fragment>
			<SubNav title='Post your product' />
			<Switch>
				<Route exact path='/post-product/book/1' component={BookPage1} />
				<Route exact path='/post-product/book/2' component={BookPage2} />
				<Redirect to='/not-found' />
			</Switch>
		</React.Fragment>
	);
};

export default NewBook;
