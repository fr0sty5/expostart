import { StyleSheet, Image, Platform, SafeAreaView, TextInput } from 'react-native';
import React from 'react';

export default function TabTwoScreen() {
    const [text, onChangeText] = React.useState('');
  
    return (
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Search Here..."
          keyboardType="numeric"
        />
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
