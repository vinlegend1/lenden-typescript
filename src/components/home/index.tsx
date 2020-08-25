import React from 'react';
import { useSelector } from 'react-redux';
import InfoBanner from './infoBanner';
import Categories from './categories';
import MainBanner from './mainBanner';
import ToggleButton from './toggleButton';
import { RootState } from '../../app/models';
import useResizeEventListener from '../../hooks/useResizeEventListener';
import Navbar from '../navbar';

export interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
	const isMobile = useSelector(
		(state: RootState) => state.entities.common.isMobile
	);

	useResizeEventListener();

	return (
		<React.Fragment>
			<Navbar />
			<InfoBanner />
			{isMobile && <Categories />}
			<MainBanner />
			<ToggleButton />
		</React.Fragment>
	);
};

export default Home;
