import { Request, Response } from 'express'

import ControllerExpressInterface from '../../../express/domain/ControllerExpressInterface'

export default interface FavoritoControllerExpressInterface
  extends ControllerExpressInterface {
  getFavoritosUser: (req: Request, res: Response) => Promise<void>
  deleteFavoritoUse: (req: Request, res: Response) => Promise<void>
  addFavoritoUse: (req: Request, res: Response) => Promise<void>
}