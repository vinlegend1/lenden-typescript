import * as React from 'react';

import { ReactComponent as Mobile } from './mobile.svg';
import { ReactComponent as Book } from './book.svg';
import { ReactComponent as Cd } from './cd.svg';
import { ReactComponent as Console } from './console.svg';
import { ReactComponent as Accessory } from './accessory.svg';

export interface CategoryIconsProps {
	name: string;
}

const CategoryIcons: React.FC<CategoryIconsProps> = props => {
	switch (props.name) {
		case 'book':
			return <Book />;
		case 'mobile':
			return <Mobile />;
		case 'cd':
			return <Cd />;
		case 'console':
			return <Console />;
		case 'accessory':
			return <Accessory />;
		default:
			return null;
	}
};

export default CategoryIcons;
