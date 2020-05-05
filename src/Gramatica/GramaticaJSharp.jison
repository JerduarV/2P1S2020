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
("'")([^\\']|"\\n"|"\\t"|"\\r"|"\\"|"\\0")("'") return  'LIT_CHAR'


/* AUMENTO Y DECREMENTO */
"++"                    return  'INCREMENTO'
"--"                    return  'DECREMENTO'

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
"==="                   return  'IGUALREF'
"=="                    return  'IGUALQUE'
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

/* REFERENCIA */
"$"                     return  'DOLAR'

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
    var DefStruct = require('../app/Compilador/InstruccionJ/DefStruct').DefStruct;
    var Atributo = require('../app/Compilador/InstruccionJ/DefStruct').Atributo;
    var Return = require('../app/Compilador/InstruccionJ/Return').Return;
    var Asignacion = require('../app/Compilador/InstruccionJ/Asignacion').Asignacion;
    var Else = require('../app/Compilador/InstruccionJ/Else').Else;
    var IF = require('../app/Compilador/InstruccionJ/IF').IF;
    var DoWhile = require('../app/Compilador/InstruccionJ/DoWhile').DoWhile;
    var While = require('../app/Compilador/InstruccionJ/While').While;
    var Print = require('../app/Compilador/InstruccionJ/Print').Print;
    var DecFun = require('../app/Compilador/InstruccionJ/DecFun').DecFun;
    var Switch = require('../app/Compilador/InstruccionJ/Switch').Switch;
    var Caso = require('../app/Compilador/InstruccionJ/Switch').Caso;

    var LiteralJ = require('../app/Compilador/ExpresionJ/LiteralJ').LiteralJ;
    var Identificador = require('../app/Compilador/ExpresionJ/Identificador').Identificador;
    var Acceso = require('../app/Compilador/ExpresionJ/Acceso').Acceso;
    var AccesoArray = require('../app/Compilador/ExpresionJ/AccesoArray').AccesoArray;
    var IncDec = require('../app/Compilador/ExpresionJ/IncDec').IncDec;
    var Dolar = require('../app/Compilador/ExpresionJ/Dolar').Dolar;
    var CasteoExplicito = require('../app/Compilador/ExpresionJ/CasteoExplicito').CasteoExplicito;
    var TipoLit = require('../app/Compilador/ExpresionJ/LiteralJ').TipoLit;
    var Null = require('../app/Compilador/ExpresionJ/Null').Null;
    var CallFun = require('../app/Compilador/ExpresionJ/CallFun').CallFun;
    var ArrayInit = require('../app/Compilador/ExpresionJ/ArrayInit').ArrayInit;
    var CallFun2 = require('../app/Compilador/ExpresionJ/CallFun2').CallFun2;
    var ParamT2 = require('../app/Compilador/ExpresionJ/CallFun2').ParamT2;
    var TipoOpeJ = require('../app/Compilador/ExpresionJ/OperacionesJ/OperacionJ').TipoOpeJ;
    var StrcArray = require('../app/Compilador/ExpresionJ/STRC/StrcArray').StrcArray;
    var StrcStruct = require('../app/Compilador/ExpresionJ/STRC/StrcStruct').StrcStruct;
    var OpeArit = require('../app/Compilador/ExpresionJ/OperacionesJ/OpeArit').OpeArit;
    var OpeRel = require('../app/Compilador/ExpresionJ/OperacionesJ/OpeRel').OpeRel;
    var OpeLogica = require('../app/Compilador/ExpresionJ/OperacionesJ/OpeLogica').OpeLogica;
    var Tipo = require('../app/Compilador/TSJ/Tipo').Tipo;

    var DOUBLE = require('../app/Compilador/TSJ/Tipo').DOUBLE;
    var BOOL = require('../app/Compilador/TSJ/Tipo').BOOL;
    var STRING = require('../app/Compilador/TSJ/Tipo').STRING;
    var INT = require('../app/Compilador/TSJ/Tipo').INT;
    var CHAR = require('../app/Compilador/TSJ/Tipo').CHAR;
    var NULL = require('../app/Compilador/TSJ/Tipo').NULL;
    var VOID = require('../app/Compilador/TSJ/Tipo').VOID;



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
    |   VAR_DEC PTCOMA          { $$ = $1; $$.dec_interna = false; }
    |   VAR_DEC                 { $$ = $1; $$.dec_interna = false; }       
;

STRC_DEC:
        RDEFINE ID RAS CORIZQ LISTA_ATRIB CORDER    { $$ = new DefStruct($2,$5,@1.first_line,@1.first_column); }
    |   RDEFINE ID RAS CORIZQ CORDER                { $$ = new DefStruct($2,[],@1.first_line,@1.first_column); }
;

LISTA_ATRIB:
        LISTA_ATRIB COMA ATRIB  { $$ = $1; $$.push($3); }
    |   ATRIB                   { $$ = [$1]; }
;

ATRIB:
        TYPE ID                                 { $$ = new Atributo(new Tipo($1,0),$2,null,@1.first_line,@1.first_column); }
    |   ID ID                                   { $$ = new Atributo(new Tipo($1,0),$2,null,@1.first_line,@1.first_column); }
    |   TYPE ID IGUAL VAR_INIT                  { $$ = new Atributo(new Tipo($1,0),$2,$4,@1.first_line,@1.first_column); }
    |   ID ID IGUAL VAR_INIT                    { $$ = new Atributo(new Tipo($1,0),$2,$4,@1.first_line,@1.first_column); }

    /* PARA ARREGLOS */
    |   TYPE CORIZQ CORDER ID                   { $$ = new Atributo(new Tipo($1,1),$4,null,@1.first_line,@1.first_column); }
    |   ID CORIZQ CORDER ID                     { $$ = new Atributo(new Tipo($1,1),$4,null,@1.first_line,@1.first_column); }
    |   TYPE CORIZQ CORDER ID IGUAL VAR_INIT    { $$ = new Atributo(new Tipo($1,1),$4,$6,@1.first_line,@1.first_column); }
    |   ID CORIZQ CORDER ID IGUAL VAR_INIT      { $$ = new Atributo(new Tipo($1,1),$4,$6,@1.first_line,@1.first_column); }
;

METHOD_DEC:
        TYPE ID PARIZQ PARDER BLOCK_SENT                        { $$ = new DecFun(new Tipo($1,0),$2,[],$5,@1.first_line,@1.first_column); }
    |   RVOID ID PARIZQ PARDER BLOCK_SENT                       { $$ = new DecFun(new Tipo(VOID,0),$2,[],$5,@1.first_line,@1.first_column); }
    |   ID ID PARIZQ PARDER BLOCK_SENT                          { $$ = new DecFun(new Tipo($1,0),$2,[],$5,@1.first_line,@1.first_column);}
    |   TYPE ID PARIZQ L_PARAMS PARDER BLOCK_SENT               { $$ = new DecFun(new Tipo($1,0),$2,$4,$6,@1.first_line,@1.first_column); }
    |   RVOID ID PARIZQ L_PARAMS PARDER BLOCK_SENT              { $$ = new DecFun(new Tipo(VOID,0),$2,$4,$6,@1.first_line,@1.first_column); }
    |   ID ID PARIZQ L_PARAMS PARDER BLOCK_SENT                 { $$ = new DecFun(new Tipo($1,0),$2,$4,$6,@1.first_line,@1.first_column); }
    /* PARA ARREGLOS */
    |   TYPE CORIZQ CORDER ID PARIZQ PARDER BLOCK_SENT          { $$ = new DecFun(new Tipo($1,1),$4,[],$7,@1.first_line,@1.first_column); }
    |   ID CORIZQ CORDER ID PARIZQ PARDER BLOCK_SENT            { $$ = new DecFun(new Tipo($1,1),$4,[],$7,@1.first_line,@1.first_column); }
    |   TYPE CORIZQ CORDER ID PARIZQ L_PARAMS PARDER BLOCK_SENT { $$ = new DecFun(new Tipo($1,1),$4,$6,$8,@1.first_line,@1.first_column); }
    |   ID CORIZQ CORDER ID PARIZQ L_PARAMS PARDER BLOCK_SENT   { $$ = new DecFun(new Tipo($1,1),$4,$6,$8,@1.first_line,@1.first_column); }
;

TYPE:
        RINTEGER    { $$ = INT }
    |   RDOUBLE     { $$ = DOUBLE }
    |   RCHAR       { $$ = CHAR }
    |   RBOOLEAN    { $$ = BOOL }
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
        PRINT PTCOMA                        { $$ = $1; }
    |   PRINT                               { $$ = $1; }
    |   VAR_DEC PTCOMA                      { $$ = $1; }
    |   VAR_DEC                             { $$ = $1; }
    |   ASIGNACION PTCOMA                   { $$ = $1; }
    |   ASIGNACION                          { $$ = $1; }
    |   WHILE                               { $$ = $1; }
    |   DOWHILE PTCOMA                      { $$ = $1; }
    |   DOWHILE                             { $$ = $1; }
    |   IF                                  { $$ = $1; }
    |   FOR                                 { $$ = $1; }
    |   RETURN                              { $$ = $1; }
    |   BREAK PTCOMA                        { $$ = $1; }
    |   BREAK                               { $$ = $1; }
    |   CONTINUE PTCOMA                     { $$ = $1; }
    |   CONTINUE                            { $$ = $1; }
    |   STRC_DEC                            { $$ = $1; }
    |   SWITCH                              { $$ = $1; }
    |   L_ACCESO PTCOMA                     { $$ = new Acceso($1,@1.first_line,@1.first_column); }
    |   L_ACCESO INCREMENTO PTCOMA          { $$ = new IncDec(new Acceso($1,@1.first_line,@1.first_column),1,@1.first_line,@1.first_column); }
    |   L_ACCESO DECREMENTO PTCOMA          { $$ = new IncDec(new Acceso($1,@1.first_line,@1.first_column),-1,@1.first_line,@1.first_column); }
    |   L_ACCESO INCREMENTO                 { $$ = new IncDec(new Acceso($1,@1.first_line,@1.first_column),1,@1.first_line,@1.first_column); }
    |   L_ACCESO DECREMENTO                 { $$ = new IncDec(new Acceso($1,@1.first_line,@1.first_column),-1,@1.first_line,@1.first_column); }
;

SWITCH:
        RSWITCH PARIZQ EXP PARDER LLAVEIZQ L_CASOS LLAVEDER     { $$ = new Switch($3,$6,@1.first_line,@1.first_column); }
;

L_CASOS:
        L_CASOS CASO    { $$ = $1; $$.push($2); }
    |   CASO            { $$ = [$1]; }
;

CASO:
        RCASE EXP DOSPT L_SENT  { $$ = new Caso($2,$4); }
    |   RDEFAULT DOSPT L_SENT   { $$ = new Caso(null,$3); }
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
        //INIT EXP ACT
        RFOR PARIZQ FOR_INIT PTCOMA EXP PTCOMA ACTUALIZACION PARDER BLOCK_SENT  { $$ = new For($3,$5,$7,$9,@1.first_line,@1.first_column); }
        //INIT NULL NULL
    |   RFOR PARIZQ FOR_INIT PTCOMA PTCOMA PARDER BLOCK_SENT                    { $$ = new For($3,null,null,$7,@1.first_line,@1.first_column); }
        //INIT EXP NULL
    |   RFOR PARIZQ FOR_INIT PTCOMA EXP PTCOMA PARDER BLOCK_SENT                { $$ = new For($3,$5,null,$8,@1.first_line,@1.first_column); }
        //NULL EXP ACT
    |   RFOR PARIZQ PTCOMA EXP PTCOMA ACTUALIZACION PARDER BLOCK_SENT           { $$ = new For(null,$4,$6,$8,@1.first_line,@1.first_column); }
        //NULL NULL ACT
    |   RFOR PARIZQ PTCOMA PTCOMA ACTUALIZACION PARDER BLOCK_SENT               { $$ = new For(null,null,$5,$7,@1.first_line,@1.first_column); }
        //NULL EXP NULL
    |   RFOR PARIZQ PTCOMA EXP PTCOMA PARDER BLOCK_SENT                         { $$ = new For(null,$4,null,$7,@1.first_line,@1.first_column); }
        //NULL NULL NULL
    |   RFOR PARIZQ PTCOMA PTCOMA PARDER BLOCK_SENT                             { $$ = new For(null,null,null,$6,@1.first_line,@1.first_column); }
;

ACTUALIZACION:
        EXP         { $$ = $1; }
    |   ASIGNACION  { $$ = $1; }
;

FOR_INIT:
        VAR_DEC     { $$ = $1; }
    |   ASIGNACION  { $$ = $1; }
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
        TYPE L_ID IGUAL VAR_INIT                { $$ = new DeclaracionJ(new Tipo($1,0),$2,false,false,$4,@1.first_line,@1.first_column);  }
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
    |   ARRAY_INIT  { $$ = $1; }
;

ARRAY_INIT:
        LLAVEIZQ LISTA_ARRAY LLAVEDER   { $$ = new ArrayInit($2,@1.first_line,@1.first_column); }
;

LISTA_ARRAY:
        LISTA_ARRAY COMA EXP    { $$ = $1; $$.push($3); }
    |   EXP                     { $$ = [$1]; }
;

LISTA_EXP:
        LISTA_EXP COMA ELEMENTO  { $$ = $1; $$.push($3); }
    |   ELEMENTO                 { $$ = [$1]; }
;

ELEMENTO:
        VAR_INIT        { $$ = $1; }
    |   DOLAR L_ACCESO  { $$ = new Dolar(new Acceso($2,@1.first_line,@1.first_column),@1.first_line,@1.first_column); }
;

EXP:
        EXP     AND     EXP         { $$ = new OpeLogica(TipoOpeJ.AND,$1,$3,@1.first_line,@1.first_column); }
    |   EXP     OR      EXP         { $$ = new OpeLogica(TipoOpeJ.OR,$1,$3,@1.first_line,@1.first_column); }
    |   EXP     XOR     EXP         { $$ = new OpeLogica(TipoOpeJ.XOR,$1,$3,@1.first_line,@1.first_column); }
    |   NOT     EXP                 { $$ = new OpeLogica(TipoOpeJ.NOT,$2,null,@1.first_line,@1.first_column); }
    |   PARIZQ TYPE PARDER EXP      { $$ = new CasteoExplicito(new Tipo($2,0),$4,@1.first_line,@1.first_column); }
    |   EXPR                        { $$ = $1; }
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
    |   L_ACCESO        INCREMENTO  { $$ = new IncDec(new Acceso($1,@1.first_line,@1.first_column),1,@1.first_line,@1.first_column); }
    |   L_ACCESO        DECREMENTO  { $$ = new IncDec(new Acceso($1,@1.first_line,@1.first_column),-1,@1.first_line,@1.first_column); }
    |   MENOS   EXP2 %prec UMINUS   { $$ = new OpeArit(TipoOpeJ.NEGATIVO,$2,null,@1.first_line,@1.first_column); }
    |   LITERAL                     { $$ = $1; }
    |   INSTANCIA_STRC              { $$ = $1; }
    |   RNULL                       { $$ = new Null(@1.first_line,@1.first_column); }
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
        RSTRC ID PARIZQ PARDER          { $$ = new StrcStruct($2,@1.first_line,@1.first_column); }
    |   RSTRC ID CORIZQ EXP CORDER      { $$ = new StrcArray(new Tipo($2,1),$4,@1.first_line,@1.first_column); }
    |   RSTRC TYPE CORIZQ EXP CORDER    { $$ = new StrcArray(new Tipo($2,1),$4,@1.first_line,@1.first_column); }
;

L_ACCESO:
        L_ACCESO PUNTO ACCESO   { $$ = $1; $$.push($3); }
    |   ACCESO                  { $$ = [$1]; }
;

ACCESO:
        ID              { $$ = new Identificador($1,@1.first_line,@1.first_column); }              
    |   ACCESO_ARREGLO  { $$ = $1; }
    |   CALL_METHOD     { $$ = $1; }
;

ACCESO_ARREGLO:
        ID CORIZQ EXP CORDER    { $$ = new AccesoArray($1,$3,@1.first_line,@1.first_column); }
;

CALL_METHOD:
        ID PARIZQ LISTA_EXP PARDER  { $$ = new CallFun($1,$3,@1.first_line,@1.first_column); }
    |   ID PARIZQ PARDER            { $$ = new CallFun($1,[],@1.first_line,@1.first_column); }
    |   ID PARIZQ L_PARAM2 PARDER   { $$ = new CallFun2($1,$3,@1.first_line,@1.first_column); }
;

L_PARAM2:
        L_PARAM2 COMA PARAM2    { $$ = $1; $$.push($3); }
    |   PARAM2                  { $$ = [$1]; }
;

PARAM2:
        ID IGUAL VAR_INIT   { $$ = new ParamT2($1,$3); }
;