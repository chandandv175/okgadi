export const configuration = {
    /**
* Function Name :Global default configuration
* Description :Global default configuration
* @return  response
*/
    configurationSetting: () => {
        const finalConfig = {};
        const env = "uat" || process.env.NODE_ENV;
        return new Promise(async (resolve, reject) => {
            try {
                finalConfig.node_port = 3000;
                finalConfig.cloudinary_CLOUD_NAME = "dfkklchfsw";
                finalConfig.cloudinary_API_KEY = "8738132468123844";
                finalConfig.cloudinary_API_SECRET = "dXuEFaARineeJFnqzTIuaN3Xol8Q";
                //   global.gConfig = finalConfig;
                return resolve(finalConfig);
            } catch (error) {
                console.log("error in configuration file " + error);
            }

        })
    }
    //* ********************************* */
};