export default class ExpressProvider {
  private static instance: ExpressProvider
  private static HOST: string
  private static PORT: string
  private static PROTOCOL: string
  private static CERT_KEY:string;
  private static CERT_PEM:string;

  private constructor() {
    ExpressProvider.HOST = process.env['HOST'] ?? 'localhost'
    ExpressProvider.PORT = process.env['PORT'] ?? '3000'
    ExpressProvider.PROTOCOL = process.env['PROTOCOL'] ?? 'http'    
    ExpressProvider.CERT_KEY = process.env['CERT_KEY'] ?? 'D:\CursoJava\Programacion\Web\Web-Back\Parcial-1\env\certificado\key.pem';
    ExpressProvider.CERT_PEM = process.env['CERT_PEM'] ?? 'D:\CursoJava\Programacion\Web\Web-Back\Parcial-1\env\certificado\cert.pem';   
  }

  public static getInstance(): ExpressProvider {
    if (ExpressProvider.instance === null || ExpressProvider.instance === undefined) {
      ExpressProvider.instance = new ExpressProvider()
    }
    return ExpressProvider.instance
  }

  public static getHost(): string {
    ExpressProvider.getInstance()
    return ExpressProvider.HOST
  }

  public static getPort(): string {
    ExpressProvider.getInstance()
    return ExpressProvider.PORT
  }

  public static getProtocol(): string {
    ExpressProvider.getInstance()
    return ExpressProvider.PROTOCOL
  }

  public static getAPIDomain(): string {
    ExpressProvider.getInstance()
    return `${ExpressProvider.PROTOCOL}://${ExpressProvider.HOST}:${ExpressProvider.PORT}`
  }

  public static getCertKey(): string {
    ExpressProvider.getInstance();
    return ExpressProvider.CERT_KEY;
  }

  public static getCertPem(): string {
    ExpressProvider.getInstance();
    return ExpressProvider.CERT_PEM;
  }
}
