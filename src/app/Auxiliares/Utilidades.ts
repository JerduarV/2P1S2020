import { TablaSimbJ } from '../Compilador/TSJ/TablaSimbJ';
import { concat } from 'rxjs';

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
    GenerarDoubleToString();
    GenerarCharToStrig();
    GenerarCompString(ts.temp_null);
    GenerarConsArreglo1();
    GenerarToUpperCase(ts.temp_null);
    GenerarToLowerCase(ts.temp_null);
    GenerarStringToCharArray();
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

function GenerarPrint(ts: TablaSimbJ): void {
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

function GenerarConcat(ts: TablaSimbJ): void {
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

function GenerarVoltearString(): void {
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

function GenerarIntToString(): void {

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

function GenerarDoubleToString(): void {
    //#region ETIQUETAS
    let etq_ini1: string = getEtiqueta();
    let etq_ini2: string = getEtiqueta();
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
    let t12: string = genTemp().toString();
    let t13: string = genTemp().toString();
    let t14: string = genTemp().toString();
    let t15: string = genTemp().toString();
    let t16: string = genTemp().toString();
    let t17: string = genTemp().toString();
    let t18: string = genTemp().toString();
    let t19: string = genTemp().toString();
    let tcont1: string = genTemp().toString();
    let tcont2: string = genTemp().toString();
    let tval: string = genTemp().toString();
    //#endregion

    concatCodigo('\n#*DECIMAL A STRING*#');
    concatCodigo('\nproc jerduar_DOUBLETOSTRING begin')

    //OBTENIENDO EL VALOR ENVIADO
    concatCodigo(t1 + ' = P + 1;\n' + t2 + ' = Stack[' + t1 + '];');
    concatCodigo(tval + ' = ' + t2 + ';\nif(' + tval + ' >= 0) goto ' + etq_ini1 + ';');   //VALIDO SI EL VALOR ES NEGATIVO
    concatCodigo(tval + ' = ' + tval + ' * -1;\n' + etq_ini1 + ':');

    //SEPARANDO PARTE DECIMAL Y ENTERA
    concatCodigo(t3 + ' = ' + tval + ' % 1.0; #*DECIMAL*#');
    concatCodigo(t4 + ' = ' + tval + ' - ' + t3 + ';');

    //PASO A CADENA DE LA PARTE ENTERA
    concatCodigo(t5 + ' = P + 2;\n' + t5 + ' = ' + t5 + ' + 1;\nStack[' + t5 + '] = ' + t4 + ';'); //PASO DE PARAMETRO
    concatCodigo('P = P + 2;\ncall jerduar_INTTOSTRING;\n' + t6 + ' = Stack[P];\nP = P - 2;');//LLAMADA DE LA FUNCION ENTERO A STRING

    //PASANDO A CADENA LA PARTE DECIMAL
    concatCodigo(t7 + ' = H;\n' + t8 + ' = ' + t7 + ' + 1;\nHeap[' + t8 + '] = 46;')//CREO LA CADENA E INSERTO EL PUNTO DECIMAL "46"
    concatCodigo(tcont1 + ' = 1;\n' + tcont2 + ' = 2;');
    concatCodigo(t19 + ' = ' + t3 + ' - ' + t3 + ';\n' + etq_ini2 + ':');

    //INICIA CICLO
    //concatCodigo('print("%d",' + t3 + ');');
    //concatCodigo('print("%c",10);');
    concatCodigo(t9 + ' = ' + t3 + ' * 10;');
    concatCodigo(t10 + ' = ' + t9 + ' % 1.0;\n' + t11 + ' = ' + t9 + ' - ' + t10 + ';\n' + t12 + ' = ' + t11 + ' + 48;');
    concatCodigo(t13 + ' = ' + t7 + ' + ' + tcont2 + ';\nHeap[' + t13 + '] = ' + t12 + ';');
    concatCodigo(tcont1 + ' = ' + tcont1 + ' + 1;\n' + tcont2 + ' = ' + tcont2 + ' + 1;\n' + t3 + ' = ' + t10 + ';');
    concatCodigo('if(' + t10 + ' >= 0.00000001) goto ' + etq_ini2 + ';');

    //RESERVANDO LA MEMORIA PARA LA PRIMERA VARIABLE
    concatCodigo('Heap[' + t7 + '] = ' + tcont1 + ';\nH = H + ' + tcont2 + ';');

    //SI EL VALOR TIENE UN VALOR NEGATIVO HAY QUE CONCATENAR EL SIGNO MENOS
    concatCodigo('if(' + t2 + ' >= 0) goto ' + etq_sal + ';');
    concatCodigo(t14 + ' = H;\nH = H + 2;\nHeap[' + t14 + '] = 1;\n' + t15 + ' = ' + t14 + ' + 1;');
    concatCodigo('Heap[' + t15 + '] = 45;\n' + t16 + ' = P + 3;\nStack[' + t16 + '] = ' + t14 + ';');
    concatCodigo(t16 + ' = ' + t16 + ' + 1;\nStack[' + t16 + '] = ' + t6 + ';');
    concatCodigo('P = P + 2;\ncall jerduar_CONCAT;\n' + t6 + ' = Stack[P];\nP = P - 2;\n' + etq_sal + ':');

    //CONCATENACIÓN DE LA PARTE ENTERA Y LA PARTE DECIMAL
    concatCodigo(t17 + ' = P + 3;\nStack[' + t17 + '] = ' + t6 + ';');
    concatCodigo(t17 + ' = ' + t17 + ' + 1;\nStack[' + t17 + '] = ' + t7 + ';');
    concatCodigo('P = P + 2;\ncall jerduar_CONCAT;\n' + t18 + ' = stack[P];\nP = P - 2;');

    //RETORNO DE LA NUEVA CADENA
    concatCodigo('Stack[P] = ' + t18 + ';\nend\n#*FIN DOUBLE TO STRING*#');

}

function GenerarCharToStrig(): void {
    //#region Temporales
    let t1: string = genTemp().toString();
    let t2: string = genTemp().toString();
    let t3: string = genTemp().toString();
    let t4: string = genTemp().toString();
    //#endregion

    concatCodigo('\n#*CHAR A STRING*#');
    concatCodigo('\nproc jerduar_CHARTOSTRING begin')
    concatCodigo(t3 + ' = P + 1;');
    concatCodigo(t4 + ' = Stack[' + t3 + '];');
    concatCodigo(t1 + ' = H;\nH = H + 2;\nHeap[ ' + t1 + '] = 1;\n' + t2 + ' = ' + t1 + ' + 1;');
    concatCodigo('Heap[' + t2 + '] = ' + t4 + ';\nStack[P] = ' + t1 + ';\nend\n#*FIN CHAR TO STRING*#');
}

function GenerarCompString(tnull: string): void {

    //#region TEMPORALES
    let t1: string = genTemp();
    let t2: string = genTemp();
    let t3: string = genTemp();
    let t4: string = genTemp();
    let t5: string = genTemp();
    let t6: string = genTemp();
    let t7: string = genTemp();
    let t8: string = genTemp();
    let t9: string = genTemp();
    let t10: string = genTemp();
    let tr: string = genTemp();
    //#endregion

    //#region ETIQUETAS
    let etqv1: string = getEtiqueta();
    let etqf1: string = getEtiqueta();
    let etqv2: string = getEtiqueta();
    let etqf2: string = getEtiqueta();
    let etqsv: string = getEtiqueta();
    let etqsf: string = getEtiqueta();
    let etqini: string = getEtiqueta();
    //#endregion

    //#region CODIGO
    concatCodigo('\n#*COMPARACION STRING*#');
    concatCodigo('\nproc jerduar_COMPSTRING begin');

    concatCodigo(t1 + ' = P + 1;');
    concatCodigo(t2 + ' = Stack[' + t1 + '];');
    concatCodigo(t3 + ' = P + 2;');
    concatCodigo(t4 + ' = Stack[' + t3 + '];');
    concatCodigo(tr + ' = 0;');
    concatCodigo('if(' + t2 + ' == -1) goto ' + etqv1 + ';');
    concatCodigo('goto ' + etqf1 + ';');
    concatCodigo(etqv1 + ':');
    concatCodigo(t2 + ' = ' + tnull + ';');
    concatCodigo(etqf1 + ':');
    concatCodigo('if(' + t4 + ' == -1) goto ' + etqv2 + ';');
    concatCodigo('goto ' + etqf2 + ';');
    concatCodigo(etqv2 + ':');
    concatCodigo(t4 + ' = ' + tnull + ';');
    concatCodigo(etqf2 + ':');
    concatCodigo(t5 + ' = Heap[' + t2 + '];');
    concatCodigo(t6 + ' = Heap[' + t4 + '];');
    concatCodigo('if(' + t5 + ' <> ' + t6 + ') goto ' + etqsf + ';');
    concatCodigo(t7 + ' = ' + t2 + ' + 1;');
    concatCodigo(t8 + ' = ' + t4 + ' + 1;');
    concatCodigo(etqini + ':');
    concatCodigo('if(' + t5 + ' == 0) goto ' + etqsv + ';');
    concatCodigo(t9 + ' = Heap[' + t7 + '];');
    concatCodigo(t10 + ' = Heap[' + t8 + '];');
    concatCodigo('if(' + t9 + ' <> ' + t10 + ') goto ' + etqsf + ';');
    concatCodigo(t7 + ' = ' + t7 + ' + 1;');
    concatCodigo(t8 + ' = ' + t8 + ' + 1;');
    concatCodigo(t5 + ' = ' + t5 + ' - 1;');
    concatCodigo('goto ' + etqini + ';');
    concatCodigo(etqsv + ':');
    concatCodigo(tr + ' = 1;');
    concatCodigo(etqsf + ':');
    concatCodigo('Stack[P] = ' + tr + ';');

    concatCodigo('end\n#* FIN COMPARACION STRING*#');
    //#endregion
}

function GenerarConsArreglo1(): void {
    //#region TEMPORALES
    let tx: string = genTemp();
    let ty: string = genTemp();
    let tvf: string = genTemp();
    let t1: string = genTemp();
    let t0: string = genTemp();
    //#endregion

    //#region ETIQUETAS
    let etqini: string = getEtiqueta();
    let etqsal: string = getEtiqueta();
    //#endregion

    //#region CODIGO
    concatCodigo('\n#*INSTANCIA ARREGLOS DE LA FORMA ID[E]*#');
    concatCodigo('\nproc jerduar_CONSARRAY1 begin');
    concatCodigo(tx + ' = P + 1;')
    concatCodigo(t0 + ' = Stack[' + tx + '];');
    concatCodigo(ty + ' = P + 2;');
    concatCodigo(tvf + ' = Stack[' + ty + '];');
    concatCodigo(t1 + ' = H;');
    concatCodigo('Heap[H] = ' + t0 + ';');
    concatCodigo('H = H + 1;');
    concatCodigo(etqini + ':');
    concatCodigo('if(' + t0 + ' == 0) goto ' + etqsal + ';');
    concatCodigo('Heap[H] = ' + tvf + ';');
    concatCodigo('H = H + 1;');
    concatCodigo(t0 + ' = ' + t0 + ' - 1;');
    concatCodigo('goto ' + etqini + ';');
    concatCodigo(etqsal + ':');
    concatCodigo('Stack[P] = ' + t1 + ';');
    concatCodigo('end\n#* FIN INSTANCIA ARREGLOS*#');
    //#endregion

}

function GenerarToUpperCase(temp_null: string): void {
    //#region TEMPORALES
    let t0: string = genTemp();
    let t1: string = genTemp()
    let t2: string = genTemp()
    let t3: string = genTemp()
    let t4: string = genTemp()
    let t5: string = genTemp()
    let t6: string = genTemp()
    let t9: string = genTemp()
    let t7: string = genTemp()
    let t8: string = genTemp()
    let t10: string = genTemp()
    //#endregion

    //#region ETIQUETAS
    let etq_ini: string = getEtiqueta();
    let etq_1: string = getEtiqueta();
    let etq_actu: string = getEtiqueta();
    let etq_sal: string = getEtiqueta();
    let etq_enie: string = getEtiqueta();
    let etqv: string = getEtiqueta();
    let etqf: string = getEtiqueta();

    //#endregion

    concatCodigo('\n#*STRING TO UPPER CASE*#\n');
    concatCodigo('proc jerduar_TOUPPERCASE begin\n');

    concatCodigo(t0 + ' = P + 1;');
    concatCodigo(t10 + ' = Stack[' + t0 + '];')

    concatCodigo('if(' + t10 + ' == -1) goto ' + etqv + ';');
    concatCodigo('goto ' + etqf + ';');
    concatCodigo(etqv + ':');
    concatCodigo(t10 + ' = ' + temp_null + ';');
    concatCodigo(etqf + ':');


    concatCodigo(t1 + ' = Heap[' + t10 + '];\n' + t2 + ' = 0;\n' + t3 + ' = 1;\n' + t6 + ' = H;');
    concatCodigo(t7 + ' = ' + t1 + ' + 1;\nH = H + ' + t7 + ';\nHeap[' + t6 + '] = ' + t1 + ';\n' + etq_ini + ':');
    concatCodigo('if(' + t2 + ' == ' + t1 + ') goto ' + etq_sal + ';\n' + t4 + ' = ' + t10 + ' + ' + t3 + ';');
    concatCodigo(t8 + ' = ' + t6 + ' + ' + t3 + ';\n' + t5 + ' = Heap[' + t4 + '];');

    concatCodigo('if(' + t5 + ' == 97) goto ' + etq_1 + ';#*a*#');
    concatCodigo('if(' + t5 + ' == 98) goto ' + etq_1 + ';#*b*#');
    concatCodigo('if(' + t5 + ' == 99) goto ' + etq_1 + ';#*c*#');
    concatCodigo('if(' + t5 + ' == 100) goto ' + etq_1 + ';#*d*#');
    concatCodigo('if(' + t5 + ' == 101) goto ' + etq_1 + ';#*e*#');
    concatCodigo('if(' + t5 + ' == 102) goto ' + etq_1 + ';#*f*#');
    concatCodigo('if(' + t5 + ' == 103) goto ' + etq_1 + ';#*g*#');
    concatCodigo('if(' + t5 + ' == 104) goto ' + etq_1 + ';#*h*#');
    concatCodigo('if(' + t5 + ' == 105) goto ' + etq_1 + ';#*i*#');
    concatCodigo('if(' + t5 + ' == 106) goto ' + etq_1 + ';#*j*#');
    concatCodigo('if(' + t5 + ' == 107) goto ' + etq_1 + ';#*k*#');
    concatCodigo('if(' + t5 + ' == 108) goto ' + etq_1 + ';#*l*#');
    concatCodigo('if(' + t5 + ' == 109) goto ' + etq_1 + ';#*m*#');
    concatCodigo('if(' + t5 + ' == 110) goto ' + etq_1 + ';#*n*#');
    concatCodigo('if(' + t5 + ' == 111) goto ' + etq_1 + ';#*o*#');
    concatCodigo('if(' + t5 + ' == 112) goto ' + etq_1 + ';#*p*#');
    concatCodigo('if(' + t5 + ' == 113) goto ' + etq_1 + ';#*q*#');
    concatCodigo('if(' + t5 + ' == 114) goto ' + etq_1 + ';#*r*#');
    concatCodigo('if(' + t5 + ' == 115) goto ' + etq_1 + ';#*s*#');
    concatCodigo('if(' + t5 + ' == 116) goto ' + etq_1 + ';#*t*#');
    concatCodigo('if(' + t5 + ' == 117) goto ' + etq_1 + ';#*u*#');
    concatCodigo('if(' + t5 + ' == 118) goto ' + etq_1 + ';#*v*#');
    concatCodigo('if(' + t5 + ' == 119) goto ' + etq_1 + ';#*w*#');
    concatCodigo('if(' + t5 + ' == 120) goto ' + etq_1 + ';#*x*#');
    concatCodigo('if(' + t5 + ' == 121) goto ' + etq_1 + ';#*y*#');
    concatCodigo('if(' + t5 + ' == 122) goto ' + etq_1 + ';#*z*#');
    concatCodigo('if(' + t5 + ' == 241) goto ' + etq_enie + ';#*ñ*#');

    concatCodigo('Heap[' + t8 + '] = ' + t5 + ';\ngoto ' + etq_actu + ';');

    concatCodigo(etq_1 + ':\n' + t9 + ' = ' + t5 + ' - 32;\nHeap[' + t8 + '] = ' + t9 + ';\ngoto ' + etq_actu + ';');

    concatCodigo(etq_enie + ':\nHeap[' + t8 + '] = 209;\n' + etq_actu + ':');

    concatCodigo(t2 + ' = ' + t2 + ' + 1;\n' + t3 + ' = ' + t3 + ' + 1;\ngoto ' + etq_ini + ';');
    concatCodigo(etq_sal + ':\nStack[P] = ' + t6 + ';');
    concatCodigo('\nend\n#*FIN STRING UPPERCASE*#\n');

}

function GenerarToLowerCase(temp_null: string): void {
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
    let t0: string = genTemp().toString();
    let t10: string = genTemp().toString();
    //#endregion

    //#region ETIQUETAS
    let etq_ini: string = getEtiqueta();
    let etq_1: string = getEtiqueta();
    let etq_actu: string = getEtiqueta();
    let etq_sal: string = getEtiqueta();
    let etq_enie: string = getEtiqueta();
    let etqv: string = getEtiqueta();
    let etqf: string = getEtiqueta();

    //#endregion

    concatCodigo('\n#*STRING TO LOWER CASE*#\n');
    concatCodigo('proc jerduar_TOLOWERCASE begin\n');

    concatCodigo(t0 + ' = P + 1;');
    concatCodigo(t10 + ' = Stack[' + t0 + '];')

    concatCodigo('if(' + t10 + ' == -1) goto ' + etqv + ';');
    concatCodigo('goto ' + etqf + ';');
    concatCodigo(etqv + ':');
    concatCodigo(t10 + ' = ' + temp_null + ';');
    concatCodigo(etqf + ':');

    concatCodigo(t1 + ' = Heap[' + t10 + '];\n' + t2 + ' = 0;\n' + t3 + ' = 1;\n' + t6 + ' = H;');
    concatCodigo(t7 + ' = ' + t1 + ' + 1;\nH = H + ' + t7 + ';\nHeap[' + t6 + '] = ' + t1 + ';\n' + etq_ini + ':');
    concatCodigo('if(' + t2 + ' == ' + t1 + ') goto ' + etq_sal + ';\n' + t4 + ' = ' + t10 + ' + ' + t3 + ';');
    concatCodigo(t8 + ' = ' + t6 + ' + ' + t3 + ';\n' + t5 + ' = Heap[' + t4 + '];');

    concatCodigo('if(' + t5 + ' == 65) goto ' + etq_1 + ';#*A*#');
    concatCodigo('if(' + t5 + ' == 66) goto ' + etq_1 + ';#*B*#');
    concatCodigo('if(' + t5 + ' == 67) goto ' + etq_1 + ';#*C*#');
    concatCodigo('if(' + t5 + ' == 68) goto ' + etq_1 + ';#*D*#');
    concatCodigo('if(' + t5 + ' == 69) goto ' + etq_1 + ';#*E*#');
    concatCodigo('if(' + t5 + ' == 70) goto ' + etq_1 + ';#*F*#');
    concatCodigo('if(' + t5 + ' == 71) goto ' + etq_1 + ';#*G*#');
    concatCodigo('if(' + t5 + ' == 72) goto ' + etq_1 + ';#*H*#');
    concatCodigo('if(' + t5 + ' == 73) goto ' + etq_1 + ';#*I*#');
    concatCodigo('if(' + t5 + ' == 74) goto ' + etq_1 + ';#*J*#');
    concatCodigo('if(' + t5 + ' == 75) goto ' + etq_1 + ';#*K*#');
    concatCodigo('if(' + t5 + ' == 76) goto ' + etq_1 + ';#*L*#');
    concatCodigo('if(' + t5 + ' == 77) goto ' + etq_1 + ';#*M*#');
    concatCodigo('if(' + t5 + ' == 78) goto ' + etq_1 + ';#*N*#');
    concatCodigo('if(' + t5 + ' == 79) goto ' + etq_1 + ';#*O*#');
    concatCodigo('if(' + t5 + ' == 80) goto ' + etq_1 + ';#*P*#');
    concatCodigo('if(' + t5 + ' == 81) goto ' + etq_1 + ';#*Q*#');
    concatCodigo('if(' + t5 + ' == 82) goto ' + etq_1 + ';#*R*#');
    concatCodigo('if(' + t5 + ' == 83) goto ' + etq_1 + ';#*S*#');
    concatCodigo('if(' + t5 + ' == 84) goto ' + etq_1 + ';#*T*#');
    concatCodigo('if(' + t5 + ' == 85) goto ' + etq_1 + ';#*U*#');
    concatCodigo('if(' + t5 + ' == 86) goto ' + etq_1 + ';#*V*#');
    concatCodigo('if(' + t5 + ' == 87) goto ' + etq_1 + ';#*W*#');
    concatCodigo('if(' + t5 + ' == 88) goto ' + etq_1 + ';#*X*#');
    concatCodigo('if(' + t5 + ' == 89) goto ' + etq_1 + ';#*Y*#');
    concatCodigo('if(' + t5 + ' == 90) goto ' + etq_1 + ';#*Z*#');
    concatCodigo('if(' + t5 + ' == 209) goto ' + etq_enie + ';#*Ñ*#');

    concatCodigo('Heap[' + t8 + '] = ' + t5 + ';\ngoto ' + etq_actu + ';');

    concatCodigo(etq_1 + ':\n' + t9 + ' = ' + t5 + ' + 32;\nHeap[' + t8 + '] = ' + t9 + ';\ngoto ' + etq_actu + ';');

    concatCodigo(etq_enie + ':\nHeap[' + t8 + '] = 241;\n' + etq_actu + ':');

    concatCodigo(t2 + ' = ' + t2 + ' + 1;\n' + t3 + ' = ' + t3 + ' + 1;\ngoto ' + etq_ini + ';');
    concatCodigo(etq_sal + ':\nStack[P] = ' + t6 + ';');
    concatCodigo('\nend\n#*FIN STRING LOWERCASE*#\n');
}

function GenerarStringToCharArray(){
    //#region TEMPORALES
    let t1: string = genTemp().toString();
    let t2: string = genTemp().toString();
    let t3: string = genTemp().toString();
    let t4: string = genTemp().toString();
    let t5: string = genTemp().toString();
    let t6: string = genTemp().toString();
    //#endregion

    //#region ETIQUETAS
    let etq_ini: string = getEtiqueta();
    let etq_sal: string = getEtiqueta();
    //#endregion

    concatCodigo('#* STRING TO CHAR ARRAY *#');
    concatCodigo('proc jerduar_STRINGTOCHARARRAY begin');

    concatCodigo(t1 + ' = P + 1;');
    concatCodigo(t2 + ' = Stack[' + t1 + '];');
    concatCodigo(t3 + ' = Heap[' + t2 + '];');
    concatCodigo(t4 + ' = ' + t2 + ' + 1;');
    concatCodigo(t5 + ' = H;');
    concatCodigo('Heap[H] = ' + t3 + ';');
    concatCodigo('H = H + 1;');
    concatCodigo(etq_ini + ':');
    concatCodigo('if(' + t3 + ' == 0) goto ' + etq_sal + ';');
    concatCodigo(t6 + ' = Heap[' + t4 + '];');
    concatCodigo('Heap[H] = ' + t6 + ';');
    concatCodigo('H = H + 1;');
    concatCodigo(t4 + ' = ' + t4 + ' + 1;');
    concatCodigo(t3 + ' = ' + t3 + ' - 1;');
    concatCodigo('goto ' + etq_ini + ';');
    concatCodigo(etq_sal + ':');
    concatCodigo('Stack[P] = ' + t5 + ';');

    concatCodigo('\nend\n#*FIN TO CHAR ARRAY*#\n');
}