import jwt from 'jsonwebtoken'
import * as responseCodes from "../Responses/responseStatus.js"
import { User } from '../Models/userModal.js'
import { Response } from '../Responses/userResponses.js';

export const verifyToken = (req,res,next) =>{
    console.log('verify token section',req.headers.token)
    if (req.headers.token) {
        jwt.verify(req.headers.token, "ok_gadi", (err, result) => {
            if (err) return res.status(responseCodes.UNAUTHOTIZED).json(Response.unauthrized(res));
            else{
                User.findOne({ _id: result._id }, (error, result1) => {
                    if (error) return res.status(responseCodes.SERVER_ERROR).json(Response.serverError(res));
                    else if(!result1) return res.status(responseCodes.NOT_FOUND).json(Response.notFound());
                    else{
                        if (result.userStatus == "ACTIVE"){
                            req.userDetails=result
                             next();
                         }
                         else{
                            return res.status(responseCodes.FORBIDDEN).json(Response.forbidden());
                         }
                    }
                })
            }
        })
    }
    else{
        return res.status(responseCodes.UNAUTHOTIZED).json(Response.unauthrized(res));
    }
}