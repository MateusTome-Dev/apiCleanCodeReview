const Admin = require("../models/admin")

// app.js -> router.js -> userRotasjs -> userController.js
//-> userServices -> model -> DATABSE
const adminService ={
    create: async (admin) =>{
        try {
            return await Admin.create(admin);
        } catch (error) {
            throw new Error('Ocorreu um erro ao criar user');
        }
    },
    update: async(id, adminToUpdate) =>{
        try {
            const admin = await Admin.findByPk(id);

            if(!admin) { // user for vazio
                return null;
            }
            await admin.update(adminToUpdate); // update atualizar
            await admin.save();
            return admin;
        } catch (error) {
            throw new Error('Erro ao atualizar user')
        }
    },
    getById: async (id) =>{
        try {
            const admin = await Admin.findByPk(id);
            if(!admin){
                return null;
            }
            return admin;
        } catch (error) {
            throw new Error('Ocorreu um erro ao buscar unico User')
        }
    },
    getAll: async () =>{
        try {
            return await Admin.findAll();
        } catch (error) {
            throw new Error('Ocorreu um erro ao buscar todos User')
        }
    },
    delete: async (id) => {
        try {
            const admin = await Admin.findByPk(id);
            if(!admin){
                return null;
            }
            await admin.destroy();
            return admin;
        } catch (error) {
            throw new Error('Ocorreu um erro ao deletar o User')
        }
    }
}

module.exports = adminService;