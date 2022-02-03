import React from "react";
import { StyleSheet, View } from "react-native";
import Main from "./src/components/Main";
import { NativeRouter } from "react-router-native";
import AppBar from "./src/components/AppBar";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "./src/utils/apolloClient";
import AuthStorage from "./src/utils/authStorage";
import AuthStorageContext from "./src/contexts/AuthStorageContext";

const authStorage = new AuthStorage("user");

const apolloClient = createApolloClient(authStorage);

function App() {
  authStorage.getAccessToken().then((res) => console.log(res));
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <View style={styles.container}>
            <AppBar />
            <Main />
          </View>
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
});

export default App;
