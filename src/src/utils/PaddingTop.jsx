import React from 'react';

const PaddingTop = ({ children }) => {
	return (
		<PaddingTop>
			<div
				style={{
					paddingTop: '100px',
				}}>
				{children}
			</div>
		</PaddingTop>
	);
};

export default PaddingTop;
