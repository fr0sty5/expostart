import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import React, { Fragment, useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";

const KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODdkMTNiZjIyN2IxM2Q3NWQ3Mjk2OTY0NjQ1OGZiMiIsInN1YiI6IjY2NGM0NzliYjMxYTg1YjNiNTY2OWYxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jWmBf7QPdrNFVME02-nRhg6NcDUd7Wv4NVUX80EGzRE"

export default function UpComing() {

    const [listUpcoming, setlistUpcoming] = useState<any>(null)

    useEffect(() => {

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${KEY}`
            }
        };

        fetch('https://api.themoviedb.org/3/movie/upcoming?language=it-US&page=1', options)
            .then(response => response.json())
            .then(response => setlistUpcoming(response))
            .catch(err => console.error(err));

    }, [])


    const router = useRouter()

    const goToDetail = (id: string) => {
        router.push("/detail/" + id)
    }

    return (
        <Fragment >
            <ThemedText style={styles.subTitle}>Upcoming:</ThemedText>
            {listUpcoming?.results && <PagerView style={styles.wrapper} >
                {listUpcoming?.results?.map((upcomingFilm: any) => (
                    <View testID="pager-view-content" collapsable={false} key={upcomingFilm.id} style={[{ height: "100%", width: "100%", position: "relative", overflow: "hidden" }]}>
                        <Pressable key={upcomingFilm.id} onPress={() => goToDetail(upcomingFilm.id)} style={[{ height: "100%", width: "100%" }]}>
                            <Text style={styles.titoloUpcoming}>{upcomingFilm.release_date}</Text>
                            <ThemedText style={styles.upcomingtext} numberOfLines={2}>
                                {upcomingFilm.title}
                            </ThemedText>
                            <Image
                                resizeMode="cover"
                                source={{ uri: "https://image.tmdb.org/t/p/w500" + upcomingFilm.backdrop_path }}
                                style={[{ position: "absolute", top: 0, right: 4, left: 4, bottom: 0, borderRadius: 20 }]} />
                        </Pressable>
                    </View>
                ))}
            </PagerView>}
        </Fragment>
    )
}

const styles = StyleSheet.create({
    subTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 8,
        marginBottom: 8,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    wrapper: {
        flex: 2,
        width: "100%",
        height: 200,
    },
    upcomingtext: {
        width: "60%",
        height: "100%",
        fontSize: 18,
        position: "absolute",
        top: 135,
        left: 13,
        zIndex: 200,
        fontWeight: "bold",
        textShadowColor: 'black',
        textShadowRadius: 10,
        color: "white",
    },
    titoloUpcoming: {
        width: "auto",
        fontSize: 12,
        top: 120,
        left: 13,
        zIndex: 200,
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 12,
        color: "white",
    }
});