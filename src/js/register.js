// DOM
const btnStart = document.getElementById('btn-start');
const btnSend = document.getElementById('btn-send');
const btnTakePhoto = document.querySelector('#btn-take-photo');
const canvas = document.getElementById('canvas');
const image = canvas.getContext('2d');
const video = document.querySelector('video');

//--------------  WRITE DATA IN FIREBASE ------------------------------
//  Función para guardar datos de visitante en Firebase 
window.wrtiteDataFirebase = () => {
  const name = document.getElementById('name').value;
  const id = document.getElementById('dni').value;
  const guest = document.getElementById('host').value;
  const message = document.getElementById('message').value;
  const date = new Date().toLocaleString();
  event.preventDefault();
  const dataVisitor = firebase.database().ref().child('visitors');
  dataVisitor.push({
    name,
    id,
    guest,
    message,
    date
  });

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

//---------------- TAKE A PHOTO -------------------------------
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

const getAPhoto = () => {
 var canvas = document.getElementById('canvas');
 var dataURL = canvas.toDataURL();
 image.drawImage(video, 0, 0, canvas.width, canvas.height);
 firebase.database().ref().child('visitors').push(dataURL);
 console.log(dataURL);
};

const initCamera = () => {
 navigator.getUserMedia({
   video: true
 }, stream => {
   const src = window.URL.createObjectURL(stream);
   video.src = src;
 }, e => {
   console.log(e);
 });
};

//Eventos del DOM
btnSend.addEventListener('click', wrtiteDataFirebase);
btnStart.addEventListener('click', initCamera, false);
btnTakePhoto.addEventListener('click', getAPhoto, false);