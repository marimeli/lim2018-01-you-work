window.sendEmail = (visitorX) => {
    $.ajax({
        type: "POST",
        url: "https://mandrillapp.com/api/1.0/messages/send.json",
        data: {
            'key': 'ZGiSDAUGJIgaCMIqm9ysPA',
            'message': {
                "html": `<p>${visitorX.name} acaba de llegar. Por favor dirígase a la sala de recepción de Comunal Coworking para su encuentro</p>`,
                "text": "Notificación",
                "subject": `Tiene una visita`,
                "from_email": "melissa.casas@laboratoria.la",
                "from_name": "Comunal Coworking",
                "to": [{
                    "email": `${visitorX.guest}`,
                    "name": `${visitorX.guest}`,
                    "type": 'to'
                }],
                "headers": {
                    "Reply-To": "marimel.casas@gmail.com"
                }

            },
            "async": false,
            "ip_pool": "Main Pool",
            "send_at": `${visitorX.date}`
        }
    }).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
        /* reject_reason: */
    });
};
