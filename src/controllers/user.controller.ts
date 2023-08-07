import { NextFunction, Request, Response } from 'express';

const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const currentUser = req.user;

  res.status(200).json({
    success: true,
    payload: currentUser,
  });
};
export default { getCurrentUser };
