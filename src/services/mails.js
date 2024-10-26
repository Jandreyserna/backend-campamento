const nodemailer = require('nodemailer');

class Mails {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_HOST,
                pass: process.env.MAIL_PASSWORD
            }
        });
    }

    async mailRegister(params) {
        const mailOptions = {
            from: process.env.MAIL_HOST,
            to: params.email,     
            subject: 'Campamento Dosquebradas 2024',
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Campamento Dosquebradas 2024</title>
            </head>
            <body>
                <h1>Registro Exitoso</h1>
                <h3>¡Hola ${params.name} ${params.last_name}!</h4>
                <h5>Gracias por registrarte en el Campamento Dosquebradas 2024.</h5>
                <h5>Nos alegra contar contigo, te contamos:</h5>
                <h5> Puedes acceder a nuestra plataforma con tu número de identificación terminado en ${params.id_identity_hidden} y tu contraseña.
                 Si es la primera vez que accedes a la plataforma, ten presente que tu contraseña es tu mismo número de identificación. </h5>
                <br>
                <h5>Para que puedes acceder a la plataforma recuerda:</h5>
                <ul>
                    <li>Actualizar tus datos</li>
                    <li>Consultar información del evento</li>
                    <li>Consultar información de tu inscripción</li>
                </ul>
                <p>¡Te esperamos en el Campamento! 09/11/2024</p>
                <p>Recuerda venir muy animado y dispuesto.</p>
                <p>Atentamente,</p>
                <H3>Equipo Campamento Dosquebradas 2024</h3>
            </body>
            </html>
        `
          };
    
          try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Correo enviado:', info.response);
          } catch (error) {
            console.error('Error al enviar el correo:', error);
          }
    }

    async mailWelcomeAllUser(params) {
        console.log('params:', params);
        
        const mailOptions = {
            from: process.env.MAIL_HOST,
            to: params.correo,     
            subject: 'Campamento Dosquebradas 2024',
            html: `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Campamento Dosquebradas 2024</title>
                </head>
                <body>
                    <h1>Registro Exitoso</h1>
                    <h3>¡Hola ${params.nombre} ${params.apellido}!</h4>
                    <h5>¡Gracias por registrarte en el Campamento Dosquebradas 2024!</h5>
                    <h5>Puedes ingresar a la plataforma con tu número de identificación y tu contraseña.</h5>
                    Si es la primera vez que accedes, la contraseña inicial será tu número de identificación.  </h5>
                    <br>
                    <a href="https://campamentodosquebradas.online">https://campamentodosquebradas.online</a>
                    <h5>A través de la plataforma podrás:</h5>
                    <ul>
                        <li>Consultar información del evento</li>
                        <li>Consultar información de tu inscripción</li>
                    </ul>
                    <p> ¡Te esperamos el 9 de noviembre de 2024 en la Finca La Francia, ubicada en la vía Morelia, Pereira, esta es la ubicación:</p>
                    <a href="https://maps.app.goo.gl/AFDLWKZ1muSxvYdR7">https://maps.app.goo.gl/AFDLWKZ1muSxvYdR7</a>
                    <br>
                    <h3>Para disfrutar al máximo, no olvides traer los siguientes elementos:</h3>
                    <br>
                    <ul>
                        <li>Biblia</li>
                        <li>Traje de baño decente</li>
                        <li>Ropa que puedas ensuciar</li>
                        <li>Ropa blanca para la noche especial</li>
                    </ul>
                    <p>Estamos emocionados por compartir este tiempo contigo. Prepárate, falta poco.</p>
                    <p>Atentamente,</p>
                    <H3>Equipo Campamento Dosquebradas 2024</h3>
                </body>
            </html>
        `
        };
    
        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Correo enviado:', info.response);
        } catch (error) {
            console.error('Error al enviar el correo:', error);
        }
    }
}

module.exports = Mails;