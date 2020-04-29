import { TablaSimbJ } from '../Compilador/TSJ/TablaSimbJ';

let contador_etq: number = 0;
let contador_tempo: number = 0;
let temAct = 0;
let codigo_gen: string = '';

export function genTemp(): string {
    temAct = contador_tempo;
    return 't' + contador_tempo++;
}

export function getTempAct(): string {
    return 't' + temAct;
}

export function getEtiqueta(): string {
    return 'L' + contador_etq++;
}

export function concatCodigo(cod: string): void {
    codigo_gen += cod + '\n';
}

export function inicializarTodo(): void {
    contador_etq = 0;
    contador_tempo = 0;
    temAct = 0;
    codigo_gen = '';
}

export function GenerarEncabezado(): void {
    let dec: string = '';
    for (let i = 0; i < contador_tempo; i++) {
        dec += "var t" + i + ";";
    }
    dec += "var P,H;\nvar Heap[];\nvar Stack[];";
    codigo_gen = dec + '\n\n' + codigo_gen;
}

export function ImprimitCodigo(): string {
    //console.log(codigo_gen);
    return codigo_gen;
}

export function QuemarFunciones(ts: TablaSimbJ): void {
    GenerarPotencia();
    GenerarPrint(ts);
    GenerarConcat(ts);
    GenerarVoltearString();
    GenerarIntToString();
}


/**
 * Escribe la función de pontencia
 */
export function GenerarPotencia(): void {
    let t1: string = genTemp(),
        t2: string = genTemp(),
        t3: string = genTemp(),
        t4: string = genTemp(),
        t5: string = genTemp(),
        t6: string = genTemp(),
        t7: string = genTemp();

    let etqini: string = getEtiqueta(),
        etqv: string = getEtiqueta(),
        etqv1: string = getEtiqueta(),
        etqv2: string = getEtiqueta(),
        etqf: string = getEtiqueta();

    concatCodigo('\n#* FUNCIÓN DE PONTENCIA *#')
    concatCodigo('proc jerduar_POTENCIA begin')
    concatCodigo(t1 + ' = P + 1;');
    concatCodigo(t2 + ' = Stack[' + t1 + '];');
    concatCodigo(t3 + ' = P + 2;')
    concatCodigo(t4 + ' = Stack[' + t3 + '];');
    concatCodigo(t5 + ' = 1;\n' + t6 + ' = -1;\n' + t7 + ' = ' + t4 + ';');
    concatCodigo('if(' + t4 + ' >= 0) goto ' + etqv1 + ';');
    concatCodigo(t6 + ' = 1;\n' + etqv1 + ':');
    concatCodigo(etqini + ':');
    concatCodigo('if(' + t4 + ' <> 0) goto ' + etqv + ';\ngoto ' + etqf + ';');
    concatCodigo(etqv + ':');
    concatCodigo(t5 + ' = ' + t5 + ' * ' + t2 + ';');
    concatCodigo(t4 + ' = ' + t4 + ' + ' + t6 + ';');
    concatCodigo('goto ' + etqini + ';');
    concatCodigo(etqf + ':');
    concatCodigo('if(' + t7 + ' >= 0) goto ' + etqv2 + ';');
    concatCodigo(t5 + ' = 1 / ' + t5 + ';');
    concatCodigo(etqv2 + ':');
    concatCodigo('Stack[P] = ' + t5 + ';');
    concatCodigo('\nend\n');
}

