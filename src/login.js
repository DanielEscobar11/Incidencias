import { login } from "./api.js";
import { saveToken } from "./auth.js";

const formulario = document.querySelector("#login-form");
const email= document.querySelector("#email");
const password = document.querySelector("#password");

const btnLogin = document.querySelector("#submit");
const alertBox = document.querySelector("#alert");

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const user_email= email.value.trim();
    const user_password= password.value.trim();

    try{
        const token = await login(user_email, user_password);
    
            if (token.error) {
                showAlert(token.error);
                return;
            }

            saveToken(token);
            window.location.href = "index.html";

    }catch(error){
        showAlert(error.message);
    }

});

function showAlert(message) {
    alertBox.textContent = message;
    alertBox.hidden = false;
}