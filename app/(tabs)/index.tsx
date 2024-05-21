import { Image, StyleSheet, Platform, Text, Pressable } from 'react-native';
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

  },[])

  const goToDetail = (id: string) => {
    router.push("/detail/" + id)
  }
 
  console.log(data?.results)
  

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to favelas</ThemedText>
        <HelloWave />
      </ThemedView>
      {data?.results.map((film: any) => (
         <Pressable style={styles.Index_content} key={film.id} onPress={() => goToDetail(film.id)}>
          <Image 
          style={styles.tinyLogo}
          source={{
            uri: 'http://image.tmdb.org/t/p/w500/'+film.poster_path,
          }}
        />
         <ThemedText>{film.original_title}</ThemedText>
       </Pressable>

      ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  tinyLogo: {
    width: 200,
    height: 200,
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  Index_content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  }
});
