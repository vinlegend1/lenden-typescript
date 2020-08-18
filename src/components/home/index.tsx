import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InfoBanner from './infoBanner';
import Categories from './categories';
import { RootState } from '../../app/models';
import { updateDeviceType } from '../../app/entities/common';

export interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
	const dispatch = useDispatch();
	const isMobile = useSelector(
		(state: RootState) => state.entities.common.isMobile
	);

	dispatch(updateDeviceType());
	useEffect(() => {
		window.addEventListener('resize', () => dispatch(updateDeviceType()));
		return () => {
			window.removeEventListener('resize', () => dispatch(updateDeviceType()));
		};
	}, []);

	return (
		<React.Fragment>
			<InfoBanner />
			{isMobile && <Categories />}
		</React.Fragment>
	);
};

export default Home;
