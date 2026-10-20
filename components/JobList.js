import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Card from './Card';

const keyExtractor = (job) => String(job.id);
export default function JobList({ data, ...props }) {
  const [listWidth, setListWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const numColumns = cardWidth > 0
    ? Math.max(1, Math.floor(listWidth / cardWidth))
    : 1;

  const renderItem = useCallback(({ item }) => (
    <View style={styles.item}>
      <View onLayout={({ nativeEvent }) => setCardWidth(nativeEvent.layout.width)}>
        <Card job={item} />
      </View>
    </View>
  ), []);

  return (
    <View
      style={styles.container}
      onLayout={({ nativeEvent }) => {
        setListWidth(nativeEvent.layout.width);
      }}
    >
      <FlatList
        {...props}
        key={numColumns}
        style={styles.container}
        contentContainerStyle={styles.content}
        data={data}
        numColumns={numColumns}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={5}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  content: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
});
