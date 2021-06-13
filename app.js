const express = require("express");
const mongoose = require("mongoose");
const Libro = require("./model/Libro");
var cors = require('cors');
const app = express();
app.use(cors());

require("dotenv/config");

  app.use(express.json());

app.get("/libros", async(req, res) => {
  const resultado = await Libro.find();
  res.send(resultado);
});

app.get("/libro/:id", async(req, res) => {
  const resultado = await Libro.findOne({_id: req.params.id});
  res.send(resultado);
});

app.get("/buscarlibro/:arg", async(req, res) => {
  const resultado = await Libro.find({title: new RegExp(req.params.arg, 'i')});
  res.send(resultado);
});

app.delete("/borrarlibro/:id", async(req, res) => {
  try{
    await Libro.deleteOne({_id: req.params.id});
    res.send({message: req.params.id});
  } catch(err) {
    res.send({message: err});
  }
});

app.post("/crearlibro", async(req, res) => {
  try{
    const {title} = req.body;
    const miLibro = new Libro(req.body);
    const libroExiste = await Libro.findOne({title});
    if(libroExiste){
      return res.status(400).json({
        ok: false,
        msg: 'El libro ya existe'
      });
    } else {
      await miLibro.save();
      res.send(miLibro);
    }
  } catch(err) {
    res.send({message: err});
  }
});

app.post("/actualizarlibro/:id", async(req, res) => {
  try{
    const datosBody = req.body;
    const libroExiste = await Libro.findOne({_id: req.params.id});
    
    if(libroExiste){
      Libro.updateOne({_id: req.params.id}, datosBody, err => {
        if (err) throw err;
      });
      res.send({message: "Libro con id "+req.params.id+" actualizado."});
    } else {
      return res.status(400).json({
        ok: false,
        msg: 'No existe el libro con la id introducida'
      });
    }
  } catch(err) {
    res.send({message: err});
  }
});

const client = mongoose.connect(process.env.DB_CONNECTION_STRING,
{ 
  useUnifiedTopology: true,
  useNewUrlParser: true 
},
(req, res) => {
  console.log("API de libros para prueba técnica de DinamizaTIC");
});

app.listen(3000, () =>{
    console.log("Listening to 3000");
});

