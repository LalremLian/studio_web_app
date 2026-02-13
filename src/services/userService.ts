'use server';

import type { User } from '@/models/user';

// In-memory store for users to allow prototyping without a database.
const users: User[] = [];
let userIdCounter = 1;

export async function getUserByEmail(email: string): Promise<User | null> {
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  // Return a copy to prevent direct modification of the in-memory store
  return user ? { ...user } : null;
}

type CreateUserParams = {
  name: string;
  email: string;
  password_hash: string;
};

export async function createUser(
  params: CreateUserParams
): Promise<Omit<User, 'password'>> {
  const newUser: User = {
    id: (userIdCounter++).toString(),
    name: params.name,
    email: params.email.toLowerCase(),
    password: params.password_hash,
    createdAt: new Date(),
  };

  users.push(newUser);

  // Don't return the password hash in the response
  const { password, ...userProfile } = newUser;

  return userProfile;
}
