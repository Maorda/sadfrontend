/**
   * 
   * @param array - Es el array de array, que contiene en su interior solo un elemento, el resto es en blanco
   * @returns - Retorna un array de objetos del tipo ITitulo_subtitulo
   * @description - Funcion que retorna una coleccion de objetos del tipo ITitulo_subtitulo, necesarios para llenar los separadores
*/
 interface ITitulo_subtitulo{
    titulo:string;
    columna:number
  }
export function convertArrayToObjectTituloColumna(array:any[][]):ITitulo_subtitulo[]{
    let titulo_columna:ITitulo_subtitulo[] = []
    array.map((el)=>{
      el.map((elemento,index)=>{
        if(elemento === '')return
        titulo_columna = titulo_columna.concat({"titulo":elemento,"columna":index})
      })
    })
    return titulo_columna 
  }