//configurações do servidor
const express = require("express");
const server = express();

//configuração para apresentar arquivos
server.use(express.static('public'));


const donors = [{
    name: "Felipe Moraes",
    blood: "O+"
}, {
    name: "Mirian Moraes",
    blood: "O+"
}, {
    name: "Elisa Moraes",
    blood: "O+"
}, {
    name: "Ninna Moraes",
    blood: "AB+"
}];


//configuração da template engine
const nunjucks = require("nunjucks");
nunjucks.configure("./", {
    express: server,
    noCache: true,
});


// configurações de apresentação
server.get("/", function(req, res) {
    return res.render("index.html", { donors });
});


//configurações de porta do servidor
server.listen(3000, function() {
    console.log("Servidor Iniciado!");
});