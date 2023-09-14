import { useEffect, useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";

export default function Card(props) {
  const [pokemon, setPokemon] = useState();

  async function fetchPokemon(url) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setPokemon(data);
        // console.log(data.sprites.front_default);
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
        padding: 20,
        borderRadius: 10,
        backgroundColor: backgroundColors[pokemon?.types[0].type.name],
        elevation: 3,
        display: "flex",
        gap: 5,
        marginBottom: 30,
        position: "relative",
      }}
    >
      <Text style={{ fontWeight: "bold", opacity: 0.4 }}>
        #0{pokemon?.id && pokemon?.id}
      </Text>
      <Text style={{ color: "white", fontSize: "30px", fontWeight: "bold" }}>
        {pokemon?.name &&
          pokemon?.name[0].toUpperCase() + props.pokemon?.name.slice(1)}
      </Text>
      {/* TYPES */}
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View
          style={{
            backgroundColor: colors[pokemon?.types[0].type.name],
            alignSelf: "center",
            padding: 6,
            paddingHorizontal: 12,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "semibold",
            }}
          >
            {pokemon?.types[0].type.name[0].toUpperCase() +
              pokemon?.types[0].type.name.slice(1)}
          </Text>
        </View>
      </View>

      <Image
        source={{ uri: pokemon?.sprites.front_default }}
        style={{
          width: 200,
          height: 200,
          position: "absolute",
          right: -40,
          top: -35,
          shadowColor: "black",
          shadowRadius: 5,
          shadowOpacity: 0.2,
        }}
        onLoad={() => console.log("Image loaded successfully")}
        onError={() => console.log("Image failed to load")}
      />
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

const backgroundColors = {
  normal: "#C7C5A6",
  fighting: "#D57974",
  flying: "#C7B8F6",
  poison: "#C283C1",
  ground: "#E9D79E",
  rock: "#D1C17B",
  bug: "#C6CF6D",
  ghost: "#A492BC",
  steel: "#D1D1DF",
  fire: "#F6AC7A",
  water: "#9DB8F5",
  grass: "#A7DC8F",
  electric: "#F9E179",
  psychic: "#FA93B2",
  ice: "#BBE7E6",
  dragon: "#A17DF9",
  dark: "#A39288",
  fairy: "#F6BDCB",
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "grey",
    elevation: 3,
    display: "flex",
    gap: 10,
    marginBottom: 30,
  },
});

const login = () => {
  // kalau email salah, return
  // kalau email kosong, return
  // kalau password salah, return
  // kalau password kosong, return
  // kalau lolos semua, alert "login berhasil"
};
