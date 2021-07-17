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
    backgroundColor: theme.colors.appBarBackground,
  },
  scrollView: {
    flexDirection: 'row',
  },
  tabTouchable: {
    flexGrow: 0,
  },
  tabContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppBarTab = ({ children, ...props }) => {
  return (
    <Pressable style={styles.tabTouchable} {...props}>
      <View style={styles.tabContainer}>
        <Text color="textWhite" fontWeight="bold">
          {children}
        </Text>
      </View>
    </Pressable>
  );
};

const AuthorizedUserTabs = ({ onSignOut }) => {
  return (
    <>
      <Link to="/review" component={AppBarTab}>
        Create a review
      </Link>
      <Link to="/my-reviews" component={AppBarTab}>
        My reviews
      </Link>
      <AppBarTab onPress={onSignOut}>Sign out</AppBarTab>
    </>
  );
};

const GuestUserTabs = () => {
  return (
    <>
      <Link to="/sign-in" component={AppBarTab}>
        Sign in
      </Link>
      <Link to="/sign-up" component={AppBarTab}>
        Sign up
      </Link>
    </>
  );
};

const AppBar = () => {
  const { authorizedUser } = useAuthUser();
  const signOut = useSignOut();

  const onSignOut = async () => {
    await signOut();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" component={AppBarTab}>
          Repositories
        </Link>
        {authorizedUser ? <AuthorizedUserTabs onSignOut={onSignOut} /> : <GuestUserTabs />}
      </ScrollView>
    </View>
  );
};

export default AppBar;
