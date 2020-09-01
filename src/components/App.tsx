import React, { useEffect } from 'react';
import Login from './sign/login';
import Signup from './sign/signup';
import { ToastContainer, Flip, Slide } from 'react-toastify';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser, getAddress } from '../app/auth/user';

import Home from './home';
import ProtectedRoute from './common/protectedRoute';
import MyAccount from './myAccount';
import EditProfile from './myAccount/editProfile';
import changeAddress from './myAccount/changeAddress';
import changePassword from './myAccount/changePassword/index';
import VerifyEmail from './sign/verifyEmail';
import NotFound from './common/notFound';
import ForgotPassword from './sign/forgotPassword';

const App: React.FC = () => {
	const dispatch = useDispatch();
	dispatch(getUser());

	useEffect(() => {
		dispatch(getAddress());
	}, [dispatch]);

	return (
		<React.Fragment>
			<ToastContainer
				enableMultiContainer
				containerId={'errorToastContainer'}
				transition={Flip}
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				className='errorToastContainer'
			/>
			<React.Fragment>
				<Switch>
					<Route path='/login' component={Login} />
					<Route path='/signup' component={Signup} />

					<Route path='/user/verify/:token' component={VerifyEmail} />
					<Route path='/user/forgot-password' component={ForgotPassword} />

					<Route path='/not-found' component={NotFound} />

					{/*<ProtectedRoute path='/new' exact component={NewProduct} />
				<Route path='/books' exact component={Products} />
				<Route path='/books/:id' component={ProductPage} />
				<Route path='/my-products' component={MyProducts} />*/}

					<ProtectedRoute path='/my-account/edit' component={EditProfile} />
					<ProtectedRoute
						path='/my-account/change-password'
						component={changePassword}
					/>
					<ProtectedRoute
						path='/my-account/my-address'
						component={changeAddress}
					/>
					<ProtectedRoute path='/my-account' component={MyAccount} />

					<Route path='/' exact component={Home} />

					<Redirect from='/categories' exact to='/' />
					<Redirect to='/not-found' />
				</Switch>
			</React.Fragment>
			<ToastContainer
				enableMultiContainer
				position='bottom-center'
				containerId={'messageToastContainer'}
				transition={Slide}
				autoClose={3000}
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable={false}
				pauseOnHover
				closeButton={false}
				className='messageToastContainer'
			/>
		</React.Fragment>
	);
};

export default App;
