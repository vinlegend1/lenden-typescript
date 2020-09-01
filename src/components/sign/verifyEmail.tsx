import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { RootState } from '../../app/models';
import { verifyEmailAddress } from '../../app/auth/signup';
import GenericNav from '../common/genericNav';
import PageLoader from '../common/pageLoader';
import GenericIcons from '../../icons/generic';

export interface MatchParams {
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

	return loading ? (
		<PageLoader />
	) : (
		<React.Fragment>
			<GenericNav />
			<div className='container verifyEmailContainer'>
				<div className='emailBanner'>
					<GenericIcons name='email-banner' />
				</div>
				<p>{error ? error : success}</p>
				<div onClick={() => history.replace('/login')} className='darkButton'>
					Login
				</div>
			</div>
		</React.Fragment>
	);
};

export default VerifyEmail;
