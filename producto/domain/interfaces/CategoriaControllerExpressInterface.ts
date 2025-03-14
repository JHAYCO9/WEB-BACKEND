import { Request, Response } from 'express'

import ControllerExpressInterface from '../../../express/domain/ControllerExpressInterface'

export default interface CategoriaControllerExpressInterface
  extends ControllerExpressInterface {
    getTipoProductos: (req: Request, res: Response) => void
    getTipoProductoById: (req: Request, res: Response) => void
    getCategorias: (req: Request, res: Response) => void
    getCategoriasById: (req: Request, res: Response) => void
    getCategoriasByNombre: (req: Request, res: Response) => void
    addCategoria: (req: Request, res: Response) => void
    addTipoProducto: (req: Request, res: Response) => void
}