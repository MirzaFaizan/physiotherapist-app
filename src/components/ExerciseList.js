import React, { useState, useEffect, Fragment } from 'react';

import AddExcercise from './AddExercise';
import EditExerciseDescription from './EditExerciseDescription';
import Model from './Model';
import api from '../apiCalls/api';
import { ToastContainer, createNotification } from '../components/Toast';
export const ExerciseList = ({ title, row = false, modelId = '', handleExercise, exerciseData, setExerciseData }) => {
	const [getAllExercise, setAllExercise] = useState([]);
	const [show, setShowModal] = useState(false);
	const [showExercise, setShowExerciseModal] = useState(false);
	const [selectedEditExercise, selectedEditExerciseModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [selected, setSelected] = useState('')
	const handleClose = () => {
		setShowModal(false);
	};
	const openModal = () => {
		setShowModal(true);
	};
	const editExerciseModalClose = () => {
		setShowExerciseModal(false);
	};
	const openEditExerciseModal = value => {
		selectedEditExerciseModal(value);
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

	const deleteExcercise = (id) => {
		setLoading(true)
		setSelected(id);
		api.deleteExcercise(id)
			.then(res => {
				api.getAllExercise().then(allExecersie => {
					setAllExercise(allExecersie.data);
				});
				createNotification('success', "Excercise Deleted Successfully");
			})
			.catch(err => {
				console.log(err)
				createNotification('error', "Error while Deleting");
				setLoading(false);
			})
	}



	return (
		<Fragment>
			<ToastContainer />
			<Model show={show} title={title} handleClose={handleClose}>
				<AddExcercise setNewExerciseData={setNewExerciseData} />
			</Model>
			<Model show={showExercise} title="Edit Exercise" handleClose={editExerciseModalClose}>
				<EditExerciseDescription selectedEditExercise={selectedEditExercise} />
			</Model>
			<h3 className="custom-active font-weight-bold mb-0 pl-0">{title}</h3>

			<div className={`col-md-12 d-flex overflow-auto p-0  ${row ? `flex-row` : `flex-wrap`}`}>
				{getAllExercise.map((exercise, index) => (
					<div className="text-center mr-4">
						<div
							className="appointment-circle background-grey shadow  img-circle d-flex justify-content-center align-items-center m-2 background-active "
							style={exerciseData._id === exercise._id ? { border: '3px solid yellow' } : {}}
							key={index}
							onClick={() => handleExercise(exercise._id)}
						>
							<span className="p-3 text-center text-light">{exercise.name}</span>
						</div>
						{loading && selected === exercise._id ? (null) : (
							<button
								className="btn btn-danger text-white btn-sm mt-2"
								onClick={() => openEditExerciseModal(exercise)}
							>
								Edit
							</button>
						)}

						< button
							className="btn btn-danger btn-sm mt-2 ml-2"
							onClick={() => deleteExcercise(exercise._id)}
						>
							{loading && selected === exercise._id ? 'Deleting' : 'Delete'}
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
		</Fragment >
	);
};
