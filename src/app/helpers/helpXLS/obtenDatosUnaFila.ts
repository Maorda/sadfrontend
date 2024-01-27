export async function obtenDatosUnaFila(sheetName:string,range:{
    colRefStart:string,
    rowRefStart:number,
    colRefEnd:string,
    rowRefEnd:number
    }){
    return await Excel.run(async (context) => {
      const tmprange = range.colRefStart+String(range.rowRefStart)+":"+range.colRefEnd+String(range.rowRefEnd)
      
      const sheet = context.workbook.worksheets.getItem(sheetName);
      const rango = sheet.getRange(tmprange)
      rango.load('values')
      await context.sync()
      return rango.values
      
    })
  }

  export async function obtenDatosPorRango(sheetName:string,range:{
    colRefStart:string,
    rowRefStart:number,
    colRefEnd:string,
    rowRefEnd:number
    }){
    return await Excel.run(async (context) => {
      const tmprange = range.colRefStart+String(range.rowRefStart)+":"+range.colRefEnd+String(range.rowRefEnd)
      
      const sheet = context.workbook.worksheets.getItem(sheetName);
      const rango = sheet.getRange(tmprange)
      rango.load('values')
      await context.sync()
      return rango.values
      
    })
  }