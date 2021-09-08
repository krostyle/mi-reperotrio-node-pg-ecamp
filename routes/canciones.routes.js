const { Router } = require('express');
const { getCanciones, createCancion, updateCancion, deleteCancion } = require('../controllers/canciones.controllers');


const router = Router();

router.get('/canciones', getCanciones);

router.post('/cancion', createCancion);

router.put('/cancion', updateCancion);

router.delete('/cancion', deleteCancion);



module.exports = router;