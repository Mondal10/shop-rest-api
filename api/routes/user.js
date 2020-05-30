const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user');

router.get('/all', (req, res, next) => {
    User.find()
        .select('_id email') // select only needed fields(columns)
        .exec()
        .then(user => {
            res.status(200).json(user);
        });
})

router.post('/signup', (req, res, next) => {
    const { email, password } = req.body;

    User.find({ email })
        .exec()
        .then(user => {
            if (user.length) {
                return res.status(409).json({
                    message: 'User with same email already exists'
                })
            }

            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                }

                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email,
                    password: hash
                });

                user.save()
                    .then(result => {
                        res.status(201).json(result);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ error: err });
                    });
            });
        })
});

router.post('/login', (req, res, next) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .exec()
        .then(user => {
            if (!user) {
                // Better to send 401 then 404 to avoid filtering(emails) in bruteforce attack
                return res.status(401).json({
                    message: 'Authentication Failed'
                });
            }

            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    // Better to send 401 then 404 to avoid filtering(emails) in bruteforce attack
                    return res.status(401).json({
                        message: 'Authentication Failed'
                    });
                }

                // result will always be a boolean as per documentation of bcrypt
                if (result) {
                    const token = jwt.sign(
                        {
                            userId: user._id,
                            email: user.email
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: "1h"
                        }
                    );

                    return res.status(200).json({
                        message: 'Authenticated Successfully',
                        token
                    });
                }

                // When password is incorrect
                return res.status(401).json({
                    message: 'Authentication Failed'
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;

    User.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User Deleted successfully',
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

module.exports = router;