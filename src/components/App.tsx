import React, { useEffect } from 'react';
// import Login from './sign/login';
// import Signup from './sign/signup';
import { ToastContainer, Flip, Slide } from 'react-toastify';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser, getUserInfo } from '../app/auth/userDetails';
import Home from './home';
import PageLoader from './common/pageLoader';
import Navbar from './navbar';
// import ProtectedRoute from './common/protectedRoute';
// import MyAccount from './myAccount';
// import EditProfile from './myAccount/editProfile';
// import changeAddress from './myAccount/changeAddress';
// import changePassword from './myAccount/changePassword/index';
// import VerifyEmail from './sign/verifyEmail';
// import NotFound from './common/notFound';
// import ForgotPassword from './sign/forgotPassword';
// import ResetPassword from './sign/resetPassword';
// import UserProtectedRoute from './common/userProtectedRoute';
// import PostProduct from './postProduct';
// import NewBook from './postProduct/newBook';
// import NewGamingCd from './postProduct/newGamingCd/index';
// import NewGamingConsole from './postProduct/newGamingConsole';
// import NewMobile from './postProduct/newMobile';
// import DonateBook from './postProduct/donateBook/index';
// import CategoryWiseProducts from './categoryWiseProducts';
// import SingleMobileProductPage from './productPage/mobile/singleProductPage';

const Login = React.lazy(() => import('./sign/login'));
const Signup = React.lazy(() => import('./sign/signup'));
const ProtectedRoute = React.lazy(() => import('./common/protectedRoute'));
const MyAccount = React.lazy(() => import('./myAccount'));
const EditProfile = React.lazy(() => import('./myAccount/editProfile'));
const changeAddress = React.lazy(() => import('./myAccount/changeAddress'));
const changePassword = React.lazy(() =>
	import('./myAccount/changePassword/index')
);
const VerifyEmail = React.lazy(() => import('./sign/verifyEmail'));
const NotFound = React.lazy(() => import('./common/notFound'));
const ForgotPassword = React.lazy(() => import('./sign/forgotPassword'));
const ResetPassword = React.lazy(() => import('./sign/resetPassword'));
const UserProtectedRoute = React.lazy(() =>
	import('./common/userProtectedRoute')
);
const PostProduct = React.lazy(() => import('./postProduct'));
const NewBook = React.lazy(() => import('./postProduct/newBook'));
const NewGamingCd = React.lazy(() => import('./postProduct/newGamingCd/index'));
const NewGamingConsole = React.lazy(() =>
	import('./postProduct/newGamingConsole')
);
const NewMobile = React.lazy(() => import('./postProduct/newMobile'));
const DonateBook = React.lazy(() => import('./postProduct/donateBook/index'));
const CategoryWiseProducts = React.lazy(() => import('./categoryWiseProducts'));
const SingleMobileProductPage = React.lazy(() =>
	import('./productPage/mobile/singleProductPage')
);

const App: React.FC = () => {
	const dispatch = useDispatch();
	dispatch(getUser());

	useEffect(() => {
		dispatch(getUserInfo());
		// dispatch(getAddress());
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
				<React.Suspense
					fallback={
						<React.Fragment>
							<Navbar />
							<PageLoader />
						</React.Fragment>
					}>
					<Switch>
						<UserProtectedRoute path='/login' component={Login} />
						<UserProtectedRoute path='/signup' component={Signup} />
						<UserProtectedRoute
							path='/user/verify/:token'
							component={VerifyEmail}
						/>
						<UserProtectedRoute
							path='/user/forgot-password'
							component={ForgotPassword}
						/>
						<UserProtectedRoute
							path='/user/reset-password/:token'
							component={ResetPassword}
						/>

						<Route path='/not-found' component={NotFound} />

						{/*<ProtectedRoute path='/new' exact component={NewProduct} />
				<Route path='/books' exact component={Products} />
				<Route path='/books/:id' component={ProductPage} />
				<Route path='/my-products' component={MyProducts} />*/}

						<Redirect
							exact
							from='/post-product/book'
							to='/post-product/book/1'
						/>
						<ProtectedRoute path='/post-product/book' component={NewBook} />
						<ProtectedRoute
							path='/post-product/gaming-cd'
							component={NewGamingCd}
						/>
						<ProtectedRoute
							path='/post-product/gaming-console'
							component={NewGamingConsole}
						/>
						<Redirect
							exact
							from='/post-product/mobile'
							to='/post-product/mobile/1'
						/>
						<ProtectedRoute path='/post-product/mobile' component={NewMobile} />
						<ProtectedRoute path='/post-product' component={PostProduct} />
						<ProtectedRoute path='/donate-a-book' component={DonateBook} />

						<Route
							path='/products/mobiles/single/:id'
							component={SingleMobileProductPage}
						/>

						<Route path='/products/books' component={CategoryWiseProducts} />
						<Route path='/products/mobiles' component={CategoryWiseProducts} />
						<Route
							path='/products/gaming-cd'
							component={CategoryWiseProducts}
						/>
						<Route
							path='/products/gaming-consoles'
							component={CategoryWiseProducts}
						/>

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
				</React.Suspense>
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
