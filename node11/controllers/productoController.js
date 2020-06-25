let db = require('../models/dbconexion');
var fs = require('fs');

let productos = {
  listar( req, res ){
    let sql = "SELECT * FROM tienda";
    db.query(sql,function(err, result){
      if( err ){
        console.log(err);
        res.sendStatus(500);
      }else{
        res.json(result);
      }
    });
  },
  store( req, res ){
    
    var file = req.files.file;
    var tmp_path = file.path;
    var target_path = './public/images/' + file.name;
    console.log(target_path);
    console.log(file.name);
    let nombrearchivo = file.name;
    let rutaarchivo = target_path;

    fs.copyFile(tmp_path,target_path,function(err)
    {
        if (err) throw err;        
        fs.unlink(tmp_path, function() {
          if (err) throw err;
          res.status(200).send('File uploaded to: ' + target_path);          
        });
            
    });

    val_nombre = req.body.nombre;
    val_tipo = req.body.tipo;
    val_precio = req.body.precio;
    val_cantidad = req.body.cantidad;
    //
    //val_nombrearchivo = req.body.nombrearchivo;
    //val_rutaarchivo = req.body.rutaarchivo;
    let sql = "INSERT INTO tienda(nombre,tipo,precio,cantidad,nombrearchivo,rutaarchivo) VALUES(?,?,?,?,?,?)";
    db.query(sql,[val_nombre,val_tipo,val_precio,val_cantidad,nombrearchivo,rutaarchivo],function(err, newData){
      if(err){
        console.log(err);
        res.sendStatus(500);
      }else{
        //res.json(newData);
      }
    });
  },
  show( req, res ){
    val_id = req.params.id;
    let sql = "SELECT * FROM tienda WHERE id=?";
    db.query(sql,[val_id],function(err, rowData){
      if(err){
        console.log(err);
        res.sendStatus(500);
      }else{
        res.json(rowData);
      }
    });
  },
  edit( req, res ){
    val_id = req.body.id;
    val_nombre = req.body.nombre;
    val_tipo = req.body.tipo;
    val_precio = req.body.precio;
    val_cantidad = req.body.cantidad;
    let sql = "UPDATE tienda SET nombre=?,tipo=?, precio=?, cantidad=? WHERE id=?";
    db.query(sql,[val_nombre,val_tipo,val_precio,val_cantidad,val_id],function(err, newData){
      if(err){
        res.sendStatus(500);
      }else{
        res.json(newData);
      }
    });
  },
  delete( req, res ){
    val_id = req.params.id;
    let sql = "DELETE FROM tienda WHERE id=?";
    db.query(sql,[val_id],function(err, newData){
      if(err){
        res.sendStatus(500);
      }else{
        res.sendStatus(200);
      }
    });
  }
}

module.exports = productos;
