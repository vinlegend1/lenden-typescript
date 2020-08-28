import * as React from 'react';

import { ReactComponent as Mobile } from './mobile.svg';
import { ReactComponent as Book } from './book.svg';
import { ReactComponent as Cd } from './cd.svg';
import { ReactComponent as Console } from './console.svg';
import { ReactComponent as Accessory } from './accessory.svg';

export interface CategoryIconsProps {
	name: string;
	className?: string;
	id?: string;
	onClick?: () => void;
}

const CategoryIcons: React.FC<CategoryIconsProps> = ({ name, ...rest }) => {
	switch (name) {
		case 'book':
			return <Book {...rest} />;
		case 'mobile':
			return <Mobile {...rest} />;
		case 'cd':
			return <Cd {...rest} />;
		case 'console':
			return <Console {...rest} />;
		case 'accessory':
			return <Accessory {...rest} />;
		default:
			return null;
	}
};

export default CategoryIcons;
