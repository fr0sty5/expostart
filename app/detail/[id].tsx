import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import {Image, Pressable, StyleSheet } from 'react-native';
import React, { Fragment, useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabTwoScreen() {

    const { id } = useLocalSearchParams<{ id: string }>();

    const [data, setData] = useState<any>(null)

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODdkMTNiZjIyN2IxM2Q3NWQ3Mjk2OTY0NjQ1OGZiMiIsInN1YiI6IjY2NGM0NzliYjMxYTg1YjNiNTY2OWYxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jWmBf7QPdrNFVME02-nRhg6NcDUd7Wv4NVUX80EGzRE");
        myHeaders.append("accept", "application/json");

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        } as const

        fetch("https://api.themoviedb.org/3/movie/" + id + "?language=it-IT", requestOptions)
            .then(response => response.json())
            .then(result => setData(result))
            .catch(error => console.log('error', error));

    }, [])

    if (!data) return null

    const inset=useSafeAreaInsets()

    return (
        <Fragment>
            <Pressable
                style={[styles.backButton, {top:inset.top+10}]}
                onPress={() => router.back()}
            >
                <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable>
            <ParallaxScrollView
                headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
                headerImage={
                    <Image
                        source={{
                            uri: 'http://image.tmdb.org/t/p/w500/' + data.poster_path,
                        }}
                        style={styles.reactLogo}
                    />
                }>
                <ThemedText style={styles.title}>{data.original_title}</ThemedText>
                <ThemedText>
                    {data.vote_average}  ({data.vote_count})
                </ThemedText>
                <ThemedText style={styles.information}>{data.runtime}m    {'\u2B24'}    {data.release_date} </ThemedText>
                <ThemedText style={styles.textContent}>
                    {data.overview}
                </ThemedText>
            </ParallaxScrollView>
        </Fragment>
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
    },
    textContent: {
        fontSize: 14,
    },
    information: {
        backgroundColor: "red",
        borderRadius: 7,
        color: "black",
        paddingLeft: 10,
    },
    backButton: {
        position: "absolute",
        left:10,
        zIndex:500,
        borderRadius: 20,
        backgroundColor: "white",
        padding: 8,
    },
});
