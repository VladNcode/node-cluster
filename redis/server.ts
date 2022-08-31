import express from 'express';
import { createClient } from 'redis';

import { router as jphRoutes } from './jph-routes';

const PORT = process.env.PORT || 3000;

const app = express();

export const client = createClient();

(async () => {
	await client.connect();
})();

app.use('/jph', jphRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on PORT: ${PORT}...`);
});
