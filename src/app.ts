import express from 'express';
import router from './router';
import { 
    notFoundHandler, errorHandler, logger 
} from './middleware';
import { config } from './config';
import db from './db';

require('source-map-support').install()

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
// app.use(logger)
app.use('/', router)
app.use(errorHandler)
app.use(notFoundHandler)

const PORT: number = Number(config.port);

async function main() {
    await db.initTable()
    console.log(`initialize table done`)
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}

main()
