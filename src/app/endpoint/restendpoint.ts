export const restendpoint = {
    base:'https://192.168.1.86:3033/',
    usuario:{
        lista:'usuario/lista',
        login:'auth/login',
        register:'auth/register'
    },
    obra:{
        crea:'obra/crea',
        descargarplantilla:'obra/descargaplantilla',
        listbyuser:'obra/listbyuser',
        buscaobrabyId:'obra/buscaobrabyId'
    },
    valorizacion:{
        
        lista:'valorizacion/lista',
        listabyobraid:'valorizacion/listabyobraid',
        generavalorizacionxls:'valorizacion/generavalorizacionxls',
        generacalculovalorizacion:'valorizacion/generacalculovalorizacion',
        generaseparadoresconindice:'valorizacion/generaseparadoresconindice',
        descargaseparadores:'valorizacion/descargaseparadores',
        descargaconsolidado:'valorizacion/descargaconsolidado'
        
    },
    panelfotografico:{
        listafotos:'panelfotografico/listafotos',
        creafoto:'panelfotografico/creafoto',
        listabyfilename:'panelfotografico/pictures',
        listabyid:'panelfotografico',
        deletebyid:'panelfotografico',
        actualizabyid:'panelfotografico',
        generapanelfotografico:'panelfotografico/generapanelfotografico',
        findValoIdByObraIdAndValoSeleccionada:'panelfotografico/findValoIdByObraIdAndValoSeleccionada',
        listafotosbyidvalorizacion:'panelfotografico/listafotosbyidvalorizacion'
    },
    antesedentesfotograficos:{
        listaAntesedentesFotograficosByPanelFotograficoId:'antesedentesfotograficos/listaAntesedentesFotograficosByPanelFotograficoId',
        insertantesedente:'antesedentesfotograficos/insertantesedente',
        listabyUsuarioObraValorizacion:'/antesedentesfotograficos/pictures'
    }
    
}