import { Component, OnInit , Input,Output,EventEmitter} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormControl,FormBuilder,FormsModule,Validators,ReactiveFormsModule } from '@angular/forms';
import { UtilService } from '../util.service';


@Component({
  selector: 'app-action-modal',
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.css']
})
export class ActionModalComponent implements OnInit {

  medicineId:number;
  medName:string;
  desription:string;
  quantity:number;
  price:number;
  btnName:string;
  actionButtonclass:string;
  medicineForm;
  submitted = false;
  @Output() updateDone: EventEmitter<any> = new EventEmitter();

  @Input() modelFunction;
  @Input() inputMedicine;
  constructor(public activeModal: NgbActiveModal,private utilService:  UtilService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.medicineForm = this.formBuilder.group({
      medName: ['', Validators.required],
      desription: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required]
    });
  
    if(this.modelFunction == 'Add')
    {
      this.btnName = "Add Medicine";
      this.actionButtonclass = "btn-success";
    }
    else if(this.modelFunction =='Edit')
    {
      this.btnName = "Edit Medicine";
      this.medicineId = this.inputMedicine.medicineid;
      this.medName = this.inputMedicine.medicineName;
      this.desription = this.inputMedicine.description;
      this.quantity = this.inputMedicine.quantity;
      this.price = this.inputMedicine.price;
      this.actionButtonclass = "btn-dark";
    }
    else{
      this.btnName = "Clone Medicine";
      this.medicineId = this.inputMedicine.medicineId;
      this.medName = "Copy Of "+this.inputMedicine.medicineName;
      this.desription = this.inputMedicine.description;
      this.quantity = this.inputMedicine.quantity;
      this.price = this.inputMedicine.price;
      this.actionButtonclass = "btn-info";
    }
  }

  get errrorFunction() { return this.medicineForm.controls; }

  doAction(){
    let medicine =
    {"medicineid":this.medicineId,
    "medicineName": this.medName,
    "description":this.desription,
    "quantity":this.quantity,
    "price" :this.price};

    this.submitted = true;

    if (this.medicineForm.invalid) {
      return;
    }
    if(this.modelFunction == 'Add')
    {
      this.addNewMedicine(medicine);
    }
    else if(this.modelFunction == 'Edit')
    {
      this.editMedicine(medicine);
    }
    else{
      this.cloneMedicine(medicine);
    }
    this.sendUpdateToDashboard();
    this.activeModal.close(false);
  }

  addNewMedicine(newMedicine){
    this.utilService.addMedicine(newMedicine);
  }
  editMedicine(updatedMedicine){
    this.utilService.editMedicine(updatedMedicine);
  }
  cloneMedicine(clonedMedicine){
    this.utilService.cloneMedicine(clonedMedicine);
  }

  sendUpdateToDashboard(){
    this.updateDone.emit(true);
  }


}
