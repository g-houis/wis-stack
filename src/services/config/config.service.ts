import config from 'config';

export const getExpressPort = (): number => config.get('express.port') as number;

const ConfigService = {
  getExpressPort,
};

export default ConfigService;