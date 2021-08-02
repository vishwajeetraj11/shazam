import axios from 'axios';
import { useState } from 'react';
import useRecorder from '../useRecorder';
import { fetchAsBlob, convertBlobToBase64 } from '../utils/functions';
import { rawAudio } from '../utils/demoData';

export default function Home() {
	let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
	const [loading, setLoading] = useState(false);

	const start = () => {
		setLoading(false);
		startRecording(true);

		// const handleSuccess = function (stream) {
		// 	const context = new AudioContext();
		// 	const source = context.createMediaStreamSource(stream);
		// 	const processor = context.createScriptProcessor(1024, 1, 1);

		// 	source.connect(processor);
		// 	processor.connect(context.destination);

		// 	processor.onaudioprocess = function (e) {
		// 		// Do something with the data, e.g. convert it to WAV
		// 		console.log(e.inputBuffer);
		// 	};
		// };

		// navigator.mediaDevices
		// 	.getUserMedia({ audio: true, video: false })
		// 	.then(handleSuccess);
		// const mediaRecorder = new MediaRecorder(mediaStream);
		// mediaRecorder.ondataavailable = async (blob) =>
		// 	console.log(await blob.data.arrayBuffer());
		// mediaRecorder.start(100);

		// navigator.mediaDevices
		// 	.getUserMedia({ audio: true })
		// 	.then(spectrum)
		// 	.catch(console.log);

		// function spectrum(stream) {
		// 	const audioCtx = new AudioContext();
		// 	const analyser = audioCtx.createAnalyser();
		// 	audioCtx.createMediaStreamSource(stream).connect(analyser);

		// 	const canvas = document
		// 		.querySelector('.apple')
		// 		.appendChild(document.createElement('canvas'));
		// 	canvas.width = window.innerWidth - 20;
		// 	canvas.height = window.innerHeight - 20;
		// 	const ctx = canvas.getContext('2d');
		// 	const data = new Uint8Array(canvas.width);
		// 	ctx.strokeStyle = 'rgb(0, 125, 0)';

		// 	setInterval(() => {
		// 		ctx.fillStyle = '#a0a0a0';
		// 		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// 		analyser.getByteFrequencyData(data);
		// 		ctx.lineWidth = 2;
		// 		let x = 0;
		// 		for (let d of data) {
		// 			const y = canvas.height - ((d / 128) * canvas.height) / 4;
		// 			const c = Math.floor((x * 255) / canvas.width);
		// 			ctx.fillStyle = `rgb(${c},0,${255 - x})`;
		// 			ctx.fillRect(x++, y, 2, canvas.height - y);
		// 		}

		// 		analyser.getByteTimeDomainData(data);
		// 		ctx.lineWidth = 5;
		// 		ctx.beginPath();
		// 		x = 0;
		// 		for (let d of data) {
		// 			const y = canvas.height - ((d / 128) * canvas.height) / 2;
		// 			x ? ctx.lineTo(x++, y) : ctx.moveTo(x++, y);
		// 		}
		// 		ctx.stroke();
		// 	}, (1000 * canvas.width) / audioCtx.sampleRate);
		// }
	};

	const stop = () => {
		stopRecording();
		setLoading(false);

		// fetchAsBlob(audioURL)
		// .then((res) => new File([res], 'file', { type: 'audio/mp3' }))
		// .then(async (res) => {
		// console.log(res);
		// try {
		// const {data} = await axios({
		// 	url: 'https://shazam.p.rapidapi.com/songs/detect',
		// 	method: 'POST',
		// 	headers: {
		// 		'content-type': 'text/plain',
		// 		'x-rapidapi-key':
		// 			'7d3b070545mshbeb44935b5447f6p1e6807jsn529c225c90c8',
		// 		'x-rapidapi-host': 'shazam.p.rapidapi.com',
		// 	},
		// 	data: xs,
		// });
		// console.log(data);
		// 	const formData = new FormData();
		// 	// formData.append('name', 'file');
		// 	formData.append('file', res);
		// 	const { data } = await axios({
		// 		url: 'https://music-identify.p.rapidapi.com/identify',
		// 		method: 'POST',
		// 		headers: {
		// 			'content-type': 'multipart/form-data',
		// 			'x-rapidapi-key':
		// 				'7d3b070545mshbeb44935b5447f6p1e6807jsn529c225c90c8',
		// 			'x-rapidapi-host': 'music-identify.p.rapidapi.com',
		// 		},
		// 		data: formData,
		// 	});
		// 	console.log(data);
		// } catch (e) {
		// 	console.log({ error: e });
		// 	console.log({ errData: e.response?.data });
		// } finally {
		// 	setLoading(false);
		// }
		// }

		// );
	};

	return (
		<div>
			<button disabled={loading || isRecording} onClick={start}>
				start rec
			</button>
			<button onClick={stop}>stop rec</button>
			<div className='apple'></div>
		</div>
	);
}
