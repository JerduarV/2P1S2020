/* description: Parses end executes mathematical expressions. */


/* lexical grammar */
%lex
%options ranges

%s                      comment
%s                      string


%%

"#".*                  /* skip comments */
"#*"                    this.begin('comment');
<comment>"*#"           this.popState();
<comment>.              /* skip comment content */

["]                                     this.begin('string');
<string>[[%][d]]|[[%][c]|[%][e]]        return 'CAD';
<string>["]                             this.popState();


\s+                     /* skip whitespace */

/* RESERVADAS */
"var"                   return  'RVAR'
"goto"                  return  'RGOTO'
"if"                    return  'RIF'
"ifFalse"               return  'RIFFALSE'
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
   var Operacion = require('../app/Interprete3D/Expresion/Operacion').Operacion;
   var TipoOpe = require('../app/Interprete3D/Expresion/Operacion').TipoOpe;
   var Identificador = require('../app/Interprete3D/Expresion/Identificador').Identificador;
   var Literal = require('../app/Interprete3D/Expresion/Literal').Literal;
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
    |   ASIG PTCOMA        
    |   JUMPC PTCOMA       
    |   JUMPIC PTCOMA      
    |   DECLARA_FUN        
    |   PRINT PTCOMA       
    |   DIRECCION          
    |   CALLFUN PTCOMA   
    //|   error PTCOMA            {/**/}
;

CALLFUN:
        RCALL ID 
;

DIRECCION : 
        ID DOSPT        
;

PRINT:
        RPRINT PARIZQ CAD COMA A PARDER 
;

DECLARA_VAR:
        RVAR ID                 { $$ = new Declaracion($2,null,@1.first_line,@1.first_column); }
    |   RVAR ID IGUAL E         { $$ = new Declaracion($2,$4,@1.first_line,@1.first_column); }
;

ASIG:
        ID IGUAL E                           
    |   RSTACK CORIZQ A CORDER IGUAL A          
    |   RHEAP CORIZQ A CORDER IGUAL A           
;

JUMPC:
        RIF PARIZQ ER PARDER RGOTO ID
;

JUMPIC:
        RGOTO ID      
;

ER:
        A OPR A 
;

DECLARA_FUN:
        RPROC ID BLOCK3D  
;

BLOCK3D:
        RBEGIN LISTA_SENT REND      
    |   RBEGIN REND                 
;

E:
        A OPA A                         {$$ = new Operacion($2,$1,$3,@1.first_line,@1.first_column); }
    |   RSTACK CORIZQ A CORDER  
    |   RHEAP CORIZQ A CORDER
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