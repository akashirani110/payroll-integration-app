require('dotenv').config();
import express from 'express';
import server from './server';

const app: express.Application = express();

const appServer = server.init();

const PORT = process.env.PORT || 5000;
appServer.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});