const Admin = require("../models/admin");
const adminService = require("../services/adminServices")
 
const adminController = {
    login: async (req, res) => {
        try {
          const {email,senha} = req.body;
     
          const admin = await Admin.findOne({where : { email }});
     
          if(!admin){
              return res.status(400).json({
                  msg: "Email ou senha incorretos!!"
              })
          }
     
          const isValida = await bcrypt.compare(senha, admin.senha);
           if(!isValida){
              return res.status(400).json({
                  msg: "Email ou senha incorretos!!"
              })
           }  
     
           const token = jwt.sign({ email: admin.email, nome: admin.nome }, process.env.SECRET, {expiresIn: '1h'});
     
          return res.status(200).json({
            msg: "Login realizado!",
            token,
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ msg: "Acione o suporte!" });
        }
      },
      updatePassword: async (req, res) => {
        const { id } = req.params;
        const { senha } = req.body;
        console.log(senha);
     
        try {
          const novaSenha = await Admin.findByPk(id);
          if (novaSenha == null) {
            return res.status(404).json({
              msg: "Admin não encontrado",
            });
          }
          const hashSenha = await bcrypt.hash(senha, 10);
          const update = await novaSenha.update({
            senha:hashSenha
          });
     
          if (update) {
            return res.status(200).json({
              msg: "Senha atualizada com sucesso",
            });
          }
        } catch (error) {
          console.error(error);
          return res.status(500).json({ msg: "Acione o suporte" });
        }
      },
    create: async (req, res) =>{
        try {
            const admin = await adminService.create(req.body);
            return res.status(200).json({
                msg:"Admin criado com sucesso.",
                admin
            })
        } catch (error) {
            return res.status(500).json({
                msg:"Erro ao tentar criar admin"
            })
        }
    },
    update: async (req, res) =>{
        try {
            const admin = await adminService.update(req.params.id, req.body);
            if(!admin){
                return res.status(400).json({
                    msg:"Admin não encontrado"
                })
            }
            return res.status(200).json({
                msg:"Admin atualizado com sucesso!",
                admin
            })
        } catch (error) {
            return res.status(500).json({
                msg:"Erro ao tentar criar admin"
            });
        }
    },
    getAll:async(req, res) =>{
        try {
            const admins = await adminService.getAll();
 
            return res.status(200).json({
                msg:"Todos os admins",
                admins
            })
        } catch (error) {
            return res.status(500).json({
                msg:"Ocorreu um erro no servidor!"
            });
        }
    },
    getOne: async(req, res) =>{
        try {
            const admin = await adminService.getById(req.params.id)
 
            if(!admin){
                return res.status(400).json({
                    msg:"admin nao encontrado"
                })
            }
 
            return res.status(200).json({
                msg:"admin encontrado",
                admin
            });
 
 
 
        } catch (error) {
            return res.status(500).json({
                msg:"Ocorreu um erro no servidor!"
            });
        }
    },
    delete: async(req,res) =>{
        try {
            const admin = await adminService.delete(req.params.id)
 
            if(!admin){
                return res.status(400).json({
                    msg:"admin nao encontrado!"
                });
            }
 
            return res.status(200).json({
                msg:"admin deletado com sucesso"
            });
 
        } catch (error) {
            return res.status(500).json({
                msg:"ocorreu um erro no servidor"
            })
        }
    },
}
 
module.exports = adminController;