import { TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";

export default function CardNew(props) {
  const [pokemon, setPokemon] = useState();
  async function fetchPokemon(url) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setPokemon(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchPokemon(props.pokemon?.url);
  }, [props.pokemon?.url]);

  return (
    <TouchableOpacity
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        shadowColor: "grey",
        backgroundColor: "white",
        padding: 20,
        paddingTop: 0,

        borderRadius: 10,
        shadowRadius: 10,
        shadowOpacity: 0.2,
        elevation: 3,
        gap: 0,
        marginBottom: 30,
        marginHorizontal: 30,
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: "75px",
          opacity: 0.1,
          position: "absolute",
          top: 20,
        }}
      >
        {pokemon?.id !== undefined && pokemon?.id.length == 1
          ? `#00${pokemon?.id}`
          : pokemon?.id.length == 2
          ? `#0${pokemon?.id}`
          : `#${pokemon?.id}`}
      </Text>
      <Image
        source={{ uri: pokemon?.sprites.front_default }}
        style={{
          width: 150,
          height: 150,
          marginBottom: -20,
          shadowColor: "black",
          shadowRadius: 5,
          shadowOpacity: 0.2,
        }}
        onLoad={() => console.log("Image loaded successfully")}
        onError={() => console.log("Image failed to load")}
      />
      <Text
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          color: "gray",
        }}
      >
        {pokemon?.name &&
          pokemon?.name[0].toUpperCase() + props.pokemon?.name.slice(1)}
      </Text>
      <Text
        style={{
          color: "gray",
        }}
      >
        {pokemon?.description}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
        }}
      >
        {pokemon?.types.map((type, index) => (
          <Text
            style={{
              color: colors[pokemon?.types[index].type.name],
              fontWeight: "bold",
            }}
          >
            {pokemon?.types[index].type.name.toUpperCase()}
          </Text>
        ))}
      </View>
    </TouchableOpacity>
  );
}

const colors = {
  normal: "#919BA3",
  fighting: "#CF3F69",
  flying: "#90AADC",
  poison: "#AD6BCA",
  ground: "#D97943",
  rock: "#D97943",
  bug: "#91C326",
  ghost: "#506AAF",
  steel: "#598FA2",
  fire: "#FD9E55",
  water: "#4D92D5",
  grass: "#61BB5B",
  electric: "#F4D439",
  psychic: "#FA7279",
  ice: "#72D0C0",
  dragon: "#056EC5",
  dark: "#5B5367",
  fairy: "#ED91E9",
};
