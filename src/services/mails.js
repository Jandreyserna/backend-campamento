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

    async correoCristianoCampista(params) {
        
        const mailOptions = {
            from: process.env.MAIL_HOST,
            to: params.correo,     
            subject: `Mensaje Especial para ${params.nombre} `,
    html: `
    <!DOCTYPE html>
    <html>
        <head>
            <title>Mensaje Especial para ${params.nombre}</title>
        </head>
        <body>
            <h1>Querido/a ${params.nombre},</h1>
            <p>¡Gracias por ser parte de este campamento y por tu disposición de compartir tiempo con aquellos que están buscando respuestas y sentido para sus vidas! Sabemos que ya conoces a Dios y tienes una relación especial con Él. Puede que algunas cosas durante el campamento no sean nuevas para ti y que, en ocasiones, te sientas un poco fuera de lugar al ver cómo otros actúan o cuando el enfoque es evangelístico. Sin embargo, ¡tú tienes un rol importantísimo aquí!</p>
            <p>Recuerda que, a través de tu ejemplo y tu forma de actuar, puedes mostrarles a otros la paz, la esperanza y el amor que has encontrado en Cristo. Hay personas aquí que necesitan ver a alguien viviendo la fe de una forma auténtica y genuina. Quizás algunos están pasando por luchas internas, buscando sentido en lugares equivocados, o enfrentándose a vacíos profundos. Tu presencia y tu vida pueden ser ese faro que les indique que hay otro camino, un camino lleno de vida en Jesús.</p>
            <h3>Aquí te dejamos algunos consejos para este campamento:</h3>
            <ul>
                <li><strong>Sé un ejemplo.</strong> Más que predicar con palabras, predica con tu vida. Jesús nos llama a ser luz del mundo y sal de la tierra (Mateo 5:13-16). Con tu actitud, amabilidad y respeto hacia los demás, puedes marcar una gran diferencia.</li>
                <li><strong>Sé sensible a las necesidades de los demás.</strong> Hay quienes están pasando por situaciones difíciles y no lo expresan abiertamente. Mantente atento a las señales de aquellos que puedan necesitar apoyo, y no dudes en avisar a los líderes si notas algo preocupante.</li>
                <li><strong>Ora por los demás.</strong> Este campamento puede ser un momento crucial en la vida de muchos. Ora para que Dios toque los corazones y, si tienes oportunidad, invita a alguien a orar contigo.</li>
                <li><strong>Recuerda que fuiste llamado/a a ser testigo.</strong> Como dice Hechos 1:8, hemos sido llamados a ser testigos de Cristo. Sé un testimonio vivo de su amor, y anímate a compartirlo si surge la oportunidad.</li>
            </ul>
            <h3>Versículos para recordar:</h3>
            <ul>
                <li>1 Pedro 3:15: "Al contrario, honren en su corazón a Cristo como Señor. Estén siempre preparados para responder a todo el que les pida razón de la esperanza que hay en ustedes, pero háganlo con gentileza y respeto."</li>
                <li>Mateo 5:16: "Así alumbre vuestra luz delante de los hombres, para que vean vuestras buenas obras, y glorifiquen a vuestro Padre que está en los cielos."</li>
                <li>1 Timoteo 4:12: "Ninguno tenga en poco tu juventud, sino sé ejemplo de los creyentes en palabra, conducta, amor, espíritu, fe y pureza."</li>
                <li>Colosenses 4:6: "Sea su conversación siempre con gracia, sazonada con sal, para que sepan cómo responder a cada uno."</li>
            </ul>
            <p>Querido/a hermano/a, gracias por ser parte de este campamento. ¡Eres una bendición para muchos y para este lugar! Que Dios te use de gran manera, y recuerda que tu ejemplo puede hacer eco en la vida de alguien para siempre.</p>
            <p>Con cariño y oración,</p>
            <h3>Junta organización Campamento Dosquebradas 2024</h3>
        </body>
    </html>
    `
        };
    
        try {
            const infoStatus = await this.transporter.sendMail(mailOptions);
            if(infoStatus){
                return true;
            }else{
                return false;
            }
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            return false;
        }
    }
}

module.exports = Mails;