import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../app/models';
import { verifyEmailAddress } from './../../app/auth/signup';
import GenericNav from '../common/genericNav';
import PageLoader from '../common/pageLoader';

export interface MatchParams {
	token: string;
}

export interface VerifyEmailProps extends RouteComponentProps<MatchParams> {}

const VerifyEmail: React.FC<VerifyEmailProps> = props => {
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
			<div className='container'>
				<h1>{loading}</h1>
				<h1>{error}</h1>
				<h1>{success}</h1>
			</div>
		</React.Fragment>
	);
};

export default VerifyEmail;
