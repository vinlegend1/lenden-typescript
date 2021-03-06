import * as React from 'react';

import { ReactComponent as Back } from './back.svg';
import { ReactComponent as Search } from './search.svg';
import { ReactComponent as Bookmark } from './bookmark.svg';
import { ReactComponent as Bell } from './bell.svg';
import { ReactComponent as Edit } from './edit.svg';
import { ReactComponent as Cross } from './cross.svg';
import { ReactComponent as Tick } from './tick.svg';
import { ReactComponent as Info } from './info.svg';
import { ReactComponent as Menu } from './menu.svg';
import { ReactComponent as Success } from './success.svg';
import { ReactComponent as Up } from './up.svg';
import { ReactComponent as Down } from './down.svg';
import { ReactComponent as User } from './user.svg';
import { ReactComponent as EmailBanner } from './email-banner.svg';
import { ReactComponent as NotFound } from './404.svg';
import { ReactComponent as Error } from './error.svg';
import { ReactComponent as Expired } from './expired.svg';
import { ReactComponent as Camera } from './camera.svg';
import { ReactComponent as CrossBlack } from './cross-black.svg';
import { ReactComponent as DownBlack } from './down-black.svg';
import { ReactComponent as Wishlist0 } from './wishlist-0.svg';
import { ReactComponent as Wishlist1 } from './wishlist-1.svg';
import { ReactComponent as Star } from './star.svg';
import { ReactComponent as Wallet } from './wallet.svg';
import { ReactComponent as Plus } from './plus.svg';
import { ReactComponent as Minus } from './minus.svg';
import { ReactComponent as Share } from './share.svg';
export interface GenericIconsProps {
	name: string;
	id?: string;
	className?: string;
	onClick?: () => void;
}

const GenericIcons: React.FC<GenericIconsProps> = ({ name, ...rest }) => {
	switch (name) {
		case 'back':
			return <Back {...rest} />;
		case 'search':
			return <Search {...rest} />;
		case 'bookmark':
			return <Bookmark {...rest} />;
		case 'bell':
			return <Bell {...rest} />;
		case 'edit':
			return <Edit {...rest} />;
		case 'cross':
			return <Cross {...rest} />;
		case 'tick':
			return <Tick {...rest} />;
		case 'info':
			return <Info {...rest} />;
		case 'menu':
			return <Menu {...rest} />;
		case 'success':
			return <Success {...rest} />;
		case 'up':
			return <Up {...rest} />;
		case 'down':
			return <Down {...rest} />;
		case 'user':
			return <User {...rest} />;
		case 'email-banner':
			return <EmailBanner {...rest} />;
		case 'not-found':
			return <NotFound {...rest} />;
		case 'error':
			return <Error {...rest} />;
		case 'expired':
			return <Expired {...rest} />;
		case 'camera':
			return <Camera {...rest} />;
		case 'cross-black':
			return <CrossBlack {...rest} />;
		case 'down-black':
			return <DownBlack {...rest} />;
		case 'wishlist-0':
			return <Wishlist0 {...rest} />;
		case 'wishlist-1':
			return <Wishlist1 {...rest} />;
		case 'star':
			return <Star {...rest} />;
		case 'wallet':
			return <Wallet {...rest} />;
		case 'plus':
			return <Plus {...rest} />;
		case 'minus':
			return <Minus {...rest} />;
		case 'share':
			return <Share {...rest} />;
		default:
			return null;
	}
};

export default GenericIcons;
