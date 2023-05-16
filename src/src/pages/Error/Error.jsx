import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import PaddingTop from '../../utils/PaddingTop';

const Error = () => {
	const { statusText, status } = useRouteError();
	return (
		<PaddingTop>
			<div className="error-wrapper">
				<h1>Oups..!!!</h1>
				<h3>Somthing went wrong...</h3>
				<h3>
					<span>
						{status} : {statusText}
					</span>
				</h3>
				<Link className="go-to-home" to={'/'}>
					Go to Home
				</Link>
			</div>
		</PaddingTop>
	);
};

export default Error;
