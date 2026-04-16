import type { RegistrationFormDraft } from '@/features/auth/types';

const STORAGE_KEY = 'tap_it_registration_draft_v1';

export async function setRegistrationDraft(data: RegistrationFormDraft): Promise<void> {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export async function getRegistrationDraft(): Promise<RegistrationFormDraft | null> {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return null;
    const o = parsed as Record<string, unknown>;
    if (
      typeof o.firstName === 'string' &&
      typeof o.lastName === 'string' &&
      typeof o.email === 'string' &&
      typeof o.password === 'string' &&
      typeof o.phone === 'string'
    ) {
      return {
        firstName: o.firstName,
        lastName: o.lastName,
        email: o.email,
        password: o.password,
        phone: o.phone,
      };
    }
    return null;
  } catch {
    return null;
  }
}

export async function clearRegistrationDraft(): Promise<void> {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(STORAGE_KEY);
}
