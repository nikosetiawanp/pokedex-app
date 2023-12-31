import Home from "./screens/home";
import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PokemonDetail from "./screens/pokemonDetail";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={PokemonDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
