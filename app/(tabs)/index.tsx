import { Image, StyleSheet, Pressable, View, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UpComing from '@/feature/upComing';
import Explorer from '@/feature/explore';

export default function HomeScreen() {

  const router = useRouter()

  const goToDetail = (id: string) => {
    router.push("/detail/" + id)
  }

  const goToList = (id: string) => {
    router.push("/detail/g" + id)
  }

  const [data, setData] = useState<any>()

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODdkMTNiZjIyN2IxM2Q3NWQ3Mjk2OTY0NjQ1OGZiMiIsInN1YiI6IjY2NGM0NzliYjMxYTg1YjNiNTY2OWYxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jWmBf7QPdrNFVME02-nRhg6NcDUd7Wv4NVUX80EGzRE");
    myHeaders.append("accept", "application/json");

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    } as const

    fetch("https://api.themoviedb.org/3/movie/top_rated?language=it-IT", requestOptions)
      .then(response => response.json())
      .then(result => setData(result))
      .catch(error => console.log('error', error));

  }, [])

  const [genre, setgenre] = useState<any>(null)

  useEffect(() => {

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODdkMTNiZjIyN2IxM2Q3NWQ3Mjk2OTY0NjQ1OGZiMiIsInN1YiI6IjY2NGM0NzliYjMxYTg1YjNiNTY2OWYxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jWmBf7QPdrNFVME02-nRhg6NcDUd7Wv4NVUX80EGzRE'
      }
    };

    fetch('https://api.themoviedb.org/3/genre/movie/list?language=it', options)
      .then(response => response.json())
      .then(response => setgenre(response))
      .catch(err => console.error(err));

  }, [])

  const [listFilmGenre, setlistFilmGenre] = useState<any>(null)

  function ListFilm(id: string) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODdkMTNiZjIyN2IxM2Q3NWQ3Mjk2OTY0NjQ1OGZiMiIsInN1YiI6IjY2NGM0NzliYjMxYTg1YjNiNTY2OWYxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jWmBf7QPdrNFVME02-nRhg6NcDUd7Wv4NVUX80EGzRE'
      }
    };

    fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=it-IT&page=1&sort_by=popularity.desc&with_genres=' + id, options)
      .then(response => response.json())
      .then(response => setlistFilmGenre(response))
      .catch(err => console.error(err));
  }

  const inset = useSafeAreaInsets();

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: inset.top, paddingHorizontal: 20, paddingBottom: 10 }}>
      <ThemedText style={styles.titleText}>Welcome Here!!</ThemedText>

      <Explorer />
      <UpComing />

      <ThemedText style={styles.subTitle}>Top Rated:</ThemedText>
      <ScrollView horizontal style={styles.scrollMenu}>
        {data?.results.map((film: any) => (
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

      <ThemedText style={styles.subTitle}>Your Choice:</ThemedText>
      <ScrollView horizontal style={[{ height: 170, width: 100, flex: 2 }]}>
        <View style={styles.container_img}>
          {genre?.genres.map((genere: any) => (
            <Pressable key={genere.id} onPress={() => goToList(genere.id)}>
              <ThemedText>{genere.id}</ThemedText>
              <Image
                style={styles.img}
                source={require("../../assets/generi/Fantasy.png")} />
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <ScrollView horizontal>
        {listFilmGenre?.results.map((filmGenere: any) => (
          <Pressable key={filmGenere.id} onPress={() => goToDetail(filmGenere.id)}>
            <View style={styles.container_img}>
              <Image
                style={styles.img}
                source={{
                  uri: 'https://image.tmdb.org/t/p/w500' + filmGenere.poster_path,
                }} />
            </View>
            <ThemedText style={styles.filmTitle} numberOfLines={1}>{filmGenere.original_title}</ThemedText>
          </Pressable>
        ))}
      </ScrollView>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Maincontainer: {
    paddingTop: "auto",
    paddingLeft: 20,
    paddingRight: 20,
    height: "auto",
    width: "auto",
  },
  wrapper: {
    flex: 1,
    width: "100%",
    height: 500,
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
  baseText: {
    fontFamily: 'Cochin',
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
  listaGeneri: {
    margin: 10,
    padding: 5,
  },
});
