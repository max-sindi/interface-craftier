import React from 'react'
import {FaRegWindowClose} from 'react-icons/fa'
import classNames from '../../stylotron/src/styles.json'
// @ts-ignore
import DropDownMenuSelect from 'react-nested-menu-selector'
import _ from 'lodash'

//   classNames.reduce((acc, cur) =>
//
// )

// const selectGroups = classNames.classBranches.map(branch =>
//   <optgroup label={branch.name}>
//     {branch.classNames.map(className =>
//         <option value={className.name} label={className.name}/>
//     )}
//   </optgroup>
// )



const classGroupsExist = [
  { name: 'Spacing', classNames: ['p', 'pt', 'pb', 'pl', 'pr', 'm', 'mt', 'mb', 'mr', 'ml', 'ml-a', 'mr-a']},
  { name: 'Size', classNames: ['w', 'w-calc', 'max-w', 'min-w', 'h', 'max-h', 'min-h']},
  { name: 'Position', classNames: ['position', 'static', 't', 'r', 'l', 'b', 'l-a', 't-a']},
  { name: 'Layout', classNames: ['container', 'display', 'flex', 'flex-column', 'flex-row', 'justify-content', 'align-items', 'flex-grow', 'flex-wrap' ,'flex-center', 'order']},
  { name: 'Typography', classNames: ['fz', 'font-weight', 'black', 'white', 'pre-wrap', 'text-no-wrap', 'bold', 'text-wrap', 'text-align', 'ff-primary', 'ff-secondary', 'ff-thirdly', 'color-white', 'text-transform', 'lh']},
  { name: "Other", classNames: []}
]

// const classGroups = classNames.classBranches.reduce((acc: Record<string, { name: string, classNames: { name: string }[]}[]>, classNameBranch) => {
//   const group = classGroupsExist.find(({ classNames }) => classNames.includes(classNameBranch.name))
//     || _.last(classGroupsExist)
//
//   return !group ? acc : {
//     ...acc,
//     [group.name]: !acc[group.name] ? [classNameBranch] : [...acc[group.name], classNameBranch]
//   }
// }, {})
//
// const options = {
//     placeholder: "Class menu: ",
//     options:  classGroupsExist.map(({ name }) => ({
//       label: name,
//       options: classGroups[name].map(branch => ({
//         label: branch.name,
//         options: branch.classNames.map(className => ({
//           value: className.name,
//           label: className.name,
//           key: className.name
//         })),
//         key: branch.name
//       }))
//     }))
// }

const ClassNamesSelector = ({ value = '', onChange }: { value: string, onChange: (value: string) => void }) => {
  const deconstructed = value.trim().split(' ')
  const _delete = (cls: string) => onChange(deconstructed.filter(i => i !== cls).join(' '))
  const onClick = (newValue: string) => onChange(value + ' ' + newValue)

  return (
    <div className={`d-flex align-center pointer`}>
      {/*<DropDownMenuSelect*/}
      {/*  values={options}*/}
      {/*  handleOnClick={onClick}*/}
      {/*  className={"max-h-200"}*/}
      {/*/>*/}
      {/*<select onChange={evt => onChange(value + ' ' + evt.target.value)} className={`mr-20`}>*/}
      {/*  {selectGroups}*/}
      {/*</select>*/}
      <div className={`w-100-p flex flex-wrap max-h-100 flex-column align-flex-start`}>
        {value && deconstructed.map(cls =>
          (
            <div className={`mr-5 flex align-center text-no-wrap`} key={cls}>
              <FaRegWindowClose onClick={() => _delete(cls)} size={14} className={`mr-5`}/>
              .{cls}
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default ClassNamesSelector