// src/components/WorkoutRandomizer.jsx
import React, { useState } from "react";

const workoutRoutines = [
  {
    name: "Full Body Circuit",
    exercises: [
      { exercise: "Push Ups", baseAmount: 10 },
      { exercise: "Squats", baseAmount: 15 },
      { exercise: "Jumping Jacks", baseAmount: 20 },
      { exercise: "Burpees", baseAmount: 10 },
      { exercise: "Plank", baseAmount: 30, unit: "sec" },
    ],
  },
  {
    name: "Upper Body Strength",
    exercises: [
      { exercise: "Dumbbell Curls", baseAmount: 15 },
      { exercise: "Push Ups", baseAmount: 10 },
      { exercise: "Shoulder Press", baseAmount: 12 },
      { exercise: "Tricep Dips", baseAmount: 15 },
      { exercise: "Mountain Climbers", baseAmount: 20 },
    ],
  },
  {
    name: "Core Blast",
    exercises: [
      { exercise: "Russian Twists", baseAmount: 20 },
      { exercise: "Bicycle Crunches", baseAmount: 15 },
      { exercise: "Leg Raises", baseAmount: 10 },
      { exercise: "Plank", baseAmount: 30, unit: "sec" },
      { exercise: "Flutter Kicks", baseAmount: 20 },
    ],
  },
  {
    name: "Lower Body Workout",
    exercises: [
      { exercise: "Lunges", baseAmount: 20 },
      { exercise: "Squats", baseAmount: 15 },
      { exercise: "Calf Raises", baseAmount: 20 },
      { exercise: "Wall Sit", baseAmount: 30, unit: "sec" },
      { exercise: "Glute Bridges", baseAmount: 15 },
    ],
  },
  {
    name: "HIIT Cardio",
    exercises: [
      { exercise: "High Knees", baseAmount: 30, unit: "sec" },
      { exercise: "Burpees", baseAmount: 15 },
      { exercise: "Jump Rope", baseAmount: 30, unit: "sec" },
      { exercise: "Mountain Climbers", baseAmount: 20 },
      { exercise: "Jump Squats", baseAmount: 15 },
    ],
  },
];

const difficultyMultiplier = {
  easy: 0.8,
  medium: 1,
  hard: 1.5,
};

const getRandomDifficulty = () => {
  const levels = ["easy", "medium", "hard"];
  return levels[Math.floor(Math.random() * levels.length)];
};

const WorkoutRandomizer = () => {
  const [workout, setWorkout] = useState(null);

  const getRandomWorkout = () => {
    const randomIndex = Math.floor(Math.random() * workoutRoutines.length);
    const selectedWorkout = workoutRoutines[randomIndex];

    const generatedExercises = selectedWorkout.exercises.map((ex) => {
      const difficulty = getRandomDifficulty();

      return {
        ...ex,
        difficulty,
        amount: Math.round(ex.baseAmount * difficultyMultiplier[difficulty]),
      };
    });

    setWorkout({
      name: selectedWorkout.name,
      exercises: generatedExercises,
    });
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Workout Randomizer
      </h1>

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
            {workout.exercises.map((ex, index) => (
              <li key={index} className="text-gray-700">
                {ex.exercise} — {ex.amount} {ex.unit ? ex.unit : "reps"} (
                {ex.difficulty})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WorkoutRandomizer;