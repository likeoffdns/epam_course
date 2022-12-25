import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { router } from './routes';


const app: Express = express();
app.use(bodyParser.json());
app.use(router);

const port = 3000;


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
