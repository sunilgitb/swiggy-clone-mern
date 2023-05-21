import './CheckoutPage.scss';
import PaddingTop from '../../utils/PaddingTop';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IMG_LINK } from '../../utils/config';
import { BiMinus, BiPlus } from 'react-icons/bi';
import {
	clearCart,
	decreaseQuantity,
	increaseQuantity,
	removeFromCart,
} from '../../redux/slice/cartSlice';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let timer;
const CheckoutPage = () => {
	const cart = useSelector(state => state.cart.items);
	const userAuth = useSelector(state => state.auth.isAuth);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isOrdered, setIsOrdered] = useState(false);
	window.scrollTo(0, 0);
	if (cart.length === 0) {
		return (
			<PaddingTop>
				<div className="error-wrapper">
					<div className="error">
						<img
							className="img"
							src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
						/>
						<h1>Your cart is empty</h1>
						<p>You can go to home page to view more restaurants</p>
						<div className="links">
							<span
								onClick={() => {
									navigate('/');
								}}
								className="retry">
								SEE RESTAURANTS NEAR YOU
							</span>
						</div>
					</div>
				</div>
			</PaddingTop>
		);
	}

	return (
		<PaddingTop>
			{isOrdered && (
				<div
					onClick={() => {
						setIsOrdered(false);
						dispatch(clearCart());
						navigate('/');
					}}
					className="success-modal">
					<div onClick={e => e.stopPropagation()} className="modal">
						<div className="top">Order List - </div>
						<ol>
							{cart.map(el => (
								<li>{el?.info?.name}</li>
							))}
						</ol>
						<div>Order Successful!</div>
					</div>
				</div>
			)}
			<div className="checkout-wrapper">
				<div className="checkout">
					<div className="nav">
						<button
							className="bck"
							onClick={() => {
								navigate(-1);
							}}>
							Back
						</button>
						<button
							className="clr"
							onClick={() => {
								dispatch(clearCart());
							}}>
							Clear Cart
						</button>
					</div>
					<div className="items-wrapper">
						{cart.map(el => (
							<div key={uuidv4()} className="item">
								<div className="name">
									{el?.info?.imageId ? (
										<img
											className="img"
											src={IMG_LINK + el?.info?.imageId}
										/>
									) : (
										<div className="img">NO IMG</div>
									)}

									<span>{el?.info?.name}</span>
								</div>
								<div className="controls">
									<div>
										<span
											onClick={() => {
												if (el?.quantity > 1) {
													dispatch(
														decreaseQuantity(
															el?.info?.id
														)
													);
												} else if (el?.quantity === 1) {
													dispatch(
														removeFromCart(
															el?.info?.id
														)
													);
												}
											}}
											className="btns">
											<BiMinus />
										</span>
										<span>{el?.quantity}</span>
										<span
											onClick={() => {
												dispatch(
													increaseQuantity(
														el?.info?.id
													)
												);
											}}
											className="btns">
											<BiPlus />
										</span>
									</div>
								</div>
								<div className="price">
									₹
									{(el?.info?.price
										? (el?.info?.price * el?.quantity) / 100
										: el?.info?.defaultPrice
										? (el?.info?.defaultPrice *
												el?.quantity) /
										  100
										: el?.info?.variantsV2
												?.pricingModels?.[0]?.price /
										  100
									).toLocaleString()}
								</div>
							</div>
						))}
					</div>
					<div className="price-box">
						<span className="price-tag">Total Amount</span>
						<span className="price">
							₹{' '}
							{(
								cart?.reduce((acc, el) => {
									return el?.info?.price
										? acc + el?.info?.price * el?.quantity
										: el?.info?.defaultPrice
										? acc +
										  el?.info?.defaultPrice * el?.quantity
										: acc +
										  el?.info?.variantsV2
												?.pricingModels?.[0]?.price *
												el?.quantity;
								}, 0) / 100
							).toLocaleString()}
						</span>
					</div>
					<div
						onClick={() => {
							if (!userAuth) {
								return toast.error('Please login first!', {
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
							setIsOrdered(true);
							clearTimeout(timer);
							toast.success('Order Successful!', {
								position: 'bottom-right',
								autoClose: 4000,
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: undefined,
								theme: 'colored',
							});
							timer = setTimeout(() => {
								setIsOrdered(false);
								dispatch(clearCart());
								navigate('/');
							}, 5000);
						}}
						className="order-box">
						<button>Order</button>
					</div>
				</div>
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
		</PaddingTop>
	);
};

export default CheckoutPage;
