declare var require: any;
let fs = require('fs');
let jison = require('jison');

var bnf = fs.readFileSync("Gramatica3D.jison","utf8");
var parser = new jison.Parser(bnf);

export class Parser{
    parser = jison.Parser(bnf);
}