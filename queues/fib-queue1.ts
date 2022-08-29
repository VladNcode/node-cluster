import rq from 'amqplib/callback_api';
import fibObj from '../math-logic/fibonacci-series';

export const sendValueInFibQueue1 = function (num: number) {
	rq.connect('amqp://localhost', (err, connection) => {
		if (err) process.exit();

		const queueName = 'FibSeries1';

		connection.createChannel((err, channel) => {
			if (err) {
				console.log(err);
				process.exit();
			}

			let fibNum = fibObj.calculateFibonacciValue(num);

			channel.assertQueue(queueName, { durable: false });
			channel.sendToQueue(queueName, Buffer.from(fibNum.toString()));

			console.log(`Queue name is ${queueName}`);
		});
	});
};
