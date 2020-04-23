/* description: Parses end executes mathematical expressions. */


/* lexical grammar */
%lex
%options ranges case-insensitive

%s                      comment


%%

"//".*                  /* skip comments */
"/*"                    this.begin('comment');
<comment>"*/"           this.popState();
<comment>.              /* skip comment content */



\s+                     /* skip whitespace */

/* RESERVADAS */
"null"                  return  'RNULL'
"integer"               return  'RINTEGER'
"double"                return  'RDOUBLE'
"char"                  return  'RCHAR'
"boolean"               return  'RBOOLEAN'
"import"                return  'RIMPORT'
"var"                   return  'RVAR'
"const"                 return  'RCONST'
"global"                return  'RGLOBAL'
"true"                  return  'RTRUE'
"false"                 return  'RFALSE'
"if"                    return  'RIF'
"else"                  return  'RELSE'
"switch"                return  'RSWITCH'
"case"                  return  'RCASE'
"default"               return  'RDEFAULT'
"break"                 return  'RBREAK'
"continue"              return  'RCONTINUE'
"return"                return  'RRETURN'
"print"                 return  'RPRINT'
"public"                return  'RPUBLIC'
"private"               return  'RPRIVATE'
"void"                  return  'RVOID'
"for"                   return  'RFOR'
"while"                 return  'RWHILE'
"define"                return  'RDEFINE'
"as"                    return  'RAS'
"strc"                  return  'RSTRC'
"do"                    return  'RDO'
"try"                   return  'RTRY'
"catch"                 return  'RCATCH'
"throw"                 return  'RTHROW'

