"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Clients_js_1 = __importDefault(require("../database/Clients.js"));
const clientRouter = express_1.default.Router();
clientRouter.get("/:id", (req, res) => {
    const requiredId = Number(req.params.id);
    for (let client of Clients_js_1.default) {
        if (client.id === requiredId) {
            res.json(client);
            return;
        }
    }
    res.status(404).send({ "Description": "client not found" });
});
clientRouter.post("/", (req, res) => {
    try {
        const newClient = req.body;
        if (typeof newClient.id !== "number" ||
            typeof newClient.name !== "string" ||
            (newClient.gender !== "male" && newClient.gender !== "female") ||
            typeof newClient.age !== "number" ||
            typeof newClient.assignedCoachId !== "number") {
            throw new Error("Invalid client data structure.");
        }
        Clients_js_1.default.push(newClient);
        res.status(201).json({ "status": "client added successfully", "client": newClient });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
clientRouter.patch("/:id", (req, res) => {
    const requiredId = Number(req.params.id);
    const updatedClient = req.body;
    for (let client of Clients_js_1.default) {
        if (client.id === requiredId) {
            client.age = updatedClient.age || client.age;
            client.assignedCoachId = updatedClient.assignedCoachId || client.assignedCoachId;
            client.gender = updatedClient.gender || client.gender;
            client.name = updatedClient.name || client.name;
            res.status(201).json({ "status": "client updated sucecssfully", "client": client });
            return;
        }
    }
    res.status(400).json({ "error": "client not found" });
});
exports.default = clientRouter;
