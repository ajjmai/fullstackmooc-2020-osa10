import React from 'react';
import { FlatList } from 'react-native';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import ItemSeparator from './ItemSeparator';

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
      keyExtractor={({ id }) => id}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
