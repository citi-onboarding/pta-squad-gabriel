import React from 'react'; 
import { View, Text, Image, SafeAreaView, StyleSheet } from 'react-native';

export default function HeaderMobile() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
                <Image source={require('./../../../src/assets/logoCITi.png')} style={styles.logo} />
                <Text style={styles.title}>
                    Meus empréstimos
                </Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#FFF',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 12,
        gap: 24
    },
    logo: {
        width: 60,
        height: 40,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
    },
});

        