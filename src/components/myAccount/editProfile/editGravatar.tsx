import React from 'react';
import { gravatarIcons } from '../../../icons';

export interface EditGravatarProps {
	gravatar: string;
	handleGravatarChange: (g: string) => void;
}

const EditGravatar: React.FC<EditGravatarProps> = props => {
	const { gravatar, handleGravatarChange } = props;

	return (
		<div className='editGravatar'>
			<div className='imageContainer'>
				<img src={gravatarIcons[gravatar]} alt='' />
			</div>

			<div className='gravatarOptions'>
				{Object.keys(gravatarIcons).map(g => (
					<div className='gravatar' key={g}>
						<img
							src={gravatarIcons[g]}
							alt=''
							onClick={() => handleGravatarChange(g)}
						/>
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
