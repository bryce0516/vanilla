export default class Api {
  static async get(url, option) {
    try {
      const response = await fetch(url, option);
      if (response.status === 200) {
        return response.json();
      }
    } catch (error) {
      console.log("error has occurred", error);
    }
  }
}
