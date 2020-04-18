import React, { useState, useEffect } from 'react';
import api from '../apiCalls/api';

export const UserInfo = ({ selectedClientId }) => {
	const [selectedClient, setSelectedClient] = useState('');

	useEffect(() => {
		//api
		api.getClientById(selectedClientId).then(clientInfo => {
			setSelectedClient(clientInfo.data);
		});
	}, [selectedClientId]);

	let { passcode, name, lastname, age, weight, height, contactmethod, phoneNumber, problem } = selectedClient;

	return (
		<div className="row px-4 py-5">
			<div className="col-md-6 py-2">
				<span className="text-muted">Name</span>
				<span className="ml-2">{name}</span>
			</div>
			<div className="col-md-6 py-2">
				<span className="text-muted">LastName</span>
				<span className="ml-2">{lastname}</span>
			</div>
			<div className="col-md-6 py-2">
				<span className="text-muted">Age</span>
				<span className="ml-2">{age} years</span>
			</div>
			<div className="col-md-6 py-2">
				<span className="text-muted">Height</span>
				<span className="ml-2">{height} CM</span>
			</div>
			<div className="col-md-12">
				<div className="row">
					<div className="col-md-6 py-2">
						<span className="text-muted">Preferred Contact Method:-{phoneNumber}</span>
					</div>
					<div className="col-md-6 py-2">
						<span className="text-muted">{contactmethod}</span>
					</div>
				</div>
			</div>
			<div className="col-md-6 py-2">
				<span className="text-muted">Weight</span>
				<span className="ml-2">{weight} KG</span>
			</div>
			<div className="col-md-6 py-2">
				<span className="text-muted">Notes</span>
				<span className="ml-2">{problem} </span>
			</div>
			<div className="col-md-6 py-2">
				<span className="text-muted">Client Id</span>
				<span className="ml-2">{passcode}</span>
			</div>
		</div>
	);
};
