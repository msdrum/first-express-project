import express from "express";
//importando o banco de dados
import ProcessModel from "../model/process.model.js";

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

//CREATE MONGODB
processRoute.post("/create-process", async (req, res) => {
  try {
    const form = req.body;

    const newProcess = await ProcessModel.create(form);

    return res.status(201).json(newProcess);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Algo deu errado na criação do processo." });
  }
});

//GET ALL PROCESSES
processRoute.get("/all-processes", async (req, res) => {
  //Pegar todos os processos no banco de dados e excluindo os campos __v e updatedAt
  try {
    //find vazio -> traz todas as ocorrências
    //projection -> define os campos que vão ser retornados
    //sort -> ordena o retorno dos dados (1 ou -1)
    const processes = await ProcessModel.find(
      {},
      { __v: 0, updatedAt: 0 }
    ).sort({ documentName: 1 });

    return res.status(200).json(processes);
  } catch (error) {
    return res.status(500).json(error.errors);
  }
});

// GET ONE PROCESS

processRoute.get("/one-process/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const process = await ProcessModel.findById(id);
    // tratando excessões

    if (!process) {
      return res.status(500).json({ msg: "Processo não encontrado!" });
    }

    return res.status(200).json(process);
  } catch (error) {
    return res.status(500).json(error.errors);
  }
});

//DELETE
processRoute.delete("/delete/:id", async (req, res) => {
  //Encontrar o id a ser deletado através do index
  try {
    const { id } = req.params;

    const deletedProcess = await ProcessModel.findByIdAndDelete(id);

    if (!deletedProcess) {
      return res.status(500).json({ msg: "Processo não encontrado!" });
    }

    return res.status(200).json(deletedProcess);
  } catch (error) {
    return res.status(500).json(error.errors);
  }

  //Entontrando o item com o mesmo id passado no req.params
  // const { id } = req.params;
  // const deleteId = dataBase.find((item) => item.id === id);
  //Encontrando a posição do item no index
  // const index = dataBase.indexOf(deleteId);
  //Retirando o item do array
  // dataBase.splice(index, 1);

  // return res.status(200).json(dataBase);
});

//EDIT (PUT)
processRoute.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProcess = await ProcessModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(updatedProcess);
  } catch (error) {
    return res.status(500).json(error.errors);
  }
});

export default processRoute;
