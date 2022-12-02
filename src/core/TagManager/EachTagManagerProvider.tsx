import React, { createContext } from 'react';
import { NodeApi, useTagApi } from 'src/core/TagManager/useTagApi';
import { Uuid } from 'src/core/store/modules/template/reducer';

export interface IEachTagManagerContext {
  nodeApi: NodeApi;
  parentNodeApi?: NodeApi;
}

interface IEachTagManagerProviderProps {
  children: any;
  nodeId: Uuid;
}

export const EachTagManagerProviderContext = createContext({} as IEachTagManagerContext);

const EachTagManagerProvider = ({ children, nodeId }: IEachTagManagerProviderProps) => {
  const nodeApi: NodeApi = useTagApi(nodeId);
  const parentNodeApi: NodeApi = useTagApi(nodeApi.nodeState.parentId || '');

  return (
    <EachTagManagerProviderContext.Provider
      value={{ nodeApi, parentNodeApi: nodeApi.nodeState.parentId ? parentNodeApi : undefined }}
    >
      {children}
    </EachTagManagerProviderContext.Provider>
  );
};

export default EachTagManagerProvider;
