import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import RestaurantScreeen from "./src/screens/RestaurantScreeen";
import FoodScreen from "./src/screens/FoodScreen";
import BasketScreen from "./src/screens/BasketScreen";
import PrepareOrder from "./src/screens/PrepareOrder";
import DeliveryScreen from "./src/screens/DeliveryScreen";
import { Provider } from "react-redux";
import { store } from "./store";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Restaurant" component={RestaurantScreeen} />
          <Stack.Screen name="Food" component={FoodScreen} />
          <Stack.Screen
            name="Basket"
            component={BasketScreen}
            options={{
              presentation: "modal",
              headerShown: false,
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="Prepare"
            component={PrepareOrder}
            options={{
              presentation: "fullScreenModal",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Delivery"
            component={DeliveryScreen}
            options={{
              presentation: "fullScreenModal",
              headerShown: false,
              animation: "slide_from_bottom",
            }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
