import { StyleSheet, Image, Pressable, ScrollView, View } from 'react-native';
import React, { Fragment, useEffect, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';

export default function TabListGenere() {

    const router = useRouter()

    const goToList = (id: string) => {
        router.push("/generi/" + id)
    }

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

    return (
        <Fragment>

            <ThemedText style={styles.subTitle}>Your Choice:</ThemedText>
            <ScrollView horizontal style={styles.scrollMenu}>
                <View style={styles.container_img}>
                    {genre?.genres.map((genere: any) => (
                        <Pressable key={genere.id} onPress={() => goToList(genere.id)}>
                            <Image
                                style={styles.img}
                                resizeMode='contain'
                                source={{
                                    uri: "./../assets/generi/" + genere.name + ".png",
                                  }} />
                            <ThemedText style={styles.genereName}>{genere.name}</ThemedText>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>

        </Fragment>
    );
};

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
        borderRadius: 20,
    },
    container_img: {
        height: 170,
        width: 120,
        padding: 5,
        borderRadius: 20,
    },
    genereName: {
        width: "auto",
        position: "absolute",
        bottom: 12,
        left: 7,
        zIndex: 200,
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius:7,
        color: "white",
        fontWeight: "bold"
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
