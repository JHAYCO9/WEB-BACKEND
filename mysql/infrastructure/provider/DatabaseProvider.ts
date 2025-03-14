export default class DBProvider {
    private static instance: DBProvider;

    private static DB_HOST: string;
    private static DB_PORT: string;
    private static DB_USER: string;
    private static DB_PWD: string;
    private static DB_NAME: string;

    private constructor() {
      //DB
      DBProvider.DB_HOST = process.env['DB_HOST'] ?? 'localhost';
      DBProvider.DB_PORT= process.env['DB_PORT'] ?? '3306';
      DBProvider.DB_PWD = process.env['DB_PWD'] ?? 'admin';
      DBProvider.DB_USER = process.env['DB_USER'] ?? 'root';
      DBProvider.DB_NAME = process.env['DB_NAME'] ?? 'buenavista';   
  
    }
  
    public static getInstance(): DBProvider {
      if (DBProvider.instance === null || DBProvider.instance === undefined) {
        DBProvider.instance = new DBProvider()
      }
      return DBProvider.instance
    }
  
    // Getters para variables de base de datos
    public static getDBHost(): string {
      DBProvider.getInstance();
      return DBProvider.DB_HOST;
    }
  
    public static getDBPort(): string {
        DBProvider.getInstance();
        return DBProvider.DB_PORT;
    }
  
    public static getDBPassword(): string {
        DBProvider.getInstance();
        return DBProvider.DB_PWD;
    }
  
    public static getDBUser(): string {
        DBProvider.getInstance();
        return DBProvider.DB_USER;
    }
  
    public static getDBName(): string {
        DBProvider.getInstance();
        return DBProvider.DB_NAME;
    }
  
    // Getter para obtener la URL de conexión completa
    public static getDBConnectionString(): string {
        DBProvider.getInstance();
        return `mysql://${DBProvider.DB_USER}:${DBProvider.DB_PWD}@${DBProvider.DB_HOST}:${DBProvider.DB_PORT}/${DBProvider.DB_NAME}`;
    }
  
  }
