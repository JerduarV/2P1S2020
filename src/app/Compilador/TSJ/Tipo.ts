export function getTipoString():Tipo{
    return new Tipo('STRING',0);
}

export function getTipoDouble():Tipo{
    return new Tipo('DOUBLE',0);
}

export function getTipoBool():Tipo{
    return new Tipo('BOOL',0)
}

export class Tipo{
    private readonly tipo: string;
    private readonly dim: number;

    constructor(t: string, dim: number){
        this.tipo = t.toUpperCase();
        this.dim = dim;
    }

    public isVar():boolean{
        return this.tipo == '$VAR';
    }

    public isInteger():boolean{
        return this.tipo == 'INT' && this.dim == 0;
    }

    public isDouble():boolean{
        return this.tipo == 'DOUBLE' && this.dim == 0;
    }

    public isBoolean():boolean{
        return this.tipo == 'BOOL' && this.dim == 0;
    }

    public isChar():boolean{
        return this.tipo == 'CHAR' && this.dim == 0;
    }

    public isString():boolean{
        return this.tipo == 'STRING' && this.dim == 0;
    }

    public esIgualA(t: Tipo):boolean{
        return this.tipo == t.tipo && this.dim == t.dim;
        
    }

    public getValDefecto():string{
        if(this.isBoolean() || this.isInteger() || this.isChar()){
            return '0';
        }
        if(this.isDouble()){
            return '0.0';
        }
        return '-1';
    }

    public isNumerico():boolean{
        return this.isInteger() || this.isDouble();
    }

    public getString():string{
        return this.tipo + (this.dim > 0 ? '[]' : '');
    }

    public soyArreglo():boolean{
        return this.dim > 0;
    }

    public getNombreTipo():string{
        if(this.dim > 0){
            return this.tipo + 'Array';
        }
        return this.tipo;
    }

    public esNativo():boolean{
        return this.tipo == 'INT' || this.tipo == 'BOOL' || this.tipo == 'CHAR' || this.tipo == 'DOUBLE' || this.tipo == '$VOID' || this.tipo == 'STRING';
    }
}