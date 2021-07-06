import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  button: {
    backgroundColor: theme.colors.primary,
    height: 50,
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});

const initialValues = {
  username: '',
  password: '',
};

const SignInForm = ({ handleSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text fontWeight="bold" color="textWhite">
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm handleSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
