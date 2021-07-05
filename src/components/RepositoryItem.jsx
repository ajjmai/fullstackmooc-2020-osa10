import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  flexRowContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'space-around',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  flexColumnContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    justifyContent: 'space-between',
  },
  flexItem: {
    alignSelf: 'center',
  },
  tag: {
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    padding: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    marginLeft: 10,
    borderRadius: 5,
  },
});

const StatsItem = ({ statsCount, statsName }) => {
  const count = statsCount >= 1000 ? `${parseFloat((statsCount / 1000).toFixed(1))}k` : statsCount;

  return (
    <View style={styles.flexColumnContainer}>
      <Text style={styles.flexItem} fontWeight="bold">
        {count}
      </Text>
      <Text style={styles.flexItem} color="textSecondary">
        {statsName}
      </Text>
    </View>
  );
};

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.flexRowContainer, styles.justifyStart]}>
        <Image style={styles.avatar} source={{ uri: repository.ownerAvatarUrl }} />
        <View style={styles.flexColumnContainer}>
          <Text fontSize="subheading" fontWeight="bold">
            {repository.fullName}
          </Text>
          <Text fontSize="subheading" color="textSecondary">
            {repository.description}
          </Text>
          <Text style={styles.tag} color="textTertiary">
            {repository.language}
          </Text>
        </View>
      </View>
      <View style={[styles.flexRowContainer, styles.justifyCenter]}>
        <StatsItem statsName="Stars" statsCount={repository.stargazersCount} />
        <StatsItem statsName="Forks" statsCount={repository.forksCount} />
        <StatsItem statsName="Reviews" statsCount={repository.reviewCount} />
        <StatsItem statsName="Rating" statsCount={repository.ratingAverage} />
      </View>
    </View>
  );
};

export default RepositoryItem;
