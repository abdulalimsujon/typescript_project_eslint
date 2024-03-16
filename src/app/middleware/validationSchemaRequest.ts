import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validataRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //console.log(req.body);
    try {
      await schema.parseAsync({
        body: req.body.body,
      });

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validataRequest;
