import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '../Models/userModal.js'
import { Response } from '../Responses/userResponses.js'
import { checkMandatory } from '../utils/commonFunctions.js';
import * as responseCodes from "../Responses/responseStatus.js"

export const userController = {

    signup: (req, res) => {
        try {
            const [valid, fields] = checkMandatory(['email', 'password', 'userName'], req.body);

            if (!valid) { return res.status(responseCodes.INVALID_PARAMETER).json(Response.mandaroryFeilds(fields)) }
            User.findOne({ email: req.body.email }, (error, result) => {
                if (error) return res.status(responseCodes.SERVER_ERROR).json(Response.serverError(res));
                else if (!!result) {
                    return res.status(responseCodes.INVALID).json(Response.sameEmailError(res));
                }
                else if (!result) {
                    bcrypt.hash(req.body.password, 10, function (err, hash) {
                        if (err) return res.status(responseCodes.SERVER_ERROR).json(Response.serverError(res));
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

        try {
            const [valid, fields] = checkMandatory(['email', 'password'], req.body);

            if (!valid) { return res.status(responseCodes.INVALID_PARAMETER).json(Response.mandaroryFeilds(fields)) }

            User.findOne(query, (error, result) => {
                if (error) return res.status(responseCodes.SERVER_ERROR).json(Response.serverError(res))
                else if (!!result) {

                    if(!result.userStatus) return res.status(responseCodes.INVALID).json({
                        status : responseCodes.INVALID,
                        message : 'Please verify your email first.'
                    })
                    console.log('CHECK::', req.body.password, result.password)

                    bcrypt.compare(req.body.password, result.password).then((check, err) => {
                        if (err) return res.status(responseCodes.SERVER_ERROR).json(Response.serverError(res));
                        if (!check) return res.status(responseCodes.INVALID).json(Response.invalidCredentials())
                        else {
                            let userData = {
                                _id: result._id,
                                token: jwt.sign({ email: result.email, id: result._id }, 'ok_gadi_')
                            }
                            console.log('login success:', result)
                            return res.status(responseCodes.SUCCESS).json(Response.loginSuccess(userData))
                        }
                    })
                }
                else res.status(responseCodes.NOT_FOUND).json(Response.invalidData())
            })


        } catch (ex) {
            console.log(ex)
            return res.status(responseCodes.SERVER_ERROR).json(Response.serverError(res))
        }
    },

    getProfile: (req, res) => {
        const userDetails = req.userDetails;
        try {
            if (!!userDetails) {
                let userData = {
                    // _id: userDetails._id,
                    email: userDetails.email,
                    userName: userDetails.userName,
                    userStatus: userDetails.userStatus,
                }
                return res.status(responseCodes.SUCCESS).json(Response.getUserData(userData))
            }
            else return res.status(responseCodes.NOT_FOUND).json(Response.invalidData())
        } catch (ex) {
            console.log(ex)
            return res.status(responseCodes.SERVER_ERROR).json(Response.serverError(res))
        }
    },

    verifyProfile: (req, res) => {
        let query = { $and: [{ email: req.body.email }, { userStatus: "active" }] };

        try {
            const [valid, fields] = checkMandatory(['email', 'confirmationCode'], req.body);

            if (!valid) { return res.status(responseCodes.INVALID_PARAMETER).json(Response.mandaroryFeilds(fields)) }

            User.findOne(query, (error, result) => {
                if (error) return res.status(responseCodes.SERVER_ERROR).json(Response.serverError(res))
                else if (!!result) {
                    if (result.uesrVerfied) return res.status(responseCodes.INVALID).json(Response.codeAlreadyVerified(res))
                    if (req.body.confirmationCode === result.verificationCode.toString()) {
                        User.findOneAndUpdate(query, { $set: { uesrVerfied: true } }, (err, docs) => {
                            if (err) return res.status(responseCodes.INVALID).json(Response.serverError(res))
                            else {
                                return res.status(responseCodes.SUCCESS).json(Response.codeVerified())
                            }
                        })
                    }
                    else {
                        return res.status(responseCodes.INVALID).json(Response.invalidCode())
                    }
                }
                else res.status(responseCodes.NOT_FOUND).json(Response.notFound())
            })
        } catch (ex) {
            console.log(ex)
            return res.status(responseCodes.SERVER_ERROR).json(Response.serverError())
        }
    },

    forgotPassword: (req, res) => {
        let query = { $and: [{ email: req.body.email }, { userStatus: "active" }] };

        try {
            const [valid, fields] = checkMandatory(['email'], req.body);
            if (!valid) { return res.status(responseCodes.INVALID_PARAMETER).json(Response.mandaroryFeilds(fields)) }

            User.findOneAndUpdate(query, { verificationCode: Math.floor(1000 + Math.random() * 9000) }, { new: true }, (error1, result1) => {
                if (error1) return res.status(responseCodes.SERVER_ERROR).json(Response.serverError());
                else if(!!result1) {
                    return res.status(responseCodes.SUCCESS).json({
                    status: responseCodes.SUCCESS,
                    message: 'Verification code sended to your email.'
                });}
                else {
                    return res.status(responseCodes.NOT_FOUND).json(Response.notFound())
                }
            });

        } catch (ex) {
            console.log(ex)
            return res.status(responseCodes.SERVER_ERROR).json(Response.serverError())
        }
    },


}