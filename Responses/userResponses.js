import * as responseCodes from "./responseStatus.js"

export const Response = {


    mandaroryFeilds: (fields) => {
        return {
            status: responseCodes.INVALID,
            message: 'Mandatory fields.',
            fields
        }
    },
    serverError: (res) => {
        return {
            status: responseCodes.SERVER_ERROR,
            message: 'Internal server error.'
        }
    },
    invalidParams: (res) => {
        return {
            status: responseCodes.INVALID_PARAMETER,
            message: 'Invalid parameters.'
        }
    },
    invalidData: (res) => {
        return {
            status: responseCodes.INVALID,
            message: 'Invalid data.'
        }
    },
    auth: (res) => {
        return {
            status: responseCodes.UNAUTHOTIZED,
            message: 'Unauthorized.'
        }
    },
    forbidden: (res) => {
        return {
            status: responseCodes.FORBIDDEN,
            message: 'Forbidden.'
        }
    },
    // login
    loginSuccess: (res, userData) => {
        return {
            status: responseCodes.SUCCESS,
            message: 'Login successfully.',
            userData
        }
    },
    invalidCredentials: (res) => {
        return {
            status: responseCodes.INVALID,
            message: 'Invalid Credentials.'
        }
    },

    invalidData: (res) => {
        return {
            status: responseCodes.NO_RECORD,
            message: 'No record found.'
        }
    },

    getUserData: (res, userData) => {
        return {
            status: responseCodes.SUCCESS,
            message: 'Data found successfully.',
            userData
        }
    },
    // signup
    signSuccess: (userData) => {
        return {
            status: 200,
            message: 'Signup successfully. Please verify your email id',
            userData
        }
    },
    sameEmailError: (res) => {
        return {
            status: 400,
            message: 'User with same email id already exist.'
        }
    },
    verifyEmailError: (res) => {
        return {
            status: 400,
            message: 'Please verify your email first.'
        }
    },
    codeVerified: (res) => {
        return {
            status: 200,
            message: 'Verification code is successfully verified.'
        }
    },
    invalidCode: (res) => {

        return {
            status: 400,
            message: 'Invalid verification code.'
        }
    }
}
