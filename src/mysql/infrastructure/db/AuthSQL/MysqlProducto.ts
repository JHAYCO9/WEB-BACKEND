import { MySQLFiltrarProducto } from "../../../domain/producto/MySQLFilter";
import { MysqlProducto } from "../../../domain/producto/MySQLProducto";
import ProductoRepoInterface from "../../../domain/repository/ProductoRepoInterface";
import Database from "../database";

/**
 * MySQL implementation of the Product Repository Interface.
 * This class provides data access methods for product-related operations in the MySQL database.
 * It handles CRUD operations, filtering, and searching for products.
 * 
 * @implements {ProductoRepoInterface} Interface defining required product repository methods
 */
export default class MysqlProductoRepository implements ProductoRepoInterface {
  /**
   * Database instance for executing SQL queries.
   * @private
   */
  private readonly db = Database.getInstance();

  /**
   * Filters products based on specified criteria.
   * Supports filtering by size, price range, category, and discount status.
   * 
   * @param {MySQLFiltrarProducto} producto - Filter criteria object containing optional filter parameters
   * @returns {Promise<MysqlProducto[]>} Promise resolving to an array of products matching the filter criteria
   */
  public async filterProductos(producto: MySQLFiltrarProducto): Promise<MysqlProducto[]> {
    let query = `
        SELECT * FROM BuenaVista_Productos 
        WHERE (tallaProducto = ? OR ? IS NULL)
        AND (precioProducto BETWEEN ? AND ?)
        AND (categoria_id = ? OR ? IS NULL)
    `;

    const params: any[] = [
      producto.tallaProducto ?? null, producto.tallaProducto ?? null,
      producto.precioProductoMin ?? 0, producto.precioProductoMax ?? 9999999,
      producto.categoria_id ?? null, producto.categoria_id ?? null
    ];

    // Special handling for discount_id
    if (producto.descuento_id === true) {
      query += " AND descuento_id IS NOT NULL";
    } else if (producto.descuento_id === false) {
      query += " AND descuento_id IS NULL";
    }

    const rows = await this.db.executeQuery(query, params);
    return rows as MysqlProducto[];
  }

  /**
   * Searches for products matching a search term in name, description, or brand.
   * 
   * @param {string} busq - Search term to look for in product fields
   * @returns {Promise<MysqlProducto[]>} Promise resolving to an array of products matching the search term
   */
  public async searchProductos(busq: string): Promise<MysqlProducto[]> {
    const rows = await this.db.executeQuery(
      `SELECT * FROM BuenaVista_Productos 
         WHERE nombreProducto LIKE ? 
         OR descripcionProducto LIKE ? 
         OR marcaProducto LIKE ?`,
      [`%${busq}%`, `%${busq}%`, `%${busq}%`]
    );
    return rows as MysqlProducto[];
  }

  /**
   * Retrieves all products from the database.
   * 
   * @returns {Promise<MysqlProducto[]>} Promise resolving to an array of all products
   */
  public async fetchAllProductos(): Promise<MysqlProducto[]> {
    const rows = await this.db.executeQuery("SELECT * FROM BuenaVista_Productos");
    return rows;
  }

  /**
   * Retrieves a product by its ID.
   * 
   * @param {number} id - The product ID to search for
   * @returns {Promise<MysqlProducto>} Promise resolving to the product with the specified ID
   * @throws {Error} If no product is found with the specified ID
   */
  public async fetchProductoById(id: number): Promise<MysqlProducto> {
    const rows = await this.db.executeQuery(
      "SELECT * FROM BuenaVista_Productos WHERE idProducto = ?",
      [id]
    );
    if (!rows || rows.length === 0) {
      throw new Error("Producto no encontrado");
    }
    return rows[0] as MysqlProducto;
  }

  /**
   * Retrieves products by name (partial match).
   * 
   * @param {string} nombre - The product name to search for (partial match)
   * @returns {Promise<MysqlProducto[]>} Promise resolving to an array of products matching the name
   */
  public async fetchProductoByName(nombre: string): Promise<MysqlProducto[]> {
    const rows = await this.db.executeQuery(
      "SELECT * FROM BuenaVista_Productos WHERE nombreProducto LIKE ?",
      [`%${nombre}%`]
    );
    return rows as MysqlProducto[];
  }

