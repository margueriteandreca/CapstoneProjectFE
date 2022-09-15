import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import * as React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useEffect, useState, useContext, useCallback } from "react";
import { TokenContext, UserContext } from "./Context";
import Follower from "./Follower";
import { FlatList } from "react-native-gesture-handler";
import { SearchBar } from "@rneui/themed";

function Discover() {
  const [allUsers, setAllUsers] = useState([]);
  const [search, setSearch] = useState("");

  const { token } = useContext(TokenContext);
  const { user: currentUser } = useContext(UserContext);

  const fetchUsers = useCallback(() => {
    fetch(`http://127.0.0.1:8000/users/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("ALL USERS", data, currentUser);
        setAllUsers(data);
      });
  }, [token, id]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useFocusEffect(fetchUsers);

  const filteredUsers = allUsers.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) &&
      user.username !== currentUser.username
  );

  console.log(search);

  return (
    <View>
      <SearchBar
        containerStyle={discoverStyles.searchContainer}
        inputContainerStyle={discoverStyles.searchInputContainer}
        inputStyle={discoverStyles.searchText}
        placeholder="Find your friends"
        onChangeText={setSearch}
        value={search}
      />
      <FlatList
        data={filteredUsers}
        renderItem={({ item }) => (
          <Follower
            key={item.id}
            id={item.id}
            username={item.username}
            avatar={item.avatar}
            isFollowing={item.followers.some(
              (follower) => follower.user === currentUser.id
            )}
          />
        )}
      />
    </View>
  );
}

const discoverStyles = StyleSheet.create({
  searchContainer: {
    backgroundColor: "white",
    borderBottomColor: "whitesmoke",
    borderTopColor: "whitesmoke",
  },
  searchInputContainer: {
    backgroundColor: "#d6d6d6",
    borderRadius: 20,
  },
  searchText: {
    fontSize: 16,
    color: "#5d5d5d",
    fontWeight: "500",
  },
});

export default Discover;
