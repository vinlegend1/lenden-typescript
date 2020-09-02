import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCurrentUser } from './../../services/authService';

interface UserProtectedRouteProps {
	component?: React.ReactType;
	render?: () => React.ReactType;
	path?: string;
	exact?: true;
}

// Protects routes when user is signed in.

const UserProtectedRoute: React.FC<UserProtectedRouteProps> = ({
	component: Component,
	render,
	...rest
}) => {
	return (
		<Route
			{...rest}
			render={props => {
				if (getCurrentUser()) return <Redirect to='/' />;
				if (Component) return <Component {...props} />;
				else if (render) return render();
			}}
		/>
	);
};

export default UserProtectedRoute;
