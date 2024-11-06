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

    async  sendEmails(mails) {
        try {
            mails.forEach(async mail => {
                const response = await mailService.mailWelcomeAllUser(mail);
                console.log('response', response);
                
                if(response){
                    await EmailModel.updateMailStatus(mail.id);
                }
            });
        } catch (error) {
            console.error('Error enviando correos:', error);
            throw error;
            
        }
    }
}

module.exports = ControllerCorreo;