import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

const AppBarTab = ({ tabName }) => {
  return (
    <Pressable style={styles.container}>
      <Text color="textTertiary" fontWeight="bold">
        {tabName}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;
