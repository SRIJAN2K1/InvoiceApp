import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-createinvoice',
  templateUrl: './createinvoice.component.html',
  styleUrls: ['./createinvoice.component.css']
})
export class CreateinvoiceComponent implements OnInit {
  constructor(private builder: FormBuilder, private service: ServiceService, private router: Router, private alert: ToastrService,
    private activeroute: ActivatedRoute) { }
  pagetitle = "Create Invoice"
  invoicedetail !: FormArray<any>;
  invoiceproduct !: FormGroup<any>;

  mastercustomer: any;
  masterproduct: any;
  editinvoiceno: any;
  isedit = false;
  editinvdetail: any;

  ngOnInit(): void {
    this.GetCustomers();
    this.GetProducts();

    this.editinvoiceno = this.activeroute.snapshot.paramMap.get('invoiceno');
    if (this.editinvoiceno != null) {
      this.pagetitle = "Edit Invoice";
      this.isedit = true;
    }

  }

  invoiceform = this.builder.group({
    invoiceNo: this.builder.control('', Validators.required),
    customerId: this.builder.control('', Validators.required),
    name: this.builder.control(''),
    deliveryAddress: this.builder.control(''),
    remarks: this.builder.control(''),
    total: this.builder.control({ value: 0, disabled: true }),
    tax: this.builder.control({ value: 0, disabled: true }),
    netTotal: this.builder.control({ value: 0, disabled: true }),
    details: this.builder.array([])

  });
  SaveInvoice() {
    if (this.invoiceform.valid) {
      this.service.SaveInvoice(this.invoiceform.getRawValue()).subscribe((res:any) => {
        let result: any;
        result = res;
        if (result.result == 'pass') {
          if(this.isedit){
            this.alert.success('Updated Successfully.', 'Invoice :' + result.kyValue);
          }else{
          this.alert.success('Created Successfully.', 'Invoice :' + result.kyValue);
          }
          this.router.navigate([""]);
        } else {
          this.alert.error('Failed to save.', 'Invoice');
        }
      });
    } else {
      this.alert.warning('Please enter values in all mandatory filed', 'Validation');
    }

  }

  addnewproduct() {
    this.invoicedetail = this.invoiceform.get("details") as FormArray;

    let customercode = this.invoiceform.get("customerId")?.value;
    if ((customercode != null && customercode != '')  || this.isedit) {
      this.invoicedetail.push(this.Generaterow());
    } else {
      this.alert.warning('Please select the customer', 'Validation');
    }
  }

  get invproducts() {
    return this.invoiceform.get("details") as FormArray;
  }

  Generaterow() {
    return this.builder.group({
      invoiceNo: this.builder.control(''),
      productCode: this.builder.control('', Validators.required),
      productName: this.builder.control(''),
      qty: this.builder.control(1),
      salesPrice: this.builder.control(0),
      total: this.builder.control({ value: 0, disabled: true })
    });
  }


  GetCustomers() {
    this.mastercustomer = [{"code":"202201","name":"Happy","address":"LA",
    "phoneno":"988934223","statusName":"Active"},
    {"code":"202203","name":"Siri","address":"NY",
    "phoneno":"98344534223","statusName":"Active"},
    {"code":"202204","name":"Ashley","address":"CA",
    "phoneno":"9824211223","statusName":"Active"}
  ];
  
  }

  GetProducts() {
    this.masterproduct = [{"code":"T001","name":"Shorts","price":140,
    "category":2,"productImage":"Active","remarks":"Softball Team","variants":null},
    {"code":"T002","name":"Jumpers","price":200,
    "category":2,"productImage":"Active","remarks":"Team Blue","variants":null},
    {"code":"T003","name":"Shirt","price":250,
    "category":2,"productImage":"Active","remarks":"Hand Ball","variants":null}
  ];
    
  }

  customerchange() {
    let customercode = this.invoiceform.get("customerId")?.value;
    console.log(customercode +" having fun")
   
    for(let i of this.mastercustomer){
      if(i.code==customercode){
        return i;
      }
    }
  }

  

  Itemcalculation(index: any) {
    this.invoicedetail = this.invoiceform.get("details") as FormArray;
    this.invoiceproduct = this.invoicedetail.at(index) as FormGroup;
    let qty = this.invoiceproduct.get("qty")?.value;
    let price = this.invoiceproduct.get("salesPrice")?.value;
    let total = qty * price;
    this.invoiceproduct.get("total")?.setValue(total);

    this.summarycalculation();
  }
  Removeproduct(index: any){
    if(confirm('Do you want to remove?')){
      this.invproducts.removeAt(index);
      this.summarycalculation();

    }
  }

  summarycalculation() {
    let array = this.invoiceform.getRawValue().details;
    let sumtotal = 0
    array.forEach((x: any) => {
      sumtotal = sumtotal + x.total;
    });

    // tax calculation
    let sumtax = (7 / 100) * sumtotal;
    let nettotal = sumtotal + sumtax;

    this.invoiceform.get("total")?.setValue(sumtotal);
    this.invoiceform.get("tax")?.setValue(sumtax);
    this.invoiceform.get("netTotal")?.setValue(nettotal);
  }



}