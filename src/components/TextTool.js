import React from 'react';
import {
  Text,
  StyleSheet
} from 'react-native';
import { color } from '../utils';

export const H1 = ({ title, style, numberOfLines, color, children }) => (
  <Text style={ [styles.H1, style, { color: color || '#000000' }] }
        numberOfLines={ numberOfLines || 0 }>{ title || children }</Text>)

export const H2 = ({ title, style, numberOfLines, color, children }) => (
  <Text style={ [styles.H2, style, { color: color || '#000000' }] }
        numberOfLines={ numberOfLines || 0 }>{ title || children }</Text>)

export const H3 = ({ title, style, numberOfLines, color, children }) => (
  <Text style={ [styles.H3, style, { color: color || '#000000' }] }
        numberOfLines={ numberOfLines || 0 }>{ title || children }</Text>)

export const H4 = ({ title, style, numberOfLines, color, children }) => (
  <Text style={ [styles.H4, style, { color: color || '#000000' }] }
        numberOfLines={ numberOfLines || 0 }>{ title || children }</Text>);

export const Normal = ({ title, style, numberOfLines, color, children }) => (
  <Text style={ [styles.normal, style, { color: color || '#000000' }] }
        numberOfLines={ numberOfLines || 0 }>{ title || children }</Text>);

export const Tip = ({ title, style, numberOfLines, children, color }) => (
  <Text style={ [styles.tip, style, { color: color || '#000000' }] }
        numberOfLines={ numberOfLines || 0 }>{ title || children }</Text>);

export const Small = ({ title, style, numberOfLines }) => (
  <Text style={ [styles.small, style] }
        numberOfLines={ numberOfLines || 0 }>{ title }</Text>);

const styles = StyleSheet.create({
  H1: {
    fontSize: 25,
    fontWeight: '800',
    color: color.black,
  },
  H2: {
    fontSize: 18,
    fontWeight: '500',
    color: color.black,
  },
  H3: {
    fontSize: 16,
    fontWeight: '300',
    color: color.black,
  },
  H4: {
    fontSize: 14,
    fontWeight: '200',
    color: color.black,
  },
  normal: {
    fontSize: 12,
    color: color.black,
  },
  tip: {
    fontSize: 11,
  },
  small: {
    fontSize: 10,
    color: color.black
  }
});

