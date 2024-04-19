export const environment = {
  production: false,
  apiUrl: 'https://localhost:7120',
  environmentName: "develop",
  version: "1.0.0",
  projectName: "TaskManager<",
  get newHeaders() {
      return {
          'accept': 'text/plain',
          'Authorization': 'Bearer ' + (localStorage.getItem("userToken")),
          'Content-type': 'application/json',
      };
  }

};