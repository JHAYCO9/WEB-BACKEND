import { Request, Response } from 'express'
import FavoritoControllerExpressInterface from '../../../domain/interfaces/FavoritoControllerExpressInterface'
import FavoritosDriverPort from '../../../domain/port/driver/favoritos/FavoritosDriver'

export default class FavoritoControllerExpress
  implements FavoritoControllerExpressInterface
{
  constructor(
    private readonly favoritosDriver: FavoritosDriverPort,

  ) {}

  public getFavoritosUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { idUsuario } = req.params;
      if (!idUsuario) {
        res.status(400).json({ message: 'Bad Request: idUsuario is required' });
        return;
      }
      const favoritos = await this.favoritosDriver.getfavoritos(idUsuario);
      if (favoritos === null || favoritos === undefined) {
        res.status(404).send("No hay productos en la lista de favoritos.");
        return;
      }
      res.status(200).json(favoritos);
    } catch (error: unknown) {
      console.error("Error en obtenerFavoritos:", error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error desconocido" });
      }
    }
  }

  public deleteFavoritoUse = async (req: Request, res: Response): Promise<void> => {
    try {
      const { idUsuario, idProducto } = req.body;
      if (!idUsuario || !idProducto) {
        res.status(400).json({ message: 'Bad Request: idUsuario and idProducto are required' });
        return;
      }
      const success = await this.favoritosDriver.deleteProductoFavoritos(idUsuario, Number(idProducto));
      if (success) {
        res.status(200).json({ message: 'Producto removed from favoritos' });
      } else {
        res.status(404).json({ message: 'Producto not found in favoritos' });
      }
    } catch (error: unknown) {
      console.error("Error en quitarProductoDeFavoritos:", error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error desconocido" });
      }
    }
  }

  public addFavoritoUse = async (req: Request, res: Response): Promise<void> => {
    try {
      const { idUsuario, idProducto } = req.body;
      if (!idUsuario || !idProducto) {
        res.status(400).json({ message: 'Bad Request: idUsuario and idProducto are required' });
        return;
      }; 
      const success = await this.favoritosDriver.addProdcutoFavoritos(idUsuario, Number(idProducto));
      if (success) {
        res.status(201).json({ message: 'Producto added to favoritos' });
      } else {
        res.status(409).json({ message: 'Producto already in favoritos' });
      }
    } catch (error: unknown) {
      console.error("Error en agregarAFavoritos:", error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error desconocido" });
      }
    }
  }

}
