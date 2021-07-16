import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import { format } from 'date-fns';

import useRepository from '../hooks/useRepository';
import useReviews from '../hooks/useReviews';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import ItemSeparator from './ItemSeparator';
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

const RepositoryInfo = ({ repository }) => {
  return (
    <>
      <RepositoryItem repository={repository} />
      <ItemSeparator />
    </>
  );
};

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

const SingleRepository = () => {
  const { id } = useParams();
  const { repository } = useRepository(id);
  const { reviews, fetchMore } = useReviews(id);
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  if (!repository) return null;

  const onEndReach = () => {
    console.log('fetch more');
    fetchMore();
  };

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
