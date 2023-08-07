import { NextFunction, Request, Response } from 'express';

const uploadFile = (req: Request, res: Response, next: NextFunction) => {
	console.log(" \x1b[41m ", 'req.file:  ', req.file ," [0m " )
};

export default { uploadFile };
