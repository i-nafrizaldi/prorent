import { User } from '@prisma/client';

import prisma from '@/prisma';
import { hashPassword } from '@/lib/bcrypt';

export const registerService = async (body: Omit<User, 'id'>) => {
  try {
    const { email, password } = body;

    const existingUser = await prisma.user.findFirst({
      where: { email: email },
    });
    if (existingUser) {
      throw new Error('Email already exist');
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: { ...body, password: hashedPassword },
    });
    return {
      message: 'Register success',
      data: newUser,
    };
  } catch (error) {
    throw error;
  }
};
