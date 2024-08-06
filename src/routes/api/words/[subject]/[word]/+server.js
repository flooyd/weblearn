import { json } from '@sveltejs/kit';
import { authService } from '$lib/auth';
import Word from '../../../../../lib/models/word';
import User from '../../../../../lib/models/user';

export async function PUT({ params, url, request }) {
  const { subject, word } = params;
  const headers = request.headers;
  const token = authService.getAuthorizationHeader(headers);
  const user = await authService.verifyToken(token);
  const body = await request.json();
  const points = body.points;

  if (!user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  const updatedWord = await Word.findOneAndUpdate({ subject, word, user: user.userId }, { subject, word, user: user.userId, points }, { upsert: true, new: true }).exec();

  return json(updatedWord);
}

export async function GET({ params }) {
  console.log(Word);
  const { subject, word } = params;

  return new Response(JSON.stringify({ subject, word }), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}