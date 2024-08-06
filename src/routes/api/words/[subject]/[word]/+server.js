import { json } from '@sveltejs/kit';
import { authService } from '$lib/auth';
import Word from '../../../../../lib/models/word';


export async function PUT({ params, request }) {
  const { subject, word } = params;
  const headers = request.headers;
  const token = authService.getAuthorizationHeader(headers);
  const user = await authService.verifyToken(token);

  if (!user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const points = body.points;
  const level = body.level

  const updatedWord = await Word.findOneAndUpdate({ subject, word, user: user.userId, level }, { subject, word, user: user.userId, points, level }, { upsert: true, new: true }).exec();
  console.log(updatedWord);
  return json(updatedWord);
}