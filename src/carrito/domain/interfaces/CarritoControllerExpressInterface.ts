import { Request, Response } from 'express'

import ControllerExpressInterface from '../../../express/domain/ControllerExpressInterface'

export default interface CarritoControllerExpressInterface
  extends ControllerExpressInterface {
  getCarrito: (req: Request, res: Response) => Promise<void>
  getCarritoResumido: (req: Request, res: Response) => Promise<void>
  addItemToCarrito: (req: Request, res: Response) => Promise<void>
  createCarrito: (req: Request, res: Response) => Promise<void>
  getTotalCarrito: (req: Request, res: Response) => Promise<void>
  deleteItemFromCarrito: (req: Request, res: Response) => Promise<void>
  aumentaCanitadItemProductoCarrito: (req: Request, res: Response) => Promise<void>
  disminuyeCantidadItemProductoCarrito: (req: Request, res: Response) => Promise<void>
  updateStatusCarrito: (req: Request, res: Response) => Promise<void>
}