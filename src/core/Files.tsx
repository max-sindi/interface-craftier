import React from 'react';
import Tooltip from 'rc-tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { filesSelector } from 'src/core/store/modules/template/selector';
import { deleteFileAction } from 'src/core/store/modules/template/actions';
import IconButton from 'src/core/TagManager/IconButton';
import { FaRegWindowClose } from 'react-icons/fa';
import { getFileNamePromPath , serverUrl } from 'src/utils';
import clsx from 'classnames';

interface IFilesProps {
  onFileSelect?: (fileName: string) => void;
}

const Files = ({ onFileSelect }: IFilesProps) => {
  const files = useSelector(filesSelector);

  const dispatch = useDispatch();

  const onDeleteFile = (fileName: string) => dispatch(deleteFileAction(getFileNamePromPath(fileName)));

  return (
    <div>
      {files.map((fileName) => {
        const path = `${serverUrl}/${fileName}`;
        const onSelect = onFileSelect ? () => onFileSelect(fileName) : () => {};

        return (
          <div key={path} className={'d-flex mt-5'}>
            <Tooltip
              overlay={() => (
                <div>
                  <img alt={'enlarged image'} src={path} className={'max-w-300 max-h-300 mr-10'} />
                </div>
              )}
            >
              <img alt={'thumb image'} src={path} className={'w-30 h-30 mr-10'} />
            </Tooltip>
            <div
              className={clsx(['max-w-200 overflow-auto', onFileSelect && 'pointer'])}
              title={onFileSelect && 'Select file'}
              onClick={onSelect}
            >
              {fileName}
            </div>
            <IconButton centering title={'Delete file'} onClick={() => onDeleteFile(fileName)}>
              <FaRegWindowClose/>
            </IconButton>
          </div>
        );
      })}
    </div>
  );
};

export default Files;
