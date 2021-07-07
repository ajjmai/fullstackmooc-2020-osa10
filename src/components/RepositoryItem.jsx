import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
  },
  flexRowContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  justifyCenter: {
    justifyContent: 'space-around',
  },
  flexColumnContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
  infoText: {
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  statsItem: {
    alignSelf: 'center',
    paddingBottom: 5,
  },
  tag: {
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: 3,
    marginVertical: 5,
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
      <Text style={styles.statsItem} fontWeight="bold">
        {count}
      </Text>
      <Text style={styles.statsItem} color="textSecondary">
        {statsName}
      </Text>
    </View>
  );
};

const RepositoryItem = ({ repository }) => {
  const { fullName, description, language, forksCount, stargazersCount, ratingAverage, reviewCount, ownerAvatarUrl } =
    repository;

  return (
    <View style={styles.container}>
      <View style={styles.flexRowContainer}>
        <Image style={styles.avatar} source={{ uri: ownerAvatarUrl }} />
        <View style={styles.flexColumnContainer}>
          <Text style={styles.infoText} fontSize="subheading" fontWeight="bold">
            {fullName}
          </Text>
          <Text style={styles.infoText} fontSize="subheading" color="textSecondary">
            {description}
          </Text>
          <View style={styles.tag}>
            <Text color="textWhite">{language}</Text>
          </View>
        </View>
      </View>
      <View style={[styles.flexRowContainer, styles.justifyCenter]}>
        <StatsItem statsName="Stars" statsCount={stargazersCount} />
        <StatsItem statsName="Forks" statsCount={forksCount} />
        <StatsItem statsName="Reviews" statsCount={reviewCount} />
        <StatsItem statsName="Rating" statsCount={ratingAverage} />
      </View>
    </View>
  );
};

export default RepositoryItem;
