import './Home.scss';
import PaddingTop from '../../utils/PaddingTop';
import CarouselCard from '../../components/CarouselCard/CarouselCard';
import HotelCard from '../../components/HotelCard/HotelCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ALL_RESTAURANTS_API_LINK } from '../../utils/config';
import Loading from '../../components/Loading/Loading';
import { v4 as uuidv4 } from 'uuid';
import Error from '../Error/Error';
import staticRestaurant from './../../utils/restaurantList';

const Home = () => {
	const [carousels, setCarousels] = useState([]);
	const [allRestaurants, setAllRestaurants] = useState([]);
	const [filterAllRestaurants, setFilterAllRestaurants] = useState([]);
	const [activeFilter, setActiveFilter] = useState('relevance');
	const [apiFailed, setApiFaildes] = useState('');
	document.title = `Swiggy Clone - Vivek Kumar`;
	const getAllRestaurants = async () => {
		try {
			const { data } = await axios.get(ALL_RESTAURANTS_API_LINK);
			setCarousels(data?.data?.cards?.[0]?.data?.data?.cards);
			setAllRestaurants(data?.data?.cards?.[2]?.data?.data?.cards);
			setFilterAllRestaurants(data?.data?.cards?.[2]?.data?.data?.cards);
		} catch (err) {
			try {
				setCarousels(
					staticRestaurant?.data?.cards?.[0]?.data?.data?.cards
				);
				setAllRestaurants(
					staticRestaurant?.data?.cards?.[2]?.data?.data?.cards
				);
				setFilterAllRestaurants(
					staticRestaurant?.data?.cards?.[2]?.data?.data?.cards
				);
			} catch (err) {
				setApiFaildes(err);
			}
		}
		window.scrollTo(0, 0);
	};
	// console.log(allRestaurants);
	useEffect(() => {
		getAllRestaurants();
	}, []);

	if (apiFailed) {
		return <Error {...apiFailed} />;
	}

	return filterAllRestaurants?.length === 0 ? (
		<PaddingTop>
			<div className="carousel-loading">
				<div>
					<div className="animate"></div>
					<img
						src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa"
						alt="ice-cream"
					/>
				</div>
				<div>Looking for great food near you...</div>
			</div>
			<div
				style={{
					width: '70%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					margin: '1rem auto',
					gap: '1rem',
					flexWrap: 'wrap',
				}}>
				{new Array(12).fill(0).map(() => (
					<Loading key={uuidv4()} />
				))}
			</div>
		</PaddingTop>
	) : (
		<PaddingTop>
			<CarouselCard carousels={carousels} />
			<div className="home-wrapper">
				<div className="filters">
					<span>{filterAllRestaurants?.length} restaurants</span>
					<div>
						<span
							className={
								activeFilter === 'relevance'
									? 'border-black'
									: ''
							}
							onClick={() => {
								setActiveFilter('relevance');
								setFilterAllRestaurants(allRestaurants);
							}}>
							Relevance
						</span>
						<span
							className={
								activeFilter === 'delivery-time'
									? 'border-black'
									: ''
							}
							onClick={() => {
								setActiveFilter('delivery-time');
								const arr = filterAllRestaurants
									.slice()
									.sort(
										(a, b) =>
											a?.data?.sla?.deliveryTime -
											b?.data?.sla?.deliveryTime
									)
									.slice();
								setFilterAllRestaurants(arr);
							}}>
							Delivery Time
						</span>
						<span
							className={
								activeFilter === 'rating' ? 'border-black' : ''
							}
							onClick={() => {
								setActiveFilter('rating');
								const arr = filterAllRestaurants
									.slice()
									.sort(
										(a, b) =>
											b?.data?.avgRating -
											a?.data?.avgRating
									)
									.slice();
								setFilterAllRestaurants(arr);
							}}>
							Rating
						</span>
						<span
							className={
								activeFilter === 'lowtohigh'
									? 'border-black'
									: ''
							}
							onClick={() => {
								setActiveFilter('lowtohigh');
								const arr = filterAllRestaurants
									.slice()
									.sort(
										(a, b) =>
											a?.data?.costForTwo -
											b?.data?.costForTwo
									)
									.slice();
								setFilterAllRestaurants(arr);
							}}>
							Cost: Low To High
						</span>
						<span
							className={
								activeFilter === 'hightolow'
									? 'border-black'
									: ''
							}
							onClick={() => {
								setActiveFilter('hightolow');
								const arr = filterAllRestaurants
									.slice()
									.sort(
										(a, b) =>
											b?.data?.costForTwo -
											a?.data?.costForTwo
									)
									.slice();
								setFilterAllRestaurants(arr);
							}}>
							Cost: High To Low
						</span>
					</div>
				</div>
				<div className="cards">
					{filterAllRestaurants.map(restaurant => (
						<HotelCard key={uuidv4()} hotel={restaurant} />
					))}
				</div>
			</div>
		</PaddingTop>
	);
};

export default Home;
