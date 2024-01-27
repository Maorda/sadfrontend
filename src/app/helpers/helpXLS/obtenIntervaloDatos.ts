import { parametros } from "src/app/global/parametroGlobal";

/**
 * 
 * @param sheetName - El nombre de la hoja a la que se le aplicaran las operaciones
 * @param colStartReference Es el inicio de la columna
 * @param rowStartReference Es el inicio de la fila
 * @param colEndReference - Es el fin de la Columna
 * @returns - Retorna los datos desde la columna de inicio a la columna de final dado una fila de inicio.
 * @description - Funcion que nos permite obtener los datos dados los parametros anteriores. La fila del final se calcula de forma automatica.  
 */
 export async function  obtenIntervaloDatos(sheetName:string,colStartReference:string,rowStartReference:number,colEndReference:string){
    return await Excel.run( async (context) => {
    const sheet = context.workbook.worksheets.getItem(sheetName);
    sheet.activate();
    sheet.getUsedRange().select();
    let range = context.workbook.getSelectedRange();
    
    range.load("address");
    await context.sync();
    const rangeCustom = range.address
    const rowEndReference = Number(rangeCustom.split(":", 2)[1].replace(/[A-Z]/g, ""))
    const sheetData = context.workbook.worksheets.getItem(sheetName)
    const rangeData = sheetData.getRange(sheetName + "!" + colStartReference + rowStartReference + ":" + colEndReference + rowEndReference)
    rangeData.load("values")
    await context.sync();
    return rangeData.values
    })
  } 



  
