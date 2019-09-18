const express = require('express');
const mongoose = require('mongoose');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const Schema = mongoose.Schema;
const FilmSchema = new Schema({
    title: {
        type: String
    },
    format: {
        type: String
    },
    year: {
        type: Number
    },
    stars: [{ name: String }]
});
const Films = mongoose.model('film', FilmSchema);

router.get('/', function (req, res) {
    Films.find({}, function (err, films) {
        if (err) res.status(422).send(err);
        res.json(films);
    });
});

router.post('/', function (req, res) {
    let arr = [];
    for (let key in req.body.stars) {
        arr.push({ name: req.body.stars[key] });
    }
    req.body.stars = arr;
    Films.create(req.body, function (err, film) {
        if (err) res.status(422).send(err);
        res.json(film);
    });
});

router.post('/upload', function (req, res) {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        // console.log(files); return;
        let oldpath = files.file.path;
        let newpath = path.join(__dirname, files.file.name);
        fs.rename(oldpath, newpath, function (err) {
            if (err) res.status(422).send(err);
        });

        let text = fs.readFileSync(newpath);
        let textByLine = text.toString().split("\n").map(line => {
            return line.split(": ");
        });
        let obj = {}, objKey = '', objValue = '', j = 0;
        for (let i = 0; i < textByLine.length; i++) {
            if (textByLine[i][0] == '') continue;
            else if (textByLine[i][0] == 'Release Year') objKey = 'year';
            else objKey = textByLine[i][0].toLowerCase();
            objValue = textByLine[i][1];
            obj[objKey] = objValue;
            if (obj.stars) {
                obj.stars = obj.stars.split(", ").map(star => {
                    let objStar = {};
                    objStar.name = star;
                    return objStar;
                });
            };
            j++;
            if (j % 4 === 0) {
                Films.create(obj, function (err) {
                    if (err) res.status(422).send(err);
                });
                console.log(obj);
                obj = {};
            }
        }
        res.end();
    });
});

// router.get('/:id', function(req, res){
//     Films.find({_id: req.params.id}, function (err, film) {
//     	if (err) res.status(422).send(err);
// 		res.json(film);
// 	});
// });

router.delete('/:id', function (req, res) {
    Films.findByIdAndRemove({ _id: req.params.id }, function (err, film) {
        if (err) res.status(422).send(err);
        res.json(film);
    });
});

module.exports = router;