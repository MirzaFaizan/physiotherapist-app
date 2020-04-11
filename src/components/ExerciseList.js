import React, { useState, useEffect, Fragment } from 'react';
import AddAssignedExcercise from './AddAssignedExcercise';
import AddExcercise from './AddExercise';
import EditExerciseDescription from './EditExerciseDescription';
import Model from './Model';
import api from '../apiCalls/api';

import AddAppointment from './AddAppointment';
export const ExerciseList = ({ title, row = false, modelId = '', handleExercise, exerciseData }) => {
	const [getAllExercise, setAllExercise] = useState([]);
	const [show, setShowModal] = useState(false);
	const [showExercise, setShowExerciseModal] = useState(false);
	const [selectedEditExercise, selectedEditExerciseModal] = useState(false);

	const handleClose = () => {
		setShowModal(false);
	};
	const openModal = () => {
		setShowModal(true);
	};
	const editExerciseModalClose = () => {
		setShowExerciseModal(false);
	};
	const openEditExerciseModal = id => {
		selectedEditExerciseModal(id);
		setShowExerciseModal(true);
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
			<Model show={showExercise} title="Edit Exercise" handleClose={editExerciseModalClose}>
				<EditExerciseDescription selectedEditExercise={selectedEditExercise} />
			</Model>
			<h3 className="custom-active font-weight-bold mb-0 pl-0">{title}</h3>

			<div className={`col-md-12 d-flex overflow-auto p-0  ${row ? `flex-row` : `flex-wrap`}`}>
				{getAllExercise.map((exercise, index) => (
					<div>
						<div
							className="appointment-circle background-grey shadow  img-circle d-flex justify-content-center align-items-center m-2 background-active "
							style={exerciseData._id === exercise._id ? { border: '3px solid yellow' } : {}}
							key={index}
							onClick={() => handleExercise(exercise._id)}
						>
							<span className="p-3 text-center text-light">{exercise.name}</span>
						</div>
						<button
							className="btn btn-primary ml-4 mt-2"
							onClick={() => openEditExerciseModal(exercise._id)}
						>
							Edit description
						</button>
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
