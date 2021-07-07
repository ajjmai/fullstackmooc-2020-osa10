import React from 'react';
import { Pressable, View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import theme from '../theme';
import useAuthUser from '../hooks/useAuthUser';
import useSignOut from '../hooks/useSignOut';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: 130,
    backgroundColor: theme.colors.appBarBackground,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tabContainer: {
    padding: 10,
  },
});

const SignOutTab = () => {
  const signOut = useSignOut();

  const onSignOut = async () => {
    await signOut();
  };

  return (
    <Pressable onPress={onSignOut} style={styles.tabContainer}>
      <Text color="textWhite" fontWeight="bold">
        Sign out
      </Text>
    </Pressable>
  );
};

const AppBarTab = ({ url, children }) => {
  return (
    <Pressable style={styles.tabContainer}>
      <Link to={url}>
        <Text color="textWhite" fontWeight="bold">
          {children}
        </Text>
      </Link>
    </Pressable>
  );
};

const AppBar = () => {
  const { authorizedUser } = useAuthUser();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab url="/">Repositories</AppBarTab>
        {authorizedUser ? <SignOutTab /> : <AppBarTab url="signin">Sign in</AppBarTab>}
      </ScrollView>
    </View>
  );
};

export default AppBar;
