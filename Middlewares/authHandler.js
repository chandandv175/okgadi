import jwt from 'jsonwebtoken'
import * as responseCodes from "../Responses/responseStatus.js"
import { User } from '../Models/userModal.js'
import { Response } from '../Responses/userResponses.js';

export const verifyToken = (req, res, next) => {
    console.log('verify token', req.headers.authrization)
    if (req.headers.authrization) {
        jwt.verify(req.headers.authrization, "ok_gadi_", (err, result) => {
            console.log('err', err)
            if (err) return res.status(responseCodes.UNAUTHOTIZED).json(Response.unauthrized(res));
            else {
                User.findOne({ _id: result.id }, (error, result1) => {
                    if (error) return res.status(responseCodes.SERVER_ERROR).json(Response.serverError(res));
                    else if (!result1) return res.status(responseCodes.NOT_FOUND).json(Response.notFound());
                    else {
                        console.log('verify token', result1)

                        if (result1.userStatus == "active") {
                            req.userDetails = result1;
                            next();
                        }
                        else if (result1.userStatus == "blocked") {
                            return res.status(responseCodes.UNAUTHOTIZED).json({
                                status: responseCodes.UNAUTHOTIZED,
                                message: 'Your account is temporary disabled, please contact administrator.'
                            });
                        }
                        else {
                            return res.status(responseCodes.FORBIDDEN).json(Response.forbidden());
                        }
                    }
                })
            }
        })
    }
    else {
        return res.status(responseCodes.UNAUTHOTIZED).json(Response.unauthrized(res));
    }
}