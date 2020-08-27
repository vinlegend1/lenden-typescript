import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { action as toggleMenu } from 'redux-burger-menu';
import { NavLink, useHistory } from 'react-router-dom';
import { Navbar, Nav, Image, Form, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { RootState } from '../../app/models';
import { genericIcons, lendenSpecific, gravatarIcons } from '../../icons';

export interface MainNavProps {}

const MainNav: React.FC<MainNavProps> = () => {
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.auth.user);
	const history = useHistory();

	const searchBoxInput = useRef(null);

	const [mobileSearchBoxClass, setMobileSearchBoxClass] = useState('');
	const [mainNavClass, setMainNavClass] = useState('');

	return (
		<div className='mainNavBarGroup'>
			<Navbar variant='dark' className={`mainNav ${mainNavClass}`}>
				<Navbar.Brand
					onClick={() => dispatch(toggleMenu(true))}
					style={{ cursor: 'pointer' }}>
					<img className='icon' src={genericIcons.menu} alt='' />
				</Navbar.Brand>
				<Image
					onClick={() => history.push('/')}
					id='logo'
					src={lendenSpecific.navLogo}
				/>

				<NavLink className='nav-link category' to='/categories/books'>
					Books
				</NavLink>

				<NavLink className='nav-link category' to='/categories/mobiles'>
					Mobiles
				</NavLink>

				<NavDropdown
					id='mainNavCategoryDropdown'
					className='category dropdownCategory'
					title='Gaming'>
					<LinkContainer to='/categories/gaming-cd'>
						<NavDropdown.Item>Gaming CDs</NavDropdown.Item>
					</LinkContainer>
					<LinkContainer to='/categories/gaming-consoles'>
						<NavDropdown.Item>Gaming Consoles</NavDropdown.Item>
					</LinkContainer>
					<LinkContainer to='/categories/gaming-accessories'>
						<NavDropdown.Item>Gaming Accessories</NavDropdown.Item>
					</LinkContainer>
				</NavDropdown>

				<Nav className='ml-auto'>
					<div id='navSearchBox'>
						<img
							className='icon'
							id='navSearchIcon'
							src={genericIcons.search}
							alt=''
						/>
						<Form.Control
							id='navSearchInput'
							type='text'
							placeholder='Search for products'
						/>
					</div>
					<Nav.Link
						id='mainNavSearchIcon'
						className='iconNav'
						onClick={() => {
							setMobileSearchBoxClass('displaySearchBox');
							setMainNavClass('hideMainNav');

							setTimeout(
								() => (searchBoxInput.current! as HTMLInputElement).focus(),
								300
							);
						}}>
						<img
							className='icon'
							id='mobileSearchIcon'
							src={genericIcons.search}
							alt=''
						/>
					</Nav.Link>

					<Nav.Link className='iconNav'>
						<img className='icon' src={genericIcons.bookmark} alt='' />
					</Nav.Link>
					<Nav.Link className='iconNav'>
						<img className='icon' src={genericIcons.bell} alt='' />
					</Nav.Link>
					<Nav.Link id='userImage' onClick={() => history.push('/me')}>
						<Image
							style={{
								maxWidth: 42,
							}}
							src={
								user.userId ? gravatarIcons.type0 : '/images/genericUser.png'
							}
							roundedCircle
						/>
					</Nav.Link>
				</Nav>
			</Navbar>
			<div id='mobileSearchBox' className={mobileSearchBoxClass}>
				<div className='ml-auto' id='mobileSearchBoxItem'>
					<img
						className='icon'
						id='mobileSearchIcon'
						onClick={() => {
							setMobileSearchBoxClass('');
							setMainNavClass('');
						}}
						src={genericIcons.back}
						alt=''
					/>
					<Form.Control
						ref={searchBoxInput}
						id='mobileSearchInput'
						type='text'
						placeholder='Search for brands and products'
					/>
					<img
						className='icon'
						id='mobileSearchIcon'
						src={genericIcons.search}
						alt=''
					/>
				</div>
			</div>
		</div>
	);
};

export default MainNav;
