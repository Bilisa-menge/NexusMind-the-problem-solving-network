import { User } from './types';

const ACCOUNTS_KEY = 'nexus_accounts';

export interface RegisterPayload {
  fullName: string;
  contact: string; // email or phone
  password: string;
  age: number;
  profileImageDataUrl?: string;
}

interface StoredAccount {
  id: string;
  name: string;
  contact: string;
  age: number;
  avatar: string;
  passwordHash: string; // salt:hash
  createdAt: number;
}

function loadAccounts(): StoredAccount[] {
  if (typeof localStorage === 'undefined') return [];
  const raw = localStorage.getItem(ACCOUNTS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as StoredAccount[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveAccounts(accounts: StoredAccount[]) {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function toHex(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof ArrayBuffer ? new Uint8Array(buffer) : buffer;
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function hashPassword(password: string): Promise<string> {
  const saltBytes = new Uint8Array(16);
  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    crypto.getRandomValues(saltBytes);
  } else {
    for (let i = 0; i < saltBytes.length; i++) {
      saltBytes[i] = Math.floor(Math.random() * 256);
    }
  }
  const saltHex = toHex(saltBytes);

  if (typeof crypto !== 'undefined' && 'subtle' in crypto) {
    const encoder = new TextEncoder();
    const data = encoder.encode(saltHex + password);
    const digest = await crypto.subtle.digest('SHA-256', data);
    const hashHex = toHex(digest);
    return `${saltHex}:${hashHex}`;
  }

  // Fallback (non-crypto environments) - still avoid storing plain text
  const pseudoHash = btoa(`${saltHex}:${password}`).replace(/=+$/, '');
  return `${saltHex}:${pseudoHash}`;
}

export async function registerUser(payload: RegisterPayload): Promise<User> {
  const { fullName, contact, password, age, profileImageDataUrl } = payload;

  const accounts = loadAccounts();
  const normalizedContact = contact.trim().toLowerCase();

  const duplicate = accounts.find(
    (acc) => acc.contact.toLowerCase() === normalizedContact
  );
  if (duplicate) {
    const error: Error & { code?: string } = new Error(
      'An account with this email or phone already exists.'
    );
    error.code = 'DUPLICATE_ACCOUNT';
    throw error;
  }

  const passwordHash = await hashPassword(password);

  const id = `u_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 8)}`;

  const avatar =
    profileImageDataUrl ||
    `https://picsum.photos/seed/${encodeURIComponent(fullName)}/100/100`;

  const newAccount: StoredAccount = {
    id,
    name: fullName.trim(),
    contact: normalizedContact,
    age,
    avatar,
    passwordHash,
    createdAt: Date.now(),
  };

  const updatedAccounts = [...accounts, newAccount];
  saveAccounts(updatedAccounts);

  const user: User = {
    id,
    name: newAccount.name,
    firstName: fullName.trim().split(' ')[0],
    lastName: fullName.trim().split(' ').slice(1).join(' '),
    email: newAccount.contact,
    avatar: newAccount.avatar,
    reputation: 0,
    bio: '',
  };

  return user;
}

export async function loginUser(contact: string, password: string): Promise<User> {
  const accounts = loadAccounts();
  const normalizedContact = contact.trim().toLowerCase();

  const account = accounts.find(
    (acc) => acc.contact.toLowerCase() === normalizedContact
  );

  if (!account) {
    const error: Error & { code?: string } = new Error(
      'Invalid email or password.'
    );
    error.code = 'INVALID_CREDENTIALS';
    throw error;
  }

  const [salt, storedHash] = account.passwordHash.split(':');
  
  let isValid = false;
  if (typeof crypto !== 'undefined' && 'subtle' in crypto) {
    const encoder = new TextEncoder();
    const data = encoder.encode(salt + password);
    const digest = await crypto.subtle.digest('SHA-256', data);
    const hashHex = toHex(digest);
    isValid = hashHex === storedHash;
  } else {
    const pseudoHash = btoa(`${salt}:${password}`).replace(/=+$/, '');
    isValid = pseudoHash === storedHash;
  }

  if (!isValid) {
    const error: Error & { code?: string } = new Error(
      'Invalid email or password.'
    );
    error.code = 'INVALID_CREDENTIALS';
    throw error;
  }

  const user: User = {
    id: account.id,
    name: account.name,
    firstName: account.name.split(' ')[0],
    lastName: account.name.split(' ').slice(1).join(' '),
    email: account.contact,
    avatar: account.avatar,
    reputation: 0,
    bio: '',
    joinedAt: account.createdAt,
  };

  return user;
}