export function GenerarPrint(ts: TablaSimbJ): void {
    let t1: string = genTemp(),
        t2: string = genTemp(),
        t3: string = genTemp(),
        t4: string = genTemp(),
        t5: string = genTemp();

    let etq1: string = getEtiqueta(),
        etq2: string = getEtiqueta(),
        etq_ini: string = getEtiqueta(),
        etq_sal: string = getEtiqueta();

    concatCodigo('\n#* FUNCION PARA IMPRIMIR CADENA *#')
    concatCodigo('proc jerduar_PRINT begin')
    concatCodigo(t1 + ' = P + 1;');
    concatCodigo(t2 + ' = Stack[' + t1 + '];');
    concatCodigo('if(' + t2 + ' == -1) goto ' + etq1 + ';');
    concatCodigo('goto ' + etq2 + ';');
    concatCodigo(etq1 + ':');
    concatCodigo(t2 + ' = ' + ts.temp_null + ';');
    concatCodigo(etq2 + ':');
    concatCodigo(t3 + ' = Heap[' + t2 + '];');
    concatCodigo(t4 + ' = ' + t2 + '  + 1;');
    concatCodigo(etq_ini + ':');
    concatCodigo('if(' + t3 + ' == 0) goto ' + etq_sal + ';');
    concatCodigo(t5 + ' = Heap[' + t4 + '];');
    concatCodigo('print("%c",' + t5 + ');');
    concatCodigo(t4 + ' = ' + t4 + ' + 1;');
    concatCodigo(t3 + ' = ' + t3 + ' - 1;');
    concatCodigo('goto ' + etq_ini + ';');
    concatCodigo(etq_sal + ':');
    concatCodigo('print("%c",10);');
    concatCodigo('\nend\n');
}

export function GenerarConcat(ts: TablaSimbJ): void {
    //#region Etiquetas
    let etq_ini1: string = getEtiqueta();
    let etq_ini2: string = getEtiqueta();
    let etq_sal1: string = getEtiqueta();
    let etq_sal2: string = getEtiqueta();
    let etq_v: string = getEtiqueta();
    let etq_f: string = getEtiqueta();
    let etq_v1: string = getEtiqueta();
    let etq_f1: string = getEtiqueta();
    //#endregion

    //#region temporales
    let t1: string = genTemp().toString();
    let t2: string = genTemp().toString();
    let t3: string = genTemp().toString();
    let t4: string = genTemp().toString();
    let t100: string = genTemp().toString();
    let t101: string = genTemp().toString();
    let t5: string = genTemp().toString();
    let t6: string = genTemp().toString();
    let t7: string = genTemp().toString();
    let t8: string = genTemp().toString();
    let t9: string = genTemp().toString();
    let t10: string = genTemp().toString();
    let t11: string = genTemp().toString();
    let t12: string = genTemp().toString();
    let t13: string = genTemp().toString();
    let t15: string = genTemp().toString();
    //#endregion

    concatCodigo('\n#* CONCATENACION *#');
    concatCodigo('\nproc jerduar_CONCAT begin');

    //#region OBTENCION DE LAS CADENAS
    concatCodigo(t1 + ' = P + 1;');
    concatCodigo(t2 + ' = Stack[' + t1 + '];\n' + t3 + ' = P + 2;\n' + t4 + ' = Stack[' + t3 + '];');
    //#endregion

    //#region VALIDACIÓN DE NULOS
    concatCodigo('if(' + t2 + ' == -1) goto ' + etq_v + ';')
    concatCodigo('goto ' + etq_f + ';');
    concatCodigo(etq_v + ':');
    concatCodigo(t2 + ' = ' + ts.temp_null + ';');
    concatCodigo(etq_f + ':');

    concatCodigo('if(' + t4 + ' == -1) goto ' + etq_v1 + ';')
    concatCodigo('goto ' + etq_f1 + ';');
    concatCodigo(etq_v1 + ':');
    concatCodigo(t4 + ' = ' + ts.temp_null + ';');
    concatCodigo(etq_f1 + ':');
    //#endregion

    //#region INICILIZACION DE NUEVA CADENA
    concatCodigo(t100 + ' = Heap[' + t2 + '];\n' + t101 + ' = Heap[' + t4 + '];\n' + t5 + ' = ' + t100 + ' + ' + t101 + ';');
    concatCodigo(t6 + ' = ' + t5 + ' + 1;');
    concatCodigo(t7 + ' = H;\nH = H + ' + t6 + ';\nHeap[' + t7 + '] = ' + t5 + ';');
    //#endregion

    //#region RECORRIDO CADENA 1
    concatCodigo(t8 + ' = 1;\n' + etq_ini1 + ':\n' + 'if(' + t8 + ' > ' + t100 + ') goto ' + etq_sal1 + ';');
    concatCodigo(t9 + ' = ' + t2 + ' + ' + t8 + ';\n' + t10 + ' = Heap[' + t9 + '];');
    concatCodigo(t11 + ' = ' + t7 + ' + ' + t8 + ';\nHeap[' + t11 + '] = ' + t10 + ';'); //ASIGNACION A LA NUEVA CADENA
    concatCodigo(t8 + ' = ' + t8 + ' + 1;\ngoto ' + etq_ini1 + ';\n' + etq_sal1 + ':');
    //#endregion

    //#region RECORRIDO CADENA 2
    concatCodigo(t15 + ' = ' + t8 + ' + ' + t7 + ';\n' + t8 + ' = 1;\n' + etq_ini2 + ':');
    concatCodigo('if(' + t8 + ' > ' + t101 + ') goto ' + etq_sal2 + ';');
    concatCodigo(t12 + ' = ' + t4 + ' + ' + t8 + ';\n' + t13 + ' = Heap[' + t12 + '];\nHeap[' + t15 + '] = ' + t13 + ';');
    concatCodigo(t15 + ' = ' + t15 + ' + 1;\n' + t8 + ' = ' + t8 + ' + 1;\ngoto ' + etq_ini2 + ';\n' + etq_sal2 + ':');
    //#endregion

    concatCodigo('Stack[P] = ' + t7 + ';\nend\n#*FIN CONCAT*#\n');
}

