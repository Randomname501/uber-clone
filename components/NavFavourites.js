// File path: /NavFavourites.js
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import { setDestination, setOrigin, selectOrigin } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";

const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    destination: "275 West Main Street, Denville, NJ",
  },
  {
    id: "456",
    icon: "briefcase",
    location: "Work",
    destination: "The Shard, London Bridge Street, London, UK",
  },
  {
    id: "789",
    icon: "heart",
    location: "Bambi's House",
    destination: "15 Sakuru Road, Sagamu, Nigeria",
  },
];

const NavFavorites = ({ shouldSetOrigin }) => {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const navigation = useNavigation();

  return (
    <FlatList
      data={data.filter(
        // Checks to see if Home or Work is already selected
        (item) => shouldSetOrigin || origin?.location !== item.destination
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-200`, { height: 0.5 }]} />
      )}
      renderItem={({ item: { icon, location, destination } }) => (
        <TouchableOpacity
          style={tw`flex-row items-center py-5`}
          onPress={() => {
            if (shouldSetOrigin) {
              dispatch(
                setOrigin({
                  location: destination,
                  description: location,
                })
              );
              navigation.navigate("MapScreen");
            } else {
              dispatch(
                setDestination({
                  location: destination,
                  description: location,
                })
              );
              navigation.navigate("MapScreen");
            }
          }}
        >
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{location}</Text>
            <Text style={tw`text-gray-500`}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavorites;

const styles = StyleSheet.create({});
