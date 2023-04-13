const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");

const teste = async () => {
    const uri = "mongodb+srv://root:root@cluster0.dzz9frb.mongodb.net/?retryWrites=true&w=majority";
    const conn = await MongoClient.connect (uri);
    const db = conn.db("cadastro");
    const collection = db.collection("pessoas");
    await collection.insertOne({descricao: "estacionamento", preco: 150.0, data: new Date()});

    await conn.close();
    return "OK";
}

const testeMongoose = async () => {
    const pessoa = new Pessoa({nome: "Joao", telefone: 123, endereco:"Rua x, 123", nascimento: new Date()});
    const save = await pessoa.save();
    return resultado;
}
const consultaPessoa = async () => {
    //const resultado = await Pessoa.find().exec();
    //const resultado = await Pessoa.findOne({nome:"Joao"}).exec();
    //resultado.nome = "Joao da Silva";
    //await resultado.save();
    const resultado= await Pessoa.updateOne(
        {_id: new mongoose.Types.ObjectId("6407cbdc8c3b80c6c3403e64")})
    return resultado;
}
const pessoaSchema = mongoose.Schema({
    nome: {Type: String, required: [true,"Informe o nome da pessoa obrigatoriamente!"]},
    telefone: Number,
    endereco: String,
    nascimento: Date
});

const Pessoa = new mongoose.model("Pessoa", pessoaSchema);

const uri = "mongodb+srv://root:root@cluster0.dzz9frb.mongodb.net/cadastro?retryWrites=true&w=majority";
mongoose.connect(uri).then((conn)=> {
   // testeMongoose().then((resultado)=> console.log(resultado));
   consultaPessoa().then((resultado)=> console.log(resultado));
});

teste().then((ret) => console.log(ret)).catch((err)=> console.log(err));
console.log("FIM");