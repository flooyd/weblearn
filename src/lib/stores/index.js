import { writable } from 'svelte/store';

// Create a writable store for the user
export const user = writable(null);
export const selectedSubject = writable(null);
export const selectedMethod = writable(null);
export const learningMaterial = writable(null);
export const words = writable(null);
export const filters = writable({
  level: 1,
});
export const filteredWords = writable(null);