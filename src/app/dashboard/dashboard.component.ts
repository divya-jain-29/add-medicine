import { Component, Input, OnInit } from '@angular/core';
import { UtilService } from '../util.service';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {ActionModalComponent} from '../action-modal/action-modal.component';
import {DeleteConfirmationDialogComponent} from '../delete-confirmation-dialog/delete-confirmation-dialog.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public Items:{ medicineid: number; medicineName: string; description: string; quantity: number; price: number; }[];
  modalOptions:NgbModalOptions;
  closeResult: string;

  constructor(private utilService:  UtilService, private modalService: NgbModal) {
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
   }

  ngOnInit(): void {
    this.fetchMedicines();
    console.log("data",this.Items);
  }
  fetchMedicines(){
    this.Items = this.utilService.fetchAllMedicine();
  }

  openActionModal(modelFunction,medicine) {
    const modalRef = this.modalService.open(ActionModalComponent);
    modalRef.componentInstance.modelFunction = modelFunction;
    modalRef.componentInstance.inputMedicine = medicine;
    modalRef.componentInstance.updateDone.subscribe((receivedEntry) => {if(receivedEntry){
      this.fetchMedicines();}
    })
  }

  openDeleteMedicineDialog(medicine)
  {
    const modalRef = this.modalService.open(DeleteConfirmationDialogComponent);
    modalRef.componentInstance.medicine = medicine;
    modalRef.componentInstance.deleteDone.subscribe((receivedEntry) => {if(receivedEntry){
      this.fetchMedicines();}
    })
  }

}
