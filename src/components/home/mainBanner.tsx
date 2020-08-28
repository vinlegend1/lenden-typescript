import React from 'react';
import LendenIcons from '../../icons/lenden';

export interface MainBannerProps {}

const MainBanner: React.FC<MainBannerProps> = () => {
	return (
		<div id='mainBanner' style={{ position: 'relative' }}>
			<LendenIcons name='main-banner' />
			<div id='knowMore'>Know More</div>
			<hr />
		</div>
	);
};

export default MainBanner;
