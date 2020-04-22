/* description: Parses end executes mathematical expressions. */


/* lexical grammar */
%lex
%options ranges case-insensitive

%s                      comment
%s                      string
%s                      caracter


%%

"//".*                  /* skip comments */
"/*"                    this.begin('comment');
<comment>"*/"           this.popState();
<comment>.              /* skip comment content */

["]                 this.begin("string");
<string>[^"\n]*     return 'LIT_STRING';
<string>["]         this.popState();

[']                 this.begin("caracter");
<caracter>[^"\n]    return 'LIT_CHAR';
<caracter>["]       this.popState();


\s+                     /* skip whitespace */

/* RESERVADAS */
"null"                  return  'RNULL'
"integer"               return  'RINTEGER'
"double"                return  'RDOUBLE'
"char"                  return  'RCHAR'
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

%left UMINUS

%{
   
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
        
;