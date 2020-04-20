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
var Gramatica3D = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,20],$V1=[1,13],$V2=[1,19],$V3=[1,12],$V4=[1,14],$V5=[1,15],$V6=[1,16],$V7=[1,17],$V8=[1,18],$V9=[5,16,17,19,25,28,31,32,34,36,39],$Va=[1,44],$Vb=[1,42],$Vc=[1,43],$Vd=[1,45],$Ve=[1,46],$Vf=[8,24,30,42,43,44,45,46,47,48,49,50,51],$Vg=[17,41,42];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"INI":3,"LISTA_SENT":4,"EOF":5,"SENT":6,"DECLARA_VAR":7,"PTCOMA":8,"ASIG":9,"JUMPC":10,"JUMPIC":11,"DECLARA_FUN":12,"PRINT":13,"DIRECCION":14,"CALLFUN":15,"RCALL":16,"ID":17,"DOSPT":18,"RPRINT":19,"PARIZQ":20,"CAD":21,"COMA":22,"A":23,"PARDER":24,"RVAR":25,"IGUAL":26,"E":27,"RSTACK":28,"CORIZQ":29,"CORDER":30,"RHEAP":31,"RIF":32,"ER":33,"RGOTO":34,"OPR":35,"RPROC":36,"BLOCK3D":37,"RBEGIN":38,"REND":39,"OPA":40,"NUMBER":41,"MENOS":42,"MAS":43,"POR":44,"DIV":45,"MENOR":46,"MAYOR":47,"MENORIGUAL":48,"MAYORIGUAL":49,"IGUALQUE":50,"DIFERENTE":51,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"PTCOMA",16:"RCALL",17:"ID",18:"DOSPT",19:"RPRINT",20:"PARIZQ",21:"CAD",22:"COMA",24:"PARDER",25:"RVAR",26:"IGUAL",28:"RSTACK",29:"CORIZQ",30:"CORDER",31:"RHEAP",32:"RIF",34:"RGOTO",36:"RPROC",38:"RBEGIN",39:"REND",41:"NUMBER",42:"MENOS",43:"MAS",44:"POR",45:"DIV",46:"MENOR",47:"MAYOR",48:"MENORIGUAL",49:"MAYORIGUAL",50:"IGUALQUE",51:"DIFERENTE"},
productions_: [0,[3,2],[4,2],[4,1],[6,2],[6,2],[6,2],[6,2],[6,1],[6,2],[6,1],[6,2],[15,2],[14,2],[13,6],[7,2],[7,4],[9,3],[9,6],[9,6],[10,6],[11,2],[33,3],[12,3],[37,3],[37,2],[27,3],[27,4],[27,4],[27,1],[23,1],[23,1],[23,2],[23,2],[40,1],[40,1],[40,1],[40,1],[35,1],[35,1],[35,1],[35,1],[35,1],[35,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 return this.$; 
break;
case 2:
 this.$ = $$[$0-1]; this.$.push($$[$0-1]); 
break;
case 3:
 this.$ = [$$[$0]]; 
break;
case 4:
 this.$ = $$[$0-1]; 
break;
case 15:
 this.$ = new Declaracion($$[$0],null,_$[$0-1].first_line,_$[$0-1].firs_column); 
break;
}
},
table: [{3:1,4:2,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:$V0,17:$V1,19:$V2,25:$V3,28:$V4,31:$V5,32:$V6,34:$V7,36:$V8},{1:[3]},{5:[1,21],6:22,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:$V0,17:$V1,19:$V2,25:$V3,28:$V4,31:$V5,32:$V6,34:$V7,36:$V8},o($V9,[2,3]),{8:[1,23]},{8:[1,24]},{8:[1,25]},{8:[1,26]},o($V9,[2,8]),{8:[1,27]},o($V9,[2,10]),{8:[1,28]},{17:[1,29]},{18:[1,31],26:[1,30]},{29:[1,32]},{29:[1,33]},{20:[1,34]},{17:[1,35]},{17:[1,36]},{20:[1,37]},{17:[1,38]},{1:[2,1]},o($V9,[2,2]),o($V9,[2,4]),o($V9,[2,5]),o($V9,[2,6]),o($V9,[2,7]),o($V9,[2,9]),o($V9,[2,11]),{8:[2,15],26:[1,39]},{17:$Va,23:41,27:40,28:$Vb,31:$Vc,41:$Vd,42:$Ve},o($V9,[2,13]),{17:$Va,23:47,41:$Vd,42:$Ve},{17:$Va,23:48,41:$Vd,42:$Ve},{17:$Va,23:50,33:49,41:$Vd,42:$Ve},{8:[2,21]},{37:51,38:[1,52]},{21:[1,53]},{8:[2,12]},{17:$Va,23:41,27:54,28:$Vb,31:$Vc,41:$Vd,42:$Ve},{8:[2,17]},{8:[2,29],40:55,42:[1,57],43:[1,56],44:[1,58],45:[1,59]},{29:[1,60]},{29:[1,61]},o($Vf,[2,30]),o($Vf,[2,31]),{17:[1,63],41:[1,62]},{30:[1,64]},{30:[1,65]},{24:[1,66]},{35:67,46:[1,68],47:[1,69],48:[1,70],49:[1,71],50:[1,72],51:[1,73]},o($V9,[2,23]),{4:74,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:$V0,17:$V1,19:$V2,25:$V3,28:$V4,31:$V5,32:$V6,34:$V7,36:$V8,39:[1,75]},{22:[1,76]},{8:[2,16]},{17:$Va,23:77,41:$Vd,42:$Ve},o($Vg,[2,34]),o($Vg,[2,35]),o($Vg,[2,36]),o($Vg,[2,37]),{17:$Va,23:78,41:$Vd,42:$Ve},{17:$Va,23:79,41:$Vd,42:$Ve},o($Vf,[2,32]),o($Vf,[2,33]),{26:[1,80]},{26:[1,81]},{34:[1,82]},{17:$Va,23:83,41:$Vd,42:$Ve},o($Vg,[2,38]),o($Vg,[2,39]),o($Vg,[2,40]),o($Vg,[2,41]),o($Vg,[2,42]),o($Vg,[2,43]),{6:22,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:$V0,17:$V1,19:$V2,25:$V3,28:$V4,31:$V5,32:$V6,34:$V7,36:$V8,39:[1,84]},o($V9,[2,25]),{17:$Va,23:85,41:$Vd,42:$Ve},{8:[2,26]},{30:[1,86]},{30:[1,87]},{17:$Va,23:88,41:$Vd,42:$Ve},{17:$Va,23:89,41:$Vd,42:$Ve},{17:[1,90]},{24:[2,22]},o($V9,[2,24]),{24:[1,91]},{8:[2,27]},{8:[2,28]},{8:[2,18]},{8:[2,19]},{8:[2,20]},{8:[2,14]}],
defaultActions: {21:[2,1],35:[2,21],38:[2,12],40:[2,17],54:[2,16],77:[2,26],83:[2,22],86:[2,27],87:[2,28],88:[2,18],89:[2,19],90:[2,20],91:[2,14]},
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

   var Declaracion = require('../app/Interprete3D/Instruccion/Declaracion').Declaracion;
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
options: {"ranges":true},
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
case 4:this.begin('string');
break;
case 5:return 21;
break;
case 6:this.popState();
break;
case 7:/* skip whitespace */
break;
case 8:return  'RVAR'
break;
case 9:return  'RGOTO'
break;
case 10:return  'RIF'
break;
case 11:return  'RIFFALSE'
break;
case 12:return  'RPROC'
break;
case 13:return  'RBEGIN'
break;
case 14:return  'REND'
break;
case 15:return  'RCALL'
break;
case 16:return  'RPRINT'
break;
case 17:return  'RHEAP'
break;
case 18:return  'RSTACK'
break;
case 19:return  'NUMBER'
break;
case 20:return  'ID'
break;
case 21:return  'POR'
break;
case 22:return  'DIV'
break;
case 23:return  'MENOS'
break;
case 24:return  'MAS'
break;
case 25:return  'MAYORIGUAL'
break;
case 26:return  'MENORIGUAL'
break;
case 27:return  'IGUALQUE'
break;
case 28:return  'MENOR'
break;
case 29:return  'MAYOR'
break;
case 30:return  'DIFERENTE'
break;
case 31:return  'IGUAL'
break;
case 32:return  'PARIZQ'
break;
case 33:return  'PARDER'
break;
case 34:return  'CORIZQ'
break;
case 35:return  'CORDER'
break;
case 36:return  'PTCOMA'
break;
case 37:return  'DOSPT'
break;
case 38:return  'COMA'
break;
case 39:return  'EOF'
break;
case 40:return  'INVALID'
break;
}
},
rules: [/^(?:#.*)/,/^(?:#\*)/,/^(?:\*#)/,/^(?:.)/,/^(?:["])/,/^(?:[[%][d]|[[%][c]|[%][e])/,/^(?:["])/,/^(?:\s+)/,/^(?:var\b)/,/^(?:goto\b)/,/^(?:if\b)/,/^(?:ifFalse\b)/,/^(?:proc\b)/,/^(?:begin\b)/,/^(?:end\b)/,/^(?:call\b)/,/^(?:print\b)/,/^(?:heap\b)/,/^(?:stack\b)/,/^(?:[0-9]+(\.[0-9]+)?\b)/,/^(?:[a-zA-Z_ñ]([a-zA-Z0-9_Ñ]*))/,/^(?:\*)/,/^(?:\/)/,/^(?:-)/,/^(?:\+)/,/^(?:>=)/,/^(?:<=)/,/^(?:==)/,/^(?:<)/,/^(?:>)/,/^(?:!=)/,/^(?:=)/,/^(?:\()/,/^(?:\))/,/^(?:\[)/,/^(?:\])/,/^(?:;)/,/^(?::)/,/^(?:,)/,/^(?:$)/,/^(?:.)/],
conditions: {"string":{"rules":[0,1,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40],"inclusive":true},"comment":{"rules":[0,1,2,3,4,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40],"inclusive":true},"INITIAL":{"rules":[0,1,4,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40],"inclusive":true}}
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
exports.parser = Gramatica3D;
exports.Parser = Gramatica3D.Parser;
exports.parse = function () { return Gramatica3D.parse.apply(Gramatica3D, arguments); };
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