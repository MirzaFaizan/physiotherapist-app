import React, { createContext, useReducer, useContext } from 'react';
//Context provides a way to pass data through the component tree without having to pass props down manually at every level.

let initialState;

initialState = {
	exercise: []
};

const ExerciseReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_EXERCISE':
			return {
				...state,
				exercise: [action.payload, ...state.exercise]
			};
		default:
			return state;
	}
};

//creates a context object. React renders a component that subscribe to context object it will read the context value from the closest matching provider

export const ExerciseContext = createContext(initialState);
//Provider Component
export const ExerciseProvider = ({ children }) => {
	const [state, dispatch] = useReducer(ExerciseReducer, initialState);
	// dispatch is an action

	const addExercise = exercise => {
		dispatch({
			type: 'ADD_EXERCISE',
			payload: exercise
		});
	};

	return <ExerciseContext.Provider value={{ state, dispatch, addExercise }}>{children}</ExerciseContext.Provider>;
};

export const useExerciseContext = () => useContext(ExerciseContext);
