import { json } from '@sveltejs/kit';
import { authService } from '$lib/auth';

export async function POST({ request }) {
  try {
    const credentials = await request.json();
    const token = await authService.login(credentials);
    return json({ success: true, data: token });
  } catch (error) {
    return json({ success: false, error: error.message }, { status: 400 });
  }
}