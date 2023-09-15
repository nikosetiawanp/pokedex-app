import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  ScrollView,
  Button,
} from "react-native";

import { Svg, SvgUri } from "react-native-svg";
import Pokeball from "../assets/pokeball.svg";

import { useEffect, useState } from "react";
import Card from "../components/Card";
import SingleCard from "../components/SingleCard";

export default function Home(props) {
  const [searchInput, setSearchInput] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const windowWidth = Dimensions.get("window").width;

  const url = `https://pokeapi.co/api/v2/pokemon/?limit=25&offset=${
    offset * 20
  }`;
  const searchUrl = `https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}/`;

  async function fetchPokemons(url) {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setPokemons(data.results);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPokemons(url);
  }, [offset]);

  useEffect(() => {
    if (searchInput.length === 0) fetchPokemons(url);
  }, [searchInput]);

  async function searchPokemon() {
    try {
      setIsLoading(true);
      const response = await fetch(searchUrl);
      if (response.ok) {
        const data = await response.json();
        setPokemons([data]);
        setIsLoading(false);
      } else {
        console.log(response.ok);
        setPokemons([]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setPokemons([]);
      setIsLoading(false);
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
        <Text style={styles.subheading}>
          Search for Pokémon by name or using the National Pokédex number.
        </Text>
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
        {!isLoading && pokemons.length === 1 ? (
          foundPokemon
        ) : !isLoading && pokemons.length > 1 ? (
          mappedPokemons
        ) : (
          <View style={styles.notFoundContainer}>
            <SvgUri
              style={{ backgroundColor: "red", width: 100, height: 100 }}
              svgXmlData={Pokeball}
            />
            {isLoading ? (
              <Text style={styles.loading}>...</Text>
            ) : (
              <Text style={styles.notFoundText}>
                Hmmm... we're not getting any results. Try another search!
              </Text>
            )}
          </View>
        )}
        {/* {!isLoading && pokemons.length > 1 && <Button title="Load more" />} */}
      </ScrollView>

      <View
        style={{
          backgroundColor: "white",
          height: 50,
          position: "fixed",
          bottom: 0,
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
    height: windowHeight,
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
    fontSize: "15px",
    color: "grey",
  },
  cardContainer: {
    paddingTop: 30,
    paddingBottom: 30,
    width: windowWidth,
    height: windowHeight,
  },
  notFoundContainer: {
    width: windowWidth,
    height: 400,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  notFoundText: {
    fontWeight: "bold",
    color: "lightgray",
    fontSize: "24px",
    textAlign: "center",
  },
  loading: {
    fontWeight: "bold",
    color: "lightgray",
    fontSize: "64px",
    textAlign: "center",
  },
});
