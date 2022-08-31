import express, { Request, Response } from 'express';
import { createClient } from 'redis';

const PORT = process.env.PORT || 3000;

const app = express();

export const client = createClient();

(async () => {
	await client.connect();
})();

app.get('/', async (req: Request, res: Response) => {
	console.log(`Process ID is ${process.pid}`);

	const num = req.query.number;

	if (!num) return res.send('Number is missing!');

	if (+num % 2 === 0) await client.publish('math-sub-1', num as string);
	else await client.publish('math-sub-2', num as string);

	res.send('Processing...');
});

app.listen(PORT, () => {
	console.log(`Server is running on PORT: ${PORT}...`);
});
