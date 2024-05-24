import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Image, Linking, Pressable, StyleSheet, View } from 'react-native';
import React, { Fragment, useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Rating } from "react-native-ratings";

export default function TabDetail() {

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
            .then(response => setData(response))
            .catch(err => console.error(err));

    }, [])

    const [link, setLink] = useState<any>(null);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODdkMTNiZjIyN2IxM2Q3NWQ3Mjk2OTY0NjQ1OGZiMiIsInN1YiI6IjY2NGM0NzliYjMxYTg1YjNiNTY2OWYxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jWmBf7QPdrNFVME02-nRhg6NcDUd7Wv4NVUX80EGzRE'
            }
        };

        fetch('https://api.themoviedb.org/3/movie/' + id + '/videos?language=en-US', options)
            .then(response => response.json())
            .then(response => setLink(response))
            .catch(err => console.error(err));
    }, [])

    const [listReviews, setlistReviews] = useState<any>(null);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODdkMTNiZjIyN2IxM2Q3NWQ3Mjk2OTY0NjQ1OGZiMiIsInN1YiI6IjY2NGM0NzliYjMxYTg1YjNiNTY2OWYxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jWmBf7QPdrNFVME02-nRhg6NcDUd7Wv4NVUX80EGzRE'
            }
        };

        fetch("https://api.themoviedb.org/3/movie/" + id + "/reviews?language=en-US&page=1", options)
            .then(response => response.json())
            .then(response => setlistReviews(response))
            .catch(err => console.error(err));
    }, [])

    if (!data) return null

    const inset = useSafeAreaInsets()

    return (
        <Fragment>
            <Pressable
                style={[styles.backButton, { top: inset.top + 10 }]}
                onPress={() => router.back()} >
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


                {link?.results[1] && <Pressable
                    onPress={() => {
                        if (link?.results[1].site === "YouTube")
                            Linking.openURL('https://www.youtube.com/watch?v=' + link?.results[1].key)
                        else
                            Linking.openURL('https://vimeo.com/' + link?.results[1].key)
                    }}
                    style={[styles.playButton]}>
                    <Ionicons name="play" size={24} color="black" />
                </Pressable>
                }

                <ThemedText style={styles.title}>{data.original_title}</ThemedText>
                <View style={[{ position: "relative", justifyContent: "flex-end" }]}>
                    <Rating startingValue={data.vote_average} ratingCount={10} imageSize={20} readonly />
                    <ThemedText style={[{ position: "absolute", right: 0, fontSize: 12, justifyContent: "center" }]}>({data.vote_count})</ThemedText>
                </View>

                <View style={styles.information}>
                    <ThemedText style={[{alignSelf:"center"}]}>
                        {data.runtime}m    <ThemedText style={[{ fontSize: 10 }]}>{'\u2B24'} </ThemedText>   {data.release_date}
                    </ThemedText>
                </View>
                <ThemedText style={styles.textContent}>{data.overview}</ThemedText>
                <ThemedText style={styles.title}>Reviews:</ThemedText>
                {listReviews?.results.map((review: any) => (
                    <ThemedText key={review.id} style={styles.review}>{review.content}</ThemedText>
                ))}
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
        width: "auto",
        backgroundColor:"lightgreen",
        borderRadius: 8,
        color: "black",
        textAlign: "center",
    },
    backButton: {
        position: "absolute",
        left: 10,
        zIndex: 500,
        borderRadius: 20,
        backgroundColor: "white",
        padding: 8,
    },
    review: {
        borderColor: "gray",
        borderStyle: "solid",
        borderWidth: 3,
        borderRadius: 10,
        padding: 12,
    },
    playButton: {
        position: "absolute",
        right: 10,
        top: 5,
        backgroundColor: "green",
        borderRadius: 13,
        height: 30,
        width: 30,
        alignItems: "center",
        justifyContent: "center",
    }
});
