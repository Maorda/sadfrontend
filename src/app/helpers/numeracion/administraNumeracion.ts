/**
 * 
 * @param numero Indica el Final de la secuencia numerica 
 * @returns retorna una secuencia numerica entera empezando por el 1 y termina en el parametro numero 
 * 
 */
 export function setNumerosConsecutivos(numero:number){
    let i = 1
    let contador:any[] = []
    while(i<=numero){
        contador.push(i)
        i = i + 1
    }
    return contador
}
/**
 * 
 * @param secuenciaFinal Representa la cantidad maxima a secuenciar
 * @param iniciaSecuencia  Representa el inicio de la secuencia
 * @returns Retorna la secuencia numerica entera empezando por el iniciaSecuencia
 */

export function setNumerosConsecutivosStart(secuenciaFinal: number,iniciaSecuencia:number) {
    let i = iniciaSecuencia
    let contador: any[] = []
    while (i <= secuenciaFinal) {
      contador.push(i)
      i = i + 1
    }
    return contador
  }