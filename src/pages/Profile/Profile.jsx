import { useDispatch, useSelector } from 'react-redux';
import './Profile.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { logout } from '../../redux/slice/authSlice';
import Swal from 'sweetalert2';
import { updateSigninSideVisible } from '../../redux/slice/loginSlice';

const Profile = () => {
	const authData = useSelector(state => state.auth);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		if (!authData.isAuth) {
			navigate('/');
		}
	}, [authData.isAuth]);
	return (
		<div className="profile-wrapper">
			<div className="profile">
				<h2>Profile</h2>
				<div>
					{authData?.user?.photoURL ? (
						<div className="img">
							<img src={authData?.user?.photoURL} alt="" />
						</div>
					) : (
						<div>
							<div className="dummy-img">
								{authData?.user?.displayName
									?.split(' ')
									?.map(el => el?.[0])}
							</div>
						</div>
					)}
					<div>
						<div className="name">
							{authData?.user?.displayName}
						</div>
						<div className="email">{authData?.user?.email}</div>
						<button
							onClick={() => {
								Swal.fire({
									title: 'Are you sure?',
									text: 'Dou you want to log out?',
									icon: 'question',
									showCancelButton: true,
									confirmButtonColor: '#3085d6',
									cancelButtonColor: '#d33',
									confirmButtonText: 'Yes, Logout!',
								}).then(result => {
									if (result.isConfirmed) {
										dispatch(logout());
										dispatch(updateSigninSideVisible(true));
									}
								});
							}}>
							Logout
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
