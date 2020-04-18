import React, { Fragment, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, createNotification } from '../components/Toast';
import api from '../apiCalls/api';
export default function EditExercise({ selectedEditExercise }) {
	console.log(selectedEditExercise);
	const { register, handleSubmit, errors } = useForm();

	const onSubmit = data => {
		api.editExercise(selectedEditExercise._id, data.description).then(result => {
			if (result.status == 200) {
				createNotification('success', result.data.message);
			} else {
				createNotification('error', result.data.message);
			}
		});
	};

	return (
		<Fragment>
			<ToastContainer />
			<form className="col-sm-12 text-center">
				<h3>{selectedEditExercise.name}</h3>

				<div className="d-flex">
					<h4>Description</h4>
					{errors.description && createNotification('warning', 'Description is required')}
					<div className="ml-3 mt-2 w-75 h-100">
						<textarea className="w-100 h-100 p-0" name="description" ref={register({ required: true })} />
					</div>
				</div>
				<div className="col-sm-12 text-center pb-3">
					<button className="btn btn-custom" type="submit" onClick={handleSubmit(onSubmit)}>
						Save
					</button>
				</div>
			</form>
		</Fragment>
	);
}
