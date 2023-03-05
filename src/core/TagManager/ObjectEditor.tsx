import React, { useMemo } from 'react';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';
import { FaRegWindowClose } from 'react-icons/fa';
import VariableSelector from './VariableSelector';
// import { attrsExisting, stylesExisting } from 'src/core/TagManager/config';
import { lastArrayItem } from 'src/utils';

interface IObjectEditorProps {
  fields: {
    name: string;
    withFile?: boolean;
    fileValueCreator?: (value: string) => string;
    withVariable?: boolean;
    variableValueCreator?: (value: string) => string;
    textable?: boolean;
    suggestions?: string[];
  }[];
  value: Record<string, string>;
  onChange: (arg1: (old: Record<string, string>) => Record<string, string>) => void;
  title: string;
  enableCreating?: boolean;
}

const ObjectEditor = ({
  fields = [],
  value = {},
  onChange,
  title = '',
  enableCreating = false,
}: IObjectEditorProps) => {
  const [newField, setNewField] = React.useState('');
  const onAddFieldClick = () => {
    onChange((old) => ({ ...old, [newField]: '' })); // add field
    setNewField(''); // reset
  };
  const onNewFieldSelect = ({ target: { value: fieldValue } }: any) =>
    onChange((old) => ({ ...old, [fieldValue]: value[fieldValue] || '' }));

  const initialSorted = useMemo(() => Object.keys(value).sort((name1, name2) => (name1 > name2 ? 1 : -1)), []);

  return (
    <div className={`align-center`}>
      <div className={`w-100 bold mb-5 `}>{title}</div>
      <div className={`d-flex flex-column align-flex-start`}>
        {[...initialSorted, ...Object.keys(value).filter((name) => !initialSorted.includes(name))]
          .map((name) => {
            const custom = !fields.map((i) => i.name).includes(name);

            return {
              ...(custom ? {} : fields.find((field) => name === field.name)),
              name,
              custom,
            };
          })
          .map(
            ({
              name = '',
              suggestions,
              // withFile = false,
              fileValueCreator = (value) => value,
              // withVariable = false,
              variableValueCreator = (value) => value,
              // textable = false,
              custom = false,
            }) => {
              const fieldValue = value[name] || '';
              // const onFileChange = fileName => onChange({
              //     ...value,
              //     [name]: fileValueCreator(fileName)
              // })
              // const variableValueCreator = (value: string) => value
              const onVariableChange = (variableName: string) =>
                onChange((prev) => ({
                  ...prev,
                  [name]: variableValueCreator(variableName),
                }));

              const onFieldChange = ({ target: { value: fieldValue } }: any) =>
                onChange((prev) => ({ ...prev, [name]: fieldValue }));

              const onFieldNameChange = (evt: any) => {
                const value = evt.target.value;
                onChange((prev) => {
                  const freshState = { ...prev };
                  const oldValue = prev[name];
                  delete freshState[name];
                  return { ...freshState, [value]: oldValue };
                });
              };

              const _delete = () => {
                const clone = { ...value };
                delete clone[name];
                onChange(() => clone);
              };

              const onFieldSelect = ({ target: { value: fieldName } }: any) => {
                const clone = { ...value };
                clone[fieldName] = clone[name];
                delete clone[name];
                onChange(() => clone);
              };

              return (
                <div key={name} className={`d-flex align-center pt-5 pb-5`}>
                  <div className={`d-flex align-center w-100-p`}>
                    {custom ? (
                      <textarea rows={1} value={name} onChange={onFieldNameChange} className={'w-80'} />
                    ) : (
                      <select value={name} className={`ml-10`} onChange={onFieldSelect}>
                        {fields.map(({ name: fieldName }) => (
                          <option value={fieldName} label={fieldName} key={fieldName} />
                        ))}
                      </select>
                    )}

                    <FaRegWindowClose onClick={() => _delete()} size={20} className={`mr-10 ml-10 min-w-20`} />

                    <textarea rows={1} value={fieldValue} onChange={onFieldChange} className={'w-150'} />
                    {/*{withFile && (*/}
                    {/*  <Tooltip*/}
                    {/*    trigger={['hover']}*/}
                    {/*    overlay={<FileSelector onChange={onFileChange} />}*/}
                    {/*    placement={`top`}*/}
                    {/*  >*/}
                    {/*      <button className={`black ml-20`}> File?</button>*/}
                    {/*  </Tooltip>*/}
                    {/*)}*/}
                    {/*{withVariable && (*/}
                    {suggestions && (
                      <Tooltip
                        trigger={['hover']}
                        placement={'top'}
                        overlay={
                          <div>
                            {suggestions.map((path) => (
                              <div
                                key={path}
                                className="d-flex justify-space-between pointer"
                                onClick={() => onFieldChange({ target: { value: fileValueCreator(path) } })}
                              >
                                <div className={'mr-10'}>{path}</div>
                                <div className={`max-w-40`}>
                                  {['svg', 'png', 'jpeg'].includes(lastArrayItem(path.split('.'))) && (
                                    <img src={fileValueCreator(path)} alt={path} className={'max-h-40 max-w-100-p'} />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        }
                      >
                        <button className={`black ml-20`}>File?</button>
                      </Tooltip>
                    )}
                    <Tooltip
                      trigger={['hover']}
                      overlay={<VariableSelector onChange={onVariableChange} />}
                      placement={`top`}
                    >
                      <button className={`black ml-20 mr-10`}> Variable?</button>
                    </Tooltip>
                  </div>
                </div>
              );
            }
          )}

        {fields.length ? (
          <div className={`w-100-p`}>
            <select className={`ml-10 min-w-60`} onChange={onNewFieldSelect} value={``}>
              {[{ name: ' ' }, ...fields.filter(({ name }) => value[name] === undefined)].map(({ name }) => (
                <option value={name} label={name} key={name} />
              ))}
            </select>
          </div>
        ) : null}

        {enableCreating && (
          <div className={`d-flex align-center`}>
            <textarea
              rows={1}
              value={newField}
              onChange={({ target: { value } }) => setNewField(value)}
              className={'w-80'}
            />
            <button className={`ml-50`} onClick={onAddFieldClick}>
              + (Add)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ObjectEditor;
