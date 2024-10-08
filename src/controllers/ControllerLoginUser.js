const modalLoginUser = require('../models/ModelLoginUser');
require('dotenv').config();
const MailService = require('../services/mails');

const LoginModel = new modalLoginUser();
const mailService = new MailService();

class ControllerLoginUser {
    constructor() {}

    // Método para registrar un usuario
    async login_user(data) {
        try {
            const datos = [];
            datos.username = parseInt(data.username, 10);
            datos.password = parseInt(data.password, 10);
            const userloging = await LoginModel.query_user_loging(datos);

            return { success: true, data: userloging};
        } catch (error) {
            return { success: false, message: 'Error al loguear el usuario', error: error.message };
        }
    }

    async prepareUserData(data) {
        const countUsers = await registerModel.countIdUser();
        return {
            user_id: countUsers + 1,
            congregation: data.isCongregating ? data.congregation : false,
            is_younger: data.isYounger,
            created_at: new Date()
        };
    }

    async isUserRegistered(identification) {
        const countIdIdentity = await registerModel.countIdIdentity(identification);
        return countIdIdentity !== 0;
    }

    async handleTutorDataIfNeeded(data) {
        if (!data.isYounger) {
            return { is_younger: false, id_tutor: null };
        }

        const tutor = await registerModel.validateTutorIdentity(data.identificationTutor);
        if (tutor.length === 0) {
            const tutorData = await this.createTutor(data);
            return { id_tutor: tutorData.tutor_id };
        } else {
            return { id_tutor: tutor[0].tutor_id };
        }
    }

    async createTutor(data) {
        const countTutors = await registerModel.countIdTutors();
        const tutorData = {
            tutor_id: countTutors + 1,
            identity: data.identificationTutor,
            name: data.tutorName,
            last_name: data.tutorLastName,
            phone_number: data.tutorPhoneNumber,
            created_at: new Date()
        };
        await registerModel.insertTutor(tutorData);
        return tutorData;
    }

    mapUserData(data) {
        return {
            id_type: data.idType,
            id_identity: data.identification,
            name: data.firstName,
            last_name: data.lastName,
            genero: data.genero,
            city: data.city,
            is_congregating: data.isCongregating,
            phone_number: parseInt(data.phoneNumber),
            birth_date: data.birthDate,
            email: data.email,
            password: data.identification
        };
    }

    async sendRegistrationEmail(userData) {
        const identity_hidden = '******' + userData.id_identity.slice(6);
        userData.id_identity_hidden = identity_hidden;
        await mailService.mailRegister(userData);
    }

    async identityType() {
        try {
            const identityType = await registerModel.getIdentityType();
            return { success: true, data: identityType };
        } catch (error) {
            return { success: false, message: 'Error al obtener los tipos de identidad', error: error.message };
        }
    }
}

module.exports = ControllerLoginUser;