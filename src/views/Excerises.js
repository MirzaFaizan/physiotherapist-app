import React, { useState } from 'react';
import { ExerciseList } from '../components/ExerciseList';
import { ExerciseProvider } from '../context/ExerciseState';
import api from '../apiCalls/api';

const Client = props => {
	let [exerciseData, setExerciseData] = useState('');

	const handleExercise = id => {
		api.getExerciseById(id).then(exercise => {
			setExerciseData(exercise.data);
		});
	};

	const { _id, description, file } = exerciseData;
	console.log("hi i am mark", exerciseData)

	return (
		<div className="fluid-container">
			<div className="col-sm-12 my-2 p-3 border-radius-custom shadow overflow-auto">
				<ExerciseProvider>
					<ExerciseList
						title="Excercises"
						row={true}
						modelId="addExcersices"
						handleExercise={handleExercise}
						exerciseData={exerciseData}
						setExerciseData={setExerciseData}
					/>
				</ExerciseProvider>
			</div>

			<div className="col-sm-12 p-3 d-flex flex-wrap-xs ">
				{String(file)
					.split('.')
					.pop() === 'mp4' ||
					String(file)
						.split('.')
						.pop() === 'MP4' ? (
						<div className="col-md-6 col-sm-12 text-center p-3 border-radius-custom shadow mr-2">
							<video className="h-100 w-100" src={file} autoPlay controls></video>
						</div>
					) : (
						<div className="col-md-6 col-sm-12 text-center p-3 border-radius-custom shadow mr-2">
							<img src={file} />
						</div>
					)}

				<div className="col-md-6 col-sm-12 p-3 border-radius-custom shadow">
					<h3>Description</h3>
					<p>{description}</p>
				</div>
			</div>
		</div>
	);
};

export default Client;
