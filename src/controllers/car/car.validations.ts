import Joi from 'joi';


export type CarDto = {
  id: string,
  name: string,
  weight: number,
  maxSpeed: number,
  price?: number,
}

const carBodySchema = Joi.object().keys({
  id: Joi.string().required().trim(),
  name: Joi.string().required().trim(),
  wheight: Joi.number().required().min(0),
  maxSpeed: Joi.number().required().min(0),
  price: Joi.number().min(0),
});

export const postCarSchema = {
  body: carBodySchema,
};