import React, { useState, useEffect, Fragment } from 'react';
import AddAssignedExcercise from './AddAssignedExcercise';

import Model from './Model';
import api from '../apiCalls/api';

export const AssignExercise = ({ title, row = false, modelId = '', selectedClientId }) => {
	const [getAllAssignExercise, setAllAssignExercise] = useState([]);
	const [show, setShowModal] = useState(false);

	const handleClose = () => {
		setShowModal(false);
	};
	const openModal = () => {
		setShowModal(true);
	};
	useEffect(() => {
		api.getAssignExerciseById(selectedClientId).then(allAssignExecersie => {
			setAllAssignExercise(allAssignExecersie.data);
		});
	}, [selectedClientId]);

	const setNewAssignData = response => {
		setAllAssignExercise([...getAllAssignExercise, response.AssignExercise]);
		handleClose();
	};
	return (
		<Fragment>
			<Model show={show} title={title} handleClose={handleClose}>
				<AddAssignedExcercise selectedClientId={selectedClientId} setNewAssignData={setNewAssignData} />
			</Model>

			<h3 className="custom-active font-weight-bold mb-0 pl-0">{title}</h3>
			<div className={`col-md-12 d-flex overflow-auto p-0  ${row ? `flex-row` : `flex-wrap`}`}>
				{getAllAssignExercise.map((result, index) => (
					<div
						className="appointment-circle background-grey shadow border img-circle d-flex justify-content-center align-items-center m-2 background-active "
						key={index}
					>
						<span className="p-3 text-center text-light">{result.exercise}</span>
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
