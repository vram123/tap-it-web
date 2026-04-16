const ADMIN_SESSION_KEY = 'tapit_admin_session';

export async function setAdminSession(): Promise<void> {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ADMIN_SESSION_KEY, '1');
}

export async function hasAdminSession(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(ADMIN_SESSION_KEY) === '1';
}

export async function clearAdminSession(): Promise<void> {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ADMIN_SESSION_KEY);
}
