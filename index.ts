import csvtojsonV2 from "csvtojson/v2";
const fs = require('fs');
const fsPromises = require('fs/promises');

const csvFileName = 'quotes.csv'
const jsonFileName = 'file.json';

const csvFilePath = `./csv/${csvFileName}`

const convert = async () => {
    try {

        console.log('We are creating a json file for you, Please wait...');

        const data = await csvtojsonV2()
            .fromFile(csvFilePath);

        fs.exists(jsonFileName, async function (exists) {
            if (exists) {
                await fsPromises.unlink(jsonFileName);
            }

            await fsPromises.writeFile(jsonFileName, JSON.stringify(data));
        });

        console.log(`${jsonFileName} file created successfully`);
    }
    catch (ex: any) {
        console.error('CUSTOM ERROR:', ex.message);
    }
}

convert();
