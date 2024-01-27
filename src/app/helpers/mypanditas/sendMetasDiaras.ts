import { parametros } from "src/app/global/parametroGlobal";

export async function sendMetasDiaras(range:string){
    return await Excel.run(async (context) => {
      console.log({"range dentro de send":range})
      const sheet = context.workbook.worksheets.getItem(parametros.hojasXLS.nombre.PLANIFICAOBRA);
      const rango = sheet.getRange(range)
      rango.load('values')
      await context.sync()
      console.log({"valores":rango.values})
      return rango.values
      
    })
  }
