import React, { useState, useEffect } from 'react';
import { chartsList } from '../shared/staticData';
import { genreColors } from '../shared/constants';
import Link from 'next/link';
import axios from 'axios';
import APICallStatus from '../components/APICallStatus';

const Index = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	// const [countries, setCountries] = useState([]);
	const [countries, setCountries] = useState(chartsList.countries);
	// const [globalGenres, setGlobalGenres] = useState([]);
	const [globalGenres, setGlobalGenres] = useState(chartsList.global.genres);

	const getCharts = async () => {
		try {
			setLoading(true);
			const { data } = await axios({
				method: 'GET',
				url: 'https://shazam.p.rapidapi.com/charts/list',
				headers: {
					'x-rapidapi-key':
						process.env.NEXT_PUBLIC_SHAZAM_RAPID_API_KEY,
					'x-rapidapi-host': 'shazam.p.rapidapi.com',
				},
			});
			setCountries(data.countries);
			setGlobalGenres(data.global.genres);
		} catch (error) {
			setError('Something went wrong, please try again later.');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		// getCharts();
	}, []);

	return (
		<div className='bg-white flex-1 flex flex-col'>
			{loading ? (
				<APICallStatus status='Loading Charts...' />
			) : error ? (
				<APICallStatus status={error} />
			) : (
				<>
					<div className='max-w-screen-xl mx-auto mt-10'>
						<h2 className='text-gray-800 font-bold text-3xl text-center'>
							Global Genres
						</h2>
					</div>
					<div className='flex flex-row overflow-x-auto whitespace-nowrap mt-8 horizontal-scroll'>
						{React.Children.toArray(
							globalGenres.map((genre) => (
								<Link href={`/list/${genre.listid}`}>
									<a>
										<h6
											className='py-3 px-8 rounded-sm mx-6 text-white mb-2'
											style={{
												backgroundColor:
													genreColors[
														Math.floor(
															Math.random() *
																genreColors.length
														)
													],
											}}
										>
											{genre.name}
										</h6>
									</a>
								</Link>
							))
						)}
					</div>
					<div className='max-w-screen-xl mx-auto mt-10'>
						<h2 className='text-gray-800 font-bold text-3xl text-center'>
							Countries
						</h2>
					</div>
					<div className='flex flex-col'>
						{React.Children.toArray(
							countries.map((country) => {
								const color =
									genreColors[
										Math.floor(
											Math.random() * genreColors.length
										)
									];
								return (
									<div
										className='mx-6 my-8 rounded-sm p-6'
										style={{ backgroundColor: color }}
									>
										<Link href={`/list/${country.listid}`}>
											<a>
												<h6 className='py-3 rounded-sm text-white mb-4 text-xl tracking-wide font-light'>
													{country.name}
												</h6>
											</a>
										</Link>
										<div className='flex flex-row overflow-x-auto whitespace-nowrap mt-8 horizontal-scroll'>
											{React.Children.toArray(
												country?.cities.map((city) => (
													<Link
														href={`/list/${city.listid}`}
													>
														<a>
															<p
																className='px-4 py-2 bg-white text-indigo-600 mr-6 mb-6 rounded-full'
																style={{
																	color,
																}}
															>
																{city.name}
															</p>
														</a>
													</Link>
												))
											)}
										</div>
									</div>
								);
							})
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default Index;
