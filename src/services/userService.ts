'use server';

import type { User } from '@/models/user';
import { connectToDatabase } from '@/lib/mongodb';
import { Collection, WithId } from 'mongodb';

// This represents the structure in the database
interface UserDocument {
  name: string;
  email: string;
  password_hash: string;
  createdAt: Date;
}

// A helper function to get the 'users' collection
async function getUsersCollection(): Promise<Collection<UserDocument>> {
  const { db } = await connectToDatabase();
  return db.collection<UserDocument>('users');
}

// A helper to map from DB document to our application User model
function fromUserDocument(doc: WithId<UserDocument>): User {
    const { _id, password_hash, ...rest } = doc;
    return {
        id: _id.toHexString(),
        password: password_hash, // mapping password_hash to password field in User model
        ...rest,
    };
}


export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await getUsersCollection();
  // Case-insensitive email search
  const userDoc = await users.findOne({ email: email.toLowerCase() });

  if (!userDoc) {
    return null;
  }
  
  return fromUserDocument(userDoc);
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
    
    const newUserDocument: UserDocument = {
        name: params.name,
        email: params.email.toLowerCase(),
        password_hash: params.password_hash,
        createdAt: new Date(),
    };

    const result = await users.insertOne(newUserDocument);
    
    // We can construct the return object without another DB query
    const { password_hash, ...userProfile } = newUserDocument;

    return {
        id: result.insertedId.toHexString(),
        ...userProfile,
    };
}
