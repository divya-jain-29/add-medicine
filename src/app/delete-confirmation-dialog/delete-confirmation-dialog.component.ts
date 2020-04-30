import { Component, OnInit , Input,Output,EventEmitter} from '@angular/core';
import { UtilService } from '../util.service';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.css']
})
export class DeleteConfirmationDialogComponent implements OnInit {

  @Output() deleteDone: EventEmitter<any> = new EventEmitter();

  @Input() medicine;

  constructor(public activeModal: NgbActiveModal,private utilService:  UtilService) { }

  ngOnInit(): void {
  }

  deleteMedicine(){
    this.utilService.deleteMedicine(this.medicine);
    this.sendUpdateToDashboard();
    this.activeModal.close(false);
  }

  sendUpdateToDashboard(){
    this.deleteDone.emit(true);
  }

  decline(){
    this.activeModal.close(false);
  }

}
