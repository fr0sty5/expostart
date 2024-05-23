import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Image, Pressable, StyleSheet } from 'react-native';
import React, { Fragment, useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabTwoScreen() {

    const { id } = useLocalSearchParams<{ id: string }>();

    console.log(id)

    return (
        <Fragment>
           <ThemedText>hi</ThemedText>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    

});
