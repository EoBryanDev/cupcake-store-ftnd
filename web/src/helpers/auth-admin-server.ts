import { cookies } from 'next/headers';

const TOKEN_ADMIN_KEY = process.env.TOKEN_ADMIN_KEY || 'token';

export const getAuthAdminTokenServer = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_ADMIN_KEY)?.value;
};