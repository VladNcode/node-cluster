import express, { Request, Response } from 'express';

import { sendValueInFibQueue1 } from './queues/fib-queue1';
import { sendValueInFibQueue2 } from './queues/fib-queue2';

// loadtest -n 1000 -c 100 --rps 100 http://localhost:3000?number=23
// artillery quick --count 100 -n -20 http://localhost:3000?number=20
// autocannon -c 10 http://localhost:3000?number=20
// 172.24.59.40 | ip route

const app = express();

app.get('/', (req: Request, res: Response) => {
	const num = req.query.number;

	if (num) {
		+num % 2 === 0 ? sendValueInFibQueue1(+num) : sendValueInFibQueue2(+num);
		res.send('Request recieved successfully and being processed!');
	}

	res.send('req.query.number is missing');
});

app.listen(3000, () => {
	console.log(`Server is listening on 3000...`);
});
