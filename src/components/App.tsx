import React, { useEffect } from 'react';
import Login from './sign/login';
import Signup from './sign/signup';
import { ToastContainer, Flip } from 'react-toastify';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser, getAddress } from '../app/auth/user';

import Home from './home';
import ProtectedRoute from './common/protectedRoute';
import MyAccount from './myAccount';
import EditProfile from './myAccount/editProfile';

const App: React.FC = () => {
	const dispatch = useDispatch();
	dispatch(getUser());

	useEffect(() => {
		dispatch(getAddress());
	}, [dispatch]);

	return (
		<React.Fragment>
			<ToastContainer
				transition={Flip}
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				className='toastContainer'
			/>
			<React.Fragment>
				<Switch>
					<Route path='/login' component={Login} />
					<Route path='/signup' component={Signup} />
					{/* <Route path='/not-found' component={NotFound} />
				<ProtectedRoute path='/new' exact component={NewProduct} />
				<Route path='/books' exact component={Products} />
				<Route path='/books/:id' component={ProductPage} />
				<Route path='/my-products' component={MyProducts} />*/}
					<ProtectedRoute path='/my-account/edit' component={EditProfile} />
					<ProtectedRoute path='/my-account' component={MyAccount} />
					<Route path='/' exact component={Home} />
					<Redirect from='/categories' exact to='/' />
					{/* <Redirect to='/not-found' /> */}
				</Switch>
			</React.Fragment>
		</React.Fragment>
	);
};

export default App;
