import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { action as toggleMenu } from 'redux-burger-menu';
import { NavLink, useHistory } from 'react-router-dom';
import { Navbar, Nav, Image, Form, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { RootState } from '../../app/models';
import GenericIcons from '../../icons/generic';
import LendenIcons from '../../icons/lenden';
import GravatarIcons from '../../icons/gravatar';

export interface MainNavProps {}

const MainNav: React.FC<MainNavProps> = () => {
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.auth.userDetails.user);
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
					<GenericIcons className='icon' name='menu' />
				</Navbar.Brand>
				<LendenIcons id='logo' name='nav-logo' />

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
						<GenericIcons className='icon' id='navSearchIcon' name='search' />

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
						<GenericIcons
							className='icon'
							id='mobileSearchIcon'
							name='search'
						/>
					</Nav.Link>

					<Nav.Link className='iconNav'>
						<GenericIcons className='icon' name='bookmark' />
					</Nav.Link>
					<Nav.Link className='iconNav'>
						<GenericIcons className='icon' name='bell' />
					</Nav.Link>
					<Nav.Link id='userImage' onClick={() => history.push('/me')}>
						{user.userId ? (
							<div className='outerCircle'>
								<GravatarIcons name={user.gravatarId} />
							</div>
						) : (
							<GenericIcons name='user' />
						)}
					</Nav.Link>
				</Nav>
			</Navbar>
			<div id='mobileSearchBox' className={mobileSearchBoxClass}>
				<div className='ml-auto' id='mobileSearchBoxItem'>
					<GenericIcons
						className='icon'
						name='back'
						id='mobileSearchIcon'
						onClick={() => {
							setMobileSearchBoxClass('');
							setMainNavClass('');
						}}
					/>

					<Form.Control
						ref={searchBoxInput}
						id='mobileSearchInput'
						type='text'
						placeholder='Search for brands and products'
					/>
					<GenericIcons name='search' className='icon' id='mobileSearchIcon' />
				</div>
			</div>
		</div>
	);
};

export default MainNav;
