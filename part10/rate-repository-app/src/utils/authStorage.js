import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const token = await AsyncStorage.getItem(
      `${this.namespace}:rate-repository-app-auth-token`
    );
    return token;
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(
      `${this.namespace}:rate-repository-app-auth-token`,
      accessToken
    );
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(
      `${this.namespace}:rate-repository-app-auth-token`
    );
  }
}

export default AuthStorage;
