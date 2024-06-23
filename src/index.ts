import express from 'express';
import csvtojsonV2 from "csvtojson/v2";
const fs = require('fs');
const fsPromises = require('fs/promises');

const app = express();
const port = process.env.PORT || 8085;

const csvFileName = 'quotes.csv'
const jsonFileName = 'file.json';

const csvFilePath = `./csv/${csvFileName}`

app.get('/', async (req, res) => {

    try {
        const data = await csvtojsonV2()
            .fromFile(csvFilePath);

        fs.exists(jsonFileName, async function (exists) {
            if (exists) {
                await fsPromises.unlink(jsonFileName);
            }

            await fsPromises.writeFile(jsonFileName, JSON.stringify(data));
        });

        res.send({ successMessage: 'json file created successfully' });
    }
    catch (ex: any) {
        res.send({ errorMessage: ex.message });
    }
});

app.listen(port, () => {
    console.log(`Example app listening at ${port}`);
});