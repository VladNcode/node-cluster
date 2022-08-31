module.exports = {
	apps: [
		{
			script: 'server.ts',
			watch: true,
			instances: 'MAX',
			autorestart: true,
			max_memory_restart: '1G',
			exec_mode: 'cluster',
			env: {
				NODE_ENV: 'development',
			},
			env_production: {
				NODE_ENV: 'production',
			},
		},
		{
			name: 'Worker1',
			script: './workers/fib-worker1.ts',
			instances: 1,
		},
		{
			name: 'Worker2',
			script: './workers/fib-worker2.ts',
			instances: 1,
		},
	],
};
