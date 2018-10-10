// DOM
const btnStart = document.getElementById('btn-start');
const btnSend = document.getElementById('btn-send');

//--------------  WRITE DATA IN FIREBASE ------------------------------
//  Función para guardar datos de visitante en Firebase 
const wrtiteDataFirebase = () => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const id = document.getElementById('dni').value;
    const guest = document.getElementById('host').value;
    const message = document.getElementById('message').value;
    const date = new Date().toLocaleString();

    const dataVisitor = firebase.database().ref().child('visitors');
    dataVisitor.push({
        name,
        id,
        guest,
        message,
        date
    })

    let ref = firebase.database().ref('/visitors');
    ref.once('value', (data) => {
        data.forEach(visitor => {
            let visitorKey = visitor.key,
                visitorX = visitor.val();
            console.log('linea 29' + visitorKey); //LOUkc2zmfp9dLwSxlRk (el id de visitor)
            console.log(visitorX); //es un objeto con las propiedad agregadas

            sendEmail(visitorX);
        })
    })
        .then(result => {
            console.log(result);
            console.log('Document written with ID:', result.ref);
            document.getElementById('name').value = '';
            document.getElementById('dni').value = '';
            document.getElementById('host').value = '';
            document.getElementById('message').value = '';
            alert('Registro exitoso')
            /*  console.log(result.visitorKey); undefined */
            //e {node_: e, ref_: t, index_: t}
        })
        .catch((error) => {
            console.error('Error adding document: ', error);
            alert('Algo no ha salido bien, inténtelo de nuevo, por favor')
        });
};

btnSend.addEventListener('click', wrtiteDataFirebase);

