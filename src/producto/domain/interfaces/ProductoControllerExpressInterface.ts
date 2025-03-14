import { Request, Response } from 'express'

import ControllerExpressInterface from '../../../express/domain/ControllerExpressInterface'

export default interface ProductoControllerExpressInterface
  extends ControllerExpressInterface {
  getProductos: (req: Request, res: Response) => Promise<void>
  getProductosVitrina: (req: Request, res: Response) => Promise<void>
  getProductosById: (req: Request, res: Response) => Promise<void>
  getProductosByMarca: (req: Request, res: Response) => Promise<void>
  getProductosByNombre: (req: Request, res: Response) => Promise<void>
  getImageProducto: (req: Request, res: Response) =>Promise<void>
  BusquedaProductos : (req: Request, res: Response) => Promise<void>
  filtrateProducts:(req: Request, res: Response) => Promise<void>
  addProducto: (req: Request, res: Response) => Promise<void>
  updateProducto: (req: Request, res: Response) => Promise<void>
}