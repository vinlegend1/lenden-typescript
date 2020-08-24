import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { action as toggleMenu } from 'redux-burger-menu';
import { Image } from 'react-bootstrap';
import { slide as Menu } from 'react-burger-menu';
import { NavLink, useHistory } from 'react-router-dom';
import { logOutUser } from '../../app/auth/login';
import { RootState } from '../../app/models';
import { Swipeable } from 'react-swipeable';

export interface SideNavProps {}

const SideNav: React.FC<SideNavProps> = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const burgerMenu = useSelector(
		(state: RootState) => state.entities.burgerMenu.isOpen
	);
	const user = useSelector((state: RootState) => state.auth.user);
	const menuState = useSelector(
		(state: RootState) => state.entities.burgerMenu
	);

	const [categoriesItemClass, setCategoriesItemClass] = useState('');
	const [dropdownIconSrc, setDropdownIconSrc] = useState('/icons/down.svg');

	const navLinks = [
		{ to: '/my-products', name: 'My Products' },
		{ to: '/my-barter', name: 'My Barter' },
		{
			to: '/',
			name: 'Home',
			exact: true,
			id: 'homeAnchor',
		},
		// { to: '/wallet-ballance', name: 'Wallet Ballance' },
		{
			name: 'Categories',
			list: [
				{ name: 'Books', to: '/categories/books' },
				{ name: 'Mobiles', to: '/categories/mobiles' },
				{ name: "Gaming CD's", to: '/categories/gaming-cd' },
				{ name: 'Gaming Accessories', to: '/categories/gaming-accessories' },
				{ name: 'Gaming Consoles', to: '/categories/gaming-consoles' },
			],
		},
		{ to: '/about', name: 'About Us' },
		{ to: '/contact', name: 'Contact Us' },
		{ to: '/faq', name: "FAQ's" },
		// { to: '/donate', name: 'Donate a Book' },
	];

	return (
		<Swipeable onSwipedLeft={() => dispatch(toggleMenu(false))}>
			<Menu
				customBurgerIcon={false}
				customCrossIcon={false}
				isOpen={burgerMenu}
				onStateChange={state => {
					setCategoriesItemClass('');
					if (burgerMenu !== state.isOpen) dispatch(toggleMenu(state.isOpen));
				}}>
				{menuState.isOpen && (
					<Image
						id='closeMenu'
						src='/icons/cross.svg'
						alt=''
						onClick={() => dispatch(toggleMenu(false))}
					/>
				)}

				{user.userId && (
					<React.Fragment>
						<div
							id='userContainer'
							onClick={() => {
								history.push('/my-account');
								dispatch(toggleMenu(false));
							}}>
							<div id='imageContainer'>
								<Image
									src={
										user
											? 'https://placekitten.com/g/300/300'
											: '/images/genericUser.png'
									}
									alt=''
									roundedCircle
								/>
							</div>
							<div id='infoContainer'>
								<div className='userDetails'>Name : {user.name}</div>
								<div className='userDetails'>Email : {user.email}</div>
							</div>
						</div>
					</React.Fragment>
				)}

				{!user.userId && (
					<NavLink
						id='navAnchor'
						to='/login'
						className='menu-item'
						onClick={() => dispatch(toggleMenu(false))}>
						Sign In
					</NavLink>
				)}
				{/* {user.user && (
			<NavLink
				id='navAnchor'
				to='/me'
				className='menu-item'
				onClick={() => dispatch(toggleMenu(false))}>
				My Account
			</NavLink>
		)} */}

				{navLinks.map((navLink, index) => {
					if (navLink.to)
						return (
							<NavLink
								key={index}
								to={navLink.to}
								className='menu-item'
								onClick={() => dispatch(toggleMenu(false))}
								exact={navLink.exact ? true : false}
								id={navLink.id}>
								{navLink.name}
								{/* {navLink.icon && (
					<FontAwesomeIcon id={navLink.icon.id} icon={navLink.icon.icon} />
				)} */}
							</NavLink>
						);

					return (
						<div
							id='categoryContainer'
							key={index}
							onClick={() => {
								if (categoriesItemClass === '')
									setCategoriesItemClass('displayDropdown');
								else setCategoriesItemClass('');
								setTimeout(() => {
									if (dropdownIconSrc.includes('up'))
										setDropdownIconSrc('/icons/down.svg');
									else setDropdownIconSrc('/icons/up.svg');
								}, 200);
							}}>
							{navLink.name}
							<img src={dropdownIconSrc} alt='' />
							<div id='dropdownContainer' className={categoriesItemClass}>
								<div id='dropdownInnerContainer'>
									{navLink.list!.map((category, index) => (
										<NavLink
											className='categoryItem'
											key={index}
											to={category.to}
											onClick={() => dispatch(toggleMenu(false))}>
											{category.name}
										</NavLink>
									))}
								</div>
							</div>
						</div>
					);
				})}

				{user.userId && (
					<div id='signOutNav' onClick={() => dispatch(logOutUser())}>
						SIGN OUT
					</div>
				)}
			</Menu>
		</Swipeable>
	);
};

export default SideNav;
