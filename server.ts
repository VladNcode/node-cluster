import express, { Request, Response } from 'express';
import fibObj from './math-logic/fibonacci-series';
import os from 'os';
import cluster from 'cluster';
import helpers from './helpers';

const totalCPUs = os.cpus().length;

if (cluster.isPrimary) {
	console.log(`Total number of CPUs: ${totalCPUs}`);

	for (let i = 0; i < totalCPUs; i++) {
		cluster.fork();
	}

	cluster.on('online', worker => {
		console.log(`Worker Id is ${worker.id} and PID is ${worker.process.pid}`);
	});

	cluster.on('exit', worker => {
		console.log(`Worker has exited: ${worker.id}`);
		console.log(`Let's fork new worker!`);
		cluster.fork();
	});
}

const app = express();

app.get('/', (req: Request, res: Response) => {
	if (req.query.number) {
		const number = fibObj.calculateFibonacciValue(+req.query.number);
		return res.send(`<h1>${number}</h1>`);
	}

	res.send('req.query.number is missing');
});

app.listen(helpers.randomNumber(3000, 8000), function get(this: { address: () => { port: number } }) {
	console.log(`Server is listening on ${this.address().port}`);
});
