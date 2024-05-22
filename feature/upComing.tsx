import { ThemedText } from "@/components/ThemedText";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

const KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODdkMTNiZjIyN2IxM2Q3NWQ3Mjk2OTY0NjQ1OGZiMiIsInN1YiI6IjY2NGM0NzliYjMxYTg1YjNiNTY2OWYxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jWmBf7QPdrNFVME02-nRhg6NcDUd7Wv4NVUX80EGzRE"

export default function UpComing() {

    const [listUpcoming, setlistUpcoming] = useState<any>(null)

    useEffect(() => {

        console.log("fetching upcoming", KEY)

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${KEY}`
            }
        };

        fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
            .then(response => response.json())
            .then(response => setlistUpcoming(response))
            .catch(err => console.error(err));

    }, [])

    console.log(listUpcoming)

    return (
        <>
            <ThemedText style={styles.subTitle}>Upcoming:</ThemedText>

            <ScrollView horizontal style={styles.wrapper}>
                {listUpcoming?.results?.map((upcomingFilm: any) => (
                    <View collapsable={false} key={upcomingFilm.id} style={[{ height: 500 }]}>
                        <ThemedText style={styles.upcomingtext} numberOfLines={1}>
                            {upcomingFilm.title}
                        </ThemedText>
                        <Image
                            resizeMode="cover"
                            source={{ uri: "http://image.tmdb.org/t/p/w500/" + upcomingFilm.backdrop_path }}
                            style={[{ position: "absolute", top: 0, right:0 , left: 0, bottom: 0 }]} />
                    </View>
                ))}
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    subTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 8,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    wrapper: {
        flex: 1,
        width: "100%",
        height: 500,
    },
    upcomingtext: {
        width: "40%",
        height: "80%",
        fontSize: 20,
        position: "absolute",
        top: 10,
        left: 20,
        fontFamily: "arial",
        fontWeight: "bold",
        textAlign: "center",
        color: "red",
        overflow: "hidden"
    },
});