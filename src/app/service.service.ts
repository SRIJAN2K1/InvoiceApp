import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  inv:any=[];xyz={"1017":"Siri","1018":"Happy","1019":"Ashley"};
  constructor(private http: HttpClient) { }


  GetAllInvoice(){
    return this.inv;
    
  }

  RemoveInvoice(invoiceno:any){
    for(let i of this.inv){
      if(i.invoiceNo==invoiceno){
        this.inv.pop(i);
      }
    }
    
  }
count=0;
  SaveInvoice(invoicedata:any){console.log(invoicedata);
   
    console.log(" example");
    this.inv.push(invoicedata);
    console.log(this.inv);
    if(this.count>0){
      this.inv[this.count].name="Ashley";
    }
    if(this.count==0){
      this.inv[0].name="Siri";
    }
    this.count++;
    return this.inv;
    
  }




}
