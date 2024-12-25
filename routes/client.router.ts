import express from "express";
import clients from "../database/Clients.js";
import { Client } from "../types/Client.js";

const clientRouter = express.Router();

clientRouter.get("/:id", (req, res) => {
    const requiredId: number = Number(req.params.id);

    for (let client of clients) {
        if (client.id === requiredId) {
            res.json(client);
            return;
        }
    }
    
    res.status(404).send({"Description" : "client not found"});
});

clientRouter.post("/", (req, res) => {
    try {
        const newClient: Client = req.body;
    
        if (
          typeof newClient.id !== "number" ||
          typeof newClient.name !== "string" ||
          (newClient.gender !== "male" && newClient.gender !== "female") ||
          typeof newClient.age !== "number" ||
          typeof newClient.assignedCoachId !== "number"
        ) {
          throw new Error("Invalid client data structure.");
        }

        clients.push(newClient);

        res.status(201).json({"status" : "client added successfully", "client" : newClient});
    } catch (error : any) {
        res.status(400).json({error : error.message});
    }
});

clientRouter.patch("/:id", (req, res) => {
    const requiredId: number = Number(req.params.id);
    const updatedClient : Client = req.body;

    for (let client of clients) {
        if (client.id === requiredId) {
            client.age = updatedClient.age || client.age;
            client.assignedCoachId = updatedClient.assignedCoachId || client.assignedCoachId;
            client.gender = updatedClient.gender || client.gender;
            client.name = updatedClient.name || client.name;

            res.status(201).json({"status" : "client updated sucecssfully", "client" : client});
            return;
        }
    }

    res.status(400).json({"error" : "client not found"});
});

export default clientRouter;