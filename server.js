import express from 'express'
import { connectdb } from './dbConnection/index.js';
import { port } from './utils/constant.js';
import { Router } from './Routers/userRouter.js';
import { configuration } from './config/config.js';
// const swaggerUi = require('swagger-ui-express');
// const swaggerJSDoc = require('swagger-jsdoc');
connectdb();
const app = express();
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

//********************Error Exception handelling ***********/
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError) {
    // sendError(res, myCustomErrorMessage);
    return res.status(400).send({ status: 400, success: false, message: 'Bad request.' });
  }
  next();
});

process.on('unhandledRejection', (reason, p) => {
  console.log(`Unhandled Rejection at: Promise', ${p}, reason: ${reason}`);
  // throw e;
  process.exit(1);

  // application specific logging, throwing an error, or other logic here
}).on('uncaughtException', (err) => {
  console.log(`${new Date().toUTCString()} uncaughtException:${err.message}`);
  console.log(`${err.stack}`);
  process.exit(1);
});

app.listen(port, async () => {
  try {
    global.gConfig = await configuration.configurationSetting();
    console.log("global keys====>\n", global.gConfig);
    app.use('/user/v1', Router);
    console.log('Server starts at ', port)
  } catch (error) {
    console.log(`Server is not responding.${error}`);
  }
});
//* *****************************************swgger setup********************************* */
// const swaggerDefinition = {
//     info: {
//       title: 'okGadi',
//       version: '1.0.0',
//       description: 'Swagger API Docs'
//     },
//     // host:`${global.gConfig.swaggerURL}`, // Host (optional)
//     //  host:`localhost:7000`, // Host (optional)
//     basePath: '/' // Base path (optional)
//   };

//   const options = {
//     swaggerDefinition,
//     apis: ['./Routers/*.js'] // <-- not in the definition, but in the options
//   };

//   const swaggerSpec = swaggerJSDoc(options);

//   app.get('/swagger.json', (req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.send(swaggerSpec);
//   });
//   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
