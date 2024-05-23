import { StyleSheet, Image, Platform, SafeAreaView, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function TabTwoScreen() {

  const [text, setText] = React.useState('');

  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODdkMTNiZjIyN2IxM2Q3NWQ3Mjk2OTY0NjQ1OGZiMiIsInN1YiI6IjY2NGM0NzliYjMxYTg1YjNiNTY2OWYxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jWmBf7QPdrNFVME02-nRhg6NcDUd7Wv4NVUX80EGzRE'
      }
    };

    fetch('https://api.themoviedb.org/3/search/movie?query=' + text + '&api_key=a87d13bf227b13d75d72969646458fb2', options)
      .then(response => response.json())
      .then(response => setData(response))
      .catch(err => console.error(err));

  }, [])

  return (
    <SafeAreaView>
      <TextInput

        style={styles.input}
        onChangeText={newText => setText(newText)}
        value={text}
        placeholder="Search Here..."
        keyboardType="ascii-capable"
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
    backgroundColor: "white",
  },
});
