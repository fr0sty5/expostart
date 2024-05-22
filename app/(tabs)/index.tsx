import { Image, StyleSheet, Pressable, View, ScrollView, useColorScheme, FlatList, ImageBackground, Dimensions, useWindowDimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import PagerView from 'react-native-pager-view';


export default function HomeScreen() {

  const router = useRouter()

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

  const goToDetail = (id: string) => {
    router.push("/detail/" + id)
  }

  const [genre, setgenre] = useState<any>(null)

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODdkMTNiZjIyN2IxM2Q3NWQ3Mjk2OTY0NjQ1OGZiMiIsInN1YiI6IjY2NGM0NzliYjMxYTg1YjNiNTY2OWYxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jWmBf7QPdrNFVME02-nRhg6NcDUd7Wv4NVUX80EGzRE");
    myHeaders.append("accept", "application/json");

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

  const [listUpcoming, setlistUpcoming] = useState<any>(null)

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODdkMTNiZjIyN2IxM2Q3NWQ3Mjk2OTY0NjQ1OGZiMiIsInN1YiI6IjY2NGM0NzliYjMxYTg1YjNiNTY2OWYxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jWmBf7QPdrNFVME02-nRhg6NcDUd7Wv4NVUX80EGzRE");
    myHeaders.append("accept", "application/json");

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODdkMTNiZjIyN2IxM2Q3NWQ3Mjk2OTY0NjQ1OGZiMiIsInN1YiI6IjY2NGM0NzliYjMxYTg1YjNiNTY2OWYxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jWmBf7QPdrNFVME02-nRhg6NcDUd7Wv4NVUX80EGzRE'
      }
    };

    fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
      .then(response => response.json())
      .then(response => setlistUpcoming(response))
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

  const size = useWindowDimensions();

  var [ isPress, setIsPress ] = React.useState(false);

  

  return (
    <SafeAreaView style={styles.Maincontainer}>
      <ScrollView showsVerticalScrollIndicator>
        <ThemedText style={styles.titleText}>Welcome Here!!</ThemedText>
        <ThemedText style={styles.subTitle}>Upcoming:</ThemedText>

        <PagerView style={styles.wrapper}>
          {listUpcoming?.results.map((upcomingFilm: any) => (
            <Pressable key={upcomingFilm.id} onPress={() => goToDetail(upcomingFilm.id)} style={[{height:"100%", backgroundColor: "red"}]}>
              <ImageBackground resizeMode="cover" source={{ uri: "http://image.tmdb.org/t/p/w500/" + upcomingFilm.backdrop_path }}
                style={[{ width: (size.width - 20), height: (size.width * 0.7), justifyContent: "center", marginRight: 20}]}>
                <ThemedText style={styles.upcomingtext} numberOfLines={1}>
                  {upcomingFilm.title}
                </ThemedText>
              </ImageBackground>
            </Pressable>
          ))}
        </PagerView>

        <ThemedText style={styles.subTitle}>Top Rated:</ThemedText>
        <ScrollView horizontal style={styles.scrollMenu}>
          {data?.results.map((film: any) => (
            <Pressable key={film.id} onPress={() => goToDetail(film.id)}>
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

        <ThemedText style={styles.subTitle}>Your Choice:</ThemedText>
        <FlatList
          horizontal={true}
          data={genre?.genres}
          renderItem={({ item }) => <Pressable onPress={() => ListFilm(item.id)}>
            <ThemedText style={styles.listaGeneri}>{item.name}</ThemedText>
          </Pressable>}
          keyExtractor={item => item.id}
        />

        <ScrollView horizontal>
          {listFilmGenre?.results.map((filmGenere: any) => (
            <Pressable key={filmGenere.id} onPress={() => goToDetail(filmGenere.id)}>
              <View style={styles.container_img}>
                <Image
                  style={styles.img}
                  source={{
                    uri: 'http://image.tmdb.org/t/p/w500/' + filmGenere.poster_path,
                  }} />
              </View>
              <ThemedText style={styles.filmTitle} numberOfLines={1}>{filmGenere.original_title}</ThemedText>
            </Pressable>
          ))}
        </ScrollView>
      </ScrollView>

    </SafeAreaView>
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
  upcomingtext: {
    width: "40%",
    height: "80%",
    fontSize: 20,
    fontFamily: "arial",
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    overflow:"hidden"
  },
  upcomingImg: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  }
});
