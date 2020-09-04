import React, { useState } from 'react';
import SubNav from '../../common/subNav';
import EditGravatar from './editGravatar';
import EditDetails from './editDetails';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import ToastMessage from '../../common/toastMessage';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/models';
import { editProfile } from '../../../app/auth/userDetails';

export interface EditProfileProps extends RouteComponentProps {}

const EditProfile: React.FC<EditProfileProps> = () => {
	const history = useHistory();
	const user = useSelector((state: RootState) => state.auth.userDetails.user);
	const [gravatar, setGravatar] = useState(user.gravatarId);
	const dispatch = useDispatch();

	const error = useSelector((state: RootState) => state.auth.userDetails.error);
	const success = useSelector(
		(state: RootState) => state.auth.userDetails.success
	);
	const loading = useSelector(
		(state: RootState) => state.auth.userDetails.loading
	);

	const onDetailsChange = async (data: {
		name: string;
		mobileNumber: string;
	}) => {
		// console.log(data, gravatar);
		// API CALL - To be managed by redux
		await dispatch(
			editProfile({
				name: data.name,
				mobileNumber: data.mobileNumber,
				gravatarId: gravatar.split('type')[1],
			})
		);
		if (!error) {
			history.push('/my-account');
			toast(
				<ToastMessage title='Your profile has been updated successfully !' />,
				{
					containerId: 'messageToastContainer',
					className: 'toasty',
				}
			);
		}

		// wait for api call
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
