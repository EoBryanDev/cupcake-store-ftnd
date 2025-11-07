import { IAddressSchema } from "../components/adresses/schemas";
import { IAddressResponse } from "../interface/IAddress";
import { TSignInSchema } from "../schemas/sign-in-schema";
import { TSignUpSchema } from "../schemas/sign-up-schema";

const API_INTERNAL_URL = process.env.NEXT_PUBLIC_API_URL;

async function createUser(newUserData: TSignUpSchema) {
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

const getUserAddress = async () => {
  const response = await fetch(`${API_INTERNAL_URL}/addresses`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Fail to get user addresses');
  }

  return response.json();
}

const deleteUserAddress = async (address_id: string) => {
  const response = await fetch(`${API_INTERNAL_URL}/addresses/${address_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Fail to get user addresses');
  }

  return response.json();
}

const createUserAddress = async (addressPayload: IAddressSchema): Promise<IAddressResponse> => {
  const response = await fetch(`${API_INTERNAL_URL}/addresses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(addressPayload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Fail to create user addresses');
  }

  return response.json();
}
const updateUserAddress = async (address_id: string, addressPayload: IAddressSchema): Promise<IAddressResponse> => {
  const response = await fetch(`${API_INTERNAL_URL}/addresses/${address_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(addressPayload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Fail to update user address');
  }

  return response.json();
}


export {
  login,
  createUser,
  getUserAddress,
  createUserAddress,
  updateUserAddress,
  deleteUserAddress
}