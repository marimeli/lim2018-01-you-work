//Login inputs
const mail = document.getElementById('email');
const password = document.getElementById('password');
//Register inputs
const emailRegister = document.getElementById('email-register');
const passwordRegister = document.getElementById('password-register');
//Mensajes de alerta de error
const errorPassword = document.getElementById('error-password');
const errorEmail = document.getElementById('error-email')
const adviceEmailRegister = document.getElementById('advice-emailRegister');
const advicePasswordRegister = document.getElementById('advice-passwordRegister');
//Botones
const loginButton = document.getElementById('login-btn');
const registerButton = document.getElementById('register-btn'); 
const signinButton = document.getElementById('signin-btn');
const backButton = document.getElementById('back');
const logoutButton = document.getElementById('logout');
//Secciones
const signInSection = document.getElementById('sign-in'); 
const loginSection = document.getElementById('login')
const dashboardSection = document.getElementById('dashboard');
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

//Cuando inicia sesión, esta función muestra nueva seccion y oculta la anterior.
const showDashboard = () => {
    dashboardSection.style.display = 'block';
    loginSection.style.display = 'none';
    signInSection.style.display = 'none';  
};

//Cuando cierra sesión, esta función muestra la sección de login.
const showLogin = () => {
    dashboardSection.style.display = 'none';
    loginSection.style.display = 'block';
    signInSection.style.display = 'none';  
};

//Cuando da clic en el botón para registar nueva cuenta, esta función muestra la sección de registro.
const showRegister = () => {
    loginSection.style.display = 'none';
    signInSection.style.display = 'block';
    dashboardSection.style.display = 'none';
};

//Cuando ingresa a la pestaña, esta función solo muestra la sección de login.
const showOnlyLogin = () => {
    dashboardSection.style.display = 'none';
    signInSection.style.display = 'none';
    loginSection.style.display = 'block';
};

/* DOM EVENTS */
signinButton.addEventListener('click', registerWithFirebase);
loginButton.addEventListener('click', loginWithFirebase);
logoutButton.addEventListener('click', logoutWithFirebase);

registerButton.addEventListener('click', showRegister);
backButton.addEventListener('click', showLogin);