export function GenerarVoltearString(): void {
    //#region Etiquetas
    let etq_ini: string = getEtiqueta();
    let etq_sal: string = getEtiqueta();
    //#endregion

    //#region TEMPORALES
    let t1: string = genTemp().toString();
    let t2: string = genTemp().toString();
    let t3: string = genTemp().toString();
    let t4: string = genTemp().toString();
    let t5: string = genTemp().toString();
    let t6: string = genTemp().toString();
    let t7: string = genTemp().toString();
    let t8: string = genTemp().toString();
    let t9: string = genTemp().toString();
    let t10: string = genTemp().toString();
    let t11: string = genTemp().toString();
    //#endregion

    concatCodigo('\n#*VOLTEAR CADENA*#');
    concatCodigo('\nproc jerduar_VOLTEARSTRING begin');

    //OBTENIENDO LA CADENA
    concatCodigo(t1 + ' = P +  1;\n' + t2 + ' = Stack[' + t1 + '];');
    concatCodigo(t3 + ' = Heap[' + t2 + '];\n' + t4 + ' = ' + t3 + ' + 1;\n' + t5 + ' = H;');

    //RESERVA DE MEMORIA PARA LA NUEVA CADENA
    concatCodigo('H = H + ' + t4 + ';\nHeap[' + t5 + '] = ' + t3 + ';\n' + t6 + ' = ' + t2 + ' + ' + t3 + ';');
    concatCodigo(t7 + ' = 1;\n' + etq_ini + ':');

    //INICIANDO EL CICLO
    concatCodigo('if(' + t6 + ' == ' + t2 + ') goto ' + etq_sal + ';');
    concatCodigo(t8 + ' = Heap[' + t6 + '];\n' + t9 + ' = ' + t5 + ' + ' + t7 + ';');
    concatCodigo('Heap[' + t9 + '] = ' + t8 + ';\n' + t6 + ' = ' + t6 + ' - 1;');
    concatCodigo(t7 + ' = ' + t7 + ' + 1;\ngoto ' + etq_ini + ';\n' + etq_sal + ':');

    //RETORNANDO LA NUEVA CADENA
    concatCodigo('Stack[P] = ' + t5 + ';');

    concatCodigo('end\n#*FIN VOLTEAR CADENA*#\n');
}

