const api_url = "http://192.168.31.10:8080/auth/authenticate";

var patID;

class AuthService {

    // const user = {email, password}
    // console.log(user)
    // fetch("http://192.168.31.10:8080/auth/authenticate", {
    //   method:"POST",
    //   headers:{"Content-Type":"application/json"},
    //   body:JSON.stringify(user)
    // }).then(() => {
    //   console.log("Successfully")
    //   navigation.navigate("News") 
    // })
    saveToken(token) {
        localStorage.setItem('tokenData', JSON.stringify(token));
    }
    
    async getTokenData(email, password) {
    const res = await fetch(api_url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        if (res.status === 200) {
            const tokenData = res.json();
            localStorage.setItem('tokenData', JSON.stringify(JSON.stringify(tokenData))); // сохраняем полученный токен в sessionStorage, с помощью функции, заданной ранее
            return Promise.resolve();
        }
        return await Promise.reject();
}

    // async login(email, password) {
    //     const user = {email, password}
    //     const response = fetch("http://192.168.31.10:8080/auth/authenticate", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(user)
    //     // }).then(() => {
    //     //     console.log("Successfully")
    //         // navigation.navigate("News")
    //     })
    //     if (response.data.accessToken) {
    //         localStorage.setItem("user", JSON.stringify(response.data));
    //     }
    //     // const response = await axios.post(api_url, {
    //     //     login: username,
    //     //     password
    //     // });
    //     // if (response.data.accessToken) {
    //     //     localStorage.setItem("user", JSON.stringify(response.data));
    //     // }
    //     return response.data;
    // }

    // logout() {
    //     localStorage.removeItem("user");
    // }

    // getCurrentUser() {
    //     console.log(JSON.parse(localStorage.getItem('user')));
    //     return JSON.parse(localStorage.getItem('user'));
    // }


    // getPatient(patient) {
    //     console.log(patient.id);
    //     patID = patient.id;
    // }

    // setPat() {
    //     console.log(patID);
    // }
}

export default new AuthService();