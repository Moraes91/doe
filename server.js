//configurações do servidor
const express = require("express");
const server = express();

//configuração para apresentar arquivos
server.use(express.static('public'));

//habilitando body do formulário
server.use(express.urlencoded({ extended: true }));

// conexação com banco de dados
const Pool = require('pg').Pool;
const db = new Pool({
    user: 'postgres',
    password: '0000',
    host: 'localhost',
    port: 5432,
    database: 'doe'
});


//configuração da template engine
const nunjucks = require("nunjucks");
nunjucks.configure("./", {
    express: server,
    noCache: true,
});



// renderização da página
server.get("/", function(req, res) {

    db.query("SELECT * FROM donors ORDER BY id DESC", function(err, result) {
        if (err) return res.send("ERRO DE BANCO DE DADOS.")

        const donors = result.rows;
        return res.render("index.html", { donors });
    })
});

//pegar dados do formulário
server.post("/", function(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const blood = req.body.blood;

    // verificando preenchimento de todos os campos
    if (name == "" || email == "" || blood == "") {
        return res.send("Todos os campos são obrigatórios.");
    }

    //inserção no banco de dados
    const query = `INSERT INTO donors ("name", "email", "blood") VALUES ($1, $2, $3)`;
    const values = [name, email, blood];

    db.query(query, values, function(err) {
        if (err) return res.send("Erro no banco de dados.")

        return res.redirect("/");
    });
});


//configurações de porta do servidor
server.listen(3000, function() {
    console.log("Servidor Iniciado!");
});