import React from 'react';
import { FlatList } from 'react-native';
import { useParams } from 'react-router-native';

import useRepository from '../hooks/useRepository';
import useReviews from '../hooks/useReviews';
import RepositoryItem from './RepositoryItem';
import ItemSeparator from './ItemSeparator';
import ReviewItem from './ReviewItem';

const RepositoryInfo = ({ repository }) => {
  return (
    <>
      <RepositoryItem repository={repository} />
      <ItemSeparator />
    </>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository } = useRepository(id);
  const { reviews, fetchMore } = useReviews(id);
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  if (!repository) return null;

  const onEndReach = () => {
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
