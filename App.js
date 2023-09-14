import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";

import { useEffect, useState } from "react";
import Card from "./components/Card";
import CardNew from "./components/CardNew";

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=25&offset=500";

  async function fetchPokemons(url) {
    try {
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setPokemons(data.results);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPokemons(apiUrl);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Pokédex</Text>
        <Text style={styles.subheading}>Search for Pokémon by name</Text>
        <TextInput
          editable
          value={searchInput}
          placeholder="What Pokémon are you looking for?"
          onChange={(e) => setSearchInput(e.target.value)}
          style={{
            padding: 20,
            backgroundColor: "whitesmoke",
            color: "grey",
            borderRadius: 10,
            marginTop: 20,
            marginBottom: 10,
          }}
        />
      </View>
      {/* CARD CONTAINER */}
      <ScrollView style={styles.cardContainer}>
        {pokemons.map((pokemon, index) => (
          <CardNew key={pokemon.id} pokemon={pokemon} />
        ))}
      </ScrollView>
      <View
        style={{
          backgroundColor: "white",
          height: 50,
          position: "fixed",
          width: windowWidth,
          borderTopColor: "lightgray",
          borderTopWidth: 0.5,
          // padding: 30,
        }}
      ></View>
    </View>
  );
}
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    alignItems: "start",
    justifyContent: "start",
  },
  headerContainer: {
    width: windowWidth,
    borderBottomColor: "lightgray",
    borderBottomWidth: 0.5,
    backgroundColor: "white",
    padding: 30,
    paddingTop: 60,
    paddingBottom: 10,
  },
  heading: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "black",
  },
  subheading: {
    fontSize: "18px",
    color: "grey",
  },
  cardContainer: {
    paddingTop: 30,
    paddingBottom: 30,
    width: windowWidth,
    height: windowHeight,
  },
});
