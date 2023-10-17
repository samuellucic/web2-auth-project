import { getSession } from '@auth0/nextjs-auth0';

export const checkAuth = async (
  username: string
): Promise<Response | undefined> => {
  const session = await getSession();
  if (!session) {
    return new Response(null, {
      status: 401,
      statusText: 'You need to be logged in to change match stats.',
    });
  } else if (session.user.nickname !== username) {
    return new Response(null, {
      status: 403,
      statusText: 'You are not authorized to execute this action.',
    });
  }
  return undefined;
};
