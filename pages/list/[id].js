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

const List = () => {
    const router = useRouter();
    const isMobile = useMediaQuery('(max-width: 380px)');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [tracks, setTracks] = useState(trackData);
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

    const getCharts = async () => {
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
        } catch (error) {
            setError('Something went wrong, please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log(router.query.id);
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
                            tracks.map((track, index) => {
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
                                    setAudio(
                                        new Audio(track.hub.actions[1].uri)
                                    );
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
                                                <div className='overflow-hidden rounded-sm relative' style={{ overflow: 'hidden', height: 60, width: 60, borderRadius: 6 }}>
                                                    <img
                                                        draggable={false}
                                                        className=''
                                                        src={
                                                            track.images
                                                                .coverart
                                                        }
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                    <div
                                                        className={`inset-0 absolute cursor-pointer transition-all duration-400 flex items-center justify-center  ${showPlay
                                                            ? 'opacity-100 visible'
                                                            : 'opacity-0 invisible'
                                                            }`}
                                                    >
                                                        <div
                                                            className='bg-gray-800 
                                                        rounded-full p-4'
                                                        >
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
                                                            ? track.title.slice(
                                                                0,
                                                                14
                                                            ) + '...'
                                                            : track.title}
                                                    </h4>
                                                    <h3 className='text-xs lg:text-sm font-bold text-gray-500'>
                                                        {isMobile && track.subtitle.length >
                                                            14
                                                            ? track.subtitle.slice(
                                                                0,
                                                                14
                                                            ) + '...'
                                                            : track.subtitle}
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className='flex flex-row'>
                                                <a
                                                    target='_blank'
                                                    href={
                                                        track.hub.options[0]
                                                            .actions[0].uri
                                                    }
                                                >
                                                    <div className='p-2 bg-gray-800 rounded-md mr-2'>
                                                        <AppleMusic
                                                            height={10}
                                                            fill={'#fff'}
                                                        />
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </>
                                );
                            })
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
