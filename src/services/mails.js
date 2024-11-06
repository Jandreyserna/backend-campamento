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
                    <h5>Nos alegra contar contigo</h5>
                
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
          } catch (error) {
            console.error('Error al enviar el correo:', error);
          }
    }

    async mailWelcomeAllUser(params) {
        
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
                    <br>
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
            const infoStatus = await this.transporter.sendMail(mailOptions);
            console.log('Correo enviado:', infoStatus);
            
            return infoStatus;
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            return false;
        }
    }

    async mailRegisteradmin(params) {
        const mailOptions = {
            from: process.env.MAIL_HOST,
            to: 'jandrey.restrepo@gmail.com',     
            subject: 'Campamento Dosquebradas 2024',
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Campamento Dosquebradas 2024</title>
            </head>
            <body>
                <h1>Registro Exitoso</h1>
                <h3>¡Hola Jandrey Te quiero avisar que :  ${params.name} ${params.last_name}!</h4>
                <h5>se ha inscrtito satisfatoria mente al Campamento Dosquebradas 2024.</h5>
                <h5>siendo la campista numero: ${params.user_id} </h5>
            </body>
            </html>
        `
          };
    
          try {
            const info = await this.transporter.sendMail(mailOptions);
          } catch (error) {
            console.error('Error al enviar el correo:', error);
          }
    }
}

module.exports = Mails;