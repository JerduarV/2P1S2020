/* description: Parses end executes mathematical expressions. */


/* lexical grammar */
%lex
%options ranges case-insensitive

%s                      comment
%s                      string


%%

"#".*                  /* skip comments */
"#*"                    this.begin('comment');
<comment>"*#"           this.popState();
<comment>.              /* skip comment content */

["]                                     this.begin('string');
<string>[[%][d]]|[[%][c]|[%][i]]        return 'CAD';
<string>["]                             this.popState();


\s+                     /* skip whitespace */

/* RESERVADAS */
"var"                   return  'RVAR'
"goto"                  return  'RGOTO'
"if"                    return  'RIF'
"proc"                  return  'RPROC'
"begin"                 return  'RBEGIN'
"end"                   return  'REND'
"call"                  return  'RCALL'
"print"                 return  'RPRINT'
"heap"                  return  'RHEAP'
"stack"                 return  'RSTACK'

/* EXPRESIONES REGULARES */
[0-9]+("."[0-9]+)?\b    return  'NUMBER'
[a-zA-Z_ñ]([a-zA-Z0-9_Ñ]*)    return  'ID'


/* OPERADORES ARITMETICOS */
"*"                     return  'POR'
"/"                     return  'DIV'
"-"                     return  'MENOS'
"+"                     return  'MAS'

/* OPERADORES RELACIONALES */
'>='                    return  'MAYORIGUAL'
"<="                    return  'MENORIGUAL'
"=="                    return  'IGUALQUE'
"<"                     return  'MENOR'
">"                     return  'MAYOR'
"!="                    return  'DIFERENTE'
"="                     return  'IGUAL'

/* AGRUPADORES */
"("                     return  'PARIZQ'
")"                     return  'PARDER'
"["                     return  'CORIZQ'
"]"                     return  'CORDER'

/* PUNTUACION */
";"                     return  'PTCOMA'
":"                     return  'DOSPT'
","                     return  'COMA'

<<EOF>>                 return  'EOF'
.                       return  'INVALID'


/lex


/* operator associations and precedence */

%left UMINUS

%{
   var Declaracion = require('../app/Interprete3D/Instruccion/Declaracion').Declaracion;
   var AccesoHeap = require('../app/Interprete3D/Expresion/AccesoHeap').AccesoHeap;
   var AccesoStack = require('../app/Interprete3D/Expresion/AccesoStack').AccesoStack;
   var Operacion = require('../app/Interprete3D/Expresion/Operacion').Operacion;
   var TipoOpe = require('../app/Interprete3D/Expresion/Operacion').TipoOpe;
   var Identificador = require('../app/Interprete3D/Expresion/Identificador').Identificador;
   var Literal = require('../app/Interprete3D/Expresion/Literal').Literal;
   var Print = require('../app/Interprete3D/Instruccion/Print').Print;
   var Direccion = require('../app/Interprete3D/Instruccion/Direccion').Direccion;
   var Asignacion = require('../app/Interprete3D/Instruccion/Asignacion').Asignacion;
   var SetHeap = require('../app/Interprete3D/Instruccion/SetHeap').SetHeap;
   var SetStack = require('../app/Interprete3D/Instruccion/SetStack').SetStack;
   var SaltoIC = require('../app/Interprete3D/Instruccion/SaltoIC').SaltoIC;
   var SaltoCond = require('../app/Interprete3D/Instruccion/SaltoCond').SaltoCond;
   var DecFuncion = require('../app/Interprete3D/Instruccion/DecFuncion').DecFuncion;
   var CallFun = require('../app/Interprete3D/Instruccion/CallFun').CallFun;
%}

%start INI

%% /* language grammar */

INI: 
        LISTA_SENT EOF          { return $$; }     
;

LISTA_SENT:
        LISTA_SENT SENT         { $$ = $1; $$.push($2); }
    |   SENT                    { $$ = [$1]; }
;

SENT:
        DECLARA_VAR PTCOMA      { $$ = $1; }
    |   ASIG PTCOMA             { $$ = $1; }        
    |   JUMPC PTCOMA            { $$ = $1; }       
    |   JUMPIC PTCOMA           { $$ = $1; }      
    |   DECLARA_FUN             { $$ = $1; }
    |   PRINT PTCOMA            { $$ = $1; }       
    |   DIRECCION               { $$ = $1; }          
    |   CALLFUN PTCOMA          { $$ = $1; }
    //|   error PTCOMA            {/**/}
;

CALLFUN:
        RCALL ID        { $$ = new CallFun($2,@1.first_line,@1.first_column); }
;

DIRECCION : 
        ID DOSPT        { $$ = new Direccion($1,@1.first_line,@1.first_column); }
;

PRINT:
        RPRINT PARIZQ CAD COMA A PARDER         { $$ = new Print($3,$5,@1.first_line,@1.first_column); }
;

DECLARA_VAR:
        RVAR ID                 { $$ = new Declaracion($2,null,@1.first_line,@1.first_column); }
    |   RVAR ID IGUAL E         { $$ = new Declaracion($2,$4,@1.first_line,@1.first_column); }
;

ASIG:
        ID IGUAL E                              { $$ = new Asignacion($1,$3,@1.first_line,@1.first_column); }                           
    |   RSTACK CORIZQ A CORDER IGUAL A          { $$ = new SetStack($3,$6,@1.first_line,@1.first_column); }          
    |   RHEAP CORIZQ A CORDER IGUAL A           { $$ = new SetHeap($3,$6,@1.first_line,@1.first_column); }           
;

JUMPC:
        RIF PARIZQ ER PARDER RGOTO ID           { $$ = new SaltoCond($3,$6,@1.first_line,@1.first_column); }
;

JUMPIC:
        RGOTO ID        { $$ = new SaltoIC($2,@1.first_line,@1.first_column); }
;

ER:
        A OPR A         { $$ = new Operacion($2,$1,$3,@1.first_line,@1.first_column); }
;

DECLARA_FUN:
        RPROC ID BLOCK3D        { $$ = new DecFuncion($2,$3,@1.first_line,@1.first_column); }  
;

BLOCK3D:
        RBEGIN LISTA_SENT REND  { $$ = $2; }      
    |   RBEGIN REND             { $$ = []; }
;

E:
        A OPA A                         { $$ = new Operacion($2,$1,$3,@1.first_line,@1.first_column); }
    |   RSTACK CORIZQ A CORDER          { $$ = new AccesoStack($3,@1.first_line,@1.first_column); }
    |   RHEAP CORIZQ A CORDER           { $$ = new AccesoHeap($3,@1.first_line,@1.first_column); }
    |   A                               { $$ = $1; }
;

A:
        ID              { $$ = new Identificador($1,@1.first_line,@1.first_column); }
    |   NUMBER          { $$ = new Literal($1,@1.first_line,@1.first_column); }
    |   MENOS NUMBER    { $$ = new Operacion(TipoOpe.NEGATIVO,new Literal($2,@2.first_line,@2.first_column),null,@1.first_line,@1.first_column); }
    |   MENOS ID        { $$ = new Operacion(TipoOpe.NEGATIVO,new Identificador($2,@2.first_line,@2.first_column),null,@1.first_line,@1.first_column); }

;

OPA:
        MAS             { $$ = TipoOpe.SUMA; }
    |   MENOS           { $$ = TipoOpe.RESTA; }
    |   POR             { $$ = TipoOpe.MULT; }
    |   DIV             { $$ = TipoOpe.DIV; }
;

OPR:
        MENOR           { $$ = TipoOpe.MENOR; }
    |   MAYOR           { $$ = TipoOpe.MAYOR; }
    |   MENORIGUAL      { $$ = TipoOpe.MENORIGUAL; }
    |   MAYORIGUAL      { $$ = TipoOpe.MAYORIGUAL; }
    |   IGUALQUE        { $$ = TipoOpe.IGUALQUE; }
    |   DIFERENTE       { $$ = TipoOpe.DIFERENTE; }
;