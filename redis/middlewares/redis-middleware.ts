import { Request, Response, NextFunction } from 'express';
import { client } from '../server';

export const redisMiddleware = async function (req: Request, res: Response, next: NextFunction) {
	try {
		if (/posts|users|comments/.test(req.url) && req.method === 'GET') {
			const records = req.url.replace('/', '');

			const reply = await client.get(records);

			if (reply) return res.status(200).json({ from: 'redis', [records]: JSON.parse(reply) });
		}

		next();
	} catch (error) {
		console.log(error);
	}
};
