import { Request, Response } from 'express';
import ProductoControllerExpressInterface from '../../../domain/interfaces/ProductoControllerExpressInterface';
import DescuentoControllerExpressInterface from '../../../domain/interfaces/DescuentoControllerExpressInterface';
import CategoriaControllerExpressInterface from '../../../domain/interfaces/CategoriaControllerExpressInterface';
import ProductoUseCasePort from '../../../domain/port/driver/producto/ProductoDriver';
import DescuentoUseCasePort from '../../../domain/port/driver/producto/DescuentoDriverPort';
import CategoriaUseCasePort from '../../../domain/port/driver/producto/CategoriaDriverPort';
import { FiltrarProducto } from '../../../domain/producto/interface/FilterInterface';

/**
 * Express controller implementation for product-related operations.
 * This controller handles HTTP requests for products, discounts, categories,
 * and product types through Express.js routes.
 * 
 * @implements {ProductoControllerExpressInterface} Interface for product controller operations
 * @implements {DescuentoControllerExpressInterface} Interface for discount controller operations
 * @implements {CategoriaControllerExpressInterface} Interface for category controller operations
 */
export default class ProductoControllerExpress
  implements ProductoControllerExpressInterface, DescuentoControllerExpressInterface, CategoriaControllerExpressInterface {

  /**
   * Creates a new instance of ProductoControllerExpress.
   * 
   * @param {ProductoUseCasePort} productoUseCase - Use case for product operations
   * @param {DescuentoUseCasePort} descuentoUseCase - Use case for discount operations
   * @param {CategoriaUseCasePort} categoriaUseCase - Use case for category operations
   */
  constructor(
    private readonly productoUseCase: ProductoUseCasePort,
    private readonly descuentoUseCase: DescuentoUseCasePort,
    private readonly categoriaUseCase: CategoriaUseCasePort
  ) { }

  /**
   * Searches for products by name or brand.
   * This endpoint collects search parameters and delegates the search operation to the use case.
   * 
   * @param {Request} req - Express request object containing search query
   * @param {Response} res - Express response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   */
  public BusquedaProductos = async (req: Request, res: Response): Promise<void> => {
    try {
      // Extract search query from request
      const query = req.params['busqueda'] as string;

      // Validate input
      if (!query || query.trim() === '') {
        res.status(400).json({ message: 'Search query is required' });
        return;
      }

      // Delegate to use case
      const searchResults = await this.productoUseCase.searchProductos(query);
      if (searchResults === null || searchResults === undefined) {
        res.status(401).json({ message: 'Items not found' });
        return;
      }
      // Return results
      res.status(200).json({ searchResults });
    } catch (error) {
      console.error('Error in BusquedaProductos:', error);
      const err = new Error()
      res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
  };

  /**
   * Filters products based on specified criteria.
   * This endpoint collects filter criteria and delegates the filtering operation to the use case.
   * 
   * @param {Request} req - Express request object containing filter criteria
   * @param {Response} res - Express response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   */
  public filtrateProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      // Extract filter criteria from request body
      const filterCriteria = req.body as FiltrarProducto;

      // Delegate to use case
      const filterResults = await this.productoUseCase.filterProductos(filterCriteria);
      if (filterResults === null || filterResults === undefined) {
        res.status(401).json({ message: 'Items not found' });
        return;
      }
      // Return results
      res.status(200).json({ filterResults });
    } catch (error) {
      console.error('Error in filtrateProducts:', error);
      const err = new Error()
      res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
  };

  /**
   * Retrieves all products from the system.
   * 
   * @param {Request} _req - Express request object (unused)
   * @param {Response} res - Express response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   */
  public getProductos = async (_req: Request, res: Response): Promise<void> => {
    const productos = await this.productoUseCase.getAllProductos();
    res.status(200).json({ productos });
  };

  /**
   * Retrieves a product by its ID.
   * 
   * @param {Request} req - Express request object containing the product ID
   * @param {Response} res - Express response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   */
  public getProductosById = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params['id']);
    if (!id) res.status(400).json({ message: 'Invalid ID' });

    const producto = await this.productoUseCase.getProductoById(id);
    if (!producto) res.status(404).json({ message: 'Producto not found' });

    res.status(200).json({ producto });
  };

  /**
   * Retrieves products by brand.
   * 
   * @param {Request} req - Express request object containing the brand name
   * @param {Response} res - Express response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   */
  public getProductosByMarca = async (req: Request, res: Response): Promise<void> => {
    const marca = req.params['marca'];
    if (!marca) {
      res.status(400).json({ message: 'Invalid marca' });
      return;
    }

    const productos = await this.productoUseCase.getProductoByMarca(marca);
    res.status(200).json({ productos });
  };

  /**
   * Retrieves products by name.
   * 
   * @param {Request} req - Express request object containing the product name
   * @param {Response} res - Express response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   */
  public getProductosByNombre = async (req: Request, res: Response): Promise<void> => {
    const nombre = req.params['nombre'];
    if (!nombre) res.status(400).json({ message: 'Invalid nombre' });

    if (!nombre) {
      res.status(400).json({ message: 'Invalid nombre' });
      return;
    }
    const productos = await this.productoUseCase.getProductoByName(nombre);
    res.status(200).json({ productos });
  };

  /**
   * Retrieves a product's image by product ID.
   * 
   * @param {Request} req - Express request object containing the product ID
   * @param {Response} res - Express response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   */
  public getImageProducto = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params['id']);
    if (!id) res.status(400).json({ message: 'Invalid ID' });

    const imagen = await this.productoUseCase.getImgProducto(id.toString());
    res.status(200).json({ imagen });
  };

  /**
   * Retrieves all discounts from the system.
   * 
   * @param {Request} _req - Express request object (unused)
   * @param {Response} res - Express response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   */
  public getDescuentos = async (_req: Request, res: Response): Promise<void> => {
    const descuentos = await this.descuentoUseCase.getDescuentos();
    res.status(200).json({ descuentos });
  };

  /**
   * Retrieves a discount by its ID.
   * 
   * @param {Request} req - Express request object containing the discount ID
   * @param {Response} res - Express response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   */
  public getDescuentoById = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params['id']);
    if (!id) res.status(400).json({ message: 'Invalid ID' });

    const descuento = await this.descuentoUseCase.getDescuentoById(id);
    res.status(200).json({ descuento });
  };

  /**
   * Retrieves discounts by name.
   * 
   * @param {Request} req - Express request object containing the discount name
   * @param {Response} res - Express response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   */
  public getDescuentoByNombre = async (req: Request, res: Response): Promise<void> => {
    const nombre = req.params['nombre'];
    if (!nombre) res.status(400).json({ message: 'Invalid nombre' });

    const descuento = await this.descuentoUseCase.getDescuentoByNombre(nombre as string);
    res.status(200).json({ descuento });
  };

  /**
   * Adds a new discount to the system.
   * 
   * @param {Request} req - Express request object containing the discount data
   * @param {Response} res - Express response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   */
  public addDescuento = async (req: Request, res: Response): Promise<void> => {
    const descuento = req.body;
    this.descuentoUseCase.addDescuento(descuento);
    res.status(201).json({ message: 'Descuento added' });
  };

  /**
   * Updates an existing discount.
   * 
   * @param {Request} req - Express request object containing the discount ID and updated data
   * @param {Response} res - Express response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   */
  public updateDescuento = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params['id']);
    if (!id) res.status(400).json({ message: 'Invalid ID' });

    const descuento = req.body;
    const boDescuento = await this.descuentoUseCase.updateDescuento(id, descuento);
    if (boDescuento === false) {
      res.status(400).json({ message: 'Descuento not updated' });
    }
    res.status(200).json({ message: 'Descuento updated' });
  };

  /**
   * Retrieves all categories from the system.
   * 
   * @param {Request} _req - Express request object (unused)
   * @param {Response} res - Express response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   */
  public getCategorias = async (_req: Request, res: Response): Promise<void> => {
    const categorias = await this.categoriaUseCase.getCategorias();
    res.status(200).json({ categorias });
  };

  /**
   * Retrieves a category by its ID.
   * 
   * @param {Request} req - Express request object containing the category ID
   * @param {Response} res - Express response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   */
  public getCategoriasById = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params['id']);
    if (!id) res.status(400).json({ message: 'Invalid ID' });

    const categoria = await this.categoriaUseCase.getCategoriasById(id);
    res.status(200).json({ categoria });
  };

  /**
   * Retrieves categories by name.
   * 
   * @param {Request} req - Express request object containing the category name
   * @param {Response} res - Express response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   */
  public getCategoriasByNombre = async (req: Request, res: Response): Promise<void> => {
    const nombre = req.params['nombre'];
    if (!nombre) res.status(400).json({ message: 'Invalid nombre' });

    const categoria = await this.categoriaUseCase.getCategoriasByNombre(nombre as string);
    res.status(200).json({ categoria });
  };

  /**
   * Adds a new category to the system.
   * 
   * @param {Request} req - Express request object containing the category data
   * @param {Response} res - Express response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   */
  public addCategoria = async (req: Request, res: Response): Promise<void> => {
    const categoria = req.body;
    await this.categoriaUseCase.addCategoria(categoria);
    res.status(201).json({ message: 'Categoria added' });
  };

  /**
   * Adds a new product type to the system.
   * 
   * @param {Request} req - Express request object containing the product type data
   * @param {Response} res - Express response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   */
  public addTipoProducto = async (req: Request, res: Response): Promise<void> => {
    const tipoProducto = req.body;
    await this.categoriaUseCase.addTipoProducto(tipoProducto);
    res.status(201).json({ message: 'Tipo de producto added' });
  };

  /**
   * Retrieves all product types from the system.
   * 
   * @param {Request} _req - Express request object (unused)
   * @param {Response} res - Express response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   */
  public getTipoProductos = async (_req: Request, res: Response): Promise<void> => {
    const tiposProductos = await this.categoriaUseCase.getTipoProductos();
    res.status(200).json({ tiposProductos });
  };

  /**
   * Retrieves a product type by its ID.
   * 
   * @param {Request} req - Express request object containing the product type ID
   * @param {Response} res - Express response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   */
  public getTipoProductoById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params['id'];
    const tipoProducto = await this.categoriaUseCase.getTipoProductoById(Number(id));
    res.status(200).json({ tipoProducto });
  };

  /**
   * Adds a new product to the system.
   * 
   * @param {Request} req - Express request object containing the product data
   * @param {Response} res - Express response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   */
  public addProducto = async (req: Request, res: Response): Promise<void> => {
    try {
      const producto = req.body;
      const success = await this.productoUseCase.addProducto(producto);
      res.status(success ? 201 : 400).json({ message: success ? 'Producto agregado' : 'Error al agregar producto' });
    } catch (error) {
      res.status(500).json({ error: 'error del servidor' });
    }
  };

  /**
   * Updates an existing product.
   * 
   * @param {Request} req - Express request object containing the product ID and updated data
   * @param {Response} res - Express response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   */
  public updateProducto = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params['id']);
      if (!id) {
        res.status(400).json({ message: 'Invalid ID' });
        return;
      }

      const producto = req.body;
      const success = await this.productoUseCase.updateProducto(id, producto);
      res.status(success ? 200 : 400).json({ message: success ? 'Producto actualizado' : 'Error al actualizar producto' });
    } catch (error) {
      res.status(500).json({ error: 'error del servidor' });
    }
  };

  /**
   * Retrieves featured products for the storefront display (vitrina).
   * 
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   */
  public getProductosVitrina = async (req: Request, res: Response): Promise<void> => {
    try {
      const vitrina = req.params['vitrina']
      const vitri = Number(vitrina)
      // Obtener productos destacados o filtrados para la vitrina
      const productosVitrina = await this.productoUseCase.getProductosVitrina(vitri);

      if (!productosVitrina || productosVitrina.length === 0) {
        res.status(404).json({ message: 'No se encontraron productos para la vitrina' });
        return;
      }

      res.status(200).json({ productos: productosVitrina });
    } catch (error) {
      console.error('Error en getProductosVitrina:', error);
      res.status(500).json({ message: 'Error interno del servidor', error: 'error de servidor' });
    }
  };
}
