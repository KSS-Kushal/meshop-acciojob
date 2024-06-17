const email = document.getElementById("email");
const password = document.getElementById("password");
const error = document.getElementById("error");

document.getElementById("login").addEventListener("click", () => {
    if (email.value === "" || password.value === "") {
        error.textContent = "Please enter all required fields!";
        error.style.color = "#FF0000";
        error.style.display = "block";
    } else {
        let users = JSON.parse(localStorage.getItem("users") ?? "[]");
        if (users.length > 0) {
            let user = users.filter((usr) => usr.email === email.value);
            if (user.length > 0) {
                let obj = user[0];
                if (obj.password === password.value) {
                    localStorage.setItem(
                        "currUser",
                        JSON.stringify({
                            ...obj,
                            token: getToken(20),
                        })
                    );
                    error.textContent = "Successfully login!";
                    error.style.color = "#00FF00";
                    error.style.display = "block";
                    window.location.href = "/profile";
                }else {
                    error.textContent = "Invalid credentials!";
                    error.style.color = "#FF0000";
                    error.style.display = "block";
                }
            } else {
                error.textContent = "Invalid credentials!";
                error.style.color = "#FF0000";
                error.style.display = "block";
            }
        } else {
            error.textContent = "Please sign up first";
            error.style.color = "#FF0000";
            error.style.display = "block";
        }
    }
});

const getToken = (len) => {
    const myStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmanopqrstuvwxyz";
    let token = "";
    for (let i = 0; i < len; i++) {
        const idx = Math.floor(Math.random() * (myStr.length - 1));
        token += myStr[idx];
    }
    return token;
};
