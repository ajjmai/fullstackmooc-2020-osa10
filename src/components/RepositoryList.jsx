import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import ItemSeparator from './ItemSeparator';
import theme from '../theme';

const styles = StyleSheet.create({
  picker: {
    height: 50,
    backgroundColor: theme.colors.mainBackground,
    paddingLeft: 20,
    marginBottom: 10,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    borderWidth: 0,
  },
  searchContainer: {
    margin: 10,
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

const FilterRepositoriesField = ({ searchKeyword, setSearchkeyword }) => {
  const onChangeSearch = (query) => setSearchkeyword(query);

  return (
    <Searchbar
      style={styles.searchContainer}
      placeholder="Filter"
      onChangeText={onChangeSearch}
      value={searchKeyword}
    />
  );
};

const RepositoryListHeader = ({ selectedOrder, setSelectedOrder, searchKeyword, setSearchkeyword }) => {
  return (
    <>
      <FilterRepositoriesField searchKeyword={searchKeyword} setSearchkeyword={setSearchkeyword} />
      <SortRepositoryPicker selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />
    </>
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;

    return <RepositoryListHeader {...props} />;
  };

  render() {
    return (
      <FlatList
        data={this.props.repositories}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem repository={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={this.renderHeader}
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState('CREATED_AT');
  const [searchKeyword, setSearchkeyword] = useState();
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const { repositories, fetchMore } = useRepositories(selectedOrder, debouncedSearchKeyword);

  const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositoryNodes}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      searchKeyword={searchKeyword}
      setSearchkeyword={setSearchkeyword}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
