import { parametros } from "src/app/global/parametroGlobal";
/**
 * 
 * @returns - Retorna la captura de datos de la hoja "configuracion", en la secuencia en la que la configuracion del parametro.obra.datos se indica.
 */
export async function obtenDatosSegunRangoXls(hoja:string,rangos:string[]){
    return await Excel.run(async (context) => {
      
      const sheet = context.workbook.worksheets.getItem(hoja)
      let cuerpo:any[]=[]
      let myrango:any[]=[]
      
      rangos.map((val,index)=>{
          myrango[index] = sheet.getRange(val)
          myrango[index].load('values')
      })
      
      await context.sync();
      
      myrango.map((val:any)=>{
        
          cuerpo = cuerpo.concat(val.values)
          
      })
      return cuerpo 
      
    });
  
  }
