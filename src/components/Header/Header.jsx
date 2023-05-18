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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoThreeBars } from 'react-icons/go';
import { RxCross1 } from 'react-icons/rx';

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
	const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);

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
			toast.success('Successfully Logged In!', {
				position: 'bottom-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'colored',
			});
		} catch (err) {
			toast.error(err.message, {
				position: 'bottom-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'colored',
			});
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
		<>
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
						<div className="search">
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
						</div>
						<NavLink to="/offers" className="link" id="offers">
							<OffersIcon className="icon" />
							<span>Offers</span>
						</NavLink>
						<div className="name">
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
										toast.warn('Successfully Logged Out!', {
											position: 'bottom-right',
											autoClose: 5000,
											hideProgressBar: false,
											closeOnClick: true,
											pauseOnHover: true,
											draggable: true,
											progress: undefined,
											theme: 'colored',
										});
									}}
									className="link">
									{userAuth?.user?.photoURL ? (
										<img
											src={userAuth?.user?.photoURL}
											className="profile-img"
										/>
									) : (
										<SigninIcon className="icon" />
									)}
									<span className="truncate">
										{showLogout
											? 'Log Out'
											: userAuth?.user?.displayName}
									</span>
								</span>
							)}
						</div>
						<div className="cart">
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
					<div
						onClick={() => {
							setIsMobileNavVisible(prev => !prev);
						}}
						className={`mobile-nav`}>
						{!isMobileNavVisible ? (
							<GoThreeBars className="bars" />
						) : (
							<RxCross1 className="bars" />
						)}
					</div>
					{/* Mobile Nav */}
				</div>

				<div
					style={{
						fontSize: '1.5rem',
					}}>
					<ToastContainer
						position="bottom-right"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="colored"
					/>
				</div>
			</div>

			<div
				className={`mobile-nav-menu ${
					!isMobileNavVisible ? 'bottom-to-top' : 'top-to-bottom'
				}`}>
				<div className="nav-links">
					<div className="search">
						{isSearchVisible && location.pathname === '/' && (
							<div className="input-wrapper">
								<input
									value={searchText}
									onChange={e => {
										setSearchText(e.target.value);
									}}
									type="text"
									placeholder="Search restaurant"
								/>
								{searchText !== '' && (
									<RxCross1
										onClick={() => {
											setSearchText('');
											setIsSearchVisible(false);
										}}
										className="cross"
									/>
								)}
							</div>
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
					</div>
					<NavLink
						to="/offers"
						onClick={() => setIsMobileNavVisible(false)}
						className="link"
						id="offers">
						<OffersIcon className="icon" />
						<span>Offers</span>
					</NavLink>
					<div className="name">
						{!userAuth.isAuth ? (
							<span
								onClick={() => {
									loginFun();
									setIsMobileNavVisible(false);
								}}
								className="link">
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
									toast.warn('Successfully Logged Out!', {
										position: 'bottom-right',
										autoClose: 5000,
										hideProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true,
										draggable: true,
										progress: undefined,
										theme: 'colored',
									});
								}}
								className="link">
								{userAuth?.user?.photoURL ? (
									<img
										src={userAuth?.user?.photoURL}
										className="profile-img"
									/>
								) : (
									<SigninIcon className="icon" />
								)}
								<div>
									<span className="truncate2">
										{
											userAuth?.user?.displayName?.split(
												' '
											)?.[0]
										}
									</span>{' '}
									<span>- Log Out</span>
								</div>
							</span>
						)}
					</div>
					<div className="cart">
						<NavLink
							to="/checkout"
							onClick={() => setIsMobileNavVisible(false)}
							className="link">
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
		</>
	);
};

export default Header;
