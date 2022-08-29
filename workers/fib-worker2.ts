import rq from 'amqplib/callback_api';

rq.connect('amqp://localhost', (err, connection) => {
	if (err) process.exit();

	const queueName = 'FibSeries2';

	connection.createChannel((err, channel) => {
		channel.assertQueue(queueName, { durable: false });

		channel.consume(
			queueName,
			message => {
				console.log('Waiting for messages');
				console.log(`${queueName} - ${message?.content.toString()}`);
			},
			{ noAck: true },
		);

		// console.log(`Queue name is ${queueName}`);
	});
});
