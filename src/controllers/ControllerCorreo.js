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
            console.log('filteredData', filteredData);
            
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
                    nombre: 'Juan2',
                    apellido:  'Perez',
                    correo:  'sofivh1702@gmail.com'
                },
                {
                    id: 2,
                    identificacion: 1088036722,
                    nombre: 'Jandrey Steven',
                    apellido: 'Serna Restrepo',
                    correo: 'jandrey.restrepo@gmail.com'
                },
                {
                    id: 3,
                    identificacion: 1088035847,
                    nombre: 'Angela Maria',
                    apellido: 'Valencia Henao',
                    correo: 'amvh998@gmail.com'
                },
                {
                    id: 4,
                    identificacion: 42007529,
                    nombre: 'Luz Estela',
                    apellido: 'Henao Agudelo',
                    correo: 'luz.estela.henao68@gmail.com'
                },
                {
                    id: 5,
                    identificacion: 1007212503,
                    nombre: 'Elizabeth',
                    apellido: 'Calvo Gómez',
                    correo: 'elizabeth.calvo@utp.edu.co'
                },
            ];
            console.log('entre', mails);
            
            mails.forEach(async mail => {
                await mailService.mailWelcomeAllUser(mail);
            });
        } catch (error) {
            console.error('Error enviando correos:', error);
            throw error;
            
        }
        console.log('Enviando correos');
    }
}

module.exports = ControllerCorreo;