import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import React, { Fragment, useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

export default function Tablistfilm() {

    const goToDetail = (id: string) => {
        router.push("/detail/" + id)
    }

    const { id } = useLocalSearchParams<{ id: string }>();

    console.log(id)

    const [listFilmGenre, setlistFilmGenre] = useState<any>(null)

    useEffect(() => {
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
    }, [])

    console.log(listFilmGenre)

    return (
        <ScrollView style={styles.scrollMenu}>
            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    subTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 8,
    },
    img: {
        height: "100%",
        width: "100%",
        overflow: "hidden",
    },
    container_img: {
        height: 170,
        width: 120,
        padding: 5,
        borderRadius: 20,
    },
    filmTitle: {
        width: 120,
        padding: 5,
    },
    listaGeneri: {
        margin: 10,
        padding: 5,
    },
    scrollMenu: {
        height: "auto",
        width: "auto",
    },
});
