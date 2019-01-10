import { Sequelize } from 'sequelize-typescript';
import { dbconfig } from './config'; // DB connection parameters
import { Currency } from './models/currencymodel';

export const sequelize = new Sequelize({
    database: dbconfig.database,
    dialect: dbconfig.dialect,
    username: dbconfig.username,
    password: dbconfig.password,
    host: dbconfig.host,
    port: dbconfig.port
});

sequelize.authenticate().then(() => {
    console.log(`Connected to database "${dbconfig.database}"`);
})
    .catch((err) => {
        console.log(err);
    });

sequelize.addModels([Currency]);

initializeDatabase();

// populateData();

// Force Initialization of the models and wipe all data ///
function initializeDatabase() {
    sequelize
        .sync({ force: true })
        .then(() => {
            console.log('Database initialization completed! Connection synced');
            populateData();
            return;
        })
        .catch(err => {
            console.log('err');
        });
}

// Adding new currencies to the DB ///
function populateData() {
    const mycurrency = new Currency({ country: 'Cambodia', exchangerate: 3700 });
    console.log('****NB: populating with mock data!');
    mycurrency.save()
        .then(() => {
            console.log(`City "${mycurrency.country}" added to DB`);
        })
        .catch((err) => {
            console.log(err);
        });
}
