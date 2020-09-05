import React from 'react';
import GravatarIcons from '../../../icons/gravatar';

export interface EditGravatarProps {
	gravatar: string;
	handleGravatarChange: (g: string) => void;
}

const EditGravatar: React.FC<EditGravatarProps> = props => {
	const { gravatar, handleGravatarChange } = props;
	const availGravatars = ['type1', 'type2', 'type3', 'type4', 'type5'];
	return (
		<div className='editGravatar'>
			<div className='imageContainer'>
				<GravatarIcons name={gravatar} />
			</div>

			<div className='gravatarOptions'>
				{availGravatars.map(g => (
					<div className='gravatar' key={g}>
						<GravatarIcons name={g} onClick={() => handleGravatarChange(g)} />
						<div
							id='activeBox'
							className={gravatar === g ? 'active' : ''}></div>
					</div>
				))}
			</div>
		</div>
	);
};

export default EditGravatar;
