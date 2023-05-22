import { useState } from 'react';
import './SignInBox.scss';
import { auth } from '../../auth/firebase';
import {
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { login } from '../../redux/slice/authSlice';
import { updateSigninSideVisible } from '../../redux/slice/loginSlice';
import Swal from 'sweetalert2';
import validator from 'validator';

const SignInBox = () => {
	const dispatch = useDispatch();
	const [state, setState] = useState({
		email: '',
		password: '',
	});
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isLoggingIn, setIsLoggingIn] = useState(false);
	const [errorIn, setErrorIn] = useState('');

	const changeHandler = e => {
		setErrorIn('');
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	const loginHandler = () => {
		if (!validator.isEmail(state.email.trim())) {
			return setErrorIn('email');
		}
		if (state.password.trim().length < 8) {
			return setErrorIn('password');
		}
		setIsLoggingIn(true);
		signInWithEmailAndPassword(auth, state.email, state.password)
			.then(userCredential => {
				// Signed in
				const user = userCredential.user;

				dispatch(
					login({
						displayName: user.displayName,
						email: user.email,
						photoURL: user.photoURL,
					})
				);
				setIsLoggingIn(false);
				dispatch(updateSigninSideVisible(false));
				Swal.fire('Success!', `You're log in successfully!`, 'success');
			})
			.catch(error => {
				Swal.fire('Failed!', error.message, 'error');
				setIsLoggingIn(false);
			});
	};
	const loginFunGoogle = async () => {
		setIsLoggingIn(true);
		const provider = new GoogleAuthProvider();
		try {
			const result = await signInWithPopup(auth, provider);
			dispatch(
				login({
					displayName: result?.user?.displayName,
					email: result?.user?.email,
					photoURL: result?.user?.photoURL,
				})
			);
			Swal.fire('Success!', `You're log in successfully!`, 'success');
			dispatch(updateSigninSideVisible(false));
		} catch (err) {
			Swal.fire('Failed!', err.message, 'error');
		}
		setIsLoggingIn(false);
	};

	return (
		<div className="signin-box">
			{errorIn && (
				<div className="err-text">
					{errorIn === 'email'
						? 'Please enter a valid email!'
						: 'Password should atleast 8 character long!'}
				</div>
			)}
			<input
				type="email"
				value={state.name}
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
			<button disabled={isLoggingIn} onClick={loginHandler}>
				LOGIN
			</button>
			<button disabled={isLoggingIn} onClick={loginFunGoogle}>
				Continue with Google
			</button>
		</div>
	);
};

export default SignInBox;
