// src/services/auth.ts
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (email: string, password: string) => {
  // Autenticação fictícia
  if (email === 'user@example.com' && password === 'password') {
    const userData = { id: 1, name: 'User', email };
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    return userData;
  } else {
    throw new Error('Invalid credentials');
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem('user');
};

export const getCurrentUser = async () => {
  const userData = await AsyncStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};
