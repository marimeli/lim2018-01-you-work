console.log('notific');
window.sendEmail = (email, visitorX) => {
    $.ajax({
        type: "POST",
        url: "https://mandrillapp.com/api/1.0/messages/send.json",
        data: {
            'key': 'ZGiSDAUGJIgaCMIqm9ysPA',
            'message': {
                "html": `<p>${visitorX.name} acaba de llegar. Por favor dirígase a la sala de recepción de Comunal Coworking para su encuentro</p>`,
                "text": "Notificación Cita",
                "subject": `${visitorX.name} tiene una visita`,
                "from_email": "melissa.casas@laboratoria.la",
                "from_name": "Comunal Coworking",
                "to": [{
                        "email": email,
                        "name": `${visitorX.name}`,
                        "type": 'to'
                    }],
                "headers": {
                    "Reply-To": "marimel.casas@gmail.com"
                }

            },
            "async": false,
            "ip_pool": "Main Pool",
            "send_at": "2018-08-06 10:00:00"
        }
    }).done(response => {
        console.log(response); // if you're into that sorta thing
      });
};
   