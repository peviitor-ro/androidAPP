import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Background from './Background';
import COLORS from '../constants/COLORS';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import NoResults from './NoResults';
import cities from '../assets/json/cities.json';
import useJobStore from '../store/jobs.state';

const items = [
  {
    name: 'Orașe',
    id: 0,
    children: cities,
  },
  {
    name: 'Tipuri de joburi',
    id: 20000,
    children: [
      { id: 20001, name: 'La fața locului', type: 'on-site' },
      { id: 20002, name: 'Hibrid', type: 'hybrid' },
      { id: 20003, name: 'Remote', type: 'remote' },
    ],
  },
];

const getFilters = (selectedItems) => {
  const cities = [];
  const counties = [];
  const remote = [];

  for (const selectedItem of selectedItems) {
    for (const item of items) {
      if (item.children.map((child) => child.id).includes(selectedItem)) {
        if (item.id === 0) {
          cities.push(
            item.children.find((child) => child.id === selectedItem).city,
          );
          counties.push(
            item.children.find((child) => child.id === selectedItem).county,
          );
        } else if (item.id === 20000) {
          remote.push(
            item.children.find((child) => child.id === selectedItem).type,
          );
        }
      }
    }
  }

  return { cities, counties, remote };
};

export default function Filter() {
  const { setCities, setCounties, setRemote } = useJobStore();
  const navigation = useNavigation();

  const [selectedItems, setSelectedItems] = useState([]);

  const onConfirm = () => {
    navigation.navigate('Rezultate');
  };

  useEffect(() => {
    const { cities, counties, remote } = getFilters(selectedItems);
    setCities(cities);
    setCounties(counties);
    setRemote(remote);
  }, [selectedItems, setCities, setCounties, setRemote]);

  return (
    <Background>
      <View style={containerStyles.container}>
        <SectionedMultiSelect
          items={items}
          IconRenderer={Icon}
          uniqueKey="id"
          subKey="children"
          readOnlyHeadings={true}
          showDropDowns={true}
          onSelectedItemsChange={setSelectedItems}
          selectedItems={selectedItems}
          modalWithSafeAreaView={true}
          selectText="Filtre"
          selectedText="Filtre selectate"
          confirmText="Confirmă"
          searchPlaceholderText="Caută..."
          noResultsComponent={
            <View
              style={{
                height: '100%',
              }}
            >
              <NoResults />
            </View>
          }
          parentChipText="Selectează"
          styles={styles}
          onConfirm={onConfirm}
        />
      </View>
    </Background>
  );
}

const containerStyles = {
  container: {
    flex: 1,
    paddingTop: 20,
    gap: 20,
  },
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  selectToggle: {
    backgroundColor: '#fff',
    borderColor: COLORS.border_grey,
    borderWidth: 1,
    padding: 10,
  },
  selectToggleText: {
    color: COLORS.background_green,
  },

  chipContainer: {
    borderColor: COLORS.border_grey,
    borderWidth: 1,
    backgroundColor: COLORS.background_green,
  },
  chipText: {
    color: COLORS.white,
  },
  chipIcon: {
    color: COLORS.white,
  },

  searchTextInput: {
    color: COLORS.background_green,
  },
  searchContainer: {
    backgroundColor: 'red',
  },
  itemText: {
    color: COLORS.background_green,
  },

  button: {
    backgroundColor: COLORS.background_green,
    color: COLORS.white,
  },
  confirmText: {
    color: COLORS.white,
  },
});
