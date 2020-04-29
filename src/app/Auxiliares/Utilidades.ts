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
    GenerarConcat(ts);
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

export function GenerarConcat(ts: TablaSimbJ): void {
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
