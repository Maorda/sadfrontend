/**
   * 
   * @param sheetName - El nombre de la hoja
   * @param rowStartReference - fila en la que va a empezar a el rango
   * @param colEndReference - columna en texto en la que va a terminar el rango ejemple "M"
   * @returns - retorna el rango de inicio y final
   * @description - Devuelve el rango necesario para que la funcion copiar hoja pueda trabajar: ejemplo: presupuesto_contractual!6:M100 
   */

export  async function getRangeByRowStartReferenceAndColumnEndReference(sheetName: string,rowStartReference: string,colEndReference:string) {
    return await Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getItem(sheetName);
      sheet.activate();
      sheet.getUsedRange().select();
  
      let range = context.workbook.getSelectedRange();
      range.load('address');
      
  
      await context.sync();
      const rangeCustom = sheetName + "!" + rowStartReference +":"+ colEndReference + range.address.split(":", 2)[1].replace(/[A-Z]/g,"");
      return rangeCustom
  
    });
  }