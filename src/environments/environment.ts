export const environment = {
    production: true,
    apiUrl: 'https://taskmanagerchallengeapi.azurewebsites.net',
    environmentName: "production",
    version: "1.0.0",
    projectName: "TaskManager",
    get newHeaders() {
        return {
            'accept': 'text/plain',
            'Authorization': 'Bearer ' + (localStorage.getItem("userToken")),
            'Content-type': 'application/json',
        };
    }

};