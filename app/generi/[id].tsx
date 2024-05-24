import { ThemedText } from '@/components/ThemedText';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import React, { Fragment, useEffect, useState } from 'react';
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaFrameContext, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Tablistfilm() {
    const router = useRouter();

    const goToDetail = (id: string) => {
        router.push("/detail/" + id);
    };

    const [number_page, setnumber_page] = useState<any>(1);

    const { id } = useLocalSearchParams<{ id: string }>();

    const [listFilmGenre, setlistFilmGenre] = useState<any>(null);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODdkMTNiZjIyN2IxM2Q3NWQ3Mjk2OTY0NjQ1OGZiMiIsInN1YiI6IjY2NGM0NzliYjMxYTg1YjNiNTY2OWYxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jWmBf7QPdrNFVME02-nRhg6NcDUd7Wv4NVUX80EGzRE'
            }
        };

        fetch("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=it-IT&page=" + number_page + "&sort_by=popularity.desc&with_genres=" + id, options)
            .then(response => response.json())
            .then(response => setlistFilmGenre(response))
            .catch(err => console.error(err));
    }, [number_page, id]);

    const inset = useSafeAreaInsets();

    return (
        <Fragment>
            <SafeAreaView>
                <Pressable
                    style={[styles.backButton, { top: 10 }]}
                    onPress={() => router.back()} >
                    <Ionicons name="arrow-back" size={24} color="black" />
                </Pressable>
            </SafeAreaView>
            {listFilmGenre?.results && <ScrollView style={styles.scrollMenu}>
                <View style={styles.container}>
                    {listFilmGenre?.results.map((film: any) => (
                        <View key={film.id} style={[styles.column]}>
                            <Pressable style={styles.element} onPress={() => goToDetail(film.id)}>
                                <View style={styles.container_img}>
                                    <Image
                                        style={styles.img}
                                        source={{
                                            uri: 'https://image.tmdb.org/t/p/w500' + film.poster_path,
                                        }}
                                    />
                                </View>
                                <ThemedText style={styles.filmTitle} numberOfLines={1}>{film.original_title}</ThemedText>
                            </Pressable>
                        </View>
                    ))}
                </View>
            </ScrollView>}
            <SafeAreaView style={[{ flexDirection: 'row', justifyContent: 'space-around' }]}>
                <Pressable style={[{}]} onPress={() => {
                    if (number_page > 1)
                        setnumber_page(number_page - 1)
                }}><ThemedText>Previous Page</ThemedText></Pressable>
                <Pressable style={[{}]} onPress={() => {
                    setnumber_page(number_page + 1)
                }}><ThemedText>NextPage</ThemedText></Pressable>
            </SafeAreaView>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    element: {
        width: "100%",
        height: "auto",
        alignItems: "center",
    },
    subTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 8,
    },
    img: {
        height: "100%",
        width: "100%",
        overflow: "hidden",
        borderRadius: 10,
    },
    container_img: {
        height: 200,
        width: 140,
        padding: 5,
        borderRadius: 10,
    },
    filmTitle: {
        width: 120,
        padding: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        width: 120,
        padding: 5,
        fontSize: 14,
    },
    listaGeneri: {
        margin: 10,
        padding: 5,
    },
    scrollMenu: {
        flex: 1,
        padding: 10,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    column: {
        width: '50%',
        padding: 5,
    },
    backButton: {
        position: "absolute",
        left: 10,
        zIndex: 500,
        borderRadius: 20,
        backgroundColor: "white",
        padding: 8,
    },
});