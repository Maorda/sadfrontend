  /**
  * 
  * @param sheetName - Es el nombre de la hoja excel que se evaluarà.
  * @returns - Retorna verdadero en caso el el tab exista.
  * @description - Comprueba que la hoja exista dentro del archivo.
  */
   export async function isLoadSheetXls(sheetName:string){
    return await Excel.run(async (context) => {
       
      let isLoadTemplate:boolean = false
      const sheets = context.workbook.worksheets;
      sheets.load("items/name");
      await context.sync();
      if (sheets.items.length > 1) {
        console.log(`Hay ${sheets.items.length} hojas en el Libro:`);
      } else {
        console.log(`hay solo una hoja en el libra:`);
      }
      var uno =0
      for (let i in sheets.items) {
        //evalua si existe la hoja en el archivo 
        if (sheets.items[i].name === sheetName){
          uno = uno + 1
        }
      }
      if(uno === 0){
        
        isLoadTemplate = true; 
      }
      return isLoadTemplate
    
    });

  }
