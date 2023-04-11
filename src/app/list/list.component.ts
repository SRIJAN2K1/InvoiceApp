import { Component, ElementRef, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ViewChild } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  constructor(private service: ServiceService, private alert: ToastrService, private router: Router, private modalservice: NgbModal) { }

  @ViewChild('content') popupview !: ElementRef;

  Invoiceheader: any;
  pdfurl = '';
  invoiceno: any;
  dtoptions: DataTables.Settings = {};
  dtTrigger:Subject<any>=new Subject<any>();

  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching:true,
    lengthChange:false,
    language:{
      searchPlaceholder:'Text Customer'
    }

    };
    this.LoadInvoice();
  }

  LoadInvoice() {
     this.Invoiceheader=this.service.GetAllInvoice();
   
  }


  invoiceremove(invoiceno: any) {
    this.service.RemoveInvoice(invoiceno);
    
  }



}
