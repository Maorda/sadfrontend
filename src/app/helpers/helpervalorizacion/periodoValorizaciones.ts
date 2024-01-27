import { getDiasContractuales, getFechaInicio } from "src/app/global/ajusteGlobal"
import { getIntervalRangeWhithColumn } from "../etiquetasXLS/administraEtiquetasXLS"
import { getFechasContractuales } from "../fechas/administraFechas"

export interface IPeriodoValorizacion{
    rangoValorizacion:string;
    mesValorizacion:string;
}

/**
 * 
 * @returns - Retorna un arreglo de objetos, que indican el rango de la valorizacion y el mes de la misma
 * @description - El rango sirve para deliminar los calculos en ese intervalo, y el mes sirve para indicar al usuario que valo se está calculando 
 *  ejemplo [{rango:"E2:Z8",valorizacion:Enero}]
 */
export async function obtenerPeriodosValorizaciones():Promise<IPeriodoValorizacion[]> {
    const config = {"fechaInicio":await getFechaInicio(),"diasContractuales":await getDiasContractuales()} 

    
    //obtener las valorizaciones
    let valorizacionesEtiqueta:IPeriodoValorizacion[] =[]
    const rangos = getIntervalRangeWhithColumn(new Date(config.fechaInicio), config.diasContractuales,5,5)
    const meses =  getFechasContractuales(new Date(config.fechaInicio),config.diasContractuales)
   
    
    for(let i=0;i<rangos.length;i++){
        let tmp:IPeriodoValorizacion = {
            rangoValorizacion:rangos[i].inicio+rangos[i].rowReference+":"+rangos[i].final+rangos[i].rowReference,
            mesValorizacion:meses[i].nombreMes
        }
        //valorizacionesEtiqueta.push({"rangoValorizacion":rangos[i].inicio+rangos[i].rowReference+":"+rangos[i].final+rangos[i].rowReference,"mesValorizacion":meses[i].nombreMes})
        valorizacionesEtiqueta.push(tmp)
    }
    
    return valorizacionesEtiqueta

}
