import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { tracks as trackData } from '../../shared/staticData';
import Head from 'next/head';
import {
	AddToPlaylist,
	AppleMusic,
	DotMenu,
	PauseSVG,
	PlaySVG,
} from '../../components/SVGs';
import { genreColors } from '../../shared/constants';
import { useMediaQuery } from '../../shared/utils';
import axios from 'axios';
import APICallStatus from '../../components/APICallStatus';
import TrackCard from '../../components/TrackCard';

const List = () => {
	const router = useRouter();
	const isMobile = useMediaQuery('(max-width: 380px)');

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [tracks, setTracks] = useState([]);
	const [selectedTrack, setSelectedTrack] = useState();

	const [audio, setAudio] = useState(null);
	const [playing, setPlaying] = useState(false);

	useEffect(() => {
		if (audio) {
			audio.addEventListener('ended', () => setPlaying(false));
			return () => {
				audio.removeEventListener('ended', () => setPlaying(false));
			};
		}
	}, [playing]);

	const start = () => {
		if (audio) {
			audio.play();
			setPlaying(true);
		}
	};
	const stop = () => {
		if (audio) {
			audio.pause();
			setPlaying(false);
		}
	};

	// const getCharts = async () => {};

	useEffect(() => {
		if (router.query.id) {
			(async function () {
				try {
					setLoading(true);
					const { data } = await axios({
						method: 'GET',
						url: 'https://shazam.p.rapidapi.com/charts/track',
						params: {
							locale: 'en-US',
							pageSize: '20',
							startFrom: '0',
							listId: router.query.id,
						},
						headers: {
							'x-rapidapi-key':
								process.env.NEXT_PUBLIC_SHAZAM_RAPID_API_KEY,
							'x-rapidapi-host': 'shazam.p.rapidapi.com',
						},
					});
					setTracks(data.tracks);
				} catch (error) {
					setError('Something went wrong, please try again later.');
				} finally {
					setLoading(false);
				}
			})();
		}
	}, [router.query.id]);

	return (
		<div className='bg-white flex-1 flex flex-col pb-40'>
			<Head>
				<title>Tracks | Shazam</title>
			</Head>
			{loading ? (
				<APICallStatus status='Loading Tracks...' />
			) : error ? (
				<APICallStatus status={error} />
			) : (
				<>
					<div className='max-w-screen-xl mx-auto mt-10'>
						<h2 className='text-gray-800 font-bold text-3xl text-center'>
							Tracks
						</h2>
					</div>
					<div className='flex flex-col max-w-screen-xl mx-auto mt-10 w-full'>
						{React.Children.toArray(
							tracks.map((track, index) => (
								<TrackCard
									audio={audio}
									isMobile={isMobile}
									index={index}
									track={track}
									setSelectedTrack={setSelectedTrack}
									setPlaying={setPlaying}
									setAudio={setAudio}
								/>
							))
						)}
					</div>
					{selectedTrack && (
						<div
							className='fixed  px-4 py-2 bg-white bottom-0 w-screen'
							style={{
								borderTop: '2px solid #eaeaea',
							}}
						>
							<div className='flex flex row justify-between px-3 max-w-screen-xl mx-auto '>
								<div className='w-full flex flex-row'>
									<div className='overflow-hidden rounded-sm relative hidden lg:block'>
										<img
											src={selectedTrack.images.coverart}
											draggable={false}
											width={60}
											height={60}
										/>
									</div>

									<div className='flex flex-col justify-center ml-3 w-12/12 lg:w-2/12 order-1 justify-self-start lg:order-1'>
										<p className='uppercase text-gray-700 text-xs font-bold'>
											Now Previewing
										</p>
										<h6 className='font-black text-sm'>
											{selectedTrack.title}
										</h6>
										<h6 className='text-xs font-bold text-gray-400 overflow-ellipsis truncate'>
											{selectedTrack.subtitle}
										</h6>
									</div>
								</div>
								<div className='p-2 w-10 h-10 relative rounded-md ml-4 mr-2 self-center order-2 lg:order-2'>
									<div
										className={`inset-0 absolute cursor-pointer`}
										onClick={playing ? stop : start}
									>
										<div className='bg-gray-800 rounded-full flex items-center justify-center h-10 w-10'>
											{playing ? (
												<PauseSVG
													fill='#fff'
													height={15}
													width={15}
												/>
											) : (
												<PlaySVG fill='#fff' />
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default List;
