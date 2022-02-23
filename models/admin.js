//' BIBLIOTECAS

const mongoose = require("mongoose");

//' SCHEMA

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    login: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
}, { timestamps: true })

//' CONECTA COM O CONTROLLER LOGIN

const Admin = mongoose.model("admin", adminSchema)
module.exports = Admin;
