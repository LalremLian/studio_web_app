'use server';

import { connectToDatabase } from '@/lib/mongodb';
import type { User } from '@/models/user';
import { Collection, ObjectId } from 'mongodb';

async function getUsersCollection(): Promise<Collection<Omit<User, 'id'>>> {
  const { db } = await connectToDatabase();
  return db.collection<Omit<User, 'id'>>('users');
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await getUsersCollection();
  const user = await users.findOne({ email: email.toLowerCase() });

  if (!user) {
    return null;
  }

  // Convert _id to id
  const { _id, ...rest } = user as any;
  return {
    id: _id.toHexString(),
    ...rest,
  };
}

type CreateUserParams = {
  name: string;
  email: string;
  password_hash: string;
};

export async function createUser(
  params: CreateUserParams
): Promise<Omit<User, 'password'>> {
  const users = await getUsersCollection();
  const newUser = {
    name: params.name,
    email: params.email.toLowerCase(),
    password: params.password_hash,
    createdAt: new Date(),
  };

  const result = await users.insertOne(newUser);

  // Don't return the password hash in the response
  const { password, ...userProfile } = newUser;

  return {
    ...userProfile,
    id: result.insertedId.toHexString(),
  };
}