import Ionicons from '@expo/vector-icons/Ionicons';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image, Platform, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { FullWindowOverlay } from 'react-native-screens';
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

export default function TabTwoScreen() {

    const [data, setData] = useState<any>(null)

    const { id } = useLocalSearchParams<{ id: string }>();

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODdkMTNiZjIyN2IxM2Q3NWQ3Mjk2OTY0NjQ1OGZiMiIsInN1YiI6IjY2NGM0NzliYjMxYTg1YjNiNTY2OWYxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jWmBf7QPdrNFVME02-nRhg6NcDUd7Wv4NVUX80EGzRE");
        myHeaders.append("accept", "application/json");
      
        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        } as const
    
        fetch("https://api.themoviedb.org/3/movie/"+id+"?language=it-IT", requestOptions)
          .then(response => response.json())
          .then(result => setData(result))
          .catch(error => console.log('error', error));
    
      },[])

    if (!data) return null

    console.log(data)

    return (
    <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
        <Image
        source={{
            uri: 'http://image.tmdb.org/t/p/w500/'+data.poster_path,
          }}
          style={styles.reactLogo}
          />
        }>
        <ThemedText style={styles.title}>{data.original_title}</ThemedText>
        <ThemedText>
            {data.vote_average}  ({data.vote_count})
        </ThemedText>
        <ThemedText>{data.runtime}m    {'\u2B24'}    {data.release_date} </ThemedText>
        <ThemedText>
            Overview:
            {data.overview}
        </ThemedText>
        <ThemedText></ThemedText>
    </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    reactLogo: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
    }
});
