export  async function muestraHojaOculta(nombreHoja:string) {
    return await Excel.run(async (context) => {
      let sheet = context.workbook.worksheets.getItem(nombreHoja);
      sheet.load("Visible");
      await context.sync()
      sheet.visibility ="Visible" 
      
    });
}
export  async function ocultaHoja(nombreHoja:string) {
    return await Excel.run(async (context) => {
      let sheet = context.workbook.worksheets.getItem(nombreHoja);
      sheet.load("VeryHidden");
      await context.sync()
      sheet.visibility ="VeryHidden" 
      
    });
}