import { getUserService } from '@/services/users/get-user.service';
import { NextFunction, Request, Response } from 'express';

export class UserController {
  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const getUser = await getUserService();

      return res.status(200).send(getUser);
    } catch (error) {
      next(error);
    }
  }
}
