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
	],
};
