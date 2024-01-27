/**
 * @param date la fecha a evaluar
 * @description retorna el día de la fecha ingresada
 */
 export function getDays(date:Date):number{
    return date.getDate()
  
  }
  
  /**
   * @param date Fecha a evaluar
   * @description devuelve el nombre del mes y los dias que le corresponden
   */
 export function getMonthNameAndDays(date:Date) {
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return {
      "nombre": monthNames[date.getMonth()], "dias": new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    };
  }
 
  /**
   * @param date fecha a ser evaluada
   * @param months indica los meses a agregar a la fecha ingresada
   * @description devuelve la fecha modificada según los meses ingresados
   */
 export function addMonths(date:Date, months:number) {
    const dateCopy = new Date(date);
  
    dateCopy.setMonth(dateCopy.getMonth() + months);
  
    return dateCopy;
  
  }
  /**
   * @param date fecha a ser evaluada
   * @param days indica los dias a agregar a la fecha ingresada
   * @description devuelve la fecha modificada según los dias ingresados
   */
 export function addDays(date:Date, days:number) {
    const dateCopy = new Date(date);
  
    dateCopy.setDate(dateCopy.getDate() + days);
  
    return dateCopy;
  
  }
  
  
 export function formatoFecha(fecha:Date, formato:string) {
    const map:any = {
      dd: fecha.getDate(),
      mm: fecha.getMonth() + 1,
      yy: fecha.getFullYear().toString().slice(-2),
      yyyy: fecha.getFullYear()
    }
  
    return formato.replace(/dd|mm|yy|yyy/gi, (matched) => map[matched])
  }

/**
 * 
 * @param fecha_inicio Fecha del inicio contractual
 * @param diasContractuales dias contractuales
 * @description Retorna la capacidad maxima, capacidad ocupada, capacidad de trabajo, y nombres de meses contractules 
 */

  export function getFechasContractuales(fecha_inicio:Date,diasContractuales:number){
  

    const capacidadADistribuir:number = diasContractuales

    /*en algunos casos la capacidad maxima es igual a la capacidad de trabajo */
    interface capacidad {
      capacidadMaxima:number;
      capacidadOcupada:number;
      capacidadTrabajo:number;
      nombreMes:string;
    
    }

    let siguiente:capacidad = {capacidadMaxima:0,capacidadOcupada:0,capacidadTrabajo:0,nombreMes:""}
    let resto:number = capacidadADistribuir
    let i:number = 0
    let restoAnterior:number = 0
    let registroMovimientos:capacidad[] = []
    
    
    while(true){

      siguiente.capacidadMaxima = getMonthNameAndDays(addMonths(fecha_inicio,i)).dias
      
      siguiente.capacidadOcupada = getDays(fecha_inicio)
      if(i===0){
        siguiente.capacidadTrabajo = siguiente.capacidadMaxima - siguiente.capacidadOcupada + 1
        
      }else{
        siguiente.capacidadOcupada =0
        siguiente.capacidadTrabajo = siguiente.capacidadMaxima  - siguiente.capacidadOcupada 
      }
        restoAnterior =  resto
        resto = resto - siguiente.capacidadTrabajo
        siguiente.nombreMes = getMonthNameAndDays(addMonths(fecha_inicio,i)).nombre
        registroMovimientos.push(
          {
            capacidadMaxima:siguiente.capacidadMaxima,
            capacidadOcupada:siguiente.capacidadOcupada,
            capacidadTrabajo:siguiente.capacidadTrabajo,
            nombreMes:siguiente.nombreMes
            
          })
      
      if(resto <= 0){

        registroMovimientos[i].capacidadTrabajo = restoAnterior 
        //registroMovimientos[i].capacidadOcupada = restoAnterior
          
        break
      } 
        i=i+ 1
       
    }
    return registroMovimientos
  
  }

  

export function setDiasConsecutivos(fecha_inicio:Date,numero: number) {
  let i = 0
  let contador: any[] = []
  while (i < numero) {
    contador.push(addDays(fecha_inicio,i))
    i = i + 1
  }
  return contador
}


export function setDiasConsecutivosStart(fecha_inicio:Date, numero: number,start:number) {
  let i = start
  let contador: any[] = []
  while (i <= numero) {
    contador.push(addDays(fecha_inicio, i))
    i = i + 1
  }
  return contador
}

export function format(inputDate:Date) {
  let date, month, year;

  date = inputDate.getDate();
  month = inputDate.getMonth() + 1;
  year = inputDate.getFullYear();

  date = date
    .toString()
    .padStart(2, '0');

  month = month
    .toString()
    .padStart(2, '0');

  return `${date}/${month}/${year}`;
}
export function getDayName(date = new Date(), locale = 'es-ES') {
  return date.toLocaleDateString(locale, { weekday: 'short' });
}