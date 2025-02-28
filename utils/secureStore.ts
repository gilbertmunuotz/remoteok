import * as SecureStore from 'expo-secure-store';

// Save the JWT token
export const saveToken = async (token: string) => {
    await SecureStore.setItemAsync('jwtToken', token);
};

// Get the JWT token
export const getToken = async () => {
    return await SecureStore.getItemAsync('jwtToken'); // Retrieve token by key 'jwtToken'
};

// Delete the JWT token
export const deleteToken = async () => {
    await SecureStore.deleteItemAsync('jwtToken'); // Remove the token from storage
};