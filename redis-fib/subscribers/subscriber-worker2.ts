import fibObj from '../math-logic/fibonacci-series';
import { client } from '../server';

(async () => {
	const subscriber = client.duplicate();
	await subscriber.connect();

	await subscriber.subscribe('math-sub-2', message => {
		const num = fibObj.calculateFibonacciValue(+message);

		console.log(`Fib series value is ${num}`);
	});
})();
