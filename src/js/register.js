// DOM
const fullName = document.getElementById('name');
const dni = document.getElementById('dni');
const host = document.getElementById('host');
const text = document.getElementById('message');

const btnStart = document.getElementById('btn-start');
const btnSend = document.getElementById('btn-send');
const btnTakePhoto = document.querySelector('#btn-take-photo');
const canvas = document.getElementById('canvas');
const image = canvas.getContext('2d');
const video = document.querySelector('video');

//--------------  WRITE DATA IN FIREBASE ------------------------------
//  Función para guardar datos de visitante en Firebase 
window.wrtiteDataFirebase = () => {
  const name = fullName.value;
  const id = dni.value;
  const guest = host.value;
  const message = text.value;
  const date = new Date().toLocaleString();

  event.preventDefault();
  const dataVisitor = firebase.database().ref().child('visitors');
  dataVisitor.push({
    name,
    id,
    guest,
    message,
    date,
  });

  let ref = firebase.database().ref('/visitors');
  ref.once('value', (data) => {
    data.forEach(visitor => {
      let visitorKey = visitor.key,
        visitorX = visitor.val();
      console.log('linea 33' + visitorKey); //LOUkc2zmfp9dLwSxlRk (el id de visitor)
      console.log(visitorX); //es un objeto con las propiedad agregadas

      sendEmail(visitorX);
    })
  })
    .then(result => {
      console.log(result);
      alert('Registro exitoso')
      cleanBoxes();
    })
    .catch((error) => {
      console.error('Error document: ', error);
      alert('Algo no ha salido bien, inténtelo de nuevo, por favor')
    });
};

//---------------- TAKE A PHOTO -------------------------------
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

const getAPhoto = () => {
  const canvas = document.getElementById('canvas');
  var dataURL = canvas.toDataURL();
  image.drawImage(video, 0, 0, canvas.width, canvas.height);
  /* firebase.database().ref().child('visitors').push(dataURL);
  console.log(dataURL); */
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

window.cleanBoxes = () => {
  fullName.value = '';
  dni.value = '';
  host.value = '';
  text.value = '';
};

//Eventos del DOM
btnSend.addEventListener('click', wrtiteDataFirebase);
btnStart.addEventListener('click', initCamera, false);
btnTakePhoto.addEventListener('click', getAPhoto, false);