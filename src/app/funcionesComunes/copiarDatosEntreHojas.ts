import { getRangeByRowStartReferenceAndColumnEndReference } from "../helpers/etiquetasXLS/getRangoByRowColumn";

/**
* @param {Object}  configuracion - configura.
* @param {string} configuracion.sheetOriginName - indica.
* @returns 
*/
 export  async function copyDataFromSheets(
    {
      sheetOriginName,
      sheetOriginStartRange,
      sheetDestinationName,
      sheetDestinationStartRange
    }:any) {
    return await Excel.run(async (context) => {
      let sheetDestino = context.workbook.worksheets.getItem(sheetDestinationName);
      // Copy everything from "A1:E1" into "G1" and the cells afterwards ("G1:K1").
      const  origen = await getRangeByRowStartReferenceAndColumnEndReference(sheetOriginName,sheetOriginStartRange,"D")
      
      sheetDestino.getRange(sheetDestinationName+"!"+sheetDestinationStartRange).copyFrom(origen);
      await context.sync();
  
    });
  }
