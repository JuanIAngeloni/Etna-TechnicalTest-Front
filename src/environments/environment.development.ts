export const environment = {
  apiUrl: 'https://localhost:7120',
  projectName: "Etna technical test",

  get newHeaders() {
    return {
      'accept': 'text/plain',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("userToken")!),
      'Content-type': 'application/json',
    };

  }
};