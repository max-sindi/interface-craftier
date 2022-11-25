import React from 'react';
import MultiSwitch from 'src/core/UI/MultiSwitch';

interface IClassNameMultiSwitchProps {
  texts: string[];
  onToggle: (value: string) => void;
}

const ClassNameMultiSwitch = ({ texts, onToggle }: IClassNameMultiSwitchProps) => {
  const onToggleCallback = (index: number) => onToggle(texts[index]);

  return (
    <MultiSwitch
      texts={texts}
      // selectedSwitch={0}
      bgColor={'#e57168'}
      onToggleCallback={onToggleCallback}
      fontColor={'white'}
      selectedFontColor={'#1e311b'}
      eachSwitchWidth={100}
      height={'30px'}
      fontSize={'13px'}
    />
  );
};

export default ClassNameMultiSwitch;