/* EXPRESIONES REGULARES */
[0-9]+("."[0-9]+)\b             return  'LIT_DOUBLE'
[0-9]+\b                        return  'LIT_INTEGER'
[a-zA-Z_ñ]([a-zA-Z0-9_Ñ]*)      return  'ID'
('"')([^\\"]|\\.)*('"')		return 'LIT_STRING'
("'")([^\\']|"\\n"|"\\t"|"\\r"|"\\")("'")	    return 'LIT_CHAR'


/* OPERADORES ARITMETICOS */
"*"                     return  'POR'
"/"                     return  'DIV'
"-"                     return  'MENOS'
"+"                     return  'MAS'
"^^"                    return  'POT'
"%"                     return  'MOD'

/* OPERADORES RELACIONALES */
'>='                    return  'MAYORIGUAL'
"<="                    return  'MENORIGUAL'
"=="                    return  'IGUALQUE'
"==="                   return  'IGUALREF'
"<"                     return  'MENOR'
">"                     return  'MAYOR'
"!="                    return  'DIFERENTE'
"="                     return  'IGUAL'

/* OPERADORES LÓGICOS */
"%%"                    return  'AND'
"||"                    return  'OR'
"!"                     return  'NOT'
"^"                     return  'XOR'

/* TERNARIO */
"?"                     return  'TERNARIO'

/* AUMENTO Y DECREMENTO */
"++"                    return  'INCREMENTO'
"--"                    return  'DECREMENTO'

/* AGRUPADORES */
"("                     return  'PARIZQ'
")"                     return  'PARDER'
"["                     return  'CORIZQ'
"]"                     return  'CORDER'
"{"                     return  'LLAVEIZQ'
"}"                     return  'LLAVEDER'

/* ASIGNACION */
":="                    return  'DOSPTIGUAL'
"="                     return  'IGUAL'

/* PUNTUACION */
";"                     return  'PTCOMA'
":"                     return  'DOSPT'
","                     return  'COMA'
"."                     return  'PUNTO'

<<EOF>>                 return  'EOF'
.                       return  'INVALID'


/lex


/* operator associations and precedence */
%right  IGUAL
%left   MAS MENOS
%left   POR DIV MOD
%left   POT
%left   PARIZQ PARDER
%left   IGUALQUE DIFERENTE IGUALREF
%left   MENOR MAYORIGUAL MENORIGUAL MAYOR
%right  TERNARIO
%left   OR
%left   XOR
%left   AND
%right  NOT
%left   CASTEO
%right  INCREMENTO DECREMENTO
%left   UMINUS

%{
   
%}

%start INI

%% /* language grammar */

INI: 
        JS_BODY EOF          { return $$; }     
;

JS_BODY:
        JS_BODY JS_BODY_DEC     { $$ = $1; $$.push($2); }
    |   JS_BODY_DEC             { $$ = [$1]; }
;

JS_BODY_DEC:
        METHOD_DEC
    |   STRC_DEC
    |   VAR_DEC PTCOMA       
;

STRC_DEC:
        RDEFINE ID RAS CORIZQ LISTA_ATRIB CORDER
    |   RDEFINE ID RAS CORIZQ CORDER
;

LISTA_ATRIB:
        LISTA_ATRIB COMA ATRIB
    |   ATRIB
;

ATRIB:
        TYPE ID
    |   ID ID
    |   TYPE ID IGUAL VAR_INIT
    |   ID ID IGUAL VAR_INIT

    /* PARA ARREGLOS */
    |   TYPE CORIZQ CORDER ID
    |   ID CORIZQ CORDER ID
    |   TYPE CORIZQ CORDER ID IGUAL VAR_INIT
    |   ID CORIZQ CORDER ID IGUAL VAR_INIT
;

METHOD_DEC:
        TYPE ID PARIZQ PARDER BLOCK_SENT
    |   RVOID ID PARIZQ PARDER BLOCK_SENT
    |   ID ID PARIZQ PARDER BLOCK_SENT
    |   TYPE ID PARIZQ L_PARAMS PARDER BLOCK_SENT
    |   RVOID ID PARIZQ L_PARAMS PARDER BLOCK_SENT
    |   ID ID PARIZQ L_PARAMS PARDER BLOCK_SENT
    /* PARA ARREGLOS */
    |   TYPE CORIZQ CORDER ID PARIZQ PARDER BLOCK_SENT
    |   RVOID CORIZQ CORDER ID PARIZQ PARDER BLOCK_SENT
    |   ID CORIZQ CORDER ID PARIZQ PARDER BLOCK_SENT
    |   TYPE CORIZQ CORDER ID PARIZQ L_PARAMS PARDER BLOCK_SENT
    |   RVOID CORIZQ CORDER ID PARIZQ L_PARAMS PARDER BLOCK_SENT
    |   ID CORIZQ CORDER ID PARIZQ L_PARAMS PARDER BLOCK_SENT
;

TYPE:
        RINTEGER
    |   RDOUBLE
    |   RCHAR
    |   RBOOLEAN
;

L_PARAMS:
        L_PARAMS COMA PARAM
    |   PARAM
;

BLOCK_SENT:
        LLAVEIZQ L_SENT LLAVEDER
    |   LLAVEIZQ LLAVEDER
;

L_SENT:
        L_SENT SENT
    |   SENT
;

SENT:
        PRINT PTCOMA
;

PRINT:
        RPRINT PARIZQ EXP PARDER
;

PARAM:
        TYPE ID
    |   ID ID
;

VAR_DEC:
        TYPE L_ID IGUAL VAR_INIT
    |   ID L_ID IGUAL VAR_INIT
    |   RVAR ID DOSPTIGUAL VAR_INIT
    |   RCONST ID DOSPTIGUAL VAR_INIT
    |   RGLOBAL ID DOSPTIGUAL VAR_INIT
    |   TYPE L_ID
    |   ID L_ID
    /* PARA ARREGLOS */
    |   TYPE CORIZQ CORDER L_ID IGUAL VAR_INIT
    |   ID CORIZQ CORDER L_ID IGUAL VAR_INIT
    |   TYPE CORIZQ CORDER L_ID
    |   ID CORIZQ CORDER L_ID
;

L_ID:
        L_ID COMA ID
    |   ID
;

VAR_INIT:
        EXP
    |   ARRAY_INIT
;

ARRAY_INIT:
        LLAVEIZQ LISTA_EXP LLAVEDER
;

LISTA_EXP:
        LISTA_EXP COMA EXP
    |   EXP
;

EXP:
        EXP     AND     EXP
    |   EXP     OR      EXP
    |   EXP     XOR     EXP
    |   NOT     EXP
    |   PARIZQ TYPE PARDER EXP %prec CASTEO
    |   EXPR
;

EXPR:
        EXP2    MAYOR           EXP2
    |   EXP2    MENOR           EXP2
    |   EXP2    MAYORIGUAL      EXP2
    |   EXP2    MENORIGUAL      EXP2
    |   EXP2    IGUALQUE        EXP2
    |   EXP2    DIFERENTE       EXP2
    |   EXP2    IGUALREF        EXP2
    |   EXP2
;

EXP2:
        EXP2    MAS     EXP2
    |   EXP2    MENOS   EXP2
    |   EXP2    POR     EXP2
    |   EXP2    DIV     EXP2
    |   EXP2    MOD     EXP2
    |   EXP2    POT     EXP2
    |   L_ACCESO
    |   L_ACCESO        INCREMENTO
    |   L_ACCESO        DECREMENTO
    |   MENOS   EXP2 %prec UMINUS
    |   LITERAL
    |   INSTANCIA_STRC
;

LITERAL:
        LIT_INTEGER
    |   LIT_CHAR
    |   LIT_DOUBLE
    |   LIT_STRING
    |   RTRUE
    |   RFALSE
;

INSTANCIA_STRC:
        RSTRC ID
    |   RSTRC ID CORIZQ EXP CORDER
;

L_ACCESO:
        L_ACCESO PUNTO ACCESO
    |   ACCESO
;

ACCESO:
        ID
    |   ACCESO_ARREGLO
    |   CALL_METHOD
;

ACCESO_ARREGLO:
        ID CORIZQ EXP CORDER
;

CALL_METHOD:
        ID PARIZQ LISTA_EXP PARDER
    |   ID PARIZQ PARDER
;