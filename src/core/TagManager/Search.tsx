import React, { useEffect, useMemo, useState } from 'react';
import Input from 'src/core/UI/Input';
import { useDispatch, useSelector } from 'react-redux';
import { allNodesSelector, inspectedNodeSelector } from 'src/core/store/modules/template/selector';
import IconButton from 'src/core/TagManager/IconButton';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { updateInspectedNodeAction } from 'src/core/store/modules/template/actions';
import { BsFullscreen } from 'react-icons/bs';
import clsx from 'classnames';
import Dropdown, { IDropdownProps } from 'src/core/UI/Dropdown';

interface ISearchProps {}

const Search = (props: ISearchProps) => {
  const [value, setValue] = useState('');
  const inspectedNodeId = useSelector(inspectedNodeSelector);
  const allNodes = useSelector(allNodesSelector);
  const dispatch = useDispatch();

  const onChange = (value: string) => {
    setValue(value);
  };

  const nodesFiltered = useMemo(
    () =>
      allNodes.filter((node) => {
        const search = value.trim().toLowerCase();
        return search && (node.name.toLowerCase().indexOf(search) >= 0 || node.text.toLowerCase().indexOf(search) >= 0);
      }),
    [value, allNodes]
  );

  const selectNodeByIndex = (index: number) => {
    if (nodesFiltered.length) {
      const nextNode = nodesFiltered[index] || nodesFiltered[0];
      dispatch(updateInspectedNodeAction(nextNode.id));
    }
  };

  const inspectedNodeIndex = nodesFiltered.findIndex((node) => node.id === inspectedNodeId);

  const selectPrevNode = () => {
    const nextIndex =
      inspectedNodeIndex === 0 ? nodesFiltered.length - 1 : inspectedNodeIndex === -1 ? 0 : inspectedNodeIndex - 1;
    selectNodeByIndex(nextIndex);
  };

  const selectNextNode = () => {
    const nextIndex =
      inspectedNodeIndex === nodesFiltered.length - 1 ? 0 : inspectedNodeIndex === -1 ? 0 : inspectedNodeIndex + 1;
    selectNodeByIndex(nextIndex);
  };

  const options: IDropdownProps['options'] = nodesFiltered.map((node) => ({
    active: node.id === inspectedNodeId,
    displayName: node.name || node.text,
    id: node.id,
    onClick: () => dispatch(updateInspectedNodeAction(node.id)),
  }));

  return (
    <div className={'d-flex flex-center'}>
      <Dropdown options={options} inputWrapperClassName={'max-w-200'}>
        <Input
          value={value}
          onChange={onChange}
          inputWrapperClassName={'pl-20 pr-30 mr-15'}
          resetButtonEnabled={true}
          placeholder={'Search'}
        />
      </Dropdown>
      <div className={clsx('d-flex align-center min-w-110 pl-10', !nodesFiltered.length && 'visibility-hidden')}>
        {nodesFiltered.length}
        <IconButton centering onClick={selectNextNode}>
          <AiOutlineDown />
        </IconButton>
        <IconButton centering onClick={selectPrevNode}>
          <AiOutlineUp />
        </IconButton>
        <div className={clsx(['relative pl-5', inspectedNodeIndex === -1 && 'visibility-hidden'])}>
          <IconButton>
            <BsFullscreen size={30} />
          </IconButton>
          <div className="absolute-center flex-center fz-14">{inspectedNodeIndex + 1}</div>
        </div>
      </div>
    </div>
  );
};

export default Search;