  /**
   * Retrieves products by category name (partial match).
   * Joins with the category table to find products in the specified category.
   * 
   * @param {string} categoria - The category name to search for (partial match)
   * @returns {Promise<MysqlProducto[]>} Promise resolving to an array of products in the specified category
   */
  public async fetchProductosByCategoria(categoria: string): Promise<MysqlProducto[]> {
    const rows = await this.db.executeQuery(
      `SELECT * FROM BuenaVista_Productos p
           JOIN BuenaVista_Categoria c ON p.categoria_id = c.idCategoria
           WHERE c.nombreCategoria LIKE ?`,
      [`%${categoria}%`]
    );
    return rows as MysqlProducto[];
  }

  /**
   * Retrieves products by brand name (partial match).
   * 
   * @param {string} marca - The brand name to search for (partial match)
   * @returns {Promise<MysqlProducto[]>} Promise resolving to an array of products with the specified brand
   */
  public async fetchProductoByMarca(marca: string): Promise<MysqlProducto[]> {
    const rows = await this.db.executeQuery(
      "SELECT * FROM BuenaVista_Productos WHERE marcaProducto LIKE ?",
      [`%${marca}%`]
    );
    return rows as MysqlProducto[];
  }

  /**
   * Retrieves the image URL for a specific product.
   * 
   * @param {string} idProducto - The ID of the product whose image is being retrieved
   * @returns {Promise<string>} Promise resolving to the image URL of the product
   * @throws {Error} If no image is found for the specified product ID
   */
  public async fetchImgProducto(idProducto: string): Promise<string> {
    const rows = await this.db.executeQuery(
      "SELECT imgProducto FROM BuenaVista_Productos WHERE idProducto = ?",
      [idProducto]
    );
    if (!rows || rows.length === 0) {
      throw new Error("Imagen no encontrada");
    }
    return rows[0].imgProducto;
  }

  /**
   * Adds a new product to the database.
   * 
   * @param {MysqlProducto} producto - The product object to add to the database
   * @returns {Promise<boolean>} Promise resolving to true if the product was successfully added, false otherwise
   */
  public async addProducto(producto: MysqlProducto): Promise<boolean> {
    const result = await this.db.executeQuery(
      `INSERT INTO BuenaVista_Productos (nombreProducto, descripcionProducto, tallaProducto, precioProducto, estadoProducto, imgProducto, stockProducto, marcaProducto, categoria_id, descuento_id)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        producto.nombreProducto,
        producto.descripcionProducto,
        producto.tallaProducto,
        producto.precioProducto,
        producto.estadoProducto ? 1 : 0,
        producto.imgProducto,
        producto.stockProducto,
        producto.marcaProducto,
        producto.categoria_id,
        producto.descuento_id,
      ]
    );
    return result.affectedRows > 0;
  }

  /**
   * Updates an existing product in the database.
   * 
   * @param {number} id - The ID of the product to update
   * @param {MysqlProducto} producto - The updated product data
   * @returns {Promise<boolean>} Promise resolving to true if the product was successfully updated, false otherwise
   */
  public async updateProducto(id: number, producto: MysqlProducto): Promise<boolean> {
    const result = await this.db.executeQuery(
      `UPDATE BuenaVista_Productos 
           SET nombreProducto = ?, descripcionProducto = ?, tallaProducto = ?, precioProducto = ?, estadoProducto = ?, imgProducto = ?, stockProducto = ?, marcaProducto = ?, categoria_id = ?, descuento_id = ?
           WHERE idProducto = ?`,
      [
        producto.nombreProducto,
        producto.descripcionProducto,
        producto.tallaProducto,
        producto.precioProducto,
        producto.estadoProducto ? 1 : 0,
        producto.imgProducto,
        producto.stockProducto,
        producto.marcaProducto,
        producto.categoria_id,
        producto.descuento_id,
        id,
      ]
    );
    return result.affectedRows > 0;
  }
}