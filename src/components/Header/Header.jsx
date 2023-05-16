import React, { useEffect, useState } from 'react';
import './Header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ReactComponent as CartIcon } from './../../assets/icons/cart.svg';
import { ReactComponent as LogoIcon } from './../../assets/icons/logo.svg';
import { ReactComponent as SearchIcon } from './../../assets/icons/search.svg';
import { ReactComponent as OffersIcon } from './../../assets/icons/offers.svg';
import { ReactComponent as SigninIcon } from './../../assets/icons/signin.svg';
import { VscChevronDown } from 'react-icons/vsc';
import { changeText } from '../../redux/slice/searchSlice';

// auth
import { auth } from '../../auth/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { login, logout } from '../../redux/slice/authSlice';

let timeout;
const Header = () => {
	// NOTE: I am subscribing to store
	const cartItems = useSelector(state => state.cart.items);
	const [isSearchVisible, setIsSearchVisible] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [showLogout, setShowLogout] = useState(true);

	const dispatch = useDispatch();
	const location = useLocation();

	const userAuth = useSelector(state => state.auth);

	const loginFun = async () => {
		const provider = new GoogleAuthProvider();
		try {
			const result = await signInWithPopup(auth, provider);
			dispatch(
				login({
					displayName: result.user.displayName,
					email: result.user.email,
					photoURL: result.user.photoURL,
				})
			);
		} catch (err) {
			console.log(err);
		}
	};

	window.addEventListener('mouseover', e => {
		e.stopPropagation();
		e.preventDefault();
		setShowLogout(false);
	});

	useEffect(() => {
		if (location.pathname === '/') {
			setSearchText('');
			setIsSearchVisible(false);
		}
	}, [location.pathname]);
	useEffect(() => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			// search
			dispatch(changeText(searchText));
		}, 1000);
	}, [searchText]);

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
					{isSearchVisible && location.pathname === '/' && (
						<input
							value={searchText}
							onChange={e => {
								setSearchText(e.target.value);
							}}
							type="text"
							placeholder="Search restaurant"
						/>
					)}
					{!isSearchVisible && location.pathname === '/' && (
						<span
							onClick={() => {
								setIsSearchVisible(prev => !prev);
							}}
							className="link">
							<SearchIcon className="icon" />
							<span>Search</span>
						</span>
					)}
					<NavLink to="/offers" className="link">
						<OffersIcon className="icon" />
						<span>Offers</span>
					</NavLink>
					{/* <NavLink to="/help" className="link">
						<HelpIcon className="icon" />
						<span>Help</span>
					</NavLink> */}
					{!userAuth.isAuth ? (
						<span onClick={loginFun} className="link">
							<SigninIcon className="icon" />
							<span>Sign In</span>
						</span>
					) : (
						<span
							onMouseOver={e => {
								e.stopPropagation();
								setShowLogout(true);
							}}
							onClick={() => {
								dispatch(logout());
							}}
							className="link">
							<img
								src={userAuth?.user?.photoURL}
								className="profile-img"
							/>
							<span>
								{showLogout
									? 'Log Out'
									: userAuth?.user?.displayName}
							</span>
						</span>
					)}
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
