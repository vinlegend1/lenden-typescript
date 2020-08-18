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
				{ name: "Gaming Cd's", to: '/gaming-cd' },
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
					id='lol'
					style={{
						position: 'absolute',
						top: '1.7rem',
						left: '315px',
						width: '55px',
						cursor: 'pointer',
					}}
					src='/icons/cross.svg'
					alt=''
					onClick={() => dispatch(toggleMenu(false))}
				/>
			)}

			{user.userId && (
				<React.Fragment>
					<Image
						src='/icons/edit.svg'
						style={{
							position: 'absolute',
							top: '1rem',
							right: '1rem',
							width: '14px',
							padding: 0,
							cursor: 'pointer',
						}}
					/>
					<div
						style={{
							// height: '10vh',
							borderBottom: '.5px solid #D2D2D2',
							display: 'flex',
							width: 'inherit',
							padding: '1.3rem 0.8rem',
							marginBottom: '0.8em',
							alignItems: 'center',
							alignContent: 'center',
						}}>
						<div style={{ flexBasis: '25%' }}>
							<Image
								src={
									user
										? 'https://placekitten.com/g/300/300'
										: '/images/genericUser.png'
								}
								style={{ width: '50px' }}
								alt=''
								roundedCircle
							/>
						</div>
						<div
							style={{
								flexBasis: '75%',
							}}>
							<div
								style={{
									fontWeight: 300,
									fontFamily: 'Cera Pro',
									fontSize: '11px',
								}}>
								Name : {user.name}
							</div>
							<div
								style={{
									fontWeight: 300,
									fontFamily: 'Cera Pro',
									fontSize: '11px',
								}}>
								Email : {user.email}
							</div>
						</div>
					</div>
				</React.Fragment>
			)}
			{/* <Image
				id='userImageMain'
				src={
					user.user
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
						id='categoryDropdown'
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
							setTimeout(() => {
								if (dropIcon.src.includes('up'))
									dropIcon.src = '/icons/down.svg';
								else dropIcon.src = '/icons/up.svg';
							}, 500);
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
							style={{
								overflowY: 'hidden',
								maxHeight: '0px',
								transition: 'max-height 1s ease',
							}}>
							<div style={{ paddingTop: '20px' }}>
								{navLink.list!.map((category, index) => (
									<NavLink
										className='categoryItem'
										key={index}
										to={category.to}
										onClick={() => dispatch(toggleMenu(false))}
										style={{
											fontWeight: 'normal',
											fontSize: '14px',
											display: 'block',
											paddingLeft: '25px',
											marginBottom: ' 15px',
											textDecoration: 'none',
											color: 'white',
										}}>
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
