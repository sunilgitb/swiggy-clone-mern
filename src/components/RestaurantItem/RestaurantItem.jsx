import { IMG_LINK } from '../../utils/config';
import './RestaurantItem.scss';
import { AiFillStar } from 'react-icons/ai';
import { ReactComponent as VegIcon } from './../../assets/icons/veg.svg';
import { ReactComponent as NonVegIcon } from './../../assets/icons/nonveg.svg';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slice/cartSlice';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { useState } from 'react';

const RestaurantItem = data => {
	// console.log(data?.card?.info);
	const dispatch = useDispatch();
	return (
		<div className="restaurant-item-wrapper">
			<div className="restaurant-item">
				{/* <div className="restaurant-info">{data?.card?.info?.name}</div> */}
				<div className="info">
					<span className="tag">
						{data?.card?.info?.itemAttribute?.vegClassifier ===
						'VEG' ? (
							<VegIcon className="veg-nonveg-icon" />
						) : (
							<NonVegIcon className="veg-nonveg-icon" />
						)}
						{data?.card?.info?.ribbon?.text && (
							<AiFillStar className="icon" />
						)}
						<span>{data?.card?.info?.ribbon?.text}</span>
					</span>

					<span className="title">{data?.card?.info?.name}</span>
					<span className="price">
						{data?.card?.info?.price / 100} ₹
					</span>
					<span className="desc">
						{data?.card?.info?.description}
					</span>
				</div>
				<div className="img">
					{data?.card?.info?.imageId && (
						<img
							src={`${IMG_LINK}/${data?.card?.info?.imageId}`}
							alt={data?.card?.info?.name}
						/>
					)}

					<button
						onClick={() => {
							dispatch(
								addToCart({
									...data.card,
									quantity: 1,
								})
							);
						}}
						className="add-btn"
						style={{
							transform: data?.card?.info?.imageId
								? 'translateX(-50%)'
								: 'translateX(-110%)',
						}}>
						ADD
					</button>
				</div>
			</div>
		</div>
	);
};

export default RestaurantItem;
