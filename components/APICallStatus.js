import React from 'react';

const APICallStatus = ({ status }) => {
	return (
		<h2 className='text-center text-3xl font-medium font-extrabold mt-5 flex-1 flex items-center justify-center'>
			{status}
		</h2>
	);
};

export default APICallStatus;
