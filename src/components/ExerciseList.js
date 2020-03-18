import React, { useState, useEffect, Fragment } from 'react';
import AddAssignedExcercise from './AddAssignedExcercise';
import AddExcercise from './AddExercise';
import Model from './Model';
import api from '../apiCalls/api';

import AddAppointment from './AddAppointment';
export const ExerciseList = ({ title, row = false, modelId = '', handleExercise }) => {
	const [getAllExercise, setAllExercise] = useState([]);
	const [show, setShowModal] = useState(false);
	const handleClose = () => {
		setShowModal(false);
	};
	const openModal = () => {
		setShowModal(true);
	};

	useEffect(() => {
		api.getAllExercise().then(allExecersie => {
			console.log(allExecersie);
			setAllExercise(allExecersie.data);
		});
	}, []);

	const setNewExerciseData = response => {
		setAllExercise([...getAllExercise, response.SavedExercise]);

		handleClose();
	};

	return (
		<Fragment>
			<Model show={show} title={title} handleClose={handleClose}>
				<AddExcercise setNewExerciseData={setNewExerciseData} />
			</Model>

			<h3 className="custom-active font-weight-bold mb-0 pl-0">{title}</h3>
			<div className={`col-md-12 d-flex overflow-auto p-0  ${row ? `flex-row` : `flex-wrap`}`}>
				{getAllExercise.map((exercise, index) => (
					<div
						className="appointment-circle background-grey shadow border img-circle d-flex justify-content-center align-items-center m-2 background-active "
						key={index}
						onClick={() => handleExercise(exercise._id)}
					>
						<span className="p-3 text-center text-light">{exercise.name}</span>
					</div>
				))}

				<div
					className="appointment-circle border-grey-5 shadow border img-circle d-flex justify-content-center align-items-center m-2"
					type="button"
					onClick={openModal}
				>
					<i className="fas fa-plus text-muted font-36px " />
				</div>
			</div>
		</Fragment>
	);
};
