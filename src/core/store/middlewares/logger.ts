import { createLogger } from 'redux-logger';
import { isFailure , isSuccess } from 'src/core/store/utils/buidActions';

export default createLogger({
  collapsed: true,
  colors: {
    title: ({ type }: { type: string }) => {
      if (isSuccess(type)) {
        return 'green';
      } else if (isFailure(type)) {
        return 'red';
      } else {
        return '';
      }
    },
  },
});
