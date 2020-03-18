import React, { useState } from 'react';
import { ExerciseList } from '../components/ExerciseList';
import { ExerciseProvider } from '../context/ExerciseState';
import api from '../apiCalls/api';

const Client = props => {
	let [exerciseData, setExerciseData] = useState('');
	const handleExercise = id => {
		api.getExerciseById(id).then(exercise => {
			console.log(exercise.data);
			setExerciseData(exercise.data);
		});
	};

	const { _id, description, file } = exerciseData;

	return (
		<div className="fluid-container">
			<div className="col-sm-12 my-2 p-3 border-radius-custom shadow overflow-auto">
				<ExerciseProvider>
					<ExerciseList
						title="Excercises"
						row={true}
						modelId="addExcersices"
						handleExercise={handleExercise}
					/>
				</ExerciseProvider>
			</div>

			<div className="col-sm-12 p-3 d-flex flex-wrap-xs ">
				{file ? (
					<div className="col-md-6 col-sm-12 text-center p-3 border-radius-custom shadow mr-2">
						<video className="h-100 w-100" autoPlay controls>
							<source key={_id} src={file} />
						</video>
						{/* <iframe src={exerciseData.file} className="h-100 w-100" /> */}
					</div>
				) : (
					''
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