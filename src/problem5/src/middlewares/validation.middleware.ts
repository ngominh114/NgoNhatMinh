import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export const validateBodyRequest = (dto: any) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const object = plainToInstance(dto, req.body);
    const errors = await validate(object);

    if (errors.length > 0) {
        res.status(400).json({ errors: errors.map(err => err.constraints ? Object.values(err.constraints) : ['Unknown Errors']) });
        return;
    }
    next();
};
