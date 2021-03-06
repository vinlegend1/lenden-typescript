import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/models';
import { useHistory } from 'react-router-dom';
import GravatarIcons from '../../icons/gravatar';

export interface ProfileBannerProps {}

const ProfileBanner: React.FC<ProfileBannerProps> = () => {
	const user = useSelector((state: RootState) => state.auth.userDetails.user);
	const history = useHistory();

	return (
		<div className='profileBanner'>
			<div className='userDetail'>
				<div className='imageContainer'>
					<GravatarIcons name={user.gravatarId} />
				</div>
				<h1>{user.name}</h1>
			</div>
			<div
				onClick={() => history.push('/my-account/edit')}
				className='editProfile'>
				Edit Profile
			</div>
		</div>
	);
};

export default ProfileBanner;
