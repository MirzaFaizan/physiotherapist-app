import React, { useState, Fragment } from 'react';
import Clients from '../components/Clients';
import { UserInfo } from '../components/UserInfo';
import { Progress } from '../components/Progress';
import { Appointments } from '../components/Appointments';

import { AssignExercise } from '../components/AssignExercise';
import { GlobalProvider } from '../context/GlobalState';
const Dashboard = () => {
	const [selectedClientId, setSelectedClientId] = useState('');

	const handleClick = id => {
		setSelectedClientId(id);
	};

	console.log(selectedClientId);
	return (
		<Fragment>
			<div className="container-fluid mt-3">
				<div className="col-md-12">
					<div className="col-sm-12 flex-wrap-xs p-0 d-flex justify-content-around">
						<div className="col-md-7 col-xs-12 p-2 mr-2 shadow border-radius-custom">
							<GlobalProvider>
								<Clients row={true} title="Add Client" handleClick={handleClick} />
							</GlobalProvider>
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
									/>
								</div>

								<div className="p-3 mb-2 border-radius-custom shadow ">
									<AssignExercise
										selectedClientId={selectedClientId}
										handleClick={handleClick}
										title="Exercise Assigned"
										row={true}
										modelId="excerciseAssigned"
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
