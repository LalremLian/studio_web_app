'use server';

import type { User } from '@/models/user';

let users: User[] = [];

export async function getUserByEmail(email: string): Promise<User | null> {
  const user = users.find((u) => u.email === email);
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
    id: `user_${Date.now()}`,
    name: params.name,
    email: params.email,
    password: params.password_hash, // This is the hashed password
    createdAt: new Date(),
  };

  users.push(newUser);

  // Don't return the password hash
  const { password, ...userProfile } = newUser;
  return userProfile;
}
