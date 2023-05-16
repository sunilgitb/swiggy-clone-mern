import React from 'react';
import './Header.scss';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { ReactComponent as CartIcon } from './../../assets/icons/cart.svg';
import { ReactComponent as LogoIcon } from './../../assets/icons/logo.svg';
import { ReactComponent as HelpIcon } from './../../assets/icons/help.svg';
import { ReactComponent as SearchIcon } from './../../assets/icons/search.svg';
import { ReactComponent as OffersIcon } from './../../assets/icons/offers.svg';
import { ReactComponent as SigninIcon } from './../../assets/icons/signin.svg';
import { VscChevronDown } from 'react-icons/vsc';
const Header = () => {
	// NOTE: I am subscribing to store
	const cartItems = useSelector(store => store.cart);

	return (
		<div className="header-wrapper">
			<div className="header">
				<div className="logo">
					<Link to={'/'}>
						<LogoIcon />
					</Link>
					<div className="__left">
						<span>Other</span>
						<span>Patna, Bihar</span>
						<span>
							<VscChevronDown className="icon" />
						</span>
					</div>
				</div>

				<div className="nav-links">
					<NavLink to="/" className="link">
						<SearchIcon className="icon" />
						<span>Search</span>
					</NavLink>
					<NavLink to="/offers" className="link">
						<OffersIcon className="icon" />
						<span>Offers</span>
					</NavLink>
					<NavLink to="/help" className="link">
						<HelpIcon className="icon" />
						<span>Help</span>
					</NavLink>
					<NavLink to="/signin" className="link">
						<SigninIcon className="icon" />
						<span>Sign In</span>
					</NavLink>
					<NavLink to="/checkout" className="link">
						<div>
							<CartIcon
								className={
									cartItems?.length === 0
										? 'cart-empty'
										: 'cart-nonempty'
								}
							/>
							<span
								className={
									cartItems?.length === 0
										? 'item'
										: 'item color-white'
								}>
								{cartItems?.length}
							</span>
						</div>
						<span>Cart</span>
					</NavLink>
				</div>
			</div>
		</div>
	);
};

export default Header;
