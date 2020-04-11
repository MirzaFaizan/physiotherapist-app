import React, { useRef, useState } from 'react';

export default function SelectMedia({ type, setType, setFile, setOpen }) {
	const imageFile = useRef(null);
	const videoFile = useRef(null);

	const onFileChange = event => {
		if (event.target.files && event.target.files[0]) {
			let img = event.target.files[0];
			setFile(img);
			setOpen(false);
		}
	};
	const onImageClick = filetype => {
		setType(filetype);

		imageFile.current.click();
	};
	const onVideoClick = filetype => {
		setType(filetype);
		videoFile.current.click();
	};
	return (
		<div className="m-2 custom-media-select text-custom-blue border border-radius shadow position-absolute bg-white">
			<input
				type="file"
				id="image"
				accept="image/x-png,image/gif,image/jpeg"
				ref={imageFile}
				style={{ display: 'none' }}
				onChange={onFileChange}
				name="image"
			/>
			<div className="p-2 font-weight-bold" type="button" onClick={() => onImageClick('image')}>
				<i class="fas fa-images mx-2" /> Upload Picture
			</div>
			<input
				type="file"
				id="video"
				accept="video/mp4"
				ref={videoFile}
				style={{ display: 'none' }}
				onChange={onFileChange}
				name="video"
			/>
			<div className="p-2 font-weight-bold" type="button" onClick={() => onVideoClick('video')}>
				<i className="fas fa-video mx-2" /> Upload Video
			</div>
		</div>
	);
}
