import { MysqlTipoProducto } from "../../../mysql/domain/producto/MySQLTipoProducto";
import { TipoProducto } from "../../domain/tipoProducto/TipoProducto";

export default class MysqlTipoProductoToTipoProducto {

  public getArray = (tiposProducto: MysqlTipoProducto[]): Promise<TipoProducto[]> => {
    const tiposTransformados = tiposProducto.map(async (tipo) => {
      return new TipoProducto({
        idTipoProducto: tipo.idTipoProducto,
        nombreTipoProducto: tipo.nombreTipoProducto
      });
    });
    return Promise.all(tiposTransformados);
  };

  public get = (tipo: MysqlTipoProducto): Promise<TipoProducto> => {
    return Promise.resolve(
      new TipoProducto({
        idTipoProducto: tipo.idTipoProducto,
        nombreTipoProducto: tipo.nombreTipoProducto
      })
    );
  };

  public teg = (tipo: TipoProducto): Promise<MysqlTipoProducto> => {
    const mysqlTipoProducto: MysqlTipoProducto = {
      idTipoProducto: tipo.getIdTipoProducto(),
      nombreTipoProducto: tipo.getNombreTipoProducto()
    };
    return Promise.resolve(mysqlTipoProducto);
  };

  public tegArray = (tiposProducto: TipoProducto[]): Promise<MysqlTipoProducto[]> => {
    const tiposTransformados = tiposProducto.map(async (tipo) => {
      return {
        idTipoProducto: tipo.getIdTipoProducto(),
        nombreTipoProducto: tipo.getNombreTipoProducto()
      };
    });
    return Promise.all(tiposTransformados);
  };
}
