import React, { useState, Fragment, useEffect } from 'react';
import Clients from '../components/Clients';
import { UserInfo } from '../components/UserInfo';
import { Progress } from '../components/Progress';
import { Appointments } from '../components/Appointments';
import api from '../apiCalls/api';
import { AssignExercise } from '../components/AssignExercise';
import { ToastContainer, createNotification } from '../components/Toast';
const Dashboard = () => {
	const [selectedClientId, setSelectedClientId] = useState('');
	const [loading, setLoading] = useState(false);
	const [clientData, setClientData] = useState([]);
	const [deleteSelected, setDeleteSelected] = useState("")
	const handleClick = (id, color) => {
		setSelectedClientId(id);
	};

	const handleDeleteAppointment = (id) => {
		// alert(id)
		setLoading(true)
		setDeleteSelected(id);
		api.deleteAppointment(id)
			.then(res => {
				let changeId = selectedClientId
				setSelectedClientId("");
				setTimeout(() => {
					setLoading(false)
					createNotification("success", "Deleted Successfully")
					setSelectedClientId(changeId)
				}, 1000);

			})
			.catch(err => {
				setLoading(false);
				createNotification("error", "Error...!")
				console.log(err)
			})
	}

	const handleDeleteExcercise = (id) => {
		setLoading(true)
		setDeleteSelected(id);
		api.deleteAssigExcercise(id)
			.then(res => {
				let changeId = selectedClientId
				setSelectedClientId("");
				setTimeout(() => {
					setLoading(false)
					createNotification("success", "Deleted Successfully")
					setSelectedClientId(changeId)
				}, 1000);

				// console.log(res)
			})
			.catch(err => {
				createNotification("error", "Error...!")

				setLoading(false)
				console.log(err)
			})
	}

	useEffect(() => {
		api.getAllClient().then(allClient => {
			setClientData(allClient.data);
			setSelectedClientId(allClient.data[0]._id)
		});
	}, []);


	console.log(selectedClientId);
	return (
		<Fragment>
			<ToastContainer />
			<div className="container-fluid mt-3">
				<div className="col-md-12">
					<div className="col-sm-12 flex-wrap-xs p-0 d-flex justify-content-around">
						<div className="col-md-7 col-xs-12 p-2 mr-2 shadow border-radius-custom">

							<Clients
								row={true}
								title="Add Client"
								selectedClientId={selectedClientId}
								handleClick={handleClick}
								clientData={clientData}
								setClientData={setClientData}
							/>

						</div>
						<div className="col-md-5 col-xs-12 shadow border-radius-custom">
							<UserInfo selectedClientId={selectedClientId} />
						</div>
					</div>
				</div>
				<div className="col-sm-12 mt-2">
					<div className="col-sm-12 flex-wrap-xs p-0 d-flex justify-content-around">
						<div className="col-md-7 col-xs-12  p-2 mr-2 shadow border-radius-custom">
							<Progress />
						</div>
						<div className="col-md-5 col-xs-12 p-0">
							<div className="">
								<div className="p-3 mb-2 border-radius-custom shadow">
									<Appointments
										selectedClientId={selectedClientId}
										handleClick={handleClick}
										title="Appointments"
										row={true}
										modelId="appointmentModel"
										handleDelete={handleDeleteAppointment}
										loading={loading}
										deleteSelected={deleteSelected}
									/>
								</div>

								<div className="p-3 mb-2 border-radius-custom shadow ">
									<AssignExercise
										selectedClientId={selectedClientId}
										handleClick={handleClick}
										title="Exercise Assigned"
										row={true}
										modelId="excerciseAssigned"
										handleDelete={handleDeleteExcercise}
										deleteSelected={deleteSelected}
										loading={loading}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Dashboard;
