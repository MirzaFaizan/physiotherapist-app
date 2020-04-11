import React, { Fragment, useState, useEffect } from 'react';
import api from '../apiCalls/api';
export default function GetAppointment({ selectedClientId, setNewAppointmentData, showModel, selectedApointId }) {
	let [getAppoint, setAppoint] = useState('');

	useEffect(() => {
		api.getAppointementsById(selectedApointId).then(result => {
			setAppoint(result.data);
		});
	}, [selectedApointId]);

	return (
		<Fragment>
			<form className="col-sm-12 text-center">
				<h3>Show Appointment</h3>

				<div className="col justify-content-center d-flex">
					<div className="">
						Time:-
						<div class="alert alert-primary" role="alert">
							{getAppoint.time}
						</div>
					</div>
					<div className="ml-5">
						Notes:-
						<div class="alert alert-secondary" role="alert">
							{getAppoint.notes}
						</div>
					</div>
				</div>
			</form>
		</Fragment>
	);
}
