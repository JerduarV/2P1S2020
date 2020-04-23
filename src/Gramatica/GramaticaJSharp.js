/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var GramaticaJSharp = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,10],$V1=[1,9],$V2=[1,8],$V3=[1,14],$V4=[1,15],$V5=[1,16],$V6=[1,17],$V7=[1,11],$V8=[1,12],$V9=[1,13],$Va=[5,11,12,25,27,28,29,30,40,42,43],$Vb=[12,14,23],$Vc=[10,17,20],$Vd=[2,57],$Ve=[1,36],$Vf=[1,50],$Vg=[1,73],$Vh=[1,57],$Vi=[1,59],$Vj=[1,56],$Vk=[1,62],$Vl=[1,66],$Vm=[1,67],$Vn=[1,68],$Vo=[1,69],$Vp=[1,70],$Vq=[1,71],$Vr=[1,72],$Vs=[1,90],$Vt=[1,92],$Vu=[17,23],$Vv=[10,16,17],$Vw=[1,97],$Vx=[1,98],$Vy=[1,99],$Vz=[10,16,17,23,34,46,47,48],$VA=[1,111],$VB=[1,112],$VC=[1,113],$VD=[1,114],$VE=[1,115],$VF=[1,116],$VG=[10,16,17,23,34,46,47,48,52,53,54,55,56,57,58,59,60,61,62,63,64],$VH=[10,16,17,23,34,46,47,48,52,53,54,55,56,57,58,59,60,61,62,63,64,66,67,77],$VI=[1,135],$VJ=[1,140],$VK=[1,151],$VL=[17,23,34],$VM=[16,17],$VN=[34,37],$VO=[10,16,17,23,34,46,47,48,52,53,54,55,56,57,58,59,60],$VP=[10,16,17,23,34,46,47,48,52,53,54,55,56,57,58,59,60,61,62,63];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"INI":3,"JS_BODY":4,"EOF":5,"JS_BODY_DEC":6,"METHOD_DEC":7,"STRC_DEC":8,"VAR_DEC":9,"PTCOMA":10,"RDEFINE":11,"ID":12,"RAS":13,"CORIZQ":14,"LISTA_ATRIB":15,"CORDER":16,"COMA":17,"ATRIB":18,"TYPE":19,"IGUAL":20,"VAR_INIT":21,"PARIZQ":22,"PARDER":23,"BLOCK_SENT":24,"RVOID":25,"L_PARAMS":26,"RINTEGER":27,"RDOUBLE":28,"RCHAR":29,"RBOOLEAN":30,"PARAM":31,"LLAVEIZQ":32,"L_SENT":33,"LLAVEDER":34,"SENT":35,"PRINT":36,"RPRINT":37,"EXP":38,"L_ID":39,"RVAR":40,"DOSPTIGUAL":41,"RCONST":42,"RGLOBAL":43,"ARRAY_INIT":44,"LISTA_EXP":45,"AND":46,"OR":47,"XOR":48,"NOT":49,"EXPR":50,"EXP2":51,"MAYOR":52,"MENOR":53,"MAYORIGUAL":54,"MENORIGUAL":55,"IGUALQUE":56,"DIFERENTE":57,"IGUALREF":58,"MAS":59,"MENOS":60,"POR":61,"DIV":62,"MOD":63,"POT":64,"L_ACCESO":65,"INCREMENTO":66,"DECREMENTO":67,"LITERAL":68,"INSTANCIA_STRC":69,"LIT_INTEGER":70,"LIT_CHAR":71,"LIT_DOUBLE":72,"LIT_STRING":73,"RTRUE":74,"RFALSE":75,"RSTRC":76,"PUNTO":77,"ACCESO":78,"ACCESO_ARREGLO":79,"CALL_METHOD":80,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",10:"PTCOMA",11:"RDEFINE",12:"ID",13:"RAS",14:"CORIZQ",16:"CORDER",17:"COMA",20:"IGUAL",22:"PARIZQ",23:"PARDER",25:"RVOID",27:"RINTEGER",28:"RDOUBLE",29:"RCHAR",30:"RBOOLEAN",32:"LLAVEIZQ",34:"LLAVEDER",37:"RPRINT",40:"RVAR",41:"DOSPTIGUAL",42:"RCONST",43:"RGLOBAL",46:"AND",47:"OR",48:"XOR",49:"NOT",52:"MAYOR",53:"MENOR",54:"MAYORIGUAL",55:"MENORIGUAL",56:"IGUALQUE",57:"DIFERENTE",58:"IGUALREF",59:"MAS",60:"MENOS",61:"POR",62:"DIV",63:"MOD",64:"POT",66:"INCREMENTO",67:"DECREMENTO",70:"LIT_INTEGER",71:"LIT_CHAR",72:"LIT_DOUBLE",73:"LIT_STRING",74:"RTRUE",75:"RFALSE",76:"RSTRC",77:"PUNTO"},
productions_: [0,[3,2],[4,2],[4,1],[6,1],[6,1],[6,2],[8,6],[8,5],[15,3],[15,1],[18,2],[18,2],[18,4],[18,4],[18,4],[18,4],[18,6],[18,6],[7,5],[7,5],[7,5],[7,6],[7,6],[7,6],[7,7],[7,7],[7,7],[7,8],[7,8],[7,8],[19,1],[19,1],[19,1],[19,1],[26,3],[26,1],[24,3],[24,2],[33,2],[33,1],[35,2],[36,4],[31,2],[31,2],[9,4],[9,4],[9,4],[9,4],[9,4],[9,2],[9,2],[9,6],[9,6],[9,4],[9,4],[39,3],[39,1],[21,1],[21,1],[44,3],[45,3],[45,1],[38,3],[38,3],[38,3],[38,2],[38,4],[38,1],[50,3],[50,3],[50,3],[50,3],[50,3],[50,3],[50,3],[50,1],[51,3],[51,3],[51,3],[51,3],[51,3],[51,3],[51,1],[51,2],[51,2],[51,2],[51,1],[51,1],[68,1],[68,1],[68,1],[68,1],[68,1],[68,1],[69,2],[69,5],[65,3],[65,1],[78,1],[78,1],[78,1],[79,4],[80,4],[80,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 return this.$; 
break;
case 2:
 this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 3:
 this.$ = [$$[$0]]; 
break;
}
},
table: [{3:1,4:2,6:3,7:4,8:5,9:6,11:$V0,12:$V1,19:7,25:$V2,27:$V3,28:$V4,29:$V5,30:$V6,40:$V7,42:$V8,43:$V9},{1:[3]},{5:[1,18],6:19,7:4,8:5,9:6,11:$V0,12:$V1,19:7,25:$V2,27:$V3,28:$V4,29:$V5,30:$V6,40:$V7,42:$V8,43:$V9},o($Va,[2,3]),o($Va,[2,4]),o($Va,[2,5]),{10:[1,20]},{12:[1,21],14:[1,22],39:23},{12:[1,24],14:[1,25]},{12:[1,26],14:[1,27],39:28},{12:[1,29]},{12:[1,30]},{12:[1,31]},{12:[1,32]},o($Vb,[2,31]),o($Vb,[2,32]),o($Vb,[2,33]),o($Vb,[2,34]),{1:[2,1]},o($Va,[2,2]),o($Va,[2,6]),o($Vc,$Vd,{22:[1,33]}),{16:[1,34]},{10:[2,50],17:$Ve,20:[1,35]},{22:[1,37]},{16:[1,38]},o($Vc,$Vd,{22:[1,39]}),{16:[1,40]},{10:[2,51],17:$Ve,20:[1,41]},{13:[1,42]},{41:[1,43]},{41:[1,44]},{41:[1,45]},{12:$Vf,19:49,23:[1,46],26:47,27:$V3,28:$V4,29:$V5,30:$V6,31:48},{12:[1,51],39:52},{12:$Vg,21:53,22:$Vh,32:$Vi,38:54,44:55,49:$Vj,50:58,51:60,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},{12:[1,76]},{12:$Vf,19:49,23:[1,77],26:78,27:$V3,28:$V4,29:$V5,30:$V6,31:48},{12:[1,79]},{12:$Vf,19:49,23:[1,80],26:81,27:$V3,28:$V4,29:$V5,30:$V6,31:48},{12:[1,82],39:83},{12:$Vg,21:84,22:$Vh,32:$Vi,38:54,44:55,49:$Vj,50:58,51:60,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},{14:[1,85]},{12:$Vg,21:86,22:$Vh,32:$Vi,38:54,44:55,49:$Vj,50:58,51:60,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},{12:$Vg,21:87,22:$Vh,32:$Vi,38:54,44:55,49:$Vj,50:58,51:60,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},{12:$Vg,21:88,22:$Vh,32:$Vi,38:54,44:55,49:$Vj,50:58,51:60,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},{24:89,32:$Vs},{17:$Vt,23:[1,91]},o($Vu,[2,36]),{12:[1,93]},{12:[1,94]},o($Vc,$Vd,{22:[1,95]}),{10:[2,54],17:$Ve,20:[1,96]},{10:[2,45]},o($Vv,[2,58],{46:$Vw,47:$Vx,48:$Vy}),o($Vv,[2,59]),{12:$Vg,22:$Vh,38:100,49:$Vj,50:58,51:60,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},{19:101,27:$V3,28:$V4,29:$V5,30:$V6},o($Vz,[2,68]),{12:$Vg,22:$Vh,38:103,45:102,49:$Vj,50:58,51:60,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},o($Vz,[2,76],{52:[1,104],53:[1,105],54:[1,106],55:[1,107],56:[1,108],57:[1,109],58:[1,110],59:$VA,60:$VB,61:$VC,62:$VD,63:$VE,64:$VF}),o($VG,[2,83],{66:[1,117],67:[1,118],77:[1,119]}),{12:$Vg,51:120,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},o($VG,[2,87]),o($VG,[2,88]),o($VH,[2,98]),o($VG,[2,89]),o($VG,[2,90]),o($VG,[2,91]),o($VG,[2,92]),o($VG,[2,93]),o($VG,[2,94]),{12:[1,121]},o($VH,[2,99],{14:[1,122],22:[1,123]}),o($VH,[2,100]),o($VH,[2,101]),o($Vc,[2,56]),{24:124,32:$Vs},{17:$Vt,23:[1,125]},{22:[1,126]},{24:127,32:$Vs},{17:$Vt,23:[1,128]},o($Vc,$Vd,{22:[1,129]}),{10:[2,55],17:$Ve,20:[1,130]},{10:[2,46]},{12:$VI,15:131,16:[1,132],18:133,19:134,27:$V3,28:$V4,29:$V5,30:$V6},{10:[2,47]},{10:[2,48]},{10:[2,49]},o($Va,[2,19]),{33:136,34:[1,137],35:138,36:139,37:$VJ},{24:141,32:$Vs},{12:$Vf,19:49,27:$V3,28:$V4,29:$V5,30:$V6,31:142},o($Vu,[2,43]),o($Vu,[2,44]),{12:$Vf,19:49,23:[1,143],26:144,27:$V3,28:$V4,29:$V5,30:$V6,31:48},{12:$Vg,21:145,22:$Vh,32:$Vi,38:54,44:55,49:$Vj,50:58,51:60,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},{12:$Vg,22:$Vh,38:146,49:$Vj,50:58,51:60,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},{12:$Vg,22:$Vh,38:147,49:$Vj,50:58,51:60,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},{12:$Vg,22:$Vh,38:148,49:$Vj,50:58,51:60,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},o($Vz,[2,66]),{23:[1,149]},{17:$VK,34:[1,150]},o($VL,[2,62],{46:$Vw,47:$Vx,48:$Vy}),{12:$Vg,51:152,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},{12:$Vg,51:153,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},{12:$Vg,51:154,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},{12:$Vg,51:155,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},{12:$Vg,51:156,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},{12:$Vg,51:157,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},{12:$Vg,51:158,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},{12:$Vg,51:159,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},{12:$Vg,51:160,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},{12:$Vg,51:161,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},{12:$Vg,51:162,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},{12:$Vg,51:163,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},{12:$Vg,51:164,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},o($VG,[2,84]),o($VG,[2,85]),{12:$Vg,78:165,79:74,80:75},o($VG,[2,86]),o($VG,[2,95],{14:[1,166]}),{12:$Vg,22:$Vh,38:167,49:$Vj,50:58,51:60,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},{12:$Vg,22:$Vh,23:[1,169],38:103,45:168,49:$Vj,50:58,51:60,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},o($Va,[2,20]),{24:170,32:$Vs},{12:$Vf,19:49,23:[1,171],26:172,27:$V3,28:$V4,29:$V5,30:$V6,31:48},o($Va,[2,21]),{24:173,32:$Vs},{12:$Vf,19:49,23:[1,174],26:175,27:$V3,28:$V4,29:$V5,30:$V6,31:48},{12:$Vg,21:176,22:$Vh,32:$Vi,38:54,44:55,49:$Vj,50:58,51:60,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},{16:[1,177],17:[1,178]},o($Va,[2,8]),o($VM,[2,10]),{12:[1,179],14:[1,180]},{12:[1,181],14:[1,182]},{34:[1,183],35:184,36:139,37:$VJ},o($Va,[2,38]),o($VN,[2,40]),{10:[1,185]},{22:[1,186]},o($Va,[2,22]),o($Vu,[2,35]),{24:187,32:$Vs},{17:$Vt,23:[1,188]},{10:[2,52]},o($Vz,[2,63]),o([10,16,17,23,34,47],[2,64],{46:$Vw,48:$Vy}),o([10,16,17,23,34,47,48],[2,65],{46:$Vw}),{12:$Vg,22:$Vh,38:189,49:$Vj,50:58,51:60,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},o($Vv,[2,60]),{12:$Vg,22:$Vh,38:190,49:$Vj,50:58,51:60,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},o($Vz,[2,69],{59:$VA,60:$VB,61:$VC,62:$VD,63:$VE,64:$VF}),o($Vz,[2,70],{59:$VA,60:$VB,61:$VC,62:$VD,63:$VE,64:$VF}),o($Vz,[2,71],{59:$VA,60:$VB,61:$VC,62:$VD,63:$VE,64:$VF}),o($Vz,[2,72],{59:$VA,60:$VB,61:$VC,62:$VD,63:$VE,64:$VF}),o($Vz,[2,73],{59:$VA,60:$VB,61:$VC,62:$VD,63:$VE,64:$VF}),o($Vz,[2,74],{59:$VA,60:$VB,61:$VC,62:$VD,63:$VE,64:$VF}),o($Vz,[2,75],{59:$VA,60:$VB,61:$VC,62:$VD,63:$VE,64:$VF}),o($VO,[2,77],{61:$VC,62:$VD,63:$VE,64:$VF}),o($VO,[2,78],{61:$VC,62:$VD,63:$VE,64:$VF}),o($VP,[2,79],{64:$VF}),o($VP,[2,80],{64:$VF}),o($VP,[2,81],{64:$VF}),o($VG,[2,82]),o($VH,[2,97]),{12:$Vg,22:$Vh,38:191,49:$Vj,50:58,51:60,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},{16:[1,192],46:$Vw,47:$Vx,48:$Vy},{17:$VK,23:[1,193]},o($VH,[2,104]),o($Va,[2,23]),{24:194,32:$Vs},{17:$Vt,23:[1,195]},o($Va,[2,24]),{24:196,32:$Vs},{17:$Vt,23:[1,197]},{10:[2,53]},o($Va,[2,7]),{12:$VI,18:198,19:134,27:$V3,28:$V4,29:$V5,30:$V6},o($VM,[2,11],{20:[1,199]}),{16:[1,200]},o($VM,[2,12],{20:[1,201]}),{16:[1,202]},o($Va,[2,37]),o($VN,[2,39]),o($VN,[2,41]),{12:$Vg,22:$Vh,38:203,49:$Vj,50:58,51:60,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},o($Va,[2,25]),{24:204,32:$Vs},o($Vz,[2,67]),o($VL,[2,61],{46:$Vw,47:$Vx,48:$Vy}),{16:[1,205],46:$Vw,47:$Vx,48:$Vy},o($VH,[2,102]),o($VH,[2,103]),o($Va,[2,26]),{24:206,32:$Vs},o($Va,[2,27]),{24:207,32:$Vs},o($VM,[2,9]),{12:$Vg,21:208,22:$Vh,32:$Vi,38:54,44:55,49:$Vj,50:58,51:60,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},{12:[1,209]},{12:$Vg,21:210,22:$Vh,32:$Vi,38:54,44:55,49:$Vj,50:58,51:60,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},{12:[1,211]},{23:[1,212],46:$Vw,47:$Vx,48:$Vy},o($Va,[2,28]),o($VG,[2,96]),o($Va,[2,29]),o($Va,[2,30]),o($VM,[2,13]),o($VM,[2,15],{20:[1,213]}),o($VM,[2,14]),o($VM,[2,16],{20:[1,214]}),{10:[2,42]},{12:$Vg,21:215,22:$Vh,32:$Vi,38:54,44:55,49:$Vj,50:58,51:60,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},{12:$Vg,21:216,22:$Vh,32:$Vi,38:54,44:55,49:$Vj,50:58,51:60,60:$Vk,65:61,68:63,69:64,70:$Vl,71:$Vm,72:$Vn,73:$Vo,74:$Vp,75:$Vq,76:$Vr,78:65,79:74,80:75},o($VM,[2,17]),o($VM,[2,18])],
defaultActions: {18:[2,1],53:[2,45],84:[2,46],86:[2,47],87:[2,48],88:[2,49],145:[2,52],176:[2,53],212:[2,42]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

   
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"ranges":true,"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip comments */
break;
case 1:this.begin('comment');
break;
case 2:this.popState();
break;
case 3:/* skip comment content */
break;
case 4:/* skip whitespace */
break;
case 5:return  'RNULL'
break;
case 6:return  'RINTEGER'
break;
case 7:return  'RDOUBLE'
break;
case 8:return  'RCHAR'
break;
case 9:return  'RBOOLEAN'
break;
case 10:return  'RIMPORT'
break;
case 11:return  'RVAR'
break;
case 12:return  'RCONST'
break;
case 13:return  'RGLOBAL'
break;
case 14:return  'RTRUE'
break;
case 15:return  'RFALSE'
break;
case 16:return  'RIF'
break;
case 17:return  'RELSE'
break;
case 18:return  'RSWITCH'
break;
case 19:return  'RCASE'
break;
case 20:return  'RDEFAULT'
break;
case 21:return  'RBREAK'
break;
case 22:return  'RCONTINUE'
break;
case 23:return  'RRETURN'
break;
case 24:return  'RPRINT'
break;
case 25:return  'RPUBLIC'
break;
case 26:return  'RPRIVATE'
break;
case 27:return  'RVOID'
break;
case 28:return  'RFOR'
break;
case 29:return  'RWHILE'
break;
case 30:return  'RDEFINE'
break;
case 31:return  'RAS'
break;
case 32:return  'RSTRC'
break;
case 33:return  'RDO'
break;
case 34:return  'RTRY'
break;
case 35:return  'RCATCH'
break;
case 36:return  'RTHROW'
break;
case 37:return  'LIT_DOUBLE'
break;
case 38:return  'LIT_INTEGER'
break;
case 39:return  'ID'
break;
case 40:return 73
break;
case 41:return 71
break;
case 42:return  'POR'
break;
case 43:return  'DIV'
break;
case 44:return  'MENOS'
break;
case 45:return  'MAS'
break;
case 46:return  'POT'
break;
case 47:return  'MOD'
break;
case 48:return  'MAYORIGUAL'
break;
case 49:return  'MENORIGUAL'
break;
case 50:return  'IGUALQUE'
break;
case 51:return  'IGUALREF'
break;
case 52:return  'MENOR'
break;
case 53:return  'MAYOR'
break;
case 54:return  'DIFERENTE'
break;
case 55:return  'IGUAL'
break;
case 56:return  'AND'
break;
case 57:return  'OR'
break;
case 58:return  'NOT'
break;
case 59:return  'XOR'
break;
case 60:return  'TERNARIO'
break;
case 61:return  'INCREMENTO'
break;
case 62:return  'DECREMENTO'
break;
case 63:return  'PARIZQ'
break;
case 64:return  'PARDER'
break;
case 65:return  'CORIZQ'
break;
case 66:return  'CORDER'
break;
case 67:return  'LLAVEIZQ'
break;
case 68:return  'LLAVEDER'
break;
case 69:return  'DOSPTIGUAL'
break;
case 70:return  'IGUAL'
break;
case 71:return  'PTCOMA'
break;
case 72:return  'DOSPT'
break;
case 73:return  'COMA'
break;
case 74:return  'PUNTO'
break;
case 75:return  'EOF'
break;
case 76:return  'INVALID'
break;
}
},
rules: [/^(?:\/\/.*)/i,/^(?:\/\*)/i,/^(?:\*\/)/i,/^(?:.)/i,/^(?:\s+)/i,/^(?:null\b)/i,/^(?:integer\b)/i,/^(?:double\b)/i,/^(?:char\b)/i,/^(?:boolean\b)/i,/^(?:import\b)/i,/^(?:var\b)/i,/^(?:const\b)/i,/^(?:global\b)/i,/^(?:true\b)/i,/^(?:false\b)/i,/^(?:if\b)/i,/^(?:else\b)/i,/^(?:switch\b)/i,/^(?:case\b)/i,/^(?:default\b)/i,/^(?:break\b)/i,/^(?:continue\b)/i,/^(?:return\b)/i,/^(?:print\b)/i,/^(?:public\b)/i,/^(?:private\b)/i,/^(?:void\b)/i,/^(?:for\b)/i,/^(?:while\b)/i,/^(?:define\b)/i,/^(?:as\b)/i,/^(?:strc\b)/i,/^(?:do\b)/i,/^(?:try\b)/i,/^(?:catch\b)/i,/^(?:throw\b)/i,/^(?:[0-9]+(\.[0-9]+)\b)/i,/^(?:[0-9]+\b)/i,/^(?:[a-zA-Z_ñ]([a-zA-Z0-9_Ñ]*))/i,/^(?:(")([^\\"]|\\.)*("))/i,/^(?:(')([^\\']|\\n|\\t|\\r|\\)('))/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:-)/i,/^(?:\+)/i,/^(?:\^\^)/i,/^(?:%)/i,/^(?:>=)/i,/^(?:<=)/i,/^(?:==)/i,/^(?:===)/i,/^(?:<)/i,/^(?:>)/i,/^(?:!=)/i,/^(?:=)/i,/^(?:%%)/i,/^(?:\|\|)/i,/^(?:!)/i,/^(?:\^)/i,/^(?:\?)/i,/^(?:\+\+)/i,/^(?:--)/i,/^(?:\()/i,/^(?:\))/i,/^(?:\[)/i,/^(?:\])/i,/^(?:\{)/i,/^(?:\})/i,/^(?::=)/i,/^(?:=)/i,/^(?:;)/i,/^(?::)/i,/^(?:,)/i,/^(?:\.)/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"comment":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76],"inclusive":true},"INITIAL":{"rules":[0,1,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = GramaticaJSharp;
exports.Parser = GramaticaJSharp.Parser;
exports.parse = function () { return GramaticaJSharp.parse.apply(GramaticaJSharp, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}