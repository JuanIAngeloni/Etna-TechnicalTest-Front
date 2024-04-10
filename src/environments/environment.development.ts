export const environment = {
  apiUrl: 'https://localhost:7120',
  projectName: "TaskManager",

  get newHeaders() {
    return {
      'accept': 'text/plain',
      'Authorization': 'Bearer ' + (localStorage.getItem("userToken")),
      'Content-type': 'application/json',
    };

  }
};