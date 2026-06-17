import { Stack, Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

import { useAuth } from "@/context/AuthContext"
import { Colors } from "@/constants/colors";

export default function AuthLayout() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors.background }}>
                <ActivityIndicator size="large" color={Colors.btnPrimary} />
            </View>
        );
    }

    if (isAuthenticated) {
        return <Redirect href="/pokedex" />;
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="register" />
        </Stack>
    );
}
