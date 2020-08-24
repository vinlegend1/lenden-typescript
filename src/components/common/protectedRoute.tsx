import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCurrentUser } from './../../services/authService';

interface ProtectedRouteProps {
	component?: React.ReactType;
	render?: () => React.ReactType;
	path?: string;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	component: Component,
	render,
	...rest
}) => {
	return (
		<Route
			{...rest}
			render={props => {
				if (!getCurrentUser())
					return (
						<Redirect
							to={{
								pathname: '/login',
								state: { from: props.location },
							}}
						/>
					);
				if (Component) return <Component {...props} />;
				else if (render) return render();
			}}
		/>
	);
};

export default ProtectedRoute;
