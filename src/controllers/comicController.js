const { render } = require("ejs");
const controller = {};


//  Muestra los datos necesarios para los cuadritos de los comics
controller.inicio = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM mostrar_comic', (err, comics) => {
            if (err) {
                res.json(err);
            }
            res.render('comics_inicio', {
                data: comics
            });
        });
    });
};

controller.principal = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM mostrar_comic', (err, comics) => {
            if (err) {
                res.json(err);
            }
            res.render('comics_principal', {
                data: comics
            });
        });
    });
};

controller.principal_busqueda = (req, res) => {
    const { nombre } = req.body;
    req.getConnection((err, conn) => {
      conn.query('CALL buscar_comic_por_nombre(?)', [nombre], (err, comic) => {
        console.log(comic);
        res.render('comics_busqueda', {
          data: comic[0]
        });
      });
    });
  };

  

//  Entrega la vista previa 
controller.comic_vista_previa = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('CALL sp_mostrar_comic(?)', [id], (err, comic) => {
            res.render('comics_vista_previa', {
                data: comic[0]
            });
        });
    });
};

//  Realiza una busqueda por nombre del elemento
controller.principal_genero = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('CALL sp_buscar_categoria_misterio(?)', [id], (err, comic) => {
            res.render('comics_categorias', {
                data: comic[0]
            });
        });
    });
};



//  Muestra los datos necesarios para los cuadritos de los comics
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM mostrar_comic', (err, comics) => {
            if (err) {
                res.json(err);
            }
            res.render('comics', {
                data: comics
            });
        });
    });
};

//  Muestra los datos del comic a modificar
controller.modificar = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('CALL sp_mostrar_comic(?)', [id], (err, comic) => {
            res.render('comics_modificar', {
                data: comic[0]
            });
        });
    });
};


//  Inserta los datos actualizados
controller.actualizar = (req, res) => {
    const { id } = req.params;
    const nuevoComic = req.body;
    req.getConnection((err, conn) => {
        const { p_titulo, p_sinopsis, p_subcategoria } = nuevoComic;
        let p_id_subcategoria = p_subcategoria;
        conn.query('CALL modificar_comic(?, ?, ?, ?)', [id, p_titulo, p_sinopsis, p_subcategoria], (err, comic) => {
            if (err) {
                console.log(err);
                return;
            }
            res.redirect('/');
        });
    });
};







//  hace una insercion en la tabla comics, detalles_comic y subcategoria
controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        const {
            p_referencia,
            p_id_autor,
            p_id_clasificacion,
            p_id_editorial,
            p_titulo,
            p_sinopsis,
            p_año_publicacion,
            p_ruta_imagen,
            p_subcategoria
        } = data;
        conn.query('CALL insertar_comic_detalles_comic(?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                p_referencia,
                p_id_autor,
                p_id_clasificacion,
                p_id_editorial,
                p_titulo,
                p_sinopsis,
                p_año_publicacion,
                p_ruta_imagen,
                p_subcategoria
            ],
            (err, comics) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error al llamar al procedimiento almacenado.');
                }
                res.redirect("/");
            }
        );
    });
};


// Elimina un registro de la base de datos
controller.Eliminar = (req, res) => {
    const { id } = req.params;
    const confirmacion = req.query.confirmacion;

    if (confirmacion === 'true') {
        req.getConnection((err, conn) => {
            conn.query('CALL eliminar_comic(?)', [id], (err, rows) => {
                res.redirect('/');
            });
        });
    } else {
        res.send(`
            <script>
                if (confirm("¿Estás seguro de que deseas eliminar este cómic?")) {
                    window.location.href = '/api/eliminar/${id}?confirmacion=true';
                } else {
                    window.location.href = '/'; 
                }
            </script>
        `);
    }
};




module.exports = controller;