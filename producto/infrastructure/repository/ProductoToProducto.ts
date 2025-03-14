import { MySQLFiltrarProducto } from "../../../mysql/domain/producto/MySQLFilter";
import { MysqlProducto } from "../../../mysql/domain/producto/MySQLProducto";
import MysqlCategoriaRepository from "../../../mysql/infrastructure/db/AuthSQL/MysqlCategoria";
import MysqlDescuentoRepository from "../../../mysql/infrastructure/db/AuthSQL/MysqlDescuento";
import NullCategoria from "../../domain/categoria/NullTypes/NullCategoria";
import NullDescuento from "../../domain/descuento/NullTypes/NullDescuento";
import { FiltrarProducto } from "../../domain/producto/interface/FilterInterface";
import { Producto } from "../../domain/producto/Producto";

import CategoriaToCategoria from "./CategoriaToCategoria";
import DescuentoToDecuento from "./DescuentoToDecuento";


export default class MysqlProductosToProductos {
    constructor (
        private readonly descuentoToDescuento: DescuentoToDecuento,
        private readonly categoriaToCategoria: CategoriaToCategoria,
        private readonly mysqlCategoriaRepo: MysqlCategoriaRepository,
        private readonly mysqlDescuentoRepo: MysqlDescuentoRepository
    ){}

    public getArray = async (productos: MysqlProducto[]): Promise<Producto[]> => {
      const productosTransformados = productos.map(async (producto) => {

          // Manejo seguro de categoría
          let categoria;
          try {
              // Verificar si producto.categoria_id existe
              if (producto.categoria_id >0 || producto.categoria_id != null) {
                  const categoriaData = await this.mysqlCategoriaRepo.fetchCategoriasById(producto.categoria_id);
                  categoria = categoriaData ? await this.categoriaToCategoria.get(categoriaData) : new NullCategoria();
              } else {
                  categoria = new NullCategoria();
              }
          } catch (error) {
              console.error("Error al obtener categoría:", error);
              categoria = new NullCategoria();
          }
  
          // Manejo seguro de descuento
          let descuento;
          try {
              // Verificar si producto.descuento_id existe
              if (producto.descuento_id > 0 || producto.categoria_id != null) {
                  const descuentoData = await this.mysqlDescuentoRepo.fetchDescuentoById(producto.descuento_id);
                  descuento = descuentoData ? await this.descuentoToDescuento.get(descuentoData) : new NullDescuento();
              } else {
                  descuento = new NullDescuento();
              }
          } catch (error) {
              console.error("Error al obtener descuento:", error);
              descuento = new NullDescuento();
          }
  
          // Crear y devolver el producto con manejo seguro de datos
          return new Producto({
              idProducto: producto.idProducto,
              nombreProducto: producto.nombreProducto,
              descripcionProducto: producto.descripcionProducto,
              tallaProducto: producto.tallaProducto,
              precioProducto: producto.precioProducto,
              estadoProducto: producto.estadoProducto,
              imgProducto: producto.imgProducto,
              stockProducto: producto.stockProducto,
              marcaProducto: producto.marcaProducto,
              categoria_id: categoria,
              descuento_id: descuento,
          });
      });
  
      return Promise.all(productosTransformados);
    };
    
      public  get = async(producto: MysqlProducto): Promise<Producto> => {
        return Promise.resolve(
          new Producto({
            idProducto: producto.idProducto,
            nombreProducto: producto.nombreProducto,
            descripcionProducto: producto.descripcionProducto,
            tallaProducto: producto.tallaProducto,
            precioProducto: producto.precioProducto,
            estadoProducto: producto.estadoProducto,
            imgProducto: producto.imgProducto,
            stockProducto: producto.stockProducto,
            marcaProducto: producto.marcaProducto,
            categoria_id: await this.categoriaToCategoria.get(await this.mysqlCategoriaRepo.fetchCategoriasById(producto.categoria_id)),
            descuento_id: await this.descuentoToDescuento.get(await this.mysqlDescuentoRepo.fetchDescuentoById(producto.descuento_id)),
          })
        );
      };
    
      public teg = async (producto: Producto): Promise<MysqlProducto> => {
        const mysqlProducto: MysqlProducto = {
          idProducto: producto.getIdProducto(),
          nombreProducto: producto.getNombreProducto(),
          descripcionProducto: producto.getDescripcionProducto(),
          tallaProducto: producto.getTallaProducto(),
          precioProducto: producto.getPrecioProducto(),
          estadoProducto: producto.getEstadoProducto(),
          imgProducto: producto.getImgProducto(),
          stockProducto: producto.getStockProducto(),
          marcaProducto: producto.getMarcaProducto(),
          categoria_id: producto.getCategoria().getIdCategoria(),
          descuento_id: producto.getDescuento().getIdDescuento()
        };
    
        return Promise.resolve(mysqlProducto);
      };
    
      public tegArray = async (productos: Producto[]): Promise<MysqlProducto[]> => {
        const productosTransformados = productos.map(async (producto) => {
          return {
            idProducto: producto.getIdProducto(),
            nombreProducto: producto.getNombreProducto(),
            descripcionProducto: producto.getDescripcionProducto(),
            tallaProducto: producto.getTallaProducto(),
            precioProducto: producto.getPrecioProducto(),
            estadoProducto: producto.getEstadoProducto(),
            imgProducto: producto.getImgProducto(),
            stockProducto: producto.getStockProducto(),
            marcaProducto: producto.getMarcaProducto(),
            categoria_id: producto.getCategoria().getIdCategoria(),
            descuento_id: producto.getDescuento().getIdDescuento()
          };
        });
        return Promise.all(productosTransformados);
      };

      public filterToMysqlFilter (filter: FiltrarProducto): Promise<MySQLFiltrarProducto>{
        const filterMysql = filter as MySQLFiltrarProducto
        return Promise.resolve(filterMysql)
      }

      public mysqlfilterToFilter (filterMysql: MySQLFiltrarProducto): Promise<FiltrarProducto>{
        const filter = filterMysql as FiltrarProducto
        return Promise.resolve(filter)
      }
}
