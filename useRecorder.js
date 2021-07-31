import { useEffect, useState } from 'react';
import { convertBlobToBase64 } from './utils/functions';
const useRecorder = () => {
	const [audioURL, setAudioURL] = useState('');
	const [isRecording, setIsRecording] = useState(false);
	const [recorder, setRecorder] = useState(null);

	useEffect(() => {
		// Lazily obtain recorder first time we're recording.
		if (recorder === null) {
			if (isRecording) {
				requestRecorder().then(setRecorder, console.error);
			}
			return;
		}

		// Manage recorder state.
		if (isRecording) {
			recorder.start();
		} else {
			recorder.stop();
		}

		// Obtain the audio when ready.
		const handleData = async (e) => {
			console.log(
				'🚀 ~ file: useRecorder.js ~ line 28 ~ handleData ~ e',
				e.data
			);

			const reader = new FileReader();
			reader.onerror = (e) => console.log(e);
			reader.onload = () => {
				console.log(reader.result);
				const blog = new Blob([reader.result], { type: 'text/plain' });
				// console.log(blog);

				// blog.read().then((res) => console.log(res));
			};
			reader.readAsText(e.data);

			// const blog = new Blob(e.data, { type: 'text/plain' });
			// console.log(blog);
			// const handleSuccess = function (stream) {
			// const context = new AudioContext();
			// const source = context.createMediaStreamSource(e.data);
			// const processor = context.createScriptProcessor(1024, 1, 1);

			// source.connect(processor);
			// processor.connect(context.destination);

			// processor.onaudioprocess = function (e) {
			// 	// Do something with the data, e.g. convert it to WAV
			// 	console.log(e.inputBuffer);
			// };
			// };

			// const d = await convertBlobToBase64(e.data);
			// console.log(d);
			setAudioURL(URL.createObjectURL(e.data));
		};

		// const mediaRecorder = new MediaRecorder(stream, options);

		// mediaRecorder.addEventListener('dataavailable', function (e) {
		// 	if (e.data.size > 0) {
		// 		recordedChunks.push(e.data);
		// 	}

		// 	if (shouldStop === true && stopped === false) {
		// 		mediaRecorder.stop();
		// 		stopped = true;
		// 	}
		// });

		recorder.addEventListener('dataavailable', handleData);
		return () => recorder.removeEventListener('dataavailable', handleData);
	}, [recorder, isRecording]);

	const startRecording = () => {
		setIsRecording(true);
	};

	const stopRecording = () => {
		setIsRecording(false);
	};

	return [audioURL, isRecording, startRecording, stopRecording];
};

async function requestRecorder() {
	const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
	return new MediaRecorder(stream);
}

async function avc() {
	const mediaRecorder = new MediaRecorder(stream, options);

	mediaRecorder.addEventListener('dataavailable', function (e) {
		if (e.data.size > 0) {
			recordedChunks.push(e.data);
		}

		if (shouldStop === true && stopped === false) {
			mediaRecorder.stop();
			stopped = true;
		}
	});
}

export default useRecorder;
