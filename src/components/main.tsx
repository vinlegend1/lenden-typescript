import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
// import ProtectedRoute from './common/protectedRoute';
import NavBar from './navbar';
// import NotFound from './common/notFound';
// import NewProduct from './newProduct/newProduct';
// import Products from './products/products';
// import ProductPage from './productPage/productPage';
import Home from './home';
// import MyProducts from './myProducts/myProducts';
// import Me from './myAccount/me';

const Main: React.FC = () => {
	return (
		<React.Fragment>
			<NavBar />
			<Switch>
				{/* <Route path='/not-found' component={NotFound} />
				<ProtectedRoute path='/new' exact component={NewProduct} />
				<Route path='/books' exact component={Products} />
				<Route path='/books/:id' component={ProductPage} />
				<Route path='/my-products' component={MyProducts} />
				<ProtectedRoute path='/me' component={Me} /> */}
				<Route path='/' exact component={Home} />
				<Redirect from='/categories' exact to='/' />
				{/* <Redirect to='/not-found' /> */}
			</Switch>
		</React.Fragment>
	);
};

export default Main;
