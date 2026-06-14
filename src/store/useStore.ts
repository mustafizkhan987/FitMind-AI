import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Workout {
  id: string;
  type: string;
  duration: number;
  calories: number;
  date: string;
}

export interface SleepLog {
  id: string;
  hours: number;
  quality: number; // 1-100
  date: string;
}

interface UserState {
  // Profile
  name: string;
  level: number;
  xp: number;
  setName: (name: string) => void;
  addXP: (amount: number) => void;

  // Hydration
  waterDrank: number;
  waterGoal: number;
  addWater: () => void;
  removeWater: () => void;
  resetWater: () => void;

  // Workouts
  workouts: Workout[];
  addWorkout: (workout: Omit<Workout, 'id' | 'date'>) => void;

  // Nutrition (Daily)
  caloriesConsumed: number;
  calorieGoal: number;
  protein: number;
  carbs: number;
  fat: number;
  addMeal: (calories: number, p: number, c: number, f: number) => void;
  resetNutrition: () => void;

  // Sleep
  sleepLogs: SleepLog[];
  addSleep: (hours: number, quality: number) => void;
}

export const useStore = create<UserState>()(
  persist(
    (set) => ({
      // Initial Profile
      name: "Guest",
      level: 1,
      xp: 0,
      setName: (name) => set({ name }),
      addXP: (amount) => set((state) => {
        const newXP = state.xp + amount;
        const newLevel = Math.floor(newXP / 1000) + 1;
        return { xp: newXP, level: newLevel };
      }),

      // Hydration
      waterDrank: 0,
      waterGoal: 8,
      addWater: () => set((state) => {
        state.addXP(10); // Reward for drinking water
        return { waterDrank: state.waterDrank + 1 };
      }),
      removeWater: () => set((state) => ({ 
        waterDrank: Math.max(0, state.waterDrank - 1) 
      })),
      resetWater: () => set({ waterDrank: 0 }),

      // Workouts
      workouts: [],
      addWorkout: (workout) => set((state) => {
        state.addXP(100); // Reward for working out
        const newWorkout: Workout = {
          ...workout,
          id: Math.random().toString(36).substring(7),
          date: new Date().toISOString()
        };
        return { workouts: [newWorkout, ...state.workouts] };
      }),

      // Nutrition
      caloriesConsumed: 0,
      calorieGoal: 2500,
      protein: 0,
      carbs: 0,
      fat: 0,
      addMeal: (calories, p, c, f) => set((state) => {
        state.addXP(20); // Reward for logging meal
        return {
          caloriesConsumed: state.caloriesConsumed + calories,
          protein: state.protein + p,
          carbs: state.carbs + c,
          fat: state.fat + f
        };
      }),
      resetNutrition: () => set({ caloriesConsumed: 0, protein: 0, carbs: 0, fat: 0 }),

      // Sleep
      sleepLogs: [],
      addSleep: (hours, quality) => set((state) => {
        state.addXP(50); // Reward for logging sleep
        const newSleep: SleepLog = {
          id: Math.random().toString(36).substring(7),
          hours,
          quality,
          date: new Date().toISOString()
        };
        return { sleepLogs: [newSleep, ...state.sleepLogs] };
      })
    }),
    {
      name: 'fitmind-local-storage', // unique name
      storage: createJSONStorage(() => localStorage),
    }
  )
);
