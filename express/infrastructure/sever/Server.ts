import express, { Application } from 'express'
import ExpressProvider from '../provider/ExpressProvider'
import RouterExpressInterface from '../../domain/RouterExpressInterface'
import ErrorRouterExpressInterface from '../error/router/ErrorExpressRouter'
import * as https from 'https';
import * as fs from 'fs';
import Database from '../../../mysql/infrastructure/db/database';

export default class Server {
  private readonly app: Application

  constructor(
    private readonly routesExpress: RouterExpressInterface[],
    private readonly error: ErrorRouterExpressInterface
  ) {
    this.app = express()
    this.configure()
    this.routes()
  }

  public routes() {
    this.routesExpress.forEach((route) => {
      this.app.use(route.path, route.router)
    })
    this.app.use(this.error.path, this.error.router)
  }

  public configure() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  public async initDB() {
    try {
      console.log("Inicializando base de datos...");
      Database.getInstance(); 
      console.log("Base de datos lista.");
    } catch (error) {
      console.error("Error al conectar a la base de datos:", error);
      process.exit(1); 
    }
  }

  public start() {
    const HOST = ExpressProvider.getHost()
    const PORT = ExpressProvider.getPort()
    const PROTOCOL = ExpressProvider.getProtocol()
    // Si es https hace lo del if
    if(PROTOCOL === 'https'){
      const keyPath = ExpressProvider.getCertKey(); // Ruta al archivo key.pem
      const certPath = ExpressProvider.getCertPem(); // Ruta al archivo cert.pem
      const options = {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
      };
      https.createServer(options, this.app).listen(PORT, () =>
        console.log(`Server is running on ${PROTOCOL}://${HOST}:${PORT}`)
      );
    }else {
      this.app.listen(PORT, () =>
        console.log(`Server is running on ${PROTOCOL}://${HOST}:${PORT}`)
      );
    }
  }
}