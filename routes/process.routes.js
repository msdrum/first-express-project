import express from "express";

const processRoute = express.Router();

//BANCO DE DADOS

const dataBase = [
  {
    id: "e27ab2b1-cb91-4b18-ab90-5895cc9abd29",
    documentName: "Licitação Enap - Curso Web Dev",
    status: "Em andamento",
    details:
      "Processo para capacitação de servidores públicos em desenvolvimento de aplicações na WEB. Parceria com Ironhack",
    dateInit: "28/11/2022",
    comments: [
      "Processo aberto",
      "Processo partiu para as partes assinarem",
      "Processo agora está em análise final",
      "Processo já tem data final",
    ],
    dateEnd: "16/12/2022",
    setor: "enap",
  },
];

//CRIAÇÃO DAS ROTAS

//GET
processRoute.get("/all", (req, res) => {
  //Pegar todos os processos no banco de dados

  return res.status(200).json(dataBase);
});

//Acessar um rpocesso pelo id  /process/:id
processRoute.get("/process/:id", (req, res) => {
  //Pegar o id do processo
  const { id } = req.params;

  const findProcess = dataBase.find((process) => process.id === id);

  return res.status(200).json(findProcess);
});

//Acessar todos os processos em andamento /status/open
processRoute.get("/status/open");

//Acessar todos os processos finalizados /status/close
processRoute.get("/status/close");

//POST
processRoute.post("/create", (req, res) => {
  //Criar um processo no banco de dados
  console.log(req.body);

  const form = req.body;

  dataBase.push(form);

  return res.status(201).json(dataBase);
});

//DELETE
processRoute.delete("/delete/:id", (req, res) => {
  //Encontrar o id a ser deletado através do index
  const { id } = req.params;

  //Entontrando o item com o mesmo id passado no req.params
  const deleteId = dataBase.find((item) => item.id === id);
  //Encontrando a posição do item no index
  const index = dataBase.indexOf(deleteId);
  //Retirando o item do array
  dataBase.splice(index, 1);

  return res.status(200).json(dataBase);
});

export default processRoute;
