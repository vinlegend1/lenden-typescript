import React, { useState } from 'react';
import EditProfileNav from './editProfileNav';
import EditGravatar from './editGravatar';
import EditDetails from './editDetails';
import { RouteComponentProps } from 'react-router-dom';

export interface EditProfileProps extends RouteComponentProps {}

const EditProfile: React.FC<EditProfileProps> = () => {
	const [gravatar, setGravatar] = useState('3');
	//TODO Get Gravatar from auth.users

	// const onGravatarChange = (gravatar: string) => {
	// 	setGravatar(gravatar);
	// };

	const onDetailsChange = (data: any) => {
		console.log(data, gravatar);
		//API CALL - To be managed by redux
	};

	return (
		<React.Fragment>
			<EditProfileNav />
			<EditGravatar gravatar={gravatar} handleGravatarChange={setGravatar} />
			<EditDetails handleDetailsChange={onDetailsChange} />
		</React.Fragment>
	);
};

export default EditProfile;
