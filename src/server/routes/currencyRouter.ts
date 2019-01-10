import {Router} from 'express';
import {Currency} from '../models/currencymodel';
// From https://github.com/RobinBuschmann/sequelize-typescript-example/blob/master/lib/routes/movies.ts

export const currencies = Router();
// Initial get everything route
 currencies.get('/', (req, res, next) => {
  Currency
   .findAll()
   .then((data) => {
    return res.json(data);
    })
   .catch((err) => {
     console.log(err);
     return err;
    });
 });
currencies.get('/:id', async (req, res, next) => {
    try {
      const currency = await Currency.scope(req.query['scope'])
      .findById(req.params['id']);
      res.json(currency);
    } catch (e) {
      next(e);
    }
  });
// post
currencies.post('/', async (req, res, next) => {
    try {
      console.log(req.body);
      const currency = await Currency.create(req.body);
      res.status(201).json(currency);
    } catch (e) {
      next(e);
    }
  });
// update api/id
currencies.put('/:id', async (req, res, next) => {
    try {
      await Currency
      .update<Currency>(req.body, {where: {id: req.params['id']}});
      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  });
// delete api/id
