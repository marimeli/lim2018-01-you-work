//DOM
const fullName = document.getElementById('name');
const identification = document.getElementById('dni');
const telephone = document.getElementById('phone');
const guest = document.getElementById('host');
const text = document.getElementById('message');
const date = new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear();
const hour = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
const btnStart = document.getElementById('btn-start');
const btnSend = document.getElementById('btn-send');


//--------------  ALMACENAR INFORMACIÓN ------------------------------
btnSend.addEventListener('click', () => {
    const name = fullName.value;
    const id = identification.value;
    const phone = telephone.value;
    const host = guest.value;
    const message = text.value;
    const dataVisitor = {
        name,
        identificacion,
        selector,
        mensaje,
        date,
        hour
    }
    firebase.database().ref().child('visitors').push(dataVisitor);

    let ref = firebase.database().ref().child('visitors')
    ref.once('value', (data) => {
        console.log(data);
        data.forEach(visitor => {
            console.log(visitor);
            const visitorX = visitor.val();
            console.log(visitorX)
            sendEmail(visitorX);
        })
    })
});