export function GenerarIntToString(): void {

    //#region ETIQUETAS
    let etq_ini: string = getEtiqueta();
    let etq_sal: string = getEtiqueta();
    //#endregion

    //#region TEMPORALES
    let t1: string = genTemp().toString();
    let t2: string = genTemp().toString();
    let t3: string = genTemp().toString();
    let t4: string = genTemp().toString();
    let t5: string = genTemp().toString();
    let t6: string = genTemp().toString();
    let t7: string = genTemp().toString();
    let t8: string = genTemp().toString();
    let t9: string = genTemp().toString();
    let tdiv: string = genTemp().toString();
    let tmd: string = genTemp().toString();
    let tcont: string = genTemp().toString();
    let tvalor: string = genTemp().toString();
    //#endregion
    concatCodigo('\n#* INT TO STRING *#');
    concatCodigo('\nproc jerduar_INTTOSTRING begin');
    //OBTENIENDO EL VALOR DEL ENTERO
    concatCodigo(t1 + ' = P + 1;\n' + t2 + ' = Stack[' + t1 + '];');

    //INICIALIZANDO CONTADOR, MODULO, VALOR Y DIV
    concatCodigo(tdiv + ' = 1;#*DIV*#\n' + tmd + ' = 10;#*MOD*#\n' + tcont + ' = 1;#*CONT*#\n' + tvalor + ' = ' + t2 + ';#*VALOR*#');

    //SI EL VALOR ES NEGATIVO SE PASA A POSITIVO
    concatCodigo('if( ' + tvalor + ' >= 0) goto ' + etq_ini + ';');
    concatCodigo(tvalor + ' = ' + tvalor + ' * - 1;\n' + etq_ini + ':');

    //INICIA EL CICLO
    concatCodigo(t3 + ' = ' + tvalor + ' % ' + tmd + ';\n' + t4 + ' = ' + t3 + ' / ' + tdiv + ';');
    concatCodigo(t5 + ' = ' + t4 + ' + 48;\n' + t6 + ' = H + ' + tcont + ';\nHeap[' + t6 + '] = ' + t5 + ';');
    concatCodigo(tdiv + ' = ' + tdiv + ' * 10;\n' + tmd + ' = ' + tmd + ' * 10;\n' + tvalor + ' = ' + tvalor + ' - ' + t3 + ';');
    concatCodigo(tcont + ' = ' + tcont + ' + 1;\nif( ' + tvalor + ' <> 0) goto ' + etq_ini + ';');

    //VALIDO SI EL NUMERO ERA MENOR LE AGREGO EL SIGNO MENOS
    concatCodigo('if(' + t2 + ' >= 0) goto ' + etq_sal + ';');
    concatCodigo(t6 + ' = H + ' + tcont + ';\nHeap[' + t6 + '] = 45;\n' + tcont + ' = ' + tcont + ' + 1;\n' + etq_sal + ':');

    //ACTUALIZANDO EL HEAP
    concatCodigo(tcont + ' = ' + tcont + ' - 1;');
    concatCodigo('Heap[H] = ' + tcont + ';\n' + t7 + ' = H;');
    concatCodigo(tcont + ' = ' + tcont + ' + 1;');
    concatCodigo('H = H + ' + tcont + ';');


    //VOLTEANDO LA CADENA
    concatCodigo(t8 + ' = P + 2;');
    concatCodigo(t8 + ' = ' + t8 + ' + 1;');
    concatCodigo('Stack[' + t8 + '] = ' + t7 + ';');
    concatCodigo('P = P + 2;');
    concatCodigo('call jerduar_VOLTEARSTRING;');
    concatCodigo(t9 + ' = Stack[P];');
    concatCodigo('P = P - 2;');

    //RETORNANDO LA REFERENCIA
    concatCodigo('stack[P] = ' + t9 + ';');

    concatCodigo('end\n#*FIN DE IntToString*#\n');

}
