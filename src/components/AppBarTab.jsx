import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

const AppBarTab = ({ url, tabName }) => {
  return (
    <Pressable style={styles.container}>
      <Link to={url}>
        <Text color="textWhite" fontWeight="bold">
          {tabName}
        </Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
