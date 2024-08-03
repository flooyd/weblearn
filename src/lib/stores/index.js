import { writable } from 'svelte/store';

// Create a writable store for the user
export const user = writable(null);
export const selectedSubject = writable(null);
export const selectedMethod = writable(null);