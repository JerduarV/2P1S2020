import { ExpresionJ } from './ExpresionJ';
import { Tipo, getTipoString, getTipoDouble, getTipoInteger, STRING, DOUBLE, INT } from '../TSJ/Tipo';
import { ErrorLup } from 'src/app/Auxiliares/Error';
import { getTempAct, concatCodigo, genTemp, getIdNodo, conectarNodo } from 'src/app/Auxiliares/Utilidades';

export class ArrayInit extends ExpresionJ {

    private readonly lista_exp: ExpresionJ[];

    constructor(lista: ExpresionJ[], fila: number, col: number) {
        super(fila, col);
        this.lista_exp = lista;
    }

    public getTipo(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): Object {

        //VERIFICO SI HAY UN ERROR EN LAS EXPRESIONES
        let lista_tipos: Tipo[] = [];
        for (let i = 0; i < this.lista_exp.length; i++) {
            let o: Object = this.lista_exp[i].getTipo(ts);
            if (o instanceof ErrorLup) {
                return ts.GenerarError('Hubo un error en la lista de elementos', this.getFila(), this.getCol());
            }
            lista_tipos.push(<Tipo>o);
        }

        //#region CASO TODO LOS TIPOS IGUALES
        if (this.TiposIguales(lista_tipos)) {
            return new Tipo(lista_tipos[0].getNombreTipo(), 1);
        }
        //#endregion

        //#region CASTEOS CON NATIVOS
        //OBJETO
        let tipo_strc: Tipo = this.getTipoObjeto(lista_tipos);
        if(tipo_strc != null){
            if(this.AplicaCasteo(tipo_strc, lista_tipos)){
                return tipo_strc;
            }
        }

        //STRING
        if (this.TieneTipoX(lista_tipos, getTipoString()) && this.AplicaCasteo(getTipoString(), lista_tipos)) {
            return new Tipo(STRING, 1);
        }

        //DOUBLE
        if (this.TieneTipoX(lista_tipos, getTipoDouble()) && this.AplicaCasteo(getTipoDouble(), lista_tipos)) {
            return new Tipo(DOUBLE, 1);
        }

        //INT
        if (this.TieneTipoX(lista_tipos, getTipoInteger()) && this.AplicaCasteo(getTipoInteger(), lista_tipos)) {
            return new Tipo(INT, 1);
        }

        //#endregion

        return ts.GenerarError('El arreglo no es homogeno',this.getFila(),this.getCol());
    }

    public Traducir(ts: import("../TSJ/TablaSimbJ").TablaSimbJ): void {
        let lista_temp: string[] = [];

        this.lista_exp.forEach(exp => {
            exp.Traducir(ts);
            let t: string = getTempAct();
            lista_temp.push(t);
        });

        let tinicio: string = genTemp();
        concatCodigo(tinicio + ' = H;');
        concatCodigo('Heap[H] = ' + lista_temp.length + ';');
        concatCodigo('H = H + 1;');
        
        lista_temp.forEach(temp => {
            concatCodigo('Heap[H] = ' + temp + ';');
            concatCodigo('H = H + 1;');
        });

        ts.guardarTemporal(tinicio);
        lista_temp.forEach(temp => {
            ts.SacarTemporal(temp);
        });
    }

    public AplicaCasteo(t: Tipo, lista: Tipo[]): boolean {
        for (let i = 0; i < lista.length; i++) {
            if (!t.AplicaCasteo(lista[i]) && !t.esIgualA(lista[i])) {
                return false;
            }
        }
        return true;
    }

    /**
     * Función que verifica si todas los elementos tienen el mismo tipo
     * @param lista_tipo Lista de tipos de las expresiones
     */
    public TiposIguales(lista_tipo: Tipo[]): boolean {
        let t: Tipo = lista_tipo[0];
        for (let i = 0; i < lista_tipo.length; i++) {
            if (!t.esIgualA(lista_tipo[i])) {
                return false;
            }
        }
        return true;
    }

    /**
     * Retorna si existe en la lista de tipos un tipo dado
     * @param lista_tipo Lista de tipos
     * @param t Tipo que se busca
     */
    public TieneTipoX(lista_tipo: Tipo[], t: Tipo): boolean {
        for (let i = 0; i < lista_tipo.length; i++) {
            if (t.esIgualA(lista_tipo[i])) {
                //console.log('si tiene');
                return true;
            }
        }
        //console.log('no tiene' + t.getString());
        return false;
    }

    private getTipoObjeto(lista_tipo: Tipo[]): Tipo{
        for(let i= 0; i < lista_tipo.length; i++){
            if(lista_tipo[i].esStruct()){
                return lista_tipo[i]
            }
        }
        return null;
    }

    public dibujar(padre: string): void {
        let n: string = getIdNodo('ARRAY_INIT');
        conectarNodo(padre, n);
        let lexp: string = getIdNodo('L_EXP');
        conectarNodo(n, lexp);
        this.lista_exp.forEach(exp => {
            exp.dibujar(lexp);
        });
    }

}