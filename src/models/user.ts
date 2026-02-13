export type User = {
  id: string;
  name: string;
  email: string;
  password?: string; // password should be optional when returning user data
  createdAt: Date;
};
