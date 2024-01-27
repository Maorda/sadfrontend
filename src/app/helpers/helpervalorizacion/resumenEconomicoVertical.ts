
/*export function calculoVertical(columna: string, rangoValores: { filaInicio: number, filaFin: number }) {
    const parametro: any = {
      costoDirecto: { formula: "", posicion: "" },
      costoTotal: { formula: "", posicion: "" },
      gastosGenerales: { formula: "", posicion: "" },
      igv: { formula: "", posicion: "" },
      subTotal: { formula: "", posicion: "" },
      utilidad: { formula: "", posicion: "" },
    }
  
    parametro.costoDirecto.formula = `=sum(${columna}${rangoValores.filaInicio}:${columna}${rangoValores.filaFin})`;//la suma de los valores de la columa la que hizo la llamada
    parametro.costoDirecto.posicion = `${columna}${rangoValores.filaFin + 2}`;
  
    parametro.gastosGenerales.formula = `=sum(${parametro.costoDirecto.posicion}:${parametro.costoDirecto.posicion})*${parametrosConfiguracion.gastosGenerales}`;
    parametro.gastosGenerales.posicion = `${columna}${rangoValores.filaFin + 2 + 1}`;
  
    parametro.utilidad.formula = `=sum(${parametro.costoDirecto.posicion}:${parametro.costoDirecto.posicion})*${parametrosConfiguracion.utilidad}`;
    parametro.utilidad.posicion = `${columna}${rangoValores.filaFin + 2 + 1 + 1}`;
  
    parametro.subTotal.formula = `=sum(${columna}${rangoValores.filaFin + 2}:${columna}${rangoValores.filaFin + 2 + 1 + 1})`;
    parametro.subTotal.posicion = `${columna}${rangoValores.filaFin + 2 + 1 + 1 + 1}`;
  
    parametro.igv.formula = `=sum(${columna}${rangoValores.filaFin + 2 + 1 + 1 + 1}:${columna}${rangoValores.filaFin + 2 + 1 + 1 + 1})*${parametrosConfiguracion.igv}`;
    parametro.igv.posicion = `${columna}${rangoValores.filaFin + 2 + 1 + 1 + 1 + 1}`;
  
    parametro.costoTotal.formula = `=sum(${columna}${rangoValores.filaFin + 2}:${columna}${rangoValores.filaFin + 2 + 1 + 1 + 1 + 1})`
    parametro.costoTotal.posicion = `${columna}${rangoValores.filaFin + 2 + 1 + 1 + 1 + 1 + 1}`
  
    return parametro
}*/