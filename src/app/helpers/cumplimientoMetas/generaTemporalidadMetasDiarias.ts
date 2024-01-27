import { getIntervalRangeWhithColumn } from '../etiquetasXLS/administraEtiquetasXLS';
import { getDayName, getFechasContractuales, setDiasConsecutivos } from '../fechas/administraFechas';
import { setNumerosConsecutivos, setNumerosConsecutivosStart } from '../numeracion/administraNumeracion';
import { copyDataFromSheets } from 'src/app/funcionesComunes/copiarDatosEntreHojas';
import { parametros } from 'src/app/global/parametroGlobal';
import {getFechaInicio,getDiasContractuales} from '../../global/ajusteGlobal'
import { muestraHojaOculta, ocultaHoja } from '../helpXLS/ocultaYmuestraHojaXLS';

export async function generaTemporalidadMetasDiarias(){
    await Excel.run(async (context) => {
         
         
         let celda_fecha_Inicio = await getFechaInicio()//sheet.getRange("G42");
         let celda_diasCalendarios = await  getDiasContractuales()//sheet.getRange("F28");
         /*celda_fecha_Inicio.load("values");
         celda_diasCalendarios.load("values");*/
         await context.sync();
         const fecha_inicio = new Date(celda_fecha_Inicio); //dia del inicio "2021-12-16T05:00:00.000Z" 
         
         let diasContractuales = celda_diasCalendarios
         const rangos = getIntervalRangeWhithColumn(fecha_inicio, diasContractuales, 4,5)
         const rangosNombreMes = getIntervalRangeWhithColumn(fecha_inicio, diasContractuales,2,5)
         const rangoTrabajo = rangos[0].inicio + rangos[0].rowReference + ":" + rangos[rangos.length - 1].final + rangos[0].rowReference
  
         const sheetDestino = context.workbook.worksheets.getItem(parametros.hojasXLS.nombre.PLANIFICAOBRA)
         const sheetDestinoFormato = context.workbook.worksheets.getItem(parametros.hojasXLS.nombre.PLANIFICAOBRA) 
         let diasContractuales1 = sheetDestino.getRange(rangoTrabajo)
         let consecutivos: any[] = []
         
         
         
       
         diasContractuales1.load("values")
         let mesesNombres: any[] = []
         let fix = getFechasContractuales(fecha_inicio, diasContractuales)
         
               
            for (let i = 0; i < fix.length; i++) {
              mesesNombres = mesesNombres.concat(fix[i].nombreMes)
              if (i === 0) {
                consecutivos = consecutivos.concat(setNumerosConsecutivosStart(fix[i].capacidadMaxima, fix[i].capacidadOcupada))
        
              } else {
        
                consecutivos = consecutivos.concat(setNumerosConsecutivos(fix[i].capacidadTrabajo))
              }
            }
            
         let rangoNombresDias = getIntervalRangeWhithColumn(fecha_inicio, diasContractuales,3,5)
         let rangoNombresDiasTrabajo = rangoNombresDias[0].inicio + rangoNombresDias[0].rowReference + ":" + rangoNombresDias[rangoNombresDias.length - 1].final + rangoNombresDias[0].rowReference
        
         let nombreDias = sheetDestino.getRange(rangoNombresDiasTrabajo)
         let formatoDomingo = sheetDestinoFormato.getRange(rangos[0].inicio + rangos[0].rowReference + ":" + rangos[rangos.length - 1].final + 500)
         nombreDias.load("values")
         formatoDomingo.load("values")
         //etiqueta nombre del dia
        
         let valoresNombreDias: any[] = []
        
         setDiasConsecutivos(fecha_inicio, diasContractuales).map(async (val) => {
              valoresNombreDias = valoresNombreDias.concat(getDayName(val))
         })
        
         nombreDias.values = [valoresNombreDias]
        
         //fin 
        
         //const conditionalFormat = nombreDias.conditionalFormats.add(Excel.ConditionalFormatType.custom);
         const conditionalFormat = nombreDias.conditionalFormats.add(Excel.ConditionalFormatType.custom);
         const conditionalFormatDomingos = formatoDomingo.conditionalFormats.add(Excel.ConditionalFormatType.custom);

        //formato
         //conditionalFormat.custom.rule.formula = '=IF(E3="sáb",TRUE)';
         //conditionalFormat.custom.format.font.color = "blue";
         //conditionalFormat.custom.format.fill.color = "red";

         //conditionalFormat.custom.rule.formula = '=OR(E$3="dom")';
         //conditionalFormat.custom.format.font.color = "blue";
         //conditionalFormat.custom.format.fill.color = "red";
         conditionalFormatDomingos.custom.rule.formula = '=OR(E$3="dom")'
         conditionalFormatDomingos.custom.format.fill.color = 'red'

         await context.sync();
        
         diasContractuales1.values = [consecutivos]
         let iniciosRango: any[] = []
         //inicio tratamiento de los meses
           
         //combina celdas
         rangosNombreMes.map((val) => {
             iniciosRango = iniciosRango.concat(val.inicio)
              const nombreMesRange = sheetDestino.getRange(val.inicio + val.rowReference + ":" + val.final + val.rowReference)
              nombreMesRange.load("values")
              nombreMesRange.merge(true)
         })
            //llena el nombre de los meses en las celdas combinadas
         rangosNombreMes.map((val, index) => {
             const nombreMesRange = sheetDestino.getRange(val.inicio + val.rowReference)
             nombreMesRange.load("values")
             nombreMesRange.values = [[mesesNombres[index].toUpperCase()]]
             nombreMesRange.format.horizontalAlignment = "Center";
             nombreMesRange.format.fill.color = randomColor() //"#0066FF";
             nombreMesRange.format.font.color ="#FFFFFF";
             nombreMesRange.format.font.bold = true;
         })
            //fin tratamiento de los meses

            //tener en cuenta que para desaparecer el duplicado de la cabecera, se tiene que llenar por lo menos un elemento en la pestaña 
            //presupuesto contactual
         await muestraHojaOculta(parametros.hojasXLS.nombre.PRESUPUESTOCONTRACTUAL)
         await copyDataFromSheets({
          sheetOriginName:parametros.copia.origen.nombreHoja.PRESUPUESTOCONTRACTUAL, //"presupuesto_contractual",
          sheetOriginStartRange:parametros.copia.origen.etiquetaInicio,// "A6",
          sheetDestinationName:parametros.copia.destino.nombreHoja.PLANIFICAOBRA, //"planifica_obra",
          sheetDestinationStartRange:parametros.copia.destino.etiquedaInicio //"A5"
         })
         await ocultaHoja(parametros.hojasXLS.nombre.PRESUPUESTOCONTRACTUAL)
         const sheet = context.workbook.worksheets.getItem(parametros.hojasXLS.nombre.PLANIFICAOBRA);
         sheet.activate()
    });
}
const randomColor = (): string => {
  let result = '';
  for (let i = 0; i < 6; ++i) {
    const value = Math.floor(16 * Math.random());
    result += value.toString(16);
  }
  return '#' + result;
};
        

