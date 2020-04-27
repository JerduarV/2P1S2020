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
[0-9]+("."[0-9]+)\b                             return  'LIT_DOUBLE'
[0-9]+\b                                        return  'LIT_INTEGER'
[a-zA-Z_ñ]([a-zA-Z0-9_Ñ]*)                      return  'ID'
('"')([^\\"]|\\.)*('"')		                    return  'LIT_STRING'
("'")([^\\']|"\\n"|"\\t"|"\\r"|"\\")("'")	    return  'LIT_CHAR'


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
"&&"                    return  'AND'
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
    var DeclaracionJ = require('../app/Compilador/InstruccionJ/DeclaracionJ').DeclaracionJ;
    var For = require('../app/Compilador/InstruccionJ/For').For;
    var Break = require('../app/Compilador/InstruccionJ/Break').Break;
    var Continue = require('../app/Compilador/InstruccionJ/Continue').Continue;
    var Return = require('../app/Compilador/InstruccionJ/Return').Return;
    var Asignacion = require('../app/Compilador/InstruccionJ/Asignacion').Asignacion;
    var Else = require('../app/Compilador/InstruccionJ/Else').Else;
    var IF = require('../app/Compilador/InstruccionJ/IF').IF;
    var DoWhile = require('../app/Compilador/InstruccionJ/DoWhile').DoWhile;
    var While = require('../app/Compilador/InstruccionJ/While').While;
    var Print = require('../app/Compilador/InstruccionJ/Print').Print;
    var DecFun = require('../app/Compilador/InstruccionJ/DecFun').DecFun;
    var LiteralJ = require('../app/Compilador/ExpresionJ/LiteralJ').LiteralJ;
    var Identificador = require('../app/Compilador/ExpresionJ/Identificador').Identificador;
    var Acceso = require('../app/Compilador/ExpresionJ/Acceso').Acceso;
    var TipoLit = require('../app/Compilador/ExpresionJ/LiteralJ').TipoLit;
    var TipoOpeJ = require('../app/Compilador/ExpresionJ/OperacionesJ/OperacionJ').TipoOpeJ;
    var OpeArit = require('../app/Compilador/ExpresionJ/OperacionesJ/OpeArit').OpeArit;
    var OpeRel = require('../app/Compilador/ExpresionJ/OperacionesJ/OpeRel').OpeRel;
    var OpeLogica = require('../app/Compilador/ExpresionJ/OperacionesJ/OpeLogica').OpeLogica;
    var Tipo = require('../app/Compilador/TSJ/Tipo').Tipo;
    var ParametroFormal = require('../app/Compilador/TSJ/ParametroFormal').ParametroFormal;
%}

%start INI

%% /* language grammar */

INI: 
        JS_BODY EOF          { return $1; console.log($1);}     
;

JS_BODY:
        JS_BODY JS_BODY_DEC     { $$ = $1; $$.push($2); }
    |   JS_BODY_DEC             { $$ = [$1];            }
;

JS_BODY_DEC:
        METHOD_DEC              { $$ = $1; }
    |   STRC_DEC                { $$ = $1; }
    |   VAR_DEC PTCOMA          { $$ = $1; }
    |   VAR_DEC                 { $$ = $1; }       
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
        TYPE ID PARIZQ PARDER BLOCK_SENT                        { $$ = new DecFun(new Tipo($1,0),$2,[],$5,@1.first_line,@1.first_column); }
    |   RVOID ID PARIZQ PARDER BLOCK_SENT                       { $$ = new DecFun(new Tipo('$VOID',0),$2,[],$5,@1.first_line,@1.first_column); }
    |   ID ID PARIZQ PARDER BLOCK_SENT                          { $$ = new DecFun(new Tipo($1,0),$2,[],$5,@1.first_line,@1.first_column);}
    |   TYPE ID PARIZQ L_PARAMS PARDER BLOCK_SENT               { $$ = new DecFun(new Tipo($1,0),$2,$4,$6,@1.first_line,@1.first_column); }
    |   RVOID ID PARIZQ L_PARAMS PARDER BLOCK_SENT              { $$ = new DecFun(new Tipo('$VOID',0),$2,$4,$6,@1.first_line,@1.first_column); }
    |   ID ID PARIZQ L_PARAMS PARDER BLOCK_SENT                 { $$ = new DecFun(new Tipo($1,0),$2,$4,$6,@1.first_line,@1.first_column); }
    /* PARA ARREGLOS */
    |   TYPE CORIZQ CORDER ID PARIZQ PARDER BLOCK_SENT          { $$ = new DecFun(new Tipo($1,1),$4,[],$7,@1.first_line,@1.first_column); }
    |   ID CORIZQ CORDER ID PARIZQ PARDER BLOCK_SENT            { $$ = new DecFun(new Tipo($1,1),$4,[],$7,@1.first_line,@1.first_column); }
    |   TYPE CORIZQ CORDER ID PARIZQ L_PARAMS PARDER BLOCK_SENT { $$ = new DecFun(new Tipo($1,1),$4,$6,$8,@1.first_line,@1.first_column); }
    |   ID CORIZQ CORDER ID PARIZQ L_PARAMS PARDER BLOCK_SENT   { $$ = new DecFun(new Tipo($1,1),$4,$6,$8,@1.first_line,@1.first_column); }
;

TYPE:
        RINTEGER    { $$ = 'INT' }
    |   RDOUBLE     { $$ = 'DOUBLE' }
    |   RCHAR       { $$ = 'CHAR' }
    |   RBOOLEAN    { $$ = 'BOOL' }
;

L_PARAMS:
        L_PARAMS COMA PARAM     { $$ = $1; $$.push($3); }
    |   PARAM                   { $$ = [$1]; }
;

BLOCK_SENT:
        LLAVEIZQ L_SENT LLAVEDER    { $$ = $2; }
    |   LLAVEIZQ LLAVEDER           { $$ = []; }
;

L_SENT:
        L_SENT SENT     { $$ = $1; $$.push($2) }
    |   SENT            { $$ = [$1]; }
;

SENT:
        PRINT PTCOMA            { $$ = $1; }
    |   PRINT                   { $$ = $1; }
    |   VAR_DEC PTCOMA          { $$ = $1; }
    |   VAR_DEC                 { $$ = $1; }
    |   ASIGNACION PTCOMA       { $$ = $1; }
    |   ASIGNACION              { $$ = $1; }
    |   WHILE                   { $$ = $1; }
    |   DOWHILE PTCOMA          { $$ = $1; }
    |   DOWHILE                 { $$ = $1; }
    |   IF                      { $$ = $1; }
    |   FOR                     { $$ = $1; }
    |   RETURN                  { $$ = $1; }
    |   BREAK PTCOMA            { $$ = $1; }
    |   BREAK                   { $$ = $1; }
    |   CONTINUE PTCOMA         { $$ = $1; }
    |   CONTINUE                { $$ = $1; }
;

BREAK:
        RBREAK      { $$ = new Break(@1.first_line,@1.first_column); }
;

CONTINUE:
        RCONTINUE   { $$ = new Continue(@1.first_line,@1.first_column); }
;

RETURN:
        RRETURN EXP PTCOMA      { $$ = new Return($2,@1.first_line,@1.first_column); }
    |   RRETURN PTCOMA          { $$ = new Return(null,@1.first_line,@1.first_column); }
;

FOR:
        RFOR PARIZQ FOR_INIT PTCOMA EXP PTCOMA ACTUALIZACION PARDER BLOCK_SENT
    |   RFOR PARIZQ FOR_INIT PTCOMA PTCOMA PARDER BLOCK_SENT
    |   RFOR PARIZQ FOR_INIT PTCOMA EXP PTCOMA PARDER BLOCK_SENT
    |   RFOR PARIZQ PTCOMA EXP PTCOMA ACTUALIZACION BLOCK_SENT
    |   RFOR PARIZQ PTCOMA PTCOMA ACTUALIZACION BLOCK_SENT
    |   RFOR PARIZQ PTCOMA EXP PTCOMA BLOCK_SENT
    |   RFOR PARIZQ PTCOMA PTCOMA PTCOMA PARDER BLOCK_SENT
;

ACTUALIZACION:
        EXP
    |   ASIGNACION
;

FOR_INIT:
        VAR_DEC
    |   ASIGNACION
;

IF:
        RIF PARIZQ EXP PARDER BLOCK_SENT        { $$ = new IF($3,$5,null,@1.first_line,@1.first_column); }
    |   RIF PARIZQ EXP PARDER BLOCK_SENT ELSE   { $$ = new IF($3,$5,$6,@1.first_line,@1.first_column); }
;

ELSE:
        RELSE IF            { $$ = new Else(null,$2,@1.first_line,@1.first_column); }
    |   RELSE BLOCK_SENT    { $$ = new Else($2,null,@1.first_line,@1.first_column); }
;

DOWHILE:
        RDO BLOCK_SENT RWHILE PARIZQ EXP PARDER     { $$ = new DoWhile($2,$5,@1.first_line,@1.first_column); }
;

WHILE:
        RWHILE PARIZQ EXP PARDER BLOCK_SENT     { $$ = new While($3,$5,@1.first_line,@1.first_column); }
;

ASIGNACION:
        L_ACCESO IGUAL VAR_INIT { $$ = new Asignacion(new Acceso($1,@1.first_line,@1.first_column),$3,@1.first_line,@1.first_column); }
;

PRINT:
        RPRINT PARIZQ EXP PARDER    { $$ = new Print($3,@1.first_line,@1.first_column); }
;

PARAM:
        TYPE ID                 { $$ = new ParametroFormal(new Tipo($1,0),$2); }
    |   ID ID                   { $$ = new ParametroFormal(new Tipo($1,0),$2); }
    |   TYPE CORIZQ CORDER ID   { $$ = new ParametroFormal(new Tipo($1,1),$4); }
    |   ID CORIZQ CORDER ID     { $$ = new ParametroFormal(new Tipo($1,1),$4)  }
;

VAR_DEC:
        TYPE L_ID IGUAL VAR_INIT                { $$ = new DeclaracionJ(new Tipo($1,0),$2,false,false,$4,@1.first_line,@1.first_column); console.log($$);     }
    |   ID L_ID IGUAL VAR_INIT                  { $$ = new DeclaracionJ(new Tipo($1,0),$2,false,false,$4,@1.first_line,@1.first_column);        }
    |   RVAR ID DOSPTIGUAL VAR_INIT             { $$ = new DeclaracionJ(new Tipo('$VAR',0),[$2],false,false,$4,@1.first_line,@1.first_column);  }
    |   RCONST ID DOSPTIGUAL VAR_INIT           { $$ = new DeclaracionJ(null,[$2],true,false,$4,@1.first_line,@1.first_column);     }
    |   RGLOBAL ID DOSPTIGUAL VAR_INIT          { $$ = new DeclaracionJ(null,[$2],false,true,$4,@1.first_line,@1.first_column);     }
    |   TYPE L_ID                               { $$ = new DeclaracionJ(new Tipo($1,0),$2,false,false,null,@1.first_line,@1.first_column);      }                               
    |   ID L_ID                                 { $$ = new DeclaracionJ(new Tipo($1,0),$2,false,false,null,@1.first_line,@1.first_column);      }
    /* PARA ARREGLOS */
    |   TYPE CORIZQ CORDER L_ID IGUAL VAR_INIT  { $$ = new DeclaracionJ(new Tipo($1,1),$4,false,false,$6,@1.first_line,@1.first_column); }
    |   ID CORIZQ CORDER L_ID IGUAL VAR_INIT    { $$ = new DeclaracionJ(new Tipo($1,1),$4,false,false,$6,@1.first_line,@1.first_column); }
    |   TYPE CORIZQ CORDER L_ID                 { $$ = new DeclaracionJ(new Tipo($1,1),$4,false,false,null,@1.first_line,@1.first_column); }
    |   ID CORIZQ CORDER L_ID                   { $$ = new DeclaracionJ(new Tipo($1,1),$4,false,false,null,@1.first_line,@1.first_column); }
;

L_ID:
        L_ID COMA ID    { $$ = $1; $$.push($3); }
    |   ID              { $$ = [$1]; }
;

VAR_INIT:
        EXP         { $$ = $1; }
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
        EXP     AND     EXP                     { $$ = new OpeLogica(TipoOpeJ.AND,$1,$3,@1.first_line,@1.first_column); }
    |   EXP     OR      EXP                     { $$ = new OpeLogica(TipoOpeJ.OR,$1,$3,@1.first_line,@1.first_column); }
    |   EXP     XOR     EXP                     { $$ = new OpeLogica(TipoOpeJ.XOR,$1,$3,@1.first_line,@1.first_column); }
    |   NOT     EXP                             { $$ = new OpeLogica(TipoOpeJ.NOT,$2,null,@1.first_line,@1.first_column); }
    |   PARIZQ TYPE PARDER EXP %prec CASTEO
    |   EXPR                                    { $$ = $1; }
;

EXPR:
        EXP2    MAYOR           EXP2    { $$ = new OpeRel(TipoOpeJ.MAYOR,$1,$3,@1.first_line,@1.first_column); }
    |   EXP2    MENOR           EXP2    { $$ = new OpeRel(TipoOpeJ.MENOR,$1,$3,@1.first_line,@1.first_column); }
    |   EXP2    MAYORIGUAL      EXP2    { $$ = new OpeRel(TipoOpeJ.MAYORIGUAL,$1,$3,@1.first_line,@1.first_column); }
    |   EXP2    MENORIGUAL      EXP2    { $$ = new OpeRel(TipoOpeJ.MENORIGUAL,$1,$3,@1.first_line,@1.first_column); }
    |   EXP2    IGUALQUE        EXP2    { $$ = new OpeRel(TipoOpeJ.IGUALQUE,$1,$3,@1.first_line,@1.first_column); }
    |   EXP2    DIFERENTE       EXP2    { $$ = new OpeRel(TipoOpeJ.DIFERENTE,$1,$3,@1.first_line,@1.first_column); }
    |   EXP2    IGUALREF        EXP2    { $$ = new OpeRel(TipoOpeJ.IGUALREF,$1,$3,@1.first_line,@1.first_column); }
    |   EXP2                            { $$ = $1; }
;

EXP2:
        EXP2    MAS     EXP2        { $$ = new OpeArit(TipoOpeJ.SUMA,$1,$3,@1.first_line,@1.first_column); }
    |   EXP2    MENOS   EXP2        { $$ = new OpeArit(TipoOpeJ.RESTA,$1,$3,@1.first_line,@1.first_column); }
    |   EXP2    POR     EXP2        { $$ = new OpeArit(TipoOpeJ.MULT,$1,$3,@1.first_line,@1.first_column); }
    |   EXP2    DIV     EXP2        { $$ = new OpeArit(TipoOpeJ.DIV,$1,$3,@1.first_line,@1.first_column); }
    |   EXP2    MOD     EXP2        { $$ = new OpeArit(TipoOpeJ.MOD,$1,$3,@1.first_line,@1.first_column); }
    |   EXP2    POT     EXP2        { $$ = new OpeArit(TipoOpeJ.POT,$1,$3,@1.first_line,@1.first_column); }
    |   PARIZQ EXP  PARDER          { $$ = $2; }
    |   L_ACCESO                    { $$ = new Acceso($1,@1.first_line,@1.first_column); }
    |   L_ACCESO        INCREMENTO
    |   L_ACCESO        DECREMENTO
    |   MENOS   EXP2 %prec UMINUS
    |   LITERAL                     { $$ = $1; }
    |   INSTANCIA_STRC
;

LITERAL:
        LIT_INTEGER     { $$ = new LiteralJ($1,TipoLit.LIT_INT,@1.first_line,@1.first_column);      }
    |   LIT_CHAR        { $$ = new LiteralJ($1,TipoLit.LIT_CHAR,@1.first_line,@1.first_column);     }
    |   LIT_DOUBLE      { $$ = new LiteralJ($1,TipoLit.LIT_DOUBLE,@1.first_line,@1.first_column);   }
    |   LIT_STRING      { $$ = new LiteralJ($1,TipoLit.LIT_STRING,@1.first_line,@1.first_column);   }
    |   RTRUE           { $$ = new LiteralJ($1,TipoLit.LIT_TRUE,@1.first_line,@1.first_column);     }
    |   RFALSE          { $$ = new LiteralJ($1,TipoLit.LIT_FALSE,@1.first_line,@1.first_column);    }
;

INSTANCIA_STRC:
        RSTRC ID
    |   RSTRC ID CORIZQ EXP CORDER
;

L_ACCESO:
        L_ACCESO PUNTO ACCESO   { $$ = $1; $$.push($3); }
    |   ACCESO                  { $$ = [$1]; }
;

ACCESO:
        ID              { $$ = new Identificador($1,@1.first_line,@1.first_column); }              
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