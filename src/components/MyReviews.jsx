import React from 'react';
import { FlatList } from 'react-native';
import ItemSeparator from './ItemSeparator';
import ReviewItem from './ReviewItem';
import useAuthUser from '../hooks/useAuthUser';

const MyReviews = () => {
  const { authorizedUser } = useAuthUser(true);
  const reviewNodes = authorizedUser ? authorizedUser?.reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
