import dbConnect from '$lib/db.js';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  try {
    // Connect to the database
    await dbConnect();

    // You can add the db connection to the event.locals if needed
    event.locals.dbConnection = true;

    // Continue processing the request
    const response = await resolve(event);
    return response;
  } catch (error) {
    console.error('Error in server hook:', error);

    // You might want to return a custom error response here
    return new Response('Internal Server Error', { status: 500 });
  }
}

// Optionally, you can add a handleError function to handle uncaught errors
/** @type {import('@sveltejs/kit').HandleServerError} */
export function handleError({ error, event }) {
  console.error('Uncaught error:', error);
  return {
    message: 'An unexpected error occurred.',
    code: error?.code ?? 'UNKNOWN'
  };
}