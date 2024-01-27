interface IPartidasEjecutadasObject{
    partida:string;
    descripcion:string;
    umedida:string;
    metradoTotal:number;
    metradoEjecutado:number;
    metradoEjecutadoValorizado:number;
    metradoEjecutadoPorcentaje:number;
    metradoEjecutadoPorcentajeAcumulado:number;
    metradoEjecutadoSaldo:number;
    metradoEjecutadoPorcentajeSaldo:number;
}
/**
 * @param todasPartidas - Son todas las partidas registradas en el presupuesto: ejemplo "paraEnviarAExcel"
 * @returns - Retorna una coleccion de objetos del tipo IPartidasEjecutadasObject
 */
export function detectaPartidasEjecutadas(todasPartidas:any[]):IPartidasEjecutadasObject[]{  
let partidasEjecutadas:IPartidasEjecutadasObject[] = []
for(let i=0;i<todasPartidas.length;i++){
    if(todasPartidas[i][9]!=0){
      const partidasEjecutadasObj:IPartidasEjecutadasObject = {
        partida:todasPartidas[i][0],
        descripcion:todasPartidas[i][1],
        umedida:todasPartidas[i][2],
        metradoTotal:todasPartidas[i][3],
        metradoEjecutado:todasPartidas[i][9],
        metradoEjecutadoValorizado:todasPartidas[i][10],
        metradoEjecutadoPorcentaje:todasPartidas[i][11],
        metradoEjecutadoPorcentajeAcumulado:todasPartidas[i][14],
        metradoEjecutadoSaldo:todasPartidas[i][15],
        metradoEjecutadoPorcentajeSaldo:todasPartidas[i][17]
      }
      partidasEjecutadas = partidasEjecutadas.concat(partidasEjecutadasObj)
    }
}
return partidasEjecutadas
}