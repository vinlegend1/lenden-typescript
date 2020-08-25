import React from 'react';
import { useHistory } from 'react-router-dom';

export interface EditProfileNavProps {}

const EditProfileNav: React.FC<EditProfileNavProps> = () => {
	const history = useHistory();
	return (
		<div id='editProfileNav'>
			<div className='imgContainer' onClick={() => history.push('/my-account')}>
				<img className='icon' src='/icons/back2.svg' alt='' />
			</div>
			<h1>Edit Profile</h1>
		</div>
	);
};

export default EditProfileNav;
