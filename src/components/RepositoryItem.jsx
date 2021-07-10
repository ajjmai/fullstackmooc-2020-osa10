import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';
import formatInThousands from '../utils/formatInThousands';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    padding: 15,
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  contentContainer: {
    flexGrow: 1,
    flexShrink: 1,
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
    flexGrow: 0,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  statsItemCount: {
    marginBottom: 5,
  },
  languageContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  languageText: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
    flexGrow: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  avatarContainer: {
    flexGrow: 0,
    marginRight: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: theme.roundness,
  },
});

const StatsItem = ({ count, label, testID }) => {
  return (
    <View style={styles.statsItem}>
      <Text style={styles.statsItemCount} fontWeight="bold" testID={testID}>
        {formatInThousands(count)}
      </Text>
      <Text color="textSecondary">{label}</Text>
    </View>
  );
};

const RepositoryItem = ({ repository }) => {
  const { fullName, description, language, forksCount, stargazersCount, ratingAverage, reviewCount, ownerAvatarUrl } =
    repository;

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} source={{ uri: ownerAvatarUrl }} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.infoText} fontSize="subheading" fontWeight="bold" testID="repositoryName">
            {fullName}
          </Text>
          <Text style={styles.infoText} fontSize="subheading" color="textSecondary" testID="repositoryDescription">
            {description}
          </Text>
          {language ? (
            <View style={styles.languageContainer}>
              <Text style={styles.languageText} color="textWhite" testID="repositoryLanguage">
                {language}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <StatsItem label="Stars" count={stargazersCount} testID="stargazersCount" />
        <StatsItem label="Forks" count={forksCount} testID="forksCount" />
        <StatsItem label="Reviews" count={reviewCount} testID="reviewCount" />
        <StatsItem label="Rating" count={ratingAverage} testID="ratingAverage" />
      </View>
    </View>
  );
};

export default RepositoryItem;
