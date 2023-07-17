import { useEffect, useState } from 'react';
import './PlaceBox.scss';
import { RxCross1 } from 'react-icons/rx';
import { CiLocationOn } from 'react-icons/ci';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { changeLocation } from '../../redux/slice/locationSlice';

let timestamp;
const PlaceBox = ({ setIsPlaceBoxVisible }) => {
  const [state, setState] = useState({
    area: '',
  });
  const [places, setPlaces] = useState([]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const changeHandler = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const getPlaceData = async placeId => {
    setIsPlaceBoxVisible(false);

    try {
      const { data } = await axios.get(
        `https://corsproxy.io/?https://www.swiggy.com/dapi/misc/address-recommend?place_id=${placeId}`
      );

      dispatch(
        changeLocation({
          ...data?.data?.[0]?.geometry?.location,
          place_type: data?.data?.[0]?.place_type,
          formatted_address: data?.data?.[0]?.formatted_address,
        })
      );
      window.localStorage.setItem(
        'locationInfo',
        JSON.stringify({
          ...data?.data?.[0]?.geometry?.location,
          place_type: data?.data?.[0]?.place_type,
          formatted_address: data?.data?.[0]?.formatted_address,
        })
      );
    } catch (error) {
      setIsPlaceBoxVisible(true);
    }
  };

  useEffect(() => {
    if (state.area.trim() === '') return;

    const getData = async () => {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://corsproxy.io/?https://www.swiggy.com/dapi/misc/place-autocomplete?input=${state?.area}&types=`
      );
      setPlaces(data?.data);
      setIsLoading(false);
    };
    clearTimeout(timestamp);
    timestamp = setTimeout(() => {
      getData();
    }, 1500);
  }, [state]);

  return (
    <div className="place-box">
      <RxCross1 className="icon" onClick={() => setIsPlaceBoxVisible(false)} />
      <input
        type="text"
        value={state.area}
        onChange={changeHandler}
        name="area"
        placeholder="Search for area, street name.."
      />
      {isLoading && (
        <div className="loading-animation">
          <div className="circle"></div>
        </div>
      )}
      {places?.length > 0 && !isLoading && (
        <div className="place-wrapper">
          {places.map(el => (
            <div
              onClick={() => getPlaceData(el?.place_id)}
              key={el?.description}
              className="place">
              <CiLocationOn className="icon" />
              <div>
                <p className="main_text">
                  {el?.structured_formatting?.main_text}
                </p>
                <p>{el?.structured_formatting?.secondary_text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaceBox;
