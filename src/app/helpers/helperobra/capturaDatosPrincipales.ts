import { parametros } from "src/app/global/parametroGlobal";
/**
 * 
 * @returns - Retorna la captura de datos de la hoja "configuracion", en la secuencia en la que la configuracion del parametro.obra.datos se indica.
 */
export async function capturaDatosPrincipalesXls(){
    return await Excel.run(async (context) => {
      
      const sheet = context.workbook.worksheets.getItem(parametros.obra.configuracion.NOMBREHOJACONFIGURACION)
      let cuerpo:any[]=[]
      let myrango:any[]=[]
      
      parametros.obra.datos.map((val,index)=>{
          myrango[index] = sheet.getRange(val)
          myrango[index].load('values')
      })
      
      await context.sync();
      
      myrango.map((val:any)=>{
        
          cuerpo = cuerpo.concat(val.values)
          
      })
      return cuerpo 
      
    });
  
  }
  const configuracion = [
    "departamento"                   ,
    "provincia   "                   ,
    "distrito    "                   ,
    "localidad  "                    ,
    "area_geografica   "             ,
    "etidad_contratante	  "         ,
    "gerente_desarrollo	   "        ,
    "representante_legal		"         ,
    "ruc_operador_tributario	   "    ,
    "razon_social		           "    ,
    "residente_nombres_apellidos   " ,			
    "residente_numero_colegiatura  " ,			
    "supervisor_nombres_apellidos  " ,			
    "supervisor_numero_colegiatura " ,			
    "obra		                      " ,
    "adjudicacion_nro	            " ,	
    "proceso_seleccion	          "   ,	
    "modalidad		               "    ,
    "sistema_contrato	           "  ,	
    "contrato_nro	                " ,	
    "fecha_acta_entrega_terreno	  " ,	
    "fecha_contrato		           "  ,
    "fecha_inicio_contractual"	     ,	
    "plazo_ejecucion_contractual	" ,
    "valor_referencial_con_igv	"   ,
    "monto_adjudicado_con_ig   "   ,
    "factor_relacion	         "    ,
    "presupuesto_base	         "  ,
    "fuente_financiamiento	     "  ,
    "gastos_generales_porcentaje " ,	
    "utilidad_procentaje       "   ,
    "igv_porcentaje	          "   ,
    "garantia_fiel_cumplimiento",
    "adelanto_directo" ,
    "adelanto_materiales",
  ]