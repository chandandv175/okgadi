import { user } from '../Models/userModal.js'
import { Response } from '../Responses/userResponses.js'
export const userController = {

    login: (req, res) => {
        try {
            console.log("req.body=======>\n", req.body);
            const { email, password } = req.body;
            if (email, password) {
                user.findOne({ email }, (error, result) => {
                    if (error) res.status(500).json(Response.serverError(res));
                    else if (!!result) {
                        let data = {
                            _id: result._id,
                            email: result.email
                        }
                        res.status(200).json(Response.loginSuccess(res, data))
                    }
                })
            }
            else{
                res.status(422).json(Response.invalidParams(res))
            }

        } catch (ex) {
            console.log(ex)
            res.status(500).json(Response.serverError(res))
        }
    },
    signup: (req, res) => {
        try {

            const { email, password } = req.body;
            if (email, password) {
                user.findOne({ email }, (error, result) => {
                    if (error) res.status(500).json(Response.serverError(res));
                    else if (!!result) {
                        let data = {
                            _id: result._id,
                            email: result.email
                        }
                        res.status(200).json(Response.loginSuccess(res, data))
                    }
                })
            }
            else{
                res.status(422).json(Response.invalidParams(res))
            }

        } catch (ex) {
            console.log(ex)
            res.status(500).json(Response.serverError(res))
        }
    }
}