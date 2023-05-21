import { useState } from 'react';
import './SignUpBox.scss';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../auth/firebase';
import validator from 'validator';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slice/authSlice';
import { toast } from 'react-toastify';

const SignUpBox = ({ setIsSigninSideVisible }) => {
	const initialState = {
		name: '',
		email: '',
		password: '',
	};
	const [state, setState] = useState(initialState);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [errorIn, setErrorIn] = useState('');
	const [isLoggingIn, setIsLoggingIn] = useState(false);

	const changeHandler = e => {
		setErrorIn('');
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};
	const dispatch = useDispatch();
	const signupHandler = () => {
		if (state.name.trim() === '') {
			return setErrorIn('name');
		}
		if (!validator.isEmail(state.email.trim())) {
			return setErrorIn('email');
		}
		if (state.password.trim().length < 8) {
			return setErrorIn('password');
		}
		setIsLoggingIn(true);
		createUserWithEmailAndPassword(auth, state.email, state.password)
			.then(userCredential => {
				// Signed in
				const user = userCredential.user;
				// ...
				updateProfile(auth.currentUser, {
					displayName: state.name,
					// photoURL: 'https://example.com/jane-q-user/profile.jpg',
				})
					.then(() => {
						// Profile updated!
						// ...
						console.log(user);
						dispatch(
							login({
								displayName: user.displayName,
								email: user.email,
							})
						);
						setIsSigninSideVisible(false);
						setState(initialState);
						toast.success('Signup successfull!', {
							position: 'bottom-right',
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							theme: 'colored',
						});
						setIsLoggingIn(false);
					})
					.catch(error => {
						// An error occurred
						// ...
						console.log(error);
					});
			})
			.catch(error => {
				const errorMessage = error.message;
				toast.error(errorMessage, {
					position: 'bottom-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'colored',
				});
				setIsSigninSideVisible(false);
				setIsLoggingIn(false);
				// ..
			});
	};

	return (
		<div className="signup-box">
			<input
				type="text"
				value={state.name}
				onChange={changeHandler}
				name="name"
				placeholder="Name"
				className={`${errorIn === 'name' ? 'err' : ''}`}
			/>
			<input
				type="email"
				value={state.email}
				onChange={changeHandler}
				name="email"
				placeholder="Email"
				className={`${errorIn === 'email' ? 'err' : ''}`}
			/>
			<div>
				<input
					type={`${isPasswordVisible ? 'text' : 'password'}`}
					value={state.password}
					onChange={changeHandler}
					name="password"
					placeholder="Password"
					className={`${errorIn === 'password' ? 'err' : ''}`}
				/>
				{isPasswordVisible ? (
					<AiOutlineEyeInvisible
						onClick={() => setIsPasswordVisible(prev => !prev)}
						className="eye"
					/>
				) : (
					<AiOutlineEye
						onClick={() => setIsPasswordVisible(prev => !prev)}
						className="eye"
					/>
				)}
			</div>
			<button disabled={isLoggingIn} onClick={signupHandler}>
				Signup
			</button>
		</div>
	);
};

export default SignUpBox;
