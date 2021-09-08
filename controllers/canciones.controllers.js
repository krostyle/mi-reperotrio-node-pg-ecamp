//TRUCAZO
const { response, request } = require('express')
const db = require('../db/config')


//HTTP METHODS
const getCanciones = async(req = request, res = response) => {
    try {
        const text = 'SELECT * FROM repertorio';
        // const values = [];
        const objQuery = {
            name: 'get-canciones',
            text,
            // values,
            // rowMode: 'array'
        };
        const { rows } = await db.query(objQuery);
        res.json(rows)
    } catch (error) {
        console.log(error);
        return error;
    }

}

const createCancion = async(req = request, res = response) => {
    try {
        const { cancion, artista, tono } = req.body;
        const text = 'INSERT INTO repertorio (cancion, artista, tono) VALUES($1, $2, $3) RETURNING *;'
        const values = [cancion, artista, tono];
        const objQuery = {
            text,
            values,
            rowMode: 'array'
        };
        const { rows } = await db.query(objQuery);
        res.json({
                msg: 'Cancion creada correctamente',
                data: rows[0]
            })
            .status(201)

    } catch (error) {
        console.log(error);
    }
}

const updateCancion = async(req = request, res = response) => {
    try {
        const { id, cancion, artista, tono } = req.body;
        const text = 'UPDATE repertorio SET cancion=$2, artista=$3, tono=$4 WHERE id=$1 RETURNING *;'
        const values = [id, cancion, artista, tono];
        const objQuery = {
            text,
            values,
            rowMode: 'array'
        };
        const { rows } = await db.query(objQuery);
        console.log(rows);
        res.json({
            msg: 'Canción actualizada correctamente',
            data: rows[0]
        })
    } catch (error) {
        console.log(error);
    }
}



const deleteCancion = async(req = request, res = response) => {
    try {
        const { id } = req.query;
        const text = 'DELETE FROM repertorio WHERE id = $1 RETURNING *;'
        const values = [id];
        const objQuery = {
            text,
            values,
            rowMode: 'array'
        };
        const { rows } = await db.query(objQuery);
        res.json({
            msg: 'Ejercicio eliminado correctamente',
            data: rows[0]
        })
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getCanciones,
    createCancion,
    updateCancion,
    deleteCancion
}