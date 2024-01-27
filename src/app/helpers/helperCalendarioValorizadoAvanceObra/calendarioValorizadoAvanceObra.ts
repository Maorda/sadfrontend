import { restendpoint } from "src/app/endpoint/restendpoint";
import { importaHojasXls } from "src/app/funcionesComunes/importarHojas";
import { getDiasContractuales } from "src/app/global/ajusteGlobal";
import { parametros } from "src/app/global/parametroGlobal";

 export async function calendarioValorizadoAvanceObra(){
  return await Excel.run(async (context) => {
    console.
    log("dentro del calendadio valorizado de avcance de obras")
    const nro_dias = await getDiasContractuales()
  
    const mesesCelda: any[] = ["G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z","AA","AB","AC","AD","AE","AF"]
    const celdasConsumidas = nro_dias / 30
    let meses: any[] = []

    for (let i = 0; i < celdasConsumidas; i++) {
      meses = meses.concat(mesesCelda[i])
    }
    
    const sheet = context.workbook.worksheets.getItem(parametros.hojasXLS.nombre.CALENDARIOVALORIZADOAVANCEOBRA);//'Calend.Valo.AvanceObra'
    let rango: any[] = []
    meses.map((val, index) => {
      rango[index] = sheet.getRange(`${meses[index]}5`)//G4, H4, I4 . . .
      rango[index].load('values')
      rango[index].values = [[`mes ${index + 1}`]]
      rango[index].format.horizontalAlignment = "Center";
      rango[index].format.fill.color = "pink";
      rango[index].format.font.color = "red";
      rango[index].format.font.bold = true;
    })
    console.log(rango)
    await context.sync()
    const rg = sheet.getRange(`${mesesCelda[0]}4:${mesesCelda[meses.length - 1]}4`)
    rg.merge(true)
    const rg1 = sheet.getRange("G4")
    rg1.load('values')
    await context.sync()
    console.log(rg1)
    rg1.values = [["CALENDARIO VALORIZADO DE AVANCE DE OBRA"]]
    rg1.format.horizontalAlignment = "Center";
    rg1.format.fill.color = "#0066FF";
    rg1.format.font.color = "#FFFFFF";
    rg1.format.font.bold = true;
    rg1.format.autofitColumns()
    
    
    
  });

  
    
    
    
    
    
     
  
}

