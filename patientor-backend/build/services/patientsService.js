"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const { v4: uuidv4 } = require('uuid');
const getEntries = () => {
    return patients_1.default;
};
const getNonSensitiveEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const addPatient = (entry) => {
    const addedPatient = Object.assign(Object.assign({}, entry), { id: uuidv4() });
    patients_1.default.push(addedPatient);
    return addedPatient;
};
exports.default = { getEntries, getNonSensitiveEntries, addPatient };
