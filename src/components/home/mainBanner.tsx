import React from 'react';
import { lendenSpecific } from '../../icons';

export interface MainBannerProps {}

const MainBanner: React.FC<MainBannerProps> = () => {
	return (
		<div id='mainBanner' style={{ position: 'relative' }}>
			<img src={lendenSpecific.mainBanner} alt='' />
			<div id='knowMore'>Know More</div>
			<hr />
		</div>
	);
};

export default MainBanner;
