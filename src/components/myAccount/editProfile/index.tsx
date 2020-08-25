import React from 'react';
import EditProfileNav from './editProfileNav';
import EditGravatar from './editGravatar';

export interface EditProfileProps {}

const EditProfile: React.FC<EditProfileProps> = () => {
	return (
		<React.Fragment>
			<EditProfileNav /> <EditGravatar />
		</React.Fragment>
	);
};

export default EditProfile;
