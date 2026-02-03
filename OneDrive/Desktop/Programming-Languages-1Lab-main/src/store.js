import { configureStore, createSlice } from '@reduxjs/toolkit';

const exercisesSlice = createSlice({
  name: 'exercises',
  initialState: {
    exercises: [
      { 
        id: 1, 
        name: 'Жим лёжа', 
        muscleGroup: 'Грудь', 
        sets: 4, 
        reps: 10, 
        weight: 80,
        date: '2025-02-01',
        calories: 150
      },
      { 
        id: 2, 
        name: 'Приседания', 
        muscleGroup: 'Ноги', 
        sets: 4, 
        reps: 12, 
        weight: 100,
        date: '2025-02-01',
        calories: 200
      },
      { 
        id: 3, 
        name: 'Становая тяга', 
        muscleGroup: 'Спина', 
        sets: 3, 
        reps: 8, 
        weight: 120,
        date: '2025-02-02',
        calories: 180
      },
      { 
        id: 4, 
        name: 'Жим гантелей', 
        muscleGroup: 'Плечи', 
        sets: 3, 
        reps: 12, 
        weight: 20,
        date: '2025-02-02',
        calories: 120
      },
      { 
        id: 5, 
        name: 'Подтягивания', 
        muscleGroup: 'Спина', 
        sets: 4, 
        reps: 10, 
        weight: 0,
        date: '2025-02-03',
        calories: 100
      }
    ],
    filter: 'Все'
  },
  reducers: {
    addExercise: (state, action) => {
      state.exercises.push({
        ...action.payload,
        id: Date.now()
      });
    },
    deleteExercise: (state, action) => {
      state.exercises = state.exercises.filter(ex => ex.id !== action.payload);
    },
    updateExercise: (state, action) => {
      const index = state.exercises.findIndex(ex => ex.id === action.payload.id);
      if (index !== -1) {
        state.exercises[index] = action.payload;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    }
  }
});

export const { addExercise, deleteExercise, updateExercise, setFilter } = exercisesSlice.actions;

export const store = configureStore({
  reducer: {
    exercises: exercisesSlice.reducer
  }
});