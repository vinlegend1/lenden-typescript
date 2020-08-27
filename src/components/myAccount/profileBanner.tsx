import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/models';
import { useHistory } from 'react-router-dom';
import { gravatarIcons } from '../../icons';

export interface ProfileBannerProps {}

const ProfileBanner: React.FC<ProfileBannerProps> = () => {
	const user = useSelector((state: RootState) => state.auth.user);
	const history = useHistory();

	return (
		<div className='profileBanner'>
			<div className='userDetail'>
				<div className='imageContainer'>
					<img src={gravatarIcons.type0} alt='' />
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
