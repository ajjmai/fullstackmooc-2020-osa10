import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import ItemSeparator from './ItemSeparator';
import theme from '../theme';

const styles = StyleSheet.create({
  picker: {
    height: 50,
    backgroundColor: theme.colors.mainBackground,
    paddingLeft: 10,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
  },
});

const SortRepositoryPicker = ({ selectedOrder, setSelectedOrder }) => {
  return (
    <Picker
      selectedValue={selectedOrder}
      onValueChange={(itemValue) => {
        setSelectedOrder(itemValue);
      }}
      style={styles.picker}
    >
      <Picker.Item label="Latest repositories" value="CREATED_AT" />
      <Picker.Item label="Highest rated repositories" value="DESC" />
      <Picker.Item label="Lowest rated repositories" value="ASC" />
    </Picker>
  );
};

export const RepositoryListContainer = ({ repositories, ...props }) => {
  const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={<SortRepositoryPicker {...props} />}
    />
  );
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState();
  const { repositories } = useRepositories(selectedOrder);

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
    />
  );
};

export default RepositoryList;
