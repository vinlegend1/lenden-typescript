import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps, useHistory, Redirect } from 'react-router-dom';
import { RootState } from '../../app/models';
import { verifyEmailAddress, verifyEmailErrors } from '../../app/auth/signup';
import GenericNav from '../common/genericNav';
import PageLoader from '../common/pageLoader';
import GenericIcons from '../../icons/generic';

interface MatchParams {
	token: string;
}

export interface VerifyEmailProps extends RouteComponentProps<MatchParams> {}

const VerifyEmail: React.FC<VerifyEmailProps> = props => {
	const history = useHistory();
	const dispatch = useDispatch();

	const loading = useSelector((state: RootState) => state.auth.signup.loading);
	const error = useSelector((state: RootState) => state.auth.signup.error);
	const success = useSelector((state: RootState) => state.auth.signup.success);

	useEffect(() => {
		const token = props.match.params.token;
		dispatch(verifyEmailAddress(token));
	}, []);

	if (loading) return <PageLoader />;
	else {
		if (error === verifyEmailErrors.linkInvalid)
			return <Redirect to='/not-found' />;
		else if (
			error === verifyEmailErrors.linkExpired ||
			error === verifyEmailErrors.emailAlreadyVerified
		)
			return (
				<React.Fragment>
					<GenericNav />
					<div className='container tokenExpired'>
						<div className='iconContainer'>
							<GenericIcons name='expired' />
						</div>
						<p>{error}</p>
						<div
							onClick={() => history.replace('/login')}
							className='darkButton'>
							Login Page
						</div>
					</div>
				</React.Fragment>
			);
		else
			return (
				<React.Fragment>
					<GenericNav />
					<div className='container verifyEmailContainer'>
						<div className='emailBanner'>
							<GenericIcons name='email-banner' />
						</div>
						<p>{success}</p>
						<div
							onClick={() => history.replace('/login')}
							className='darkButton'>
							Login
						</div>
					</div>
				</React.Fragment>
			);
	}
};

export default VerifyEmail;
