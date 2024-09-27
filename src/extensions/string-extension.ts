  String.prototype.toCapitalize=function(){
         return this.replace(/\b[a-z]/g,(match)=>match.toUpperCase())
  }    
  String.prototype.toCongest=function(){
         return this.toLowerCase().replace(/\s+/g,"")
  }    