import React, { useRef, useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { ToastContainer, createNotification } from '../components/Toast';
import { useForm } from 'react-hook-form';
import api from '../apiCalls/api';
export default function AddCLient() {
	const inputFile = useRef(null);
	const [file, setFile] = useState('');
	const [imageData, setImagedata] = useState('');
	const { register, handleSubmit, errors } = useForm();
	const [getAllExercise, setAllExercise] = useState([]);
	const intialState = {
		percentage: 0
	};
	let [uploadPercentage, onUploadProgress] = useState(intialState);
	useEffect(() => {
		api.getAllExercise().then(allExecersie => {
			console.log(allExecersie);
			setAllExercise(allExecersie.data);
		});
	}, []);
	const onSubmit = data => {
		let formdata = new FormData();
		console.log('hello');
		for (let key in data) {
			if (data.hasOwnProperty(key)) {
				formdata.append('' + key + '', data[key]);
			}
		}
		console.log(imageData);
		formdata.append('file', imageData);
		const options = {
			onUploadProgress: ProgressEvent => {
				const { loaded, total } = ProgressEvent;
				let percent = Math.floor((loaded * 100) / total);
				console.log(`${loaded}kb, of ${total} of ${percent}`);
				if (percent < 100) {
					onUploadProgress({ percentage: percent });
				}
			}
		};
		api.addClient(formdata)
			.then(result => {
				onUploadProgress({ percentage: 100 }, () => {
					setTimeout(() => {
						onUploadProgress({ percentage: 0 });
					}, 1000);
				});
				createNotification('success', result.data.Message);
				setTimeout(() => {
					window.location.reload('/');
				}, 1000);
			})
			.catch(error => {
				createNotification('error', 'duplicate email error');
			});
	};
	let selectOption = getAllExercise.map(exercise => {
		return <option value={exercise.name}>{exercise.name}</option>;
	});

	//to get image
	const onImageChange = event => {
		if (event.target.files && event.target.files[0]) {
			let img = event.target.files[0];
			console.log(img);
			setFile(URL.createObjectURL(event.target.files[0]));
			setImagedata(img);
		}
	};
	//send data to api

	const onImageClick = () => {
		inputFile.current.click();
	};

	return (
		<div className="col-sm-12 text-center">
			<ToastContainer />
			<h3>Add Client</h3>
			<form className="col-sm-12 text-left d-flex flex-wrap" id="addClient">
				<div className="col-sm-4 justify-content-center align-items-center d-flex flex-column">
					<div
						className={`plus-circle img-circle
             ${file ? '' : `background-active`}
              shadow client-image d-flex text-center justify-content-center align-items-center p-2 mr-2`}
						type="button"
						onClick={onImageClick}
					>
						<input
							type="file"
							id="file"
							accept="image/png/jpeg"
							ref={inputFile}
							style={{ display: 'none' }}
							onChange={onImageChange}
							name="file"
						/>
						{file ? (
							<img src={file} alt="" className="img-circle" />
						) : (
							<i className="fas fa-plus text-grey font-36px text-light" />
						)}
					</div>
					<div>
						<h4 className="py-2">Add Media</h4>
						<p>
							<ProgressBar
								className="pl-5"
								active
								variant="success"
								now={uploadPercentage.percentage}
								label={`${uploadPercentage.percentage}%`}
							/>
						</p>
					</div>
				</div>
				<div className="col-sm-8 justify-content-center d-flex flex-column">
					<div className="d-flex mb-3">
						{errors.name && <span className="font-weight-bold text-danger">*</span>}
						Name
						<div className="mx-3 w-25 border-bottom-custom">
							<input
								type="text"
								className="border-0 w-100"
								name="name"
								ref={register({ required: true, maxLength: 20 })}
							/>
						</div>
						{errors.lastname && <span className="font-weight-bold text-danger">*</span>}
						Last Name
						<div className="ml-3 w-25 border-bottom-custom">
							<input
								type="text"
								className="border-0 w-100"
								name="lastname"
								ref={register({ required: true, maxLength: 20 })}
							/>
						</div>
					</div>
					<div className="d-flex mb-3">
						{errors.age && <span className="font-weight-bold text-danger">*</span>} Age &nbsp; &nbsp;
						<div className="mx-3 w-25 border-bottom-custom">
							<input
								type="text"
								className="border-0 w-100"
								name="age"
								ref={register({ required: true, maxLength: 20 })}
							/>
						</div>
						Height
						<div className="ml-3 w-25 border-bottom-custom">
							<input
								type="text"
								className="border-0 w-100"
								name="height"
								ref={register({ required: false, maxLength: 20 })}
							/>{' '}
						</div>
					</div>
					<div className="d-flex mb-3">
						{errors.number && <span className="font-weight-bold text-danger">*</span>} Number
						<div className="mx-3 w-68 border-bottom-custom">
							<input
								type="number"
								className="border-0 w-100"
								name="phoneNumber"
								ref={register({ required: true, minLength: 6, maxLength: 16 })}
							/>{' '}
						</div>
					</div>

					<div className="d-flex mb-3">
						{errors.contactmethod && <span className="font-weight-bold text-danger">*</span>} Preferred
						Contact Method
						<div className="col-md-6">
							<select className="custom-select" name="contactmethod" ref={register}>
								<option value="Whatsapp">Whatsapp</option>
								<option value="PhoneNumber">Phone Number</option>
							</select>
						</div>
					</div>
					<div className="d-flex mb-3">
						Weight
						<div className="mx-3 w-25 border-bottom-custom">
							<input
								type="text"
								className="border-0 w-100"
								name="weight"
								ref={register({ required: false, maxLength: 20 })}
							/>
						</div>
					</div>

					<div className="d-flex flex-column py-3">
						Problem Discription
						<div className="border-active mt-2 w-75 h-100">
							<textarea
								className="w-100 h-100 p-0 border-0"
								rows="3"
								cols="50"
								name="problem"
								ref={register({ required: false, maxLength: 20 })}
							/>
						</div>
					</div>
					<div className="d-flex mb-3">
						Email
						<div className="mx-3 w-30 border-bottom-custom">
							<input
								type="text"
								className="border-0 w-100"
								name="email"
								ref={register({ required: true })}
							/>
						</div>
					</div>
					<div className="d-flex mb-4">
						Excercises Assiged
						<div className="col-md-6">
							<select
								className="custom-select"
								name="excercise"
								ref={register({ required: true, maxLength: 20 })}
							>
								{selectOption}
							</select>
						</div>
					</div>
				</div>
			</form>
			<div className="col-sm-12 text-center p-3">
				<button className="btn btn-custom" type="submit" form="addClient" onClick={handleSubmit(onSubmit)}>
					Save
				</button>
			</div>
		</div>
	);
}
