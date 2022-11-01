import Joi from 'joi';

export const postTestSchema = {
  body: Joi.object().keys({
    title: Joi.string().required().trim(),
    subtitle: Joi.string().trim(),
    description: Joi.string().required().trim(),
    a: Joi.object().keys({
      aa: Joi.string().required().trim(),
      ab: Joi.number().required()
    })
  })
};