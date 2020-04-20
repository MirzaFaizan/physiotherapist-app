import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { ToastContainer, createNotification } from '../components/Toast';
import api from '../apiCalls/api';
import moment from 'moment';

export default function AddAssignedExcercises({ selectedClientId, setNewAssignData }) {
	const { register, handleSubmit, errors, watch } = useForm();
	const [getAllExercise, setAllExercise] = useState([]);
	const [busyDate, setBusyDate] = useState(false);
	const [busyDay, setBusyDay] = useState([]);
	const textAreaStyle = {
		height: '156px'
	};
	const divStyle = {
		opacity: '0'
	};
	console.log(selectedClientId);
	const onSubmit = data => {
		if (busyDate == true) {
			createNotification('error', 'Please enter another date beacuse its busy day');
		} else if (!data.userId) {
			createNotification('error', 'Please select any user');
		} else {
			api.assignExercise(data)
				.then(response => {
					setNewAssignData(response.data);
					createNotification('success', response.data.Message);
				})
				.catch(error => {
					createNotification('error', 'Error occur');
				});
		}
	};
	const onChangeHandler = event => {
		busyDay.map(result => {
			console.log(moment(result.date).format('YYYY-MM-DD'));
			console.log(event.target.value);
			if (moment(result.date).format('YYYY-MM-DD') === event.target.value) {
				setBusyDate(true);
			} else {
				setBusyDate(false);
			}
		});
	};
	useEffect(() => {
		api.getAllExercise().then(allExecersie => {
			if (allExecersie) {
				setAllExercise(allExecersie.data);
			}
		});
	}, []);
	useEffect(() => {
		api.getAllBusyDay(selectedClientId).then(getAllBusyDay => {
			if (getAllBusyDay) {
				setBusyDay(getAllBusyDay.data);
			}
		});
	}, [selectedClientId]);

	return (
		<form className="col-sm-12 text-center">
			<ToastContainer />
			<h3>Assign Excercise</h3>
			<div className="col-sm-12 d-flex">
				<div className="col-sm-6">
					<div className="d-flex">
						{errors.excercise && <span className="font-weight-bold text-danger">*</span>}
						<span className="col py-2">Excercise</span>
						<div className="col-sm-7 pl-0">
							<select
								className="custom-select rounded-pill border-dark"
								name="exercise"
								ref={register({ required: false })}
							>
								{getAllExercise.map(exercise => (
									<option value={exercise.name}>{exercise.name}</option>
								))}
							</select>
						</div>
					</div>
				</div>
				<div className="col-sm-6">
					<div className="d-flex">
						Sets
						<div className="ml-3 w-100 border-bottom-custom">
							<input
								type="text"
								className="border-0 w-100"
								name="sets"
								ref={register({ required: false })}
							/>
						</div>
					</div>
					{errors.sets && <span className="font-weight-bold text-danger">*</span>}
				</div>
			</div>
			<div className="col-sm-6">
				<div className="d-flex p-3">
					<span className="col">Start Date</span>
					<input
						className="col-sm-7  py-1 rounded-pill"
						type="date"
						data-date-format="YYYY MMMM DD"
						name="startDate"
						ref={register}
						onChange={onChangeHandler}
					/>
				</div>
				{errors.startDate && <span className="font-weight-bold text-danger">*</span>}
			</div>

			<div className="col-sm-6">
				<div className="d-flex p-3">
					<span className="col">End Date</span>
					<input
						className="col-sm-7 py-1 rounded-pill"
						type="date"
						data-date-format="YYYY MMMM DD"
						name="endDate"
						ref={register}
						onChange={onChangeHandler}
					/>
				</div>
				{errors.endDate && <span className="font-weight-bold text-danger">*</span>}
			</div>
			<div className="col-sm-6">
				<div className="d-flex p-3">
					<span className="col ml-3">Busy Period</span>

					<textarea
						className="col-12"
						type="date"
						style={textAreaStyle}
						value={busyDay.map(busy => {
							let newDate = new Date(busy.date);
							let date = `${newDate.getFullYear()}/${newDate.getMonth() + 1}/${newDate.getDate()}  `;
							return date;
						})}
						data-date-format="YYYY MMMM DD"
						name="busyDate"
						ref={register}
					/>
				</div>
			</div>
			<div className="col-sm-12">
				<div className="d-flex p-3">
					Reps
					<div className="ml-3 w-100 border-bottom-custom">
						<input type="text" className="border-0 w-100" name="reps" ref={register({ required: false })} />
					</div>
				</div>
				{errors.reps && <span className="font-weight-bold text-danger">*</span>}
			</div>

			<div className="col-sm-12">
				<div className="d-flex" style={divStyle}>
					UserId
					<div className="ml-3 w-100 border-bottom-custom ">
						<input
							type="text"
							className="border-0 w-100"
							name="userId"
							value={selectedClientId}
							ref={register({ required: false })}
						/>
					</div>
					{errors.userId && <span className="font-weight-bold text-danger">*</span>}
				</div>
			</div>
			<div className="col-sm-12 text-center py-3">
				<button
					className="btn btn-custom"
					type="submit"
					form="assignedExcercise"
					onClick={handleSubmit(onSubmit)}
				>
					Save
				</button>
			</div>
		</form>
	);
}
