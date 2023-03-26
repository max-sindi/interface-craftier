import React from 'react';
import Tag from './Tag';
import { useSelector } from 'react-redux';
import { templateSelector } from 'src/core/store/modules/template/selector';

const MarkupRenderer: React.FunctionComponent = () => {
  const template = useSelector(templateSelector);

  return (
    <>
      <Tag key={0} indexInLevel={0} deepLevel={0} nodeId={template.id} />
    </>
  );
};

export default MarkupRenderer;
