import React from 'react';
import { ShazamSVG } from './SVGs';
import Link from 'next/link';
import { getLogoStyle } from '../shared/constants';
import Head from 'next/head';

const Header = () => {
	return (
		<div className='bg-gray-300 px-20 py-16 bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900'>
			<Head>
				<title>Shazam</title>
			</Head>
			<h1 className='font-mulish text-5xl font-bold text-center text-white'>
				Shazam
			</h1>
		</div>
	);
};

export default Header;
