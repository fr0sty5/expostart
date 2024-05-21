import { Image, StyleSheet, Platform, Text, Pressable, View, ScrollView } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';


export default function HomeScreen() {

  const [data, setData] = useState<any>()

  const router = useRouter()

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODdkMTNiZjIyN2IxM2Q3NWQ3Mjk2OTY0NjQ1OGZiMiIsInN1YiI6IjY2NGM0NzliYjMxYTg1YjNiNTY2OWYxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jWmBf7QPdrNFVME02-nRhg6NcDUd7Wv4NVUX80EGzRE");
    myHeaders.append("accept", "application/json");

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    } as const

    fetch("https://api.themoviedb.org/3/discover/movie?language=it-IT", requestOptions)
      .then(response => response.json())
      .then(result => setData(result))
      .catch(error => console.log('error', error));

  }, [])

  const goToDetail = (id: string) => {
    router.push("/detail/" + id)
  }



  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Welcome Here</Text>

      <ThemedText style={styles.titleText}>Top Rated:</ThemedText>
      <ScrollView horizontal>
        {data?.results.map((film: any) => (
          <Pressable style={styles.topRated} key={film.id} onPress={() => goToDetail(film.id)}>
            <View style={styles.container_img}>
              <Image
                style={styles.img}
                source={{
                  uri: 'http://image.tmdb.org/t/p/w500/' + film.poster_path,
                }} />
            </View>
            <ThemedText style={styles.filmTitle} numberOfLines={1}>{film.original_title}</ThemedText>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 20,
    color: "white",
  },
  topRated: {
    padding: 5,
    borderStyle: "solid",
    borderBlockColor: "red",
    borderWidth: 3,
  },
  container_img: {
    height: 170,
    width: 120,
    padding: 5,
  },
  container: {
    padding: 30,
    height: "auto",
    width: "auto",
  },
  filmTitle: {
    width: 120,
  },
});
