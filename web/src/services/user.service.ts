import { TSignInSchema } from "../schemas/sign-in-schema";
import { TSignUpSchema } from "../schemas/sign-up-schema";

const API_INTERNAL_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createUser(newUserData: TSignUpSchema) {
  const response = await fetch(`${API_INTERNAL_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUserData),
  });


  if (!response.ok) {
    const errorResp = await response.text();
    const { error } = JSON.parse(errorResp);

    throw new Error(error || 'Fail to register user');
  }

  return response.json();
}

const login = async (loginPayload: TSignInSchema) => {
  const response = await fetch(`${API_INTERNAL_URL}/login`, {
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

// export async function getUserInfo() {

//     const response = await fetch(`${API_INTERNAL_URL}/users`, {
//         method: 'GET',
//     });

//     if (!response.ok) {
//         const error = await response.json();
//         return { success: false, data: null, error: error.message };
//     }

//     if (response.status === 204) {
//         return { success: true, data: null };
//     }

//     return response.json();
// }

export { login }