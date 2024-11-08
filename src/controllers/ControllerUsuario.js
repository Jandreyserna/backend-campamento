class ControllerUsuario {
    constructor() {}

    async getPagos(id) {
        try {
            const datos = await UserModel.getPagoCampista(id);
            
            /* const filteredData = data.map(camper => {
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
            } */
            
            return { success: true, data: {datos}, message: 'Pagos de campista consultado' };
        } catch (error) {
            return { success: false, message: 'Error al obtener los correos de campistas', error: error.message };
        }
    }
}

module.exports = ControllerUsuario;