export function isTokenValid(token: string | null): boolean {
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiration = payload.exp * 1000; // en ms
    return expiration > Date.now();
  } catch (e) {
    return false;
  }
}
