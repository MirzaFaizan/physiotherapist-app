import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, createNotification } from '../components/Toast';
import api from '../apiCalls/api';
export default function AddAppointment({ selectedClientId, setNewAppointmentData }) {
	const { register, errors, handleSubmit } = useForm();

	const divStyle = {
		opacity: '0'
	};
	const onSubmit = data => {
		if (!data.userId) {
			createNotification('error', 'Please select any user');
		} else {
			api.addAppointements(data, selectedClientId)
				.then(result => {
					if (result.status == 200) {
						setNewAppointmentData(result.data);
						createNotification('success', result.data.Message);
					} else {
						console.log(result);
					}
				})
				.catch(error => {
					console.log(error);
					createNotification('error', 'Current Date is in a week');
				});
		}
	};
	return (
		<Fragment>
			<ToastContainer />
			<form className="col-sm-12 text-center" onSubmit={handleSubmit(onSubmit)}>
				<h3>Add Appointment</h3>
				<div className="col-sm-12 d-flex">
					<div className="col-sm-6">
						<div className="d-flex">
							Date
							<div className="ml-3 w-100 border-bottom-custom">
								<input
									name="date"
									ref={register}
									type="date"
									format="YYYY-MM-dd"
									className="border-0 w-100"
								/>
							</div>
							{errors.date && <span className="font-weight-bold text-danger">*</span>}
						</div>
					</div>
					<div className="col-sm-6">
						<div className="d-flex">
							Time
							<div className="ml-3 w-100 border-bottom-custom">
								<input
									type="text"
									className="border-0 w-100"
									name="time"
									ref={register({ required: true })}
								/>
							</div>
							{errors.time && <span className="font-weight-bold text-danger">*</span>}
						</div>
					</div>
				</div>
				<div className="col-sm-12">
					<div className="d-flex p-3">
						Doctor
						<div className="ml-3 w-100 border-bottom-custom">
							<input
								type="text"
								className="border-0 w-100"
								name="doctor"
								ref={register({ required: true })}
							/>
						</div>
						{errors.doctor && <span className="font-weight-bold text-danger">*</span>}
					</div>
				</div>
				<div className="col-sm-12">
					<div className="d-flex " style={divStyle}>
						UserId
						<div className="ml-3 w-100 border-bottom-custom">
							<input
								type="text"
								className="border-0 w-100"
								name="userId"
								ref={register({ required: false })}
								value={selectedClientId}
							/>
						</div>
						{errors.doctor && <span className="font-weight-bold text-danger">*</span>}
					</div>
				</div>
				<div className="col-sm-12 text-center py-3">
					<button className="btn btn-custom" type="submit" onClick={handleSubmit(onSubmit)}>
						Save
					</button>
				</div>
			</form>
		</Fragment>
	);
}
