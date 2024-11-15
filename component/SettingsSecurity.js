import React, { useState } from 'react'
import { View, Text, Image, Pressable, Switch, StyleSheet } from 'react-native'



const SettingsSecurity = () => {
    const [face, setFace] = useState(false)
    const [privacy, setPrivacy] = useState(false)
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={{ marginBottom: 90 }}>
            <Text style={{ fontSize: 20,fontFamily: 'Poppins', paddingTop: 10 }}>Security</Text>
            <View style={{ paddingTop: 15, flexDirection: "column" }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
                    <Text style={{ flexWrap: "wrap", fontSize: 17, letterSpacing: 0.5, fontWeight: "300" }}>Require PIN / Face ID</Text>


                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />









                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
                    <Text style={{ fontSize: 17, fontWeight: "300", letterSpacing: 0.5, color: !face ? "#ddd" : "rgb(44, 44, 44)" }}>PIN / Face ID Settings</Text>
                   

                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
                    <Text style={{ flexWrap: "wrap", fontSize: 17, letterSpacing: 0.5, fontWeight: "300" }}>Privacy mode</Text>


                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 40,
                    }}
                >
                    <Text
                        style={{
                            flexWrap: "wrap",
                            fontSize: 17,
                            fontWeight: "300",
                            letterSpacing: 0.5,
                        }}
                    >
                        Support
                    </Text>
                    <Image
                        source={require("../assets/icons/arrow.png")}
                        style={{ width: 10, height: 10 }}
                    />
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Pressable style={styles.appButtonContainer}>
                        <Text style={styles.appButtonText}>Sign out</Text>
                    </Pressable>
                </View>

            </View>
        </View>
    )



}

const styles = StyleSheet.create({
    appButtonContainer: {
        width: "100%",
        borderWidth: 0.5,
        borderColor: "#ddd",
        borderRadius: 30,
        paddingVertical: 17,
        paddingHorizontal: 100,
    },
    appButtonText: {
        fontSize: 15,
        color: "red",
        fontWeight: "600",
        alignSelf: "center",
    },
});

export default SettingsSecurity