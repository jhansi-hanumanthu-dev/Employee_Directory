import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUsersToStorage = async (users: any[]) => {
  await AsyncStorage.setItem('USERS', JSON.stringify(users));
};

export const getUsersFromStorage = async () => {
  const data = await AsyncStorage.getItem('USERS');
  return data ? JSON.parse(data) : null;
};
