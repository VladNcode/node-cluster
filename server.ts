import express, { Request, Response } from 'express';
import fibObj from './math-logic/fibonacci-series';
import os from 'os';
import cluster from 'cluster';

// loadtest -n 1000 -c 100 --rps 200 http://localhost:3000?number=20
// artillery quick --count 100 -n -20 http://localhost:3000?number=20
// autocannon -c 10 http://localhost:3000?number=20

// enable Round Robin
cluster.schedulingPolicy = cluster.SCHED_RR;

const totalCPUs = os.cpus().length;
const app = express();

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
} else {
	app.get('/', (req: Request, res: Response) => {
		if (req.query.number) {
			const number = fibObj.calculateFibonacciValue(+req.query.number);
			console.log(`Worker Id is ${cluster.worker?.id} and PID is ${cluster.worker?.process.pid} handled the request!`);

			return res.send(`<h1>${number}</h1>`);
		}

		res.send('req.query.number is missing');
	});

	app.listen(3000, function get(this: { address: () => { port: number } }) {
		console.log(`Server is listening on ${this.address().port}`);
	});
}
