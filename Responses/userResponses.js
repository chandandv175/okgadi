export const Response = {

    serverError: (res) => {
       return res.send({
            status: 500,
            message: 'Internal server error.'
        })
    },
    invalidParams: (res) => {
        res.send({
            status: 422,
            message: 'Invalid parameters.'
        })
    },
    invalidData: (res) => {
        res.status(400).json({
            status: 400,
            message: 'Invalid data.'
        })
    },
    auth: (res) => {
        res.send({
            status: 401,
            message: 'Unauthorized.'
        })
    },
    forbidden: (res) => {
        res.send({
            status: 403,
            message: 'Forbidden.'
        })
    },
    // login
    loginSuccess: (res, userData) => {
        res.send({
            status: 200,
            message: 'Login successfully.',
            userData
        })
    },
    invalidCredentials: (res) => {
        res.send({
            status: 400,
            message: 'Invalid Credentials.'
        })
    },

    invalidData: (res) => {
        res.send({
            status: 400,
            message: 'No record found.'
        })
    },

    getUserData: (res, userData) => {
        res.send({
            status: 200,
            message: 'Data found successfully.',
            userData
        })
    },
    // signup
    signSuccess: (res) => {
        res.send({
            status: 200,
            message: 'Signup successfully. Please verify your email id'
        })
    },
    sameEmailError: (res) => {
        res.send({
            status: 400,
            message: 'User with same email id already exist.'
        })
    },
    verifyEmailError: (res) => {
        res.send({
            status: 400,
            message: 'Please verify your email first.'
        })
    },
    codeVerified: (res) => {
        res.send({
            status: 200,
            message: 'Verification code is successfully verified.'
        })
    },
    invalidCode: (res) => {

        res.send({
            status: 400,
            message: 'Invalid verification code.'
        })
    }
}
