import React from 'react';

const PaddingTop = props => {
	return (
		<div
			style={{
				paddingTop: '80px',
			}}>
			{props.children}
		</div>
	);
};

export default PaddingTop;
