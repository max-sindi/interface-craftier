import logger from './logger';
import saga from './saga';

const middlewares = [logger, saga];
export default middlewares;
