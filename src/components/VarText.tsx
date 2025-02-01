import React from 'react';
import {Text, TextStyle} from 'react-native';

type VarTextProps = {
  size: 'large' | 'medium' | 'small';
  style?: TextStyle;
  children: string;
};

const VarText: React.FC<VarTextProps> = ({size, style, children}) => {
  const baseStyle: TextStyle = {
    fontFamily: 'HostGrotesk-Regular',
  };

  const sizeStyles: Record<VarTextProps['size'], TextStyle> = {
    large: {fontSize: 24, fontFamily: 'HostGrotesk-Bold'},
    medium: {fontSize: 18, fontFamily: 'HostGrotesk-Regular'},
    small: {fontSize: 14, fontFamily: 'HostGrotesk-Italic'},
  };

  return <Text style={[baseStyle, sizeStyles[size], style]}>{children}</Text>;
};

export default VarText;
