import { useDispatch, useSelector } from 'react-redux';
import './Profile.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { logout } from '../../redux/slice/authSlice';
import { toast } from 'react-toastify';

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
								dispatch(logout());
								toast.warn('Logout successfull!', {
									position: 'bottom-right',
									autoClose: 5000,
									hideProgressBar: false,
									closeOnClick: true,
									pauseOnHover: true,
									draggable: true,
									progress: undefined,
									theme: 'colored',
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
