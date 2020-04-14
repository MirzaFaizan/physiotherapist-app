import axios from 'axios';
import apiConfig from './apiConfig';

const signIn = async body => {
	try {
		const res = await axios.post(apiConfig.loginRoute, body);
		return res;
	} catch (err) {
		throw err.response;
	}
};

const getClientById = async _id => {
	const body = {
		_id
	};
	try {
		const res = await axios.post(apiConfig.getClientById, body);
		return res;
	} catch (err) {
		throw err.response;
	}
};

const assignExercise = async data => {
	try {
		const res = await axios.post(apiConfig.assignExercise, data);
		console.log(res);
		return res;
	} catch (err) {
		throw err.response;
	}
};

const addClient = async data => {
	const url = apiConfig.addClient;
	console.log(data.get('file'));
	try {
		const res = await axios.post(url, data);

		return res;
	} catch (err) { }
};

const addAppointements = async (data, id) => {
	const url = `${apiConfig.addAppointement}/${id}`;

	try {
		const res = await axios.post(url, data);

		return res;
	} catch (err) { }
};

const addExercise = async (data, option) => {
	const url = apiConfig.addExercise;
	console.log(data);
	try {
		const res = await axios.post(url, data, option);

		return res;
	} catch (err) { }
};

const getAllClient = async () => {
	const url = apiConfig.getAllClient;
	try {
		const res = await axios.get(url);

		return res;
	} catch (err) { }
};
const getAllExercise = async () => {
	const url = apiConfig.getAllExercise;
	try {
		const res = await axios.get(url);

		return res;
	} catch (err) { }
};

const getAllAppointement = async () => {
	const url = apiConfig.getAllAppointments;
	try {
		const res = await axios.get(url);

		return res;
	} catch (err) { }
};

const getAppointementsById = async id => {
	const url = `${apiConfig.getAllAppointments}/${id}`;
	try {
		const res = await axios.get(url);

		return res;
	} catch (err) { }
};

const getAllAssignExercise = async () => {
	const url = apiConfig.getAllAsignExercise;
	try {
		const res = await axios.get(url);

		return res;
	} catch (err) { }
};

const getAllBusyDay = async id => {
	const url = `${apiConfig.getBusyDay}/${id}`;
	try {
		const res = await axios.get(url);
		return res;
	} catch (err) { }
};

const getExerciseById = async _id => {
	const data = {
		_id
	};
	try {
		const res = await axios.post(apiConfig.getExerciseById, data);
		console.log(res);
		return res;
	} catch (err) {
		throw err.response;
	}
};

const editExercise = async (_id, description) => {
	const data = {
		description
	};
	try {
		const res = await axios.put(`${apiConfig.editExercise}/${_id}`, data);
		console.log(res);
		return res;
	} catch (err) {
		throw err.response;
	}
};
const deleteClient = async id => {
	const url = `${apiConfig.deleteClient}/${id}`;
	try {
		const res = await axios.delete(url);
		return res;
	} catch (err) { }
};

const getAppointmentById = async userId => {
	const data = {
		userId
	};
	console.log(data);
	try {
		const res = await axios.post(apiConfig.getAllAppointmentsById, data);

		return res;
	} catch (err) {
		throw err.response;
	}
};

const getAssignExerciseById = async userId => {
	const data = {
		userId
	};
	console.log(data);
	try {
		const res = await axios.post(apiConfig.getAllAsignExerciseById, data);

		return res;
	} catch (err) {
		throw err.response;
	}
};

const deleteExcercise = async id => {

	try {
		const res = await axios.delete(`${apiConfig.deleteExcercise}/${id}`);

		return res;
	} catch (err) {
		throw err.response;
	}
};
const deleteAppointment = async id => {

	try {
		const res = await axios.delete(`${apiConfig.getAllAppointments}/${id}`);

		return res;
	} catch (err) {
		throw err.response;
	}
};
const deleteAssigExcercise = async id => {

	try {
		const res = await axios.delete(`${apiConfig.getAllAsignExercise}/${id}`);

		return res;
	} catch (err) {
		throw err.response;
	}
};

export default {
	signIn,
	assignExercise,
	addClient,
	getClientById,
	getAllClient,
	getAllExercise,
	getAllAppointement,
	getAllAssignExercise,
	getExerciseById,
	addExercise,
	addAppointements,
	getAppointmentById,
	getAssignExerciseById,
	getAllBusyDay,
	getAppointementsById,
	deleteClient,
	editExercise,
	deleteExcercise,
	deleteAppointment,
	deleteAssigExcercise
};
