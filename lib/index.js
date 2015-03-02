/*
 * biojs-io-vcfparser
 * https://github.com/prasunanand/biojs-io-vcfparser
 *
 * Copyright (c) 2014 Prasun Anand
 * Licensed under the Apache 2 license.
 */

var vcfParser = {};
module.exports=vcfParser;

var obj = {};
    obj.meta=[];
    obj.sequences = [];


vcfParser.parseVCF= function(vcfText) {
    this.readVCFMeta(vcfText);
    this.readVCFSequence(vcfText);
	return JSON.stringify(obj);
 }

vcfParser.readVCFMeta= function(vcfText) {
    var lines = vcfText.split(/\n/g),
        currentline,
        i = 0,
        j;
    while (i < lines.length) 
    	{
    		metaInfo={};
	        if ("fileformat" === lines[i].slice(2,12)) {
	        	fileFormat=lines[i].slice(13);
	            metaInfo['fileFormat']=fileFormat;
	        } 
	        else if ("fileDate" === lines[i].slice(2, 10)) {
	        	fileDate=lines[i].slice(11);
	           	metaInfo['fileDate']=fileDate;
	        } 
	        else if ("source" === lines[i].slice(2, 8)) {
	        	source=lines[i].slice(9);
	           	metaInfo['source']=source;
	        } 
	        else if ("reference" === lines[i].slice(2, 11)) {
	        	reference=lines[i].slice(12);
	           	metaInfo['reference']=reference;
	        } 
	        else if ("ALT" === lines[i].slice(2, 5)) {
	        	alt=lines[i].slice(6);
	           	metaInfo['ALT']=alt;
	        }
	        else if ("contig" === lines[i].slice(2, 8)) {
	        	contig=lines[i].slice(9);
	           	metaInfo['contig']=contig;
	        } 
	        else if ("PEDIGREE" === lines[i].slice(2, 10)) {
	        	pedigree=lines[i].slice(11);
	           	metaInfo['PEDIGREE']=pedigree;
	        } 
	        else if ("SAMPLE" === lines[i].slice(2, 8)) {
	        	sample=lines[i].slice(9);
	           	metaInfo['SAMPLE']=sample;
	        } 
	        else if ("phasing" === lines[i].slice(2, 9)) {
	        	phasing=lines[i].slice(10);
	           	metaInfo['phasing']=phasing;
	        } 
	        else if ("INFO" === lines[i].slice(2, 6)) {
	        	info=lines[i].slice(7);
	           	metaInfo['info']=info;
	        } 
	        else if ("FILTER" === lines[i].slice(2, 8)) {
	        	filter=lines[i].slice(9);
	           	metaInfo['FILTER']=filter;
	        }
	        else if ("FORMAT" === lines[i].slice(2, 8)) {
	      	  	format=lines[i].slice(9);
	           	metaInfo['FORMAT']=format;
	        }
	        else if ("assembly" === lines[i].slice(2, 10)) {
	        	assembly=lines[i].slice(11);
	           	metaInfo['assembly']=assembly;
	        }
	        else if ("CHROM" === lines[i].slice(1, 6)) {
	        	return obj.meta;
	        }
			i += 1;
	        obj.meta.push(metaInfo);
		}
	return obj.meta;
}

vcfParser.readVCFSequence= function(vcfText) {
    var lines = vcfText.split(/\n/g),
    i = 0;
    while (i < lines.length) {
    	sequence={}
        if ("CHROM" === lines[i].slice(1, 6)) {
        	rowHead=lines[i].split(/\t/);
        	columns=rowHead.length;
 			j=i+1;
 			while(j<lines.length){
 				row=lines[j].split(/\t/);
 				k=0;
 				while(k < columns){
	        		sequence[rowHead[k]]=row[k];
	        		k+=1;
	        	}
	        	obj.sequences.push(sequence);
 				j+=1;
 			}
        }
        i += 1;
    }
    // obj.sequence = sequence;
    // return JSON.stringify(obj);
    return obj.sequences;
}



console.log(vcfParser);
fs=require('fs');
fs.readFile(__dirname + '/volvox.test.vcf','utf8',function(err,data) {
result=vcfParser.parseVCF(data);
console.log(result);
});