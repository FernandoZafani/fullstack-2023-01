//const mongodb = require("mongodb");
const mongodb = require("mongodb");
const uri = "mongodb+srv://root:root@cluster0.dzz9frb.mongodb.net/?retryWrites=true&w=majority";
const client = new mongodb.MongoClient (uri);
const db = client.db("agencia_viagem");
const col = db.collection("trechos");

const criarPessoa = async () => {

    const cli = new mongodb.MongoClient (uri);

    try {
        const db = cli.db("cadastro");
        const col = db.collection("pessoas");
        const novaPessoa = await col.insertOne ({nome: "Josefina"});
        return novaPessoa
    } catch (err) {
        console.log(err);
    } finally {
        await cli.close();
    }
    
}
const atualizarPessoa = async (id, novoNome) => {

    const cli = new mongodb.MongoClient (uri);

    try {
        const db = cli.db("cadastro");
        const col = db.collection("pessoas");
        const novaPessoa = await col.updateOne ({_id: new mongodb.ObjectId(id)},
                                                 {$set: {nome: novoNome}});
        return novaPessoa
    } catch (err) {
        console.log(err);
    } finally {
        await cli.close();
    }
    
}
const removerPessoa = async (id) => {

    const cli = new mongodb.MongoClient (uri);

    try {
        const db = cli.db("cadastro");
        const col = db.collection("pessoas");
        const novaPessoa = await col.deleteOne ({_id: new mongodb.ObjectId(id)});
        return novaPessoa
    } catch (err) {
        console.log(err);
    } finally {
        await cli.close();
    }
    
}

const todasPessoas = async () => {

    const cli = new mongodb.MongoClient(uri);
    try {
        const db = cli.db('cadastro');
        const col = db.collection('pessoas');
        const tot = await col.countDocuments({nome: 'Maria'});
        console.log('Total Maria', tot);
        await col.find({nome: 'Jose'}).forEach((item) => console.log(item.nome, item._id.toString()))
        const novaPessoa = await col.find().toArray();
        return novaPessoa    
    } catch (err) {
        console.log(err);
    } finally {
        await cli.close();
    }

}

todasPessoas().then((res) => {
    console.log(res);
    process.exit(0);
});

/*
atualizarPessoa("63fe98823642329158bdb940", "Teste Novo").then((res) => {
    console.log(res);
    process.exit(0);
})
removerPessoa("63fe98823642329158bdb940").then((res) => {
    console.log(res);
    process.exit(0);
})

    criarPessoa().then((res) => {
        console.log(res)
        process.exit(0)
    })


//usar then para esperar o resultado do findOne achar o resultado
const ret = col.findOne().then((ret)=>{
    console.log("Inicio pesquisa.");
    console.log(ret);
    console.log("Fim pesquisa.");
    client.close();
})
*/