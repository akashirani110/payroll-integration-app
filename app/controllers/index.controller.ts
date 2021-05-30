import { Request, Response } from "express";

/**
 * Backend Home page.
 * @route GET /
 */
export const index = (req: Request, res: Response) => {
	res.send(`<a href='/api/user/xero/connect'>Connect to Xero</a>`);
};