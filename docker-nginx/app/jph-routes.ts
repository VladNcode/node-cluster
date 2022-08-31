import express, { Request, Response } from 'express';
import { redisMiddleware } from './middlewares/redis-middleware';

import JPHAPI from './jsonplaceholder/jph-api';
import { client } from './server';

export const router = express.Router();

router.use(redisMiddleware);

router.get(['/posts', '/users', '/comments'], async (req: Request, res: Response) => {
	try {
		const records = req.url.replace('/', '');

		const data = await JPHAPI[
			`fetch${records[0].toUpperCase() + records.slice(1)}` as 'fetchPosts' | 'fetchUsers' | 'fetchComments'
		]();

		data.length = 5;

		await client.set(records, JSON.stringify(data));

		res.status(200).json({ from: 'router', [records]: data });
	} catch (error) {
		console.error(error);
	}
});

router.delete(['/posts', '/users', '/comments'], async (req: Request, res: Response) => {
	try {
		const recordsToDelete = req.url.replace('/', '');

		await client.del(recordsToDelete);

		res.status(200).json({ message: `Deleted ${recordsToDelete} successfully!` });
	} catch (error) {
		console.error(error);
	}
});
