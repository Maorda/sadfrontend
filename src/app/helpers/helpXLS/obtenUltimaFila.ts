import { parametros } from "src/app/global/parametroGlobal";

export async function obtenUltimaFila(sheetName:string){
    return await Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getItem(sheetName);
      sheet.activate();
      sheet.getUsedRange().select()
      let range = context.workbook.getSelectedRange();
      range.load('address');
      await context.sync();
  
      
      return Number(range.address.split(":", 2)[1].replace(/[A-Z]/g, ""))
  
    });
    
  }
  export async function obtenUltimaFilaV1(sheetName:string){
    return await Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getItem(sheetName);
      sheet.activate();
      sheet.getUsedRange().select()
      let range = context.workbook.getSelectedRange();
      range.load('address');
      await context.sync();
  
      
      return Number(range.address.split(":", 2)[1].replace(/[A-Z]/g, ""))
  
    });
    
  }
  export async function obtenDataPlanificacionDiaria(){
    return await Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getItem(parametros.hojasXLS.nombre.PLANIFICAOBRA);
      sheet.activate();
      sheet.getUsedRange().getLastColumn()
      let range = context.workbook.getSelectedRange();
      range.load('address');
      await context.sync();
      
      //const ultimafila = Number(range.address.split(":", 2)[1].replace(/[A-Z]/g, ""))
      console.log({"address":range.address})
      console.log({"split":range.address.split(":", 2)[1]})
      const der = String("A5")+":"+range.address.split("!", 2)[1]//la carga de datyos empieza en A5
      //obtener valores
      console.log({"der":der})
      let rango = sheet.getRange(der);
      rango.load("values");
      await context.sync();

      console.log(`The address of the range "MyRange" is "${rango.values}"`);
      return der
  
    });
    
  }

  
  export async function obtenUltimaColumna(){
    return await Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getItem(parametros.hojasXLS.nombre.PLANIFICAOBRA);
      sheet.activate();
      sheet.getUsedRange().getLastColumn()
      let range = context.workbook.getSelectedRange();
      range.load('address');
      await context.sync();
      
      console.log({"ultima columna":range.address})
      return range.address
  
    });
    
  }
  