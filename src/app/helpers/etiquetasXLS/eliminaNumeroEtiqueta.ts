/**
 * @param etiqueta - Parametro de una simple etiqueta de rango
 * @returns - Retorna la etiqueta sin sus numeros
 * @description - Retorna un string con formato "A:X"
 */
export function eliminaNumeroEtiqueta(etiqueta:string):string{
    const uno = etiqueta.split(":", 2)[0].replace(/[0-9]/g, "")  
    const dos = etiqueta.split(":", 2)[1].replace(/[0-9]/g, "")  
    etiqueta = `${uno}:${dos}`
    return etiqueta
}