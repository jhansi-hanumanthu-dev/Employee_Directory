const BASE_URL = 'https://dummyjson.com/users';

export const fetchUsersApi = async (limit: number, skip: number) => {
  const response = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);
  return response.json();
};
