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

const CheckoutPage = () => {
	const cart = useSelector(state => state.cart);
	const navigate = useNavigate();
	const dispatch = useDispatch();
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
											src={
												IMG_LINK +
												'/' +
												el?.info?.imageId
											}
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
									₹{(el?.info?.price * el?.quantity) / 100}
								</div>
							</div>
						))}
					</div>
					<div className="order-box">
						<button>Order</button>
					</div>
				</div>
			</div>
		</PaddingTop>
	);
};

export default CheckoutPage;
