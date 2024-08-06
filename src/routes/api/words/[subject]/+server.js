import { json } from '@sveltejs/kit';
import { authService } from '$lib/auth';
import Word from '../../../../lib/models/word';

export async function GET({ params, request, url }) {
  const { subject } = params;
  const headers = request.headers;
  const token = authService.getAuthorizationHeader(headers);
  const user = await authService.verifyToken(token);
  const filters = url.searchParams.get('filters');

  console.log('user', user);

  if (!user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  const words = await Word.find({ subject, user: user.userId, filters }).exec();

  return json(words);
}