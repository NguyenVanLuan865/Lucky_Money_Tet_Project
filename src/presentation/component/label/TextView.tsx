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

// Xuất các component với Memo để tối ưu hiệu năng
export const HeaderTextView = React.memo(_HeaderTextView);
export const ContentTextView = React.memo(_ContentTextView);

// Style riêng cho từng loại TextView
const styles = StyleSheet.create({
  headerText: {
    fontSize: 20, // Kích thước lớn hơn cho Header
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'SVN-Cookies'
  },
  contentText: {
    fontSize: 16, // Kích thước nhỏ hơn cho nội dung
    color: '#4f4f4f',
    fontFamily: 'SVN-Gotham'
  },
});
