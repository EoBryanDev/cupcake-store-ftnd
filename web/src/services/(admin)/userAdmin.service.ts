import { TSignInSchema } from "@/src/schemas/sign-in-schema";

const API_INTERNAL_URL = process.env.NEXT_PUBLIC_API_URL;

const loginAdmin = async (loginPayload: TSignInSchema) => {
  const response = await fetch(`${API_INTERNAL_URL}/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginPayload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Fail to login');
  }

  return response.json();
}

export { loginAdmin }