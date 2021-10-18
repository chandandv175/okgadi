const MaskData = require('maskdata');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: global.gConfig.cloudinary_CLOUD_NAME,
    api_key: global.gConfig.cloudinary_API_KEY,
    api_secret: global.gConfig.cloudinary_API_SECRET
});
const Q = require('q');
export const commonFun_services= {
    /**
    * Function Name :Generate randon 4 digit otp
    * Description :Generate randon 4 digit otp
    * @return  response
    */
    getOTP: () => {
        var val = Math.floor(1000 + Math.random() * 9000);
        // console.log("value==>>", val);
        return val;
    },
    /**
    * Function Name :Generate maskPhoneNumber
    * Description :Generate maskPhoneNumber
    * @return  response
    */
    maskConvertFunction: (mobileNumber, unmaskedStartDigits = 5, unmaskedEndDigits = 2) => {
        const maskPhoneOptions = {
            // Character to mask the data
            // default value is '*'
            maskWith: "*",

            //Should be positive Integer
            // If the starting 'n' digits needs to be unmasked
            // Default value is 4
            unmaskedStartDigits: unmaskedStartDigits,

            // Should be positive Integer
            //If the ending 'n' digits needs to be unmasked
            // Default value is 1
            unmaskedEndDigits: unmaskedEndDigits
        };
        const phoneNumber = mobileNumber;
        const maskedPhoneNumber = MaskData.maskPhone(phoneNumber, maskPhoneOptions);
        console.log(maskedPhoneNumber)
        return maskedPhoneNumber;
    },
    /**
     * Function Name :cloudinary single file upload function
     * Description :cloudinary single file upload function
     * @return  response
     */
    singleUploadToCloudinary: (imageB64) => {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(imageB64, (err, result) => {
                //  console.log("fddfdfgfg", result);
                console.log("cloudinary ********>", err, result.secure_url)
                if (err) {
                    return reject(err);
                }
                else {
                   return resolve( result.secure_url)

                }
            })
        })

    },
    /**
    * Function Name :mutipleImageUploading on cloudinary
    * Description :mutipleImageUploading on cloudinary
    * @return  response
    */
    mutipleImageUploading: (imageArray) => {
        let urls = []
        return new Q.Promise(async (resolve, reject) => {
            for (let img of imageArray) {
                const newPath = await uploader(img)
                console.log("url======>", newPath)
                urls.push(newPath)
            }
            const uploader = async (path) => await cloudinary.uploader.upload(path)
                .then(function (result) {
                    // console.log("success--->",result)
                    return result.secure_url;
                }).catch(err => {
                    console.log("err--->", err)
                    return reject(err)
                });
          return resolve(urls)
        })
    },
   /**
* Function Name :Generate randon 8 digit string
* Description :Generate randon 8 digit string
* @return  response
*/
getCode: (digit=8) => {
    var idLength = digit;
    var chars = "A,S,D,F,G,H,J,K,L,Q,W,E,R,T,Y,U,I,O,P,Z,X,C,V,B,N,M,8,7,4,5,6,0,1,3,2,9";
    chars = chars.split(",");
    var min = 0;
    var max = chars.length - 1;
    var id = "";
    for (var i = 0; i < idLength; i++) {
        id += chars[Math.floor(Math.random() * (max - min + 1) + min)];
    }
    return id;
},
}