export default class JWTProvider {
    private static instance: JWTProvider;
    private static SECRET_KEY: string;

    private constructor() {
      //JWT
      JWTProvider.SECRET_KEY = process.env['SECRET_KEY'] ?? 'jaja';
    }
  
    public static getInstance(): JWTProvider {
      if (JWTProvider.instance === null || JWTProvider.instance === undefined) {
        JWTProvider.instance = new JWTProvider()
      }
      return JWTProvider.instance
    }

    public static getSECRET_KEY(): string {
      JWTProvider.getInstance();
      return JWTProvider.SECRET_KEY;
    }

  }