import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

export interface TextViewProps extends TextProps {
  text?: string;
}

// TextView cho Header
const _HeaderTextView: React.FC<TextViewProps> = (props) => {
  return (
    <Text
      {...props}
      style={StyleSheet.flatten([styles.headerText, props.style])}>
      {props.text}
    </Text>
  );
};

// TextView cho Nội dung
const _ContentTextView: React.FC<TextViewProps> = (props) => {
  return (
    <Text
      {...props}
      style={StyleSheet.flatten([styles.contentText, props.style])}>
      {props.text}
    </Text>
  );
};

export const HeaderTextView = React.memo(_HeaderTextView);
export const ContentTextView = React.memo(_ContentTextView);

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'SVN-Cookies'
  },
  contentText: {
    fontSize: 16,
    color: '#4f4f4f',
    fontFamily: 'SVN-Gotham'
  },
});
