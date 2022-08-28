import express, { Request, Response } from 'express';
import fibObj from './math-logic/fibonacci-series';

// loadtest -n 1000 -c 100 --rps 200 http://localhost:3000?number=20
// artillery quick --count 100 -n -20 http://localhost:3000?number=20
// autocannon -c 10 http://localhost:3000?number=20
// 172.24.59.40 | ip route

const app = express();

app.get('/', (req: Request, res: Response) => {
	if (req.query.number) {
		console.log(`Worker ID is - ${process.pid}`);
		const number = fibObj.calculateFibonacciValue(+req.query.number);
		return res.send(`<h1>${number}, Worker ID is - ${process.pid}</h1>`);
	}

	res.send('req.query.number is missing');
});

app.listen(3000, () => {
	console.log(`Server is listening on 3000...`);
});
