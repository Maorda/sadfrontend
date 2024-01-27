import { parametros } from "./parametroGlobal";
    
export async function setObraId(obraId:number){
    return await Excel.run(async (context)=>{
        const sheet = context.workbook.worksheets.getItem(parametros.hojasXLS.nombre.CONFIGURACION)        
        let obraid = sheet.getRange(parametros.obra.configuracion.CELDAOBRAID);
        obraid.load('values')
        await context.sync().then(()=>{
            obraid.values = [[obraId]]
            return obraid

        });
    }).catch(function (error){
        return error.debugInfo
    })
}

export async function getObraid():Promise<any>{
    return await Excel.run(async (context)=>{
         const sheet = context.workbook.worksheets.getItem(parametros.hojasXLS.nombre.CONFIGURACION)
         let obraId = sheet.getRange(parametros.obra.configuracion.CELDAOBRAID);
         obraId.load('values')
         await context.sync()
         
         return {code:obraId.values[0][0]}
          
        }).catch(function(error){
            return error.debugInfo
        })
}
export async function getFechaInicio() {
    return await Excel.run(async (context)=>{
         const sheet = context.workbook.worksheets.getItem(parametros.hojasXLS.nombre.CONFIGURACION)
         let fechaInicioContractual = sheet.getRange(parametros.obra.configuracion.FECHAINICIOCONTRACTUAL);
         fechaInicioContractual.load('values')
         await context.sync();
         return fechaInicioContractual.values[0][0] 
    })
}
export async function getDiasContractuales() {
    return await Excel.run(async (context)=>{
         const sheet = context.workbook.worksheets.getItem(parametros.hojasXLS.nombre.CONFIGURACION)
         let diasContractual = sheet.getRange(parametros.obra.configuracion.DIASCONTRACTUALES);
         diasContractual.load('values')
         await context.sync();
         
         return diasContractual.values[0][0] 
    })
}

export async function isPlanningDailyFilling(){
    return await Excel.run(async (context)=>{
        const sheet = context.workbook.worksheets.getItem(parametros.hojasXLS.nombre.PLANIFICAOBRA)        
        let obraid = sheet.getRange(parametros.obra.configuracion.CELDAOBRAID);
        obraid.load('values')
        await context.sync();
        return {code:true}
    }).catch(function (error){
        return error.debugInfo
    })
}

export interface IConfiguracionGlobal{
    ubicaciongeobrafica:{
        departamento                    :string,
        provincia                       :string,
        distrito                        :string,
        localidad                       :string,
        area_geografica                 :string
    }
    propietario:{
        etidad_contratante	            :string,
        gerente_desarrollo	            :string,
    },
    contratista:{
        representante_legal		        :string,
        ruc_operador_tributario	        :string,
        razon_social		            :string,
    },
    residente:{
        residente_nombres_apellidos     :string,			
        residente_numero_colegiatura    :string,			
    },
    supervisor:{
        supervisor_nombres_apellidos    :string,			
        supervisor_numero_colegiatura   :string,			
    },
    ejecucion:{
        obra		                    :string,
        adjudicacion_nro	            :string,	
        proceso_seleccion	            :string,	
        modalidad		                :string,
        sistema_contrato	            :string,	
        contrato_nro	                :string,	
        fecha_acta_entrega_terreno	    :string,	
        fecha_contrato		            :string,
        fecha_inicio_contractual	    :string,	
        plazo_ejecucion_contractual	    :number,
    },
    inversion:{
        valor_referencial_con_igv	    :number,
        monto_adjudicado_con_ig         :number	,
        factor_relacion	                :number,
        presupuesto_base	            :number,
        fuente_financiamiento	        :string,
        gastos_generales_porcentaje     :number,	
        utilidad_procentaje             :number,
        igv_porcentaje	                :number,
    },
    otros:{
        garantia_fiel_cumplimiento:number,
        adelanto_directo:number ,
        adelanto_materiales:number,
    }
}










