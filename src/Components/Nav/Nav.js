import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Button } from 'react-bulma-components';

const Nav = () => {
	const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);

	const toggleBurgerOpen = (e) => {
		setBurgerMenuOpen(!burgerMenuOpen);
	};

	return (
		<Navbar active={burgerMenuOpen} transparent>
			<Navbar.Brand>
				<Navbar.Item renderAs={Link} to="/">
					<img src="../../../static/assets/logo.png" />
				</Navbar.Item>

				<Navbar.Burger onClick={toggleBurgerOpen} />
			</Navbar.Brand>

			<Navbar.Container align="right">
				<Navbar.Item>
					<Button color="primary" outlined>
						Sign up
					</Button>
				</Navbar.Item>
				<Navbar.Item>
					<Button color="primary">Log in</Button>
				</Navbar.Item>
			</Navbar.Container>
		</Navbar>
	);
};

export default Nav;
