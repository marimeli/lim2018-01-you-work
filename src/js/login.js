//Función que sirve para monitorizar el estado de autentificación
window.onload = () => {
    //Listener en tiempo real 
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log('Usuario logueado');
            writeUserData(user.uid, user.displayName, user.email, user.photoURL);
        } else {
            console.log('Usuario NO logueado');
        }
        console.log('User > ' + JSON.stringify(user)); //Imprime datos del usuario
    });
};

//********REGISTER***********
window.registerWithFirebase = () => {
    //Crea usuario con email y password
    firebase.auth().createUserWithEmailAndPassword(emailRegister.value, passwordRegister.value)
        .then(() => {
            console.log('usuario creado con éxito');
            alert('Su usuario fue creado con éxito')
        })
        .catch((error) => {
            callbackRegister(error);
            console.log('Error Firebase > código > ' + error.code);
            console.log('Error Firebase > Mensaje > ' + error.message);
        });
};

//*********LOGIN EMAIL***********
//Función que usa el método de autentificación para el login del administrador.
window.loginWithFirebase = () => {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((result) => {
            alert('Inicio de sesión con exitoso');
            console.log(result);
            const user = result.user;
            writeUserData(user.uid, user.displayName, user.email, user.photoURL);
        })
        .catch((error) => {
            callbackLogin(error);
            console.log('Error Firebase > código > ' + error.code);
            console.log('Error Firebase > Mensaje > ' + error.message);
        });
};

//*********LOGOUT***********
window.logoutWithFirebase = () => {
    firebase.auth().signOut()
        .then(() => {
            console.log('Usuario finalizó su sesión');
        })
        .catch((error) => {
            console.log('Error Firebase > código > ' + error.code);
            console.log('Error Firebase > Mensaje > ' + error.message);
        });
};

//  Función para guardar dato de usuario en Firebase cuando está logeado. 
window.writeUserData = (userId, name, email, imageUrl) => {
    firebase.database().ref('admin/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl
    })
        .catch(error => {
            console.log(error);
        });
};

//---------------- DASHBOARD -------------------------------
firebase.database().ref().child('visitors')
    .on('value', data => {
        let content = '';
        data.forEach(e => {
            const visit = e.val();
            content += "<tr><td></td><td>" + visit.name + "</td><td>" + visit.id + "</td><td>" + visit.guest + "</td><td>" + visit.date + "</td></tr>";
        });
        tableContent.innerHTML = content;
    });