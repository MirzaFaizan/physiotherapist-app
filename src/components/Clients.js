import React, { useState, useEffect, Fragment } from 'react';
import Model from './Model';
import AddClient from './AddClient';
import api from '../apiCalls/api';

const Clients = ({ handleClick, title, selectedClientId }) => {
	const [clientData, setClientData] = useState([]);
	const [show, setShowModal] = useState(false);

	const handleClose = () => {
		setShowModal(false);
	};
	const openModal = () => {
		setShowModal(true);
	};
	const deleteClient = id => {
		api.deleteClient(id).then(result => {
			let array = [...clientData];
			let filteredData = array.filter(data => data._id !== id);
			setClientData(filteredData);
		});
	};
	useEffect(() => {
		api.getAllClient().then(allClient => {
			setClientData(allClient.data);
		});
	}, []);

	return (
		<Fragment>
			<Model show={show} title={title} handleClose={handleClose}>
				<AddClient />
			</Model>

			<h3 className="custom-active font-weight-bold">Clients</h3>
			<div className={`col-md-12 d-flex overflow-auto p-0  `}>
				{clientData.map(client =>
					client.file ? (
						<div className="text-center">
							<div className="col-sm-3" key={client._id}>
								<img
									style={selectedClientId === client._id ? { border: '3px solid red' } : {}}
									className="img-circle shadow client-image border-active filter"
									src={client.file}
									onClick={() => handleClick(client._id)}
								/>
							</div>
							<button className="btn btn-danger btn-sm mt-2" onClick={() => deleteClient(client._id)}>
								Delete
							</button>
						</div>
					) : (
							''
						)
				)}

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

export default Clients;
