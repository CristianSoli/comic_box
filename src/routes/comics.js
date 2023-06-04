const { Router } = require('express');
const router = Router();
const controller = require('../controllers/comicController');

router.get('/', controller.list);
router.post('/api/crear', controller.save);
router.get('/api/eliminar/:id', controller.Eliminar);
router.get('/api/modificar/:id', controller.modificar);
router.post('/api/modificar/:id', controller.actualizar);
router.get('/inicio', controller.inicio);
router.get('/principal', controller.principal);

//  Rutas para el genero del comic
router.get('/principal/genero/terror/:id', controller.principal_genero);
router.get('/principal/genero/superheroes/:id', controller.principal_genero);
router.get('/principal/genero/drama/:id', controller.principal_genero);
router.get('/principal/genero/accion/:id', controller.principal_genero);
router.get('/principal/genero/aventura/:id', controller.principal_genero);
router.get('/principal/genero/cienciaficcion/:id', controller.principal_genero);
router.get('/principal/genero/comedia/:id', controller.principal_genero);
router.get('/principal/genero/misterio/:id', controller.principal_genero);
router.get('/principal/genero/biografico/:id', controller.principal_genero);


//  Busqueda 
router.post('/principal/buscar', controller.principal_busqueda);

//  Vista previa
router.get('/preview/:id', controller.comic_vista_previa);

module.exports = router;