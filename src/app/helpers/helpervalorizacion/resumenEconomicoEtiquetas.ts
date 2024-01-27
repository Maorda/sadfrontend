export async function resumenEconomicoEtiquetas(){
    return await Excel.run(async (context) => {
        const campos= ["COSTO DIRECTO","GASTOS GENERALES","UTILIDAD","SUB TOTAL","IGV","COSTO TOTAL"]
        var rango:any[] = []
        const sheet = context.workbook.worksheets.getItem('valorizacion_calculos');//'Calend.Valo.AvanceObra'
        //obtener la ultima fila con datos
        const inicioFilaVacia = 9
        const nroFilasALlenar = 6
        
        for (let i = inicioFilaVacia; i < inicioFilaVacia + nroFilasALlenar; i++){
            rango[i] = sheet.getRange(`D${i}:E${i}`);
            rango[i].merge(true)
            rango[i].load("values")
            await context.sync()
            rango[i].values = [[campos[i - inicioFilaVacia], campos[i - inicioFilaVacia]]]
        }

      });
}