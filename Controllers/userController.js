import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '../Models/userModal.js'
import { Response } from '../Responses/userResponses.js'
import { checkMandatory } from '../utils/commonFunctions.js';
export const userController = {

    signup: (req, res) => {
        try {
            const [valid, fields] = checkMandatory(['email', 'password', 'userName'], req.body);

            if (!valid) { return res.status(400).json(Response.mandaroryFeilds(fields)) }
            User.findOne({ email: req.body.email }, (error, result) => {
                if (error) return res.status(500).json(Response.serverError(res));
                else if (!!result) {
                    return res.status(400).json(Response.sameEmailError(res));
                }
                else if (!result) {
                    bcrypt.hash(req.body.password, 10, function (err, hash) {
                        if (err) return res.status(500).json(Response.serverError(res));
                        else {

                            let verificationCode = Math.floor(1000 + Math.random() * 9000);
                            req.body.mergeContact = (req.body.countryCode || '') + (req.body.mobileNumber || '');
                            req.body.verificationCode = verificationCode;
                            req.body.password = hash;
                            let user = new User(req.body);
                            user.save((error1, result1) => {
                                if (error1) {
                                    console.log('error1', error1)
                                    return res.status(500).json(Response.serverError(res));
                                }
                                else {
                                    console.log('result1', result1);
                                    let userData = {
                                        _id: result1._id,
                                        verificationCode: result1.verificationCode,
                                        token: jwt.sign({ email: result1.email, _id: result1._id }, 'ok_gadi_')
                                    }
                                    console.log('signup success:', userData)
                                    return res.status(200).json(Response.signSuccess(userData))
                                }
                            })
                        }
                    })
                }
            })
        } catch (ex) {
            console.log(ex)
            return res.status(500).json(Response.serverError(res))
        }
    },
    login: (req, res) => {
        let query = { $and: [{ email: req.body.email }, { userStatus: "active" }] };

        console.log('login request:',req.headers,req.body)
        try {
            const [valid, fields] = checkMandatory(['email', 'password'], req.body);

            if (!valid) { return res.status(400).json(Response.mandaroryFeilds(fields)) }

            User.findOne(query, (error, result) => {
                if (error) return res.status(500).json(Response.serverError(res))
                else if (!!result) {
                    console.log('CHECK::',req.body.password,result.password)

                    bcrypt.compare(req.body.password,result.password).then((check, err) => {
                        console.log('CHECK::',err,check)

                        if (err) return res.status(500).json(Response.serverError(res));

                        
                        if(!check) return res.status(400).json(Response.invalidCredentials())
                        else if (result.userStatus !== 'active') {
                            res.status(400).json({
                                status: 400,
                                message: 'Your account is not active.'
                            })
                        }
                        else {
                            let userData = {
                                _id: result._id,
                                token: jwt.sign({ email: result.email, _id: result._id }, 'ok_gadi_')
                            }
                            console.log('login success:', result)
                            return res.status(200).json(Response.loginSuccess(userData))
                        }

                    })
                }
                else res.status(404).json(Response.invalidData())
            })


        } catch (ex) {
            console.log(ex)
            return res.status(500).json(Response.serverError(res))
        }
    },

    getUserProfile : (req,res) =>{

        try {
         
            User.findOne('query', (error, result) => {
                if (error) return res.status(500).json(Response.serverError(res))
                else if (!!result) {
                            let userData = {
                                _id: result._id,
                            }
                            return res.status(200).json(Response.getUserData(userData))
                }
                else res.status(404).json(Response.invalidData())
            })


        } catch (ex) {
            console.log(ex)
            return res.status(500).json(Response.serverError(res))
        }

    }

}