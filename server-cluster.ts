import express, { Request, Response } from 'express';
import cluster from 'cluster';
import os from 'os';
import childProcess from 'child_process';

import fibObj from './math-logic/fibonacci-series';

// loadtest -n 1000 -c 100 --rps 200 http://localhost:3000?number=20
// artillery quick --count 100 -n -20 http://localhost:3000?number=20
// autocannon -c 10 http://localhost:3000?number=20
// 172.24.59.40 | ip route

const totalCUPs = os.cpus().length;

if (cluster.isPrimary) {
	console.log(`Primary process ID is - ${process.pid}`);

	const worker1 = childProcess.fork('./workers/fib-worker1.ts');
	const worker2 = childProcess.fork('./workers/fib-worker2.ts');

	console.log(`Child process ID is ${worker1.pid}`);
	console.log(`Child process ID is ${worker2.pid}`);

	worker1.on('message', number => {
		console.log(`Fib number from child process - 1 is ${number}`);
	});

	worker2.on('message', number => {
		console.log(`Fib number from child process - 2 is ${number}`);
	});

	cluster.on('online', worker => {
		console.log(`Message recieved from - ${worker.process.pid}`);

		worker.on('message', num => {
			if (num % 2 === 0) worker1.send(num);
			else worker2.send(num);
		});
	});

	for (let i = 0; i < totalCUPs; i++) {
		const worker = cluster.fork();
		console.log(`Worker started on PID - ${worker.process.pid}`);
	}

	console.log(`Total number of CPUs is ${totalCUPs}`);
} else {
	const app = express();

	app.get('/', (req: Request, res: Response) => {
		if (req.query.number && process.send) {
			process.send(+req.query.number);
			console.log(`Process Id ${process.pid} recieved the request!!!`);
		}

		res.send('The request has been recieved successfully! We will send an email once your calculation is ready!');
	});

	app.listen(3000, () => {
		console.log(`Server is listening on 3000...`);
	});
}
