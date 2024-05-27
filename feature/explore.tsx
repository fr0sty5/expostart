import { StyleSheet, Image, Platform, SafeAreaView, TextInput, Pressable, ScrollView, View, Button } from 'react-native';
import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';

export default function TabTwoScreen() {

  const [text, setText] = React.useState('');
  const [data, setData] = useState<any>(null);
  const [searchResults, setSearchResults] = useState([]);

  const router = useRouter();

  const goToDetail = (id: string) => {
    router.push("/detail/" + id);
  };

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODdkMTNiZjIyN2IxM2Q3NWQ3Mjk2OTY0NjQ1OGZiMiIsInN1YiI6IjY2NGM0NzliYjMxYTg1YjNiNTY2OWYxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jWmBf7QPdrNFVME02-nRhg6NcDUd7Wv4NVUX80EGzRE'
      }
    };

    if (text !== '') {
      fetch('https://api.themoviedb.org/3/search/movie?query=' + text.replaceAll(" ", "+") + '&api_key=a87d13bf227b13d75d72969646458fb2', options)
        .then(response => response.json())
        .then(response => setData(response))
        .catch(err => console.error(err));
    }
  }, [text]);

  const handleSubmit = () => {
    if (data && data.results) {
      setSearchResults(data.results);
    }
  };

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={newText => setText(newText)}
        value={text}
        placeholder="Search Here..."
        keyboardType="ascii-capable"
        onSubmitEditing={handleSubmit}

      />
      {searchResults.length > 0 && (
        <ScrollView horizontal style={styles.scrollMenu}>
        {searchResults.map((film: any) => (
          <Pressable key={film.id} onPress={() => goToDetail(film.id)}>
            <View style={styles.container_img}>
              <Image
                style={styles.img}
                source={{
                  uri: 'https://image.tmdb.org/t/p/w500' + film.poster_path,
                }} />
            </View>
            <ThemedText style={styles.filmTitle} numberOfLines={1}>{film.original_title}</ThemedText>
          </Pressable>
        ))}
      </ScrollView>
      )}
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
  titleText: {
    fontSize: 20,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 8,
  },
  scrollMenu: {
    height: "auto",
    width: "auto",
  },
  img: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  container_img: {
    height: 170,
    width: 120,
    padding: 5,
  },
  filmTitle: {
    width: 120,
    padding: 5,
  },
});