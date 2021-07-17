import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { format } from 'date-fns';
import Text from './Text';
import theme from '../theme';
import Button from './Button';
import { useHistory } from 'react-router-native';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    padding: 15,
  },
  contentContainer: {
    flexDirection: 'row',
  },
  reviewContainer: {
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexGrow: 1,
    paddingTop: 15,
  },
  redButton: {
    backgroundColor: theme.colors.error,
  },
});

const ReviewItem = ({ review, showButtons = false, refetchReviews = undefined }) => {
  const history = useHistory();
  const [deleteReview] = useDeleteReview();

  const { id, text, rating, createdAt, user } = review;

  const repositoryId = id.substring(id.indexOf('.') + 1);
  const handleViewRepository = () => {
    history.push(`/${repositoryId}`);
  };

  const handleDeleteReview = () => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            await deleteReview(id);
            refetchReviews();
          } catch (e) {
            console.log(e);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.ratingContainer}>
          <Text fontSize="subheading" fontWeight="bold" style={styles.ratingText}>
            {rating}
          </Text>
        </View>
        <View style={styles.reviewContainer}>
          <Text fontSize="subheading" fontWeight="bold" style={styles.reviewText}>
            {user.username}
          </Text>
          <Text fontSize="subheading" color="textSecondary" style={styles.reviewText}>
            {format(new Date(createdAt), 'dd.MM.yyyy')}
          </Text>
          <Text style={styles.reviewText}>{text}</Text>
        </View>
      </View>
      {showButtons && (
        <View style={styles.buttonContainer}>
          <Button onPress={handleViewRepository}>View Repository</Button>
          <Button onPress={handleDeleteReview} style={styles.redButton}>
            Delete review
          </Button>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
