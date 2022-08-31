module.exports = {
	apps: [
		{
			name: 'redis rest',
			script: 'server.ts',
			watch: true,
			instances: 'MAX',
			autorestart: true,
			max_memory_restart: '1G',
			exec_mode: 'cluster',
		},
		{ name: 'Subscriber-1', script: 'subscribers/subscriber-worker1.ts', instances: 1 },
		{ name: 'Subscriber-2', script: 'subscribers/subscriber-worker2.ts', instances: 1 },
	],
};
