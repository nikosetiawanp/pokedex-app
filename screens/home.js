import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  ScrollView,
  Button,
  LogBox,
} from "react-native";

import { useEffect, useState } from "react";
import Card from "../components/Card";
import SingleCard from "../components/SingleCard";

export default function Home(props) {
  const [searchInput, setSearchInput] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const windowWidth = Dimensions.get("window").width;

  const url = `https://pokeapi.co/api/v2/pokemon/?limit=25&offset=${
    offset * 20
  }`;
  const searchUrl = `https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}/`;

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
    fetchPokemons(url);
  }, [offset]);

  async function searchPokemon() {
    try {
      const response = await fetch(searchUrl);
      if (response.ok) {
        const data = await response.json();
        setPokemons([data]);
        console.log(pokemons[0].name);
      } else {
        console.log(response.ok);
        setPokemons([]);
      }
    } catch (error) {
      console.log(error);
      setPokemons([]);
    }
  }

  const mappedPokemons = pokemons.map((pokemon) => (
    <Card key={pokemon.id} pokemon={pokemon} />
  ));
  const foundPokemon = pokemons.map((pokemon) => (
    <SingleCard key={pokemon.id} pokemon={pokemon} />
  ));

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Pokédex</Text>
        <Text style={styles.subheading}>Search for Pokémon by name</Text>
        <TextInput
          autoComplete="off"
          editable
          autoFocus
          value={searchInput}
          onChangeText={(text) => setSearchInput(text)}
          onSubmitEditing={searchPokemon}
          placeholder="What Pokémon are you looking for?"
          style={{
            padding: 20,
            backgroundColor: "whitesmoke",
            color: "grey",
            borderRadius: 10,
            marginTop: 20,
            marginBottom: 10,
          }}
        />
        {/* <Button
          title="Go to detail"
          onPress={({ navigation }) => props.navigation.navigate("Detail")}
        /> */}
      </View>
      {/* CARD CONTAINER */}
      <ScrollView style={styles.cardContainer}>
        {pokemons.length > 1 ? (
          mappedPokemons
        ) : pokemons.length === 1 ? (
          foundPokemon
        ) : (
          <Text>Not Found</Text>
        )}
      </ScrollView>
      <View
        style={{
          backgroundColor: "white",
          height: 50,
          position: "fixed",
          width: windowWidth,
          borderTopColor: "lightgray",
          borderTopWidth: 0.5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          // padding: 30,
        }}
      >
        <Button
          title="Prev"
          onPress={() => setOffset((current) => current - 1)}
          disabled={offset === 0 ? true : false}
        />
        <Button
          title="Next"
          onPress={() => setOffset((current) => current + 1)}
        />
      </View>
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
    // paddingTop: 60,
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
