// src/components/WorkoutRandomizer.jsx
import React, { useState } from 'react';

const workoutRoutines = [
  {
    name: "Full Body Circuit",
    exercises: [
      "10 Push-ups",
      "15 Squats",
      "20 Jumping Jacks",
      "10 Burpees",
      "30-sec Plank"
    ],
  },
  {
    name: "Upper Body Strength",
    exercises: [
      "15 Dumbbell Curls",
      "10 Push-ups",
      "12 Shoulder Press",
      "15 Tricep Dips",
      "20 Mountain Climbers"
    ],
  },
  {
    name: "Core Blast",
    exercises: [
      "20 Russian Twists",
      "15 Bicycle Crunches",
      "10 Leg Raises",
      "30-sec Plank",
      "20 Flutter Kicks"
    ],
  },
  {
    name: "Lower Body Workout",
    exercises: [
      "20 Lunges",
      "15 Squats",
      "20 Calf Raises",
      "30-sec Wall Sit",
      "15 Glute Bridges"
    ],
  },
  {
    name: "HIIT Cardio",
    exercises: [
      "30-sec High Knees",
      "15 Burpees",
      "30-sec Jump Rope",
      "20 Mountain Climbers",
      "15 Jump Squats"
    ],
  },
];

const WorkoutRandomizer = () => {
  const [workout, setWorkout] = useState(null);

  const getRandomWorkout = () => {
    const randomIndex = Math.floor(Math.random() * workoutRoutines.length);
    setWorkout(workoutRoutines[randomIndex]);
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Workout Randomizer</h1>
      <button
        onClick={getRandomWorkout}
        className="w-full py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Get Workout
      </button>
      {workout && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">{workout.name}</h2>
          <ul className="mt-2 list-disc list-inside">
            {workout.exercises.map((exercise, index) => (
              <li key={index} className="text-gray-700">
                {exercise}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WorkoutRandomizer;
