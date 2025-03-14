import { Request, Response } from 'express'

import ControllerExpressInterface from '../../../express/domain/ControllerExpressInterface'

export default interface DescuentoControllerExpressInterface
  extends ControllerExpressInterface {
  getDescuentos: (req: Request, res: Response) => void
  getDescuentoById: (req: Request, res: Response) => void
  getDescuentoByNombre: (req: Request, res: Response) => void
  addDescuento: (req: Request, res: Response) => void
  updateDescuento: (req: Request, res: Response) => void
}