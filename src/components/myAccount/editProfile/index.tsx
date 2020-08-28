import React, { useState } from 'react';
import SubNav from '../../common/subNav';
import EditGravatar from './editGravatar';
import EditDetails from './editDetails';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import ToastMessage from '../../common/toastMessage';
import { toast } from 'react-toastify';

export interface EditProfileProps extends RouteComponentProps {}

const EditProfile: React.FC<EditProfileProps> = () => {
	const history = useHistory();
	const [gravatar, setGravatar] = useState('type0');

	//TODO Get Gravatar from auth.users

	// const onGravatarChange = (gravatar: string) => {
	// 	setGravatar(gravatar);
	// };

	const onDetailsChange = (data: any) => {
		console.log(data, gravatar);
		// API CALL - To be managed by redux

		// wait for api call

		history.push('/my-account');
		toast(
			<ToastMessage title='Your profile has been updated successfully !' />,
			{
				containerId: 'messageToastContainer',
				className: 'toasty',
			}
		);
	};

	return (
		<React.Fragment>
			<SubNav title='Edit Profile' />
			<EditGravatar gravatar={gravatar} handleGravatarChange={setGravatar} />
			<EditDetails handleDetailsChange={onDetailsChange} />
		</React.Fragment>
	);
};

export default EditProfile;
