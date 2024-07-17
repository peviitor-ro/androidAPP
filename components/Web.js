import { useState } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, Animated, ActivityIndicator } from 'react-native';
import CustomButton from './Buttons';
import COLORS from '../constants/COLORS';

export default function Web({ url, visible, setVisible }) {
  if (!visible) return null;

  const [loading, setLoading] = useState(true);
  return (
    <Animated.View style={[styles.container]}>
      <CustomButton
        title="Close"
        onPress={() => setVisible(false)}
        style={buttonStyles}
      />
      {loading && <ActivityIndicator size="large" color={COLORS.background_green} />}
      <WebView source={{ uri: url }} style={styles.scrollViewContainer}
        onLoadEnd={() => setLoading(false)}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    top: 0,
    backgroundColor: 'white', 
  },

  scrollViewContainer: {
    flex: 1,
  },
});

const buttonStyles = StyleSheet.create({
   button: {
      borderRadius: 0,
  }
});


