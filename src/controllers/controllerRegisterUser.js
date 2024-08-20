const modalRegisteruser = require('../models/modelRegisterUser');
const registerModel = new modalRegisteruser();

class ControllerRegister {
    constructor() {}

    // Método para registrar un usuario
    async registerUser(data) {
        try {
            let userData = await this.prepareUserData(data);
            let tutorData = {};

            if (await this.isUserRegistered(data.identification)) {
                return { success: false, message: 'Este usuario ya se encuentra registrado, si desea editar algún dato, por favor inicie sesión' };
            }

            if (data.isYounger) {
                tutorData = await this.handleTutorData(data);
                userData.id_tutor = tutorData.tutor_id;
            } else {
                userData.is_younger = false;
                userData.id_tutor = null;
            }

            userData = { ...userData, ...this.mapUserData(data) };

            const userState = await registerModel.insertUser(userData);
            return { success: true, data: userData.user_id };
        } catch (error) {
            return { success: false, message: 'Error al registrar el usuario', error: error.message };
        }
    }

    async prepareUserData(data) {
        const countUsers = await registerModel.countIdUser();
        return {
            user_id: countUsers + 1,
            congregation: data.isCongregating !== true ? false : data.congregation,
            is_younger: data.isYounger,
            created_at: new Date()
        };
    }

    async isUserRegistered(identification) {
        const countIdIdentity = await registerModel.countIdIdentity(identification);
        return countIdIdentity !== 0;
    }

    async handleTutorData(data) {
        const tutor = await registerModel.validateTutorIdentity(data.identificationTutor);
        if (tutor.length === 0) {
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
        } else {
            return tutor[0];
        }
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

    async identityType() {
        try {
            const identityType = await registerModel.getIdentityType();
            return { success: true, data: identityType };
        } catch (error) {
            return { success: false, message: 'Error al obtener los tipos de identidad', error: error.message };
        }
    }
}

module.exports = ControllerRegister;