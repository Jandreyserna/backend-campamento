const ModelEmail = require('../models/ModelEmail');
const MailService = require('../services/mails');

require('dotenv').config();

const EmailModel = new ModelEmail();
const mailService = new MailService();

class ControllerCorreo {
    constructor() {}

    async getDataEmails() {
        try {
            const data = await EmailModel.getEmailCampers();
            
            const filteredData = data.map(camper => {
                const identity_hidden = camper.id_identity.length >= 6 ? '******' + camper.id_identity.slice(6) : '******';
            
                return {
                    id: camper.user_id,
                    identificacion: identity_hidden,
                    nombre: camper.name,
                    apellido: camper.last_name,
                    correo: camper.email
                };
            });
            
            if(filteredData.length > 0){
                const resp = await this.sendEmails(filteredData);
            }
            
            return { success: true, message: 'Correos de campistas enviados correctamente' };
        } catch (error) {
            return { success: false, message: 'Error al obtener los correos de campistas', error: error.message };
        }
    }

    async  sendEmails(mailes) {
        try {
            const mails = [
                {
                    id: 1,
                    identificacion:  123456,
                    nombre: 'Juan Carlos',
                    apellido:  'Trejos Ibarra',
                    correo:  'jANDREY.RESTREPO@gmail.com'
                },/* 
                {
                    id: 2,
                    identificacion: 1088036722,
                    nombre: 'Jairo Andres',
                    apellido: 'Lopez',
                    correo: 'jairofeb2023@gmail.com'
                },
                {
                    id: 6,
                    identificacion: 1007212503,
                    nombre: 'Juan David',
                    apellido: 'Rubio Suaza',
                    correo: 'juanrubiodavidsuaza@gmail.com'
                },
                {
                    id: 7,
                    identificacion: 1007212503,
                    nombre: 'Adrian',
                    apellido: 'Rios Rojas',
                    correo: 'gonsalesnaty6@gmail.com'
                },
                {
                    id: 8,
                    identificacion: 1007212503,
                    nombre: 'Esteban',
                    apellido: 'Ibarra',
                    correo: 'estebannig21@gmail.com'
                }, */
            ];
            
            mails.forEach(async mail => {
                await EmailModel.updateMailStatus(mail.id);
                await mailService.mailWelcomeAllUser(mail);
            });
        } catch (error) {
            console.error('Error enviando correos:', error);
            throw error;
            
        }
    }
}

module.exports = ControllerCorreo;