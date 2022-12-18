import React from 'react';
import MultiSwitch from 'src/core/UI/MultiSwitch';

interface IClassNameMultiSwitchProps {
  texts: string[];
  onToggle: (value: string, index: number) => void;
  selectedSwitch?: number
}

const ClassNameMultiSwitch = ({ texts, onToggle, selectedSwitch }: IClassNameMultiSwitchProps) => {
  const onToggleCallback = (index: number) => onToggle(texts[index], index);

  return (
    <MultiSwitch
      texts={texts}
      selectedSwitch={Number(selectedSwitch) >= 0 ? Number(selectedSwitch) : undefined}
      bgColor={'#e57168'}
      onToggleCallback={onToggleCallback}
      fontColor={'white'}
      selectedFontColor={'#1e311b'}
      eachSwitchWidth={75}
      height={'24px'}
      fontSize={'12px'}
    />
  );
};

export default ClassNameMultiSwitch;
