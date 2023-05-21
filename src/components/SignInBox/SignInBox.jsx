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
import { toast } from 'react-toastify';

const SignInBox = ({ setIsSigninSideVisible }) => {
	const dispatch = useDispatch();
	const [state, setState] = useState({
		email: '',
		password: '',
	});
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isLoggingIn, setIsLoggingIn] = useState(false);

	const changeHandler = e => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	const loginHandler = () => {
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
				setIsSigninSideVisible(false);
				toast.success('Login successfull!', {
					position: 'bottom-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'colored',
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
			toast.success('Login successfull!', {
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
		setIsLoggingIn(false);
	};

	return (
		<div className="signin-box">
			<input
				type="email"
				value={state.name}
				onChange={changeHandler}
				name="email"
				placeholder="Email"
			/>
			<div>
				<input
					type={`${isPasswordVisible ? 'text' : 'password'}`}
					value={state.password}
					onChange={changeHandler}
					name="password"
					placeholder="Password"
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
