import Joi from 'joi';


export type ArticleDto = {
  title: string;
  subtitle?: string;
  description: string;
  a: {
    aa: string;
    b: number;
  }
}

const articleBodySchema = Joi.object().keys({
  title: Joi.string().required().trim(),
  subtitle: Joi.string().trim(),
  description: Joi.string().required().trim(),
  a: Joi.object().keys({
    aa: Joi.string().required().trim(),
    ab: Joi.number().required()
  })
});

export const postTestSchema = {
  body: articleBodySchema,
};