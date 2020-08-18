import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { action as toggleMenu } from 'redux-burger-menu';
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { slide as Menu } from 'react-burger-menu';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { logOutUser } from '../../app/auth/login';
import { RootState } from '../../app/models';
import _ from 'lodash';

export interface SideNavProps {}

const SideNav: React.SFC<SideNavProps> = () => {
	const dispatch = useDispatch();
	const burgerMenu = useSelector(
		(state: RootState) => state.entities.burgerMenu.isOpen
	);
	const user = useSelector((state: RootState) => state.auth.user);
	const categoriesItem = useRef(null);
	const dropDownIcon = useRef(null);

	const categories = [
		'Books',
		'Mobiles',
		"Gaming Cd's",
		'Accessories',
		'Gaming Consoles',
	];

	const navLinks = [
		// {
		// 	to: '/notifications',
		// 	name: 'Notifications',
		// 	icon: { id: 'sideNavBell', icon: faBell },
		// },
		// { to: '/wishlist', name: 'Wishlist' },
		{ to: '/my-products', name: 'My Products' },
		{ to: '/my-barter', name: 'My Barter' },
		{
			to: '/',
			name: 'Home',
			exact: true,
			id: 'homeAnchor',
		},
		// { to: '/books', name: 'Books' },
		// { to: '/gaming', name: 'Gaming' },
		// { to: '/mobile', name: 'Mobile' },
		{ to: '/wallet-ballance', name: 'Wallet Ballance' },
		{ name: 'Categories' },
		{ to: '/about', name: 'About Us' },
		{ to: '/contact', name: 'Contact Us' },
		{ to: '/faq', name: "FAQ's" },
		{ to: '/donate', name: 'Donate a Book' },
	];

	return (
		<Menu
			customBurgerIcon={false}
			isOpen={burgerMenu}
			onStateChange={state => {
				if (burgerMenu !== state.isOpen) dispatch(toggleMenu(state.isOpen));
			}}>
			{/* <Image
				id='userImageMain'
				src={
					user.userId
						? 'https://placekitten.com/g/300/300'
						: '/images/genericUser.png'
				}
				roundedCircle
				// onClick={onUserClick}
			/> */}
			{!user.userId && (
				<NavLink
					id='navAnchor'
					to='/login'
					className='menu-item'
					onClick={() => dispatch(toggleMenu(false))}>
					Sign In
				</NavLink>
			)}
			{/* {user.userId && (
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
						key={index}
						style={{
							cursor: 'pointer',
							MozUserSelect: 'none',
							WebkitUserSelect: 'none',
							msUserSelect: 'none',
							userSelect: 'none',
						}}
						onClick={() => {
							const dropDown = categoriesItem.current! as HTMLDivElement;
							dropDown.classList.toggle('displayDropDown');
							const dropIcon = dropDownIcon.current! as HTMLImageElement;
							// console.log(dropIcon.src);
							if (dropIcon.src.includes('up')) dropIcon.src = '/icons/down.svg';
							else dropIcon.src = '/icons/up.svg';
							// console.log(dropIcon.src);
						}}>
						{navLink.name}
						<img
							ref={dropDownIcon}
							style={{ marginLeft: '15px' }}
							src='/icons/down.svg'
							alt=''
						/>
						<div
							ref={categoriesItem}
							id='dropDownCategories'
							style={{ marginTop: '20px', display: 'none' }}>
							{categories.map((category, index) => (
								<NavLink
									key={index}
									to=''
									style={{
										fontWeight: 'normal',
										fontSize: '16px',
										display: 'block',
										paddingLeft: '25px',
										marginBottom: ' 15px',
										textDecoration: 'none',
										color: 'white',
									}}>
									{category}
								</NavLink>
							))}
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
