import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

import { useFonts } from 'expo-font';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontFamily:'RobotoRegular',
    fontSize: 16,
    lineHeight: 24,
    color: '#11181C',
  },
  defaultSemiBold: {
    fontFamily:'RobotoBold',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: '#11181C',
  },
  title: {
    fontFamily: 'PinyonScriptRegular',
    fontSize: 50,
    lineHeight: 28,
    color:'#05AF63',
    paddingRight:28,
    paddingTop:25,
    left:'7%'
  },
  subtitle: {
    fontFamily:'RobotoBold',
    fontSize: 20,
    fontWeight: 'bold',
    color:'#05AF63',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
