import * as React from 'react';

import { ReactComponent as MainBanner } from './main-banner.svg';
import { ReactComponent as NavLogo } from './nav-logo.svg';

export interface LendenIconsProps {
	name: string;
	id?: string;
	className?: string;
	onClick?: () => void;
}

const LendenIcons: React.FC<LendenIconsProps> = ({ name, ...rest }) => {
	switch (name) {
		case 'main-banner':
			return <MainBanner {...rest} />;
		case 'nav-logo':
			return <NavLogo {...rest} />;

		default:
			return null;
	}
};

export default LendenIcons;
