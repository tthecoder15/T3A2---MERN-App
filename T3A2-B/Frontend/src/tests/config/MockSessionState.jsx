import sessionState from '../../routes/store';

export const loginTestUser = async () => {
  const { login } = sessionState.getState();
  
  // Hardcoded credentials for test user
  const email = 'johnseesstars@gmail.com';
  const password = 'starrynight';
  
  await login(email, password);
}