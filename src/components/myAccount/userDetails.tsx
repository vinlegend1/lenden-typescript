import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/models';
import { useHistory } from 'react-router-dom';

export interface UserDetailsProps {}

const UserDetails: React.FC<UserDetailsProps> = () => {
	const user = useSelector((state: RootState) => state.auth.user);
	const history = useHistory();

	return (
		<div className='container userInfoContainer'>
			<div className='infoBox'>
				<h3>Email</h3>
				<hr />
				<p>{user.email}</p>
			</div>
			<div className='infoBox'>
				<h3>Mobile Number</h3>
				<hr />
				<p>+91 - 8211270173</p>
				{/* TODO Fetch from token */}
			</div>
			<div className='infoBox'>
				<div>
					<h3>Password</h3>
					<h4 onClick={() => history.push('/my-account/change-password')}>
						CHANGE PASSWORD
					</h4>
				</div>
				<hr />
				<p>•••••••••••••••••••</p>
			</div>
			{user.address ? (
				<div className='infoBox'>
					<div>
						<h3>My Address</h3>
						<h4 onClick={() => history.push('/my-account/my-address')}>
							CHANGE ADDRESS
						</h4>
					</div>

					<hr />
					<p>{`${user.address.houseNumber},  ${user.address.streetName}, ${user.address.city}, ${user.address.state}, ${user.address.postalCode}`}</p>
					{/* TODO ADD THIS IN SELECTOR FUNCTION */}
				</div>
			) : (
				<div className='infoBox noAddress'>
					<div>
						<h3>My Address</h3>
						<h4 onClick={() => history.push('/my-account/my-address')}>
							ADD ADDRESS
						</h4>
					</div>
				</div>
			)}

			{/* <div className='changePassword'>CHANGE PASSWORD</div> */}
		</div>
	);
};

export default UserDetails;
