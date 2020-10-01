import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { action as toggleMenu } from 'redux-burger-menu';
import { slide as Menu } from 'react-burger-menu';
import { NavLink, useHistory } from 'react-router-dom';
import { logOutUser } from '../../app/auth/login';
import { RootState } from '../../app/models';
import { Swipeable } from 'react-swipeable';
import GenericIcons from '../../icons/generic';
import GravatarIcons from '../../icons/gravatar';

export interface SideNavProps {}

const SideNav: React.FC<SideNavProps> = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const burgerMenu = useSelector(
		(state: RootState) => state.entities.burgerMenu.isOpen
	);
	const user = useSelector((state: RootState) => state.auth.userDetails.user);
	const menuState = useSelector(
		(state: RootState) => state.entities.burgerMenu
	);

	const [categoriesItemClass, setCategoriesItemClass] = useState('');
	const [dropdownIconName, setDropdownIconName] = useState('down');

	const navLinks = [
		{ to: '/my-products', name: 'My Products', protected: true },
		{ to: '/my-barter', name: 'My Barter', protected: true },
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
				{ name: 'Books', to: '/products/books' },
				{ name: 'Mobiles', to: '/products/mobiles' },
				{ name: "Gaming CD's", to: '/products/gaming-cd' },
				{ name: 'Gaming Accessories', to: '/products/gaming-accessories' },
				{ name: 'Gaming Consoles', to: '/products/gaming-consoles' },
			],
		},
		{ to: '/about', name: 'About Us' },
		{ to: '/contact', name: 'Contact Us' },
		{ to: '/faq', name: "FAQ's" },
		{ to: '/donate-a-book', name: 'Donate a Book' },
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
					<GenericIcons
						name='cross'
						id='closeMenu'
						onClick={() => dispatch(toggleMenu(false))}
					/>
				)}

				{user.userId && (
					<React.Fragment>
						<GenericIcons
							id='editUser'
							name='edit'
							onClick={() => {
								history.push('/my-account');
								dispatch(toggleMenu(false));
							}}
						/>

						<div
							id='userContainer'
							onClick={() => {
								history.push('/my-account');
								dispatch(toggleMenu(false));
							}}>
							<div id='imageContainer'>
								<div className='userImage'>
									<GravatarIcons name={user.gravatarId} />
								</div>
							</div>
							<div id='infoContainer'>
								<div className='userDetails'>Name : {user.name}</div>
								<div className='userDetails'>Email : {user.email}</div>
							</div>
						</div>
					</React.Fragment>
				)}

				{!user.userId && (
					<div
						className='genericUserContainer'
						onClick={() => {
							history.push('/login');
							dispatch(toggleMenu(false));
						}}>
						<div className='iconContainer'>
							<GenericIcons name='user' />
						</div>
						<div className='title'>Login / Signup</div>
					</div>
				)}

				{navLinks.map((navLink, index) => {
					if (navLink.to && navLink.protected)
						return (
							user.userId && (
								<NavLink
									key={index}
									to={navLink.to}
									className='menu-item'
									onClick={() => dispatch(toggleMenu(false))}
									exact={navLink.exact ? true : false}
									id={navLink.id}>
									{navLink.name}
								</NavLink>
							)
						);
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
									if (dropdownIconName === 'up') setDropdownIconName('down');
									else setDropdownIconName('up');
								}, 50);
							}}>
							{navLink.name}
							<GenericIcons className='icon' name={dropdownIconName} />
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
