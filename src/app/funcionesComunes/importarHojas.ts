/**
 * 
 * @param api - Es el endpoint del servidor que contiene el apirest para descargar la hoja 
 * @param nombreHojas - Es el nombre de la hoja(s) que se importaran
 * @returns - No retorna nada
 * @description - Importa una(s) hoja(s) de un archivo excel que contiene los mismos nombres proporcionados por nombrehojas
 */

 export async function importaHojasXls(api:string,nombreHojas:string[]){
  console.log(nombreHojas)
    // Create XHR, Blob and FileReader objects
   var xhr = new XMLHttpRequest(),
   blob,
   fileReader = new FileReader();

    xhr.open("GET", api, true);
    // Set the responseType to arraybuffer. "blob" is an option too, rendering manual Blob creation unnecessary, but the support for "blob" is not widespread enough yet
    xhr.responseType = "arraybuffer";
    
    
    xhr.addEventListener(
      "load",
      function() {
        
    
        if (xhr.status === 200) {
          // Create a blob from the response
          blob = new Blob([xhr.response], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          });
          

          // onload needed since Google Chrome doesn't support addEventListener for FileReader
          fileReader.onload = function(evt) {
            return Excel.run(async (context) => {
              let workbook = context.workbook;
              /**borra la hoja si existe */
             // context.workbook.worksheets.getItemOrNullObject(sheetConfigurationName).delete()

                // Set up the insert options.
                let options = {
                  sheetNamesToInsert: nombreHojas, // Insert all the worksheets from the source workbook.
                  positionType: Excel.WorksheetPositionType.none, // Insert after the `relativeTo` sheet.
                  //relativeTo: "Hoja1" // The sheet relative to which the other worksheets will be inserted. Used with `positionType`.
                };
                const startIndex = fileReader.result!.toString().indexOf("base64,");//el signo de admiracion es un comodin para que funcione la configureacion de tsconfig,cuando la opcion strict esta activado
                const mybase64 = fileReader.result!.toString().slice(startIndex! + 7);
                workbook.insertWorksheetsFromBase64(mybase64!, options);
                await context.sync();
            });
            //se podria almacenar el localStorage
          };
          // Load blob as Data URL
          return fileReader.readAsDataURL(blob);
          
        }
      },
      false
    );
   
    
    xhr.send();
    
  }