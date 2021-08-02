import React, { useState } from 'react';
import { AddToPlaylist, AppleMusic } from './SVGs';

const TrackCard = ({
	index,
	setAudio,
	setPlaying,
	setSelectedTrack,
	track,
	isMobile,
	audio,
}) => {
	const [showPlay, setShowPlay] = useState(false);

	const onMouseEnter = () => {
		setShowPlay(true);
	};
	const onMouseLeave = () => {
		setShowPlay(false);
	};

	const onClick = () => {
		setSelectedTrack(track);
		if (audio) {
			audio.src = null;
			setPlaying(false);
		}
		setAudio(new Audio(track.hub.actions[1].uri));
	};

	return (
		<>
			<div
				className='p-1 sm:p-2 md:p-3 flex flex-row justify-between items-center hover:bg-gray-100 rounded-lg transition-all duration-300 cursor-pointer w-12/12 mx-2 lg:mx-0'
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				onClick={onClick}
			>
				<div className='flex flex-row items-center'>
					<p className='sm:text-sm lg:text-md font-black w-6 mr-3 lg:mr-6 text-right'>
						{index + 1}
					</p>
					<div
						className='overflow-hidden rounded-sm relative'
						style={{
							overflow: 'hidden',
							height: 60,
							width: 60,
							borderRadius: 6,
						}}
					>
						<img
							draggable={false}
							className=''
							src={track.images.coverart}
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'cover',
							}}
						/>
						<div
							className={`inset-0 absolute cursor-pointer transition-all duration-400 flex items-center justify-center  ${
								showPlay
									? 'opacity-100 visible'
									: 'opacity-0 invisible'
							}`}
						>
							<div className='bg-gray-800 rounded-full p-4'>
								<AddToPlaylist
									height={20}
									width={20}
									fill='#fff'
								/>
							</div>
						</div>
					</div>
					<div className='flex flex-col justify-center ml-4 w-5/12 sm:7/12 md:w-10/12 lg:w-auto'>
						<h4 className='text-sm lg:text-base font-black'>
							{isMobile && track.title.length > 14
								? track.title.slice(0, 14) + '...'
								: track.title}
						</h4>
						<h3 className='text-xs lg:text-sm font-bold text-gray-500'>
							{isMobile && track.subtitle.length > 14
								? track.subtitle.slice(0, 14) + '...'
								: track.subtitle}
						</h3>
					</div>
				</div>
				<div className='flex flex-row'>
					<a
						target='_blank'
						href={track.hub.options[0].actions[0].uri}
					>
						<div className='p-2 bg-gray-800 rounded-md mr-2'>
							<AppleMusic height={10} fill={'#fff'} />
						</div>
					</a>
				</div>
			</div>
		</>
	);
};

export default TrackCard;
