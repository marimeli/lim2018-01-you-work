//Login containers
const mail = document.getElementById('email');
const password = document.getElementById('password');
//Register containers
const emailRegister = document.getElementById('email-register');
const passwordRegister = document.getElementById('password-register');
//Mensajes de alerta de error
const errorPassword = document.getElementById('error-password');
const errorEmail = document.getElementById('error-email')
const adviceEmailRegister = document.getElementById('advice-emailRegister');
const advicePasswordRegister = document.getElementById('advice-passwordRegister');
//Botones
const registerButton = document.getElementById('register-button');
const loginButton = document.getElementById('login-btn');
const logoutButton = document.getElementById('logout');
//Secciones
/* const dashboardSection = document.getElementById('dashboard'); */
/* const signInSection = document.getElementById('sign-in'); 
const loginSection = document.getElementById('login') */

//Contenido de tablero
const tableContent = document.getElementById('table-content');

//Función callback para validar errores al momento de crear una nueva cuenta
const callbackRegister = error => {
    if (error.code === 'auth/email-already-in-use') {
        adviceEmailRegister.innerText = 'Ya existe un usuario con este correo. Por favor, ingrese otro';
    } else if (error.code === 'auth/invalid-email') {
        adviceEmailRegister.innerText = 'Por favor, agregue un correo válido';
    } else if (error.code === 'auth/weak-password') {
        advicePasswordRegister.innerText = 'Ingresa una contraseña con más de 6 caracteres';
    }
};

//Función callback para validar errores al momento de iniciar sesión
const callbackLogin = error => {
    if (error.code === 'auth/wrong-password') {
        errorPassword.innerText = 'Su contraseña es incorrecta';
    }
    else if (error.code === 'auth/invalid-email') {
        errorEmail.innerText = 'Por favor, agregue un correo válido';
    }
    else if (error.code === 'auth/user-not-found') {
        errorEmail.innerText = 'No existe un usuario con este correo. Por favor, regístrese';
    }
};

/* DOM EVENTS */
registerButton.addEventListener('click', registerWithFirebase);
loginButton.addEventListener('click', loginWithFirebase);
/* loginButton.addEventListener('click', showDashboard); */
//Al escuchar el click del botón de login, llamar funcion que muestra section dashboard:

logoutButton.addEventListener('click', logoutWithFirebase);