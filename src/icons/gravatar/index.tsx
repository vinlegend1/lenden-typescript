import * as React from 'react';

import { ReactComponent as Type1 } from './user1.svg';
import { ReactComponent as Type2 } from './user2.svg';
import { ReactComponent as Type3 } from './user3.svg';
import { ReactComponent as Type4 } from './user4.svg';
import { ReactComponent as Type5 } from './user5.svg';

export interface GravatarIconsProps {
	name: string;
	className?: string;
	onClick?: () => void;
}

const GravatarIcons: React.FC<GravatarIconsProps> = ({ name, ...rest }) => {
	switch (name) {
		case 'type1':
			return <Type1 {...rest} />;
		case 'type2':
			return <Type2 {...rest} />;
		case 'type3':
			return <Type3 {...rest} />;
		case 'type4':
			return <Type4 {...rest} />;
		case 'type5':
			return <Type5 {...rest} />;
		default:
			return null;
	}
};

export default GravatarIcons;
