import React from 'react';
import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    padding: 15,
    flexDirection: 'row',
  },
  contentContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  reviewText: {
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  ratingContainer: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 0,
    marginRight: 20,
  },
  ratingText: {
    color: theme.colors.primary,
  },
});

const ReviewItem = ({ review }) => {
  const { text, rating, createdAt, user } = review;
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text fontSize="subheading" fontWeight="bold" style={styles.ratingText}>
          {rating}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text fontSize="subheading" fontWeight="bold" style={styles.reviewText}>
          {user.username}
        </Text>
        <Text fontSize="subheading" color="textSecondary" style={styles.reviewText}>
          {format(new Date(createdAt), 'dd.MM.yyyy')}
        </Text>
        <Text style={styles.reviewText}>{text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
