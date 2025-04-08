import { jwtDecode } from 'jwt-decode';

export function getDecodedToken() {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('__session='))
    ?.split('=')[1];

  if (!token) {
    return null;
  }

  const decodedToken = jwtDecode(token);
  return {
    token,
    userId: decodedToken.sub,
  };
}