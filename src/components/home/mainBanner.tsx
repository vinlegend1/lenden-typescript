import React from 'react';

export interface MainBannerProps {}

const MainBanner: React.FC<MainBannerProps> = () => {
	return (
		<div id='mainBanner' style={{ position: 'relative' }}>
			<img src='/icons/main-banner.svg' alt='' />
			<div id='knowMore'>Know More</div>
			<hr />
		</div>
	);
};

export default MainBanner;
