import { createLogger } from 'redux-logger';
import { isFailure , isSuccess } from 'src/core/store/utils/buidActions';
import { resetHoveredNodeAction , updateHoveredNodeAction } from 'src/core/store/modules/template/actions';

export default createLogger({
  collapsed: true,
  colors: {
    title: ({ type }: { type: string }) => {
      if (isSuccess(type)) {
        return 'green';
      } else if (isFailure(type)) {
        return 'red';
      } else if ([resetHoveredNodeAction.toString(), updateHoveredNodeAction.toString()].includes(type)){
        return 'transparent'
      } {
        return '';
      }
    },
  },
});
