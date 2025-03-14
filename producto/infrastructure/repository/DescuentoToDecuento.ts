import { MysqlDescuento } from "../../../mysql/domain/producto/MySQLDescuento";
import { Descuento } from "../../domain/descuento/Descuento";
import NullDescuento from "../../domain/descuento/NullTypes/NullDescuento";

export default class MysqlDescuentoToDescuento {
  public getArray = async (descuentos: MysqlDescuento[]): Promise<Descuento[]> => {
    const descuentosTransformados = await Promise.all(
      descuentos.map(async (descuento) => {
        return new Descuento({
          idDescuento: descuento.idDescuento,
          nombreDescuento: descuento.nombreDescuento,
          estadoDescuento: descuento.estadoDescuento,
          valorDescuento: descuento.valorDescuento
        });
      })
    );
    return descuentosTransformados;
  };

  public get = async (descuento: MysqlDescuento): Promise<Descuento> => {
    if (descuento === null || descuento === undefined) {
      return new NullDescuento(); // O manejar de otra manera
    }
    return new Descuento({
      idDescuento: descuento.idDescuento,
      nombreDescuento: descuento.nombreDescuento,
      estadoDescuento: descuento.estadoDescuento,
      valorDescuento: descuento.valorDescuento
    });
  };

  public teg = async (descuento: Descuento): Promise<MysqlDescuento> => {
    return {
      idDescuento: descuento.getIdDescuento(),
      nombreDescuento: descuento.getNombreDescuento(),
      estadoDescuento: descuento.getEstadoDescuento(),
      valorDescuento: descuento.getValorDescuento(),
      tipoDescuento: 'porcentaje',
      condicionDescuento: ''
    };
  };
  public tegArray = async (descuentos: Descuento[]): Promise<MysqlDescuento[]> => {
    const descuentosTransformados = await Promise.all(
      descuentos.map(async (descuento) => ({
        idDescuento: descuento.getIdDescuento(),
        nombreDescuento: descuento.getNombreDescuento(),
        estadoDescuento: descuento.getEstadoDescuento(), 
        valorDescuento: descuento.getValorDescuento(), 
        condicionDescuento: '' 
      }))
    );
    return descuentosTransformados;
  };
  
}

