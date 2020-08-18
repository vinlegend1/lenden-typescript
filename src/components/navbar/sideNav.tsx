import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { action as toggleMenu } from 'redux-burger-menu';
import { Image } from 'react-bootstrap';
import { slide as Menu } from 'react-burger-menu';
import { NavLink } from 'react-router-dom';
import { logOutUser } from '../../app/auth/login';
import { RootState } from '../../app/models';

export interface SideNavProps {}

const SideNav: React.FC<SideNavProps> = () => {
	const dispatch = useDispatch();

	const burgerMenu = useSelector(
		(state: RootState) => state.entities.burgerMenu.isOpen
	);
	const user = useSelector((state: RootState) => state.auth.user);
	const menuState = useSelector(
		(state: RootState) => state.entities.burgerMenu
	);
	const categoriesItem = useRef(null);
	const dropDownIcon = useRef(null);

	const navLinks = [
		{ to: '/my-products', name: 'My Products' },
		{ to: '/my-barter', name: 'My Barter' },
		{
			to: '/',
			name: 'Home',
			exact: true,
			id: 'homeAnchor',
		},
		{ to: '/wallet-ballance', name: 'Wallet Ballance' },
		{
			name: 'Categories',
			list: [
				{ name: 'Books', to: '/books' },
				{ name: 'Mobiles', to: '/mobiles' },
				{ name: "Gaming CD's", to: '/gaming-cd' },
				{ name: 'Accessories', to: '/gaming-accessories' },
				{ name: 'Gaming Consoles', to: '/gaming-consoles' },
			],
		},
		{ to: '/about', name: 'About Us' },
		{ to: '/contact', name: 'Contact Us' },
		{ to: '/faq', name: "FAQ's" },
		{ to: '/donate', name: 'Donate a Book' },
	];

	return (
		<Menu
			customBurgerIcon={false}
			customCrossIcon={false}
			isOpen={burgerMenu}
			onStateChange={state => {
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
					<Image id='editUser' src='/icons/edit.svg' />
					<div id='userContainer'>
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
							const dropDown = categoriesItem.current! as HTMLDivElement;
							dropDown.classList.toggle('displayDropdown');
							const dropIcon = dropDownIcon.current! as HTMLImageElement;
							setTimeout(() => {
								if (dropIcon.src.includes('up'))
									dropIcon.src = '/icons/down.svg';
								else dropIcon.src = '/icons/up.svg';
							}, 500);
						}}>
						{navLink.name}
						<img ref={dropDownIcon} src='/icons/down.svg' alt='' />
						<div ref={categoriesItem} id='dropdownContainer'>
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
	);
};

export default SideNav;
