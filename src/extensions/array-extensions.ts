Array.prototype.toMonthSort=function<T>(this:T[]){
    console.log(this,"this");
    
    const monthOrder = [
        "January", "Febuary", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
    
      return  this.sort((a, b) => {
        const indexA = monthOrder.indexOf(a as string);
        const indexB = monthOrder.indexOf(b  as string);
    
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
    
        return indexA - indexB;
      });


}