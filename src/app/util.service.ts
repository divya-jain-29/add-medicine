import { Injectable } from '@angular/core';

// import * as data from './medicine-response.json';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  jsonData = [
    {
        "medicineid": 1,
        "medicineName": "Aspirin : 80 mg",
        "description": "Aspirin is a salicylate (sa-LIS-il-ate). It works by reducing substances in the body that cause pain, fever, and inflammation. Aspirin is used to treat pain, and reduce fever or inflammation",
        "quantity": 50,
        "price": 200
    },
    {
        "medicineid": 2,
        "medicineName": "Theophylline : 200 mg",
        "description": "It is a methylxanthine drug used in therapy for respiratory diseases such as chronic obstructive pulmonary disease (COPD) and asthma",
        "quantity": 20,
        "price": 300
    },
    {
        "medicineid": 3,
        "medicineName": "Tetracycline : 250mg",
        "description": "Tetracycline is an antibiotic that fights infection caused by bacteria. Tetracycline is used to treat many different bacterial infections of the skin, intestines, respiratory tract etc.",
        "quantity": 20,
        "price": 1200
    },
    {
        "medicineid": 4,
        "medicineName": "Cefadroxil : 250mg",
        "description": "Cefadroxil is used to treat certain infections caused by bacteria such as infections of the skin, throat, tonsils, and urinary tract.",
        "quantity": 10,
        "price": 800
    },
    {
        "medicineid": 5,
        "medicineName": "Chloroquine Phosphate : 250mg",
        "description": "Chloroquine is a medication primarily used to prevent and treat malaria in areas where malaria remains sensitive to its effects. ",
        "quantity": 10,
        "price": 220
    },
    {
        "medicineid": 6,
        "medicineName": "Chlorpromazine : 100mg",
        "description": "Chlorpromazine is a phenothiazine (FEEN-oh-THYE-a-zeen) that is used to treat psychotic disorders such as schizophrenia or manic-depression in adults.",
        "quantity": 2,
        "price": 200
    },
    {
        "medicineid": 7,
        "medicineName": "Diosmin",
        "description": "Diosmin is used for treating various disorders of blood vessels including hemorrhoids, varicose veins, poor circulation in the legs (venous stasis), and bleeding (hemorrhage) in the eye or gums.",
        "quantity": 8,
        "price": 1120
    },
    {
        "medicineid": 8,
        "medicineName": "Salbutamol",
        "description": " It is used to treat asthma, including asthma attacks, exercise-induced bronchoconstriction, and chronic obstructive pulmonary disease (COPD).",
        "quantity": 10,
        "price": 280
    },
    {
        "medicineid": 9,
        "medicineName": "Erythromycin : 500g",
        "description": "Erythromycin is used to treat a wide variety of bacterial infections. It may also be used to prevent certain bacterial infections. Erythromycin is known as a macrolide antibiotic.",
        "quantity": 12,
        "price": 1420
    },
    {
        "medicineid": 10,
        "medicineName": "Rifampicin",
        "description": "Rifampicin, also known as rifampin, is an antibiotic used to treat several types of bacterial infections, including tuberculosis, Mycobacterium avium complex, leprosy, and Legionnaires' disease.",
        "quantity": 10,
        "price": 980
    }
];
  constructor() { 
    //this.jsonData = {};
  }

  fetchAllMedicine(){
    let data = JSON.parse(JSON.stringify(this.jsonData));
    return data;
  }

  addMedicine(medicine){
    let length= this.jsonData.length;
    medicine.medicineid = length+1;
    this.jsonData.push(medicine);
    console.log("new json data",this.jsonData);
  }

  editMedicine(medicine){
    console.log("inside edit");
    for (var i in this.jsonData) {
      if(this.jsonData[i].medicineid == medicine.medicineid){
        this.jsonData[i] = medicine;
        break;
      }
   }
  }

  cloneMedicine(medicine){
    let length= this.jsonData.length;
    medicine.medicineid = length+1;
    this.jsonData.push(medicine);
    console.log("clone json data",this.jsonData);
  }

  deleteMedicine(medicine){
    let flag= false;
    let deleteIndex;
    this.jsonData.forEach(function(element, index) {
      if(element.medicineid === medicine.medicineid) {
        //Remove from array
        flag = true;
        deleteIndex = index;
      }    
    });
    if(flag){
      this.jsonData.splice(deleteIndex, 1);
    }
  }

  checkIfNameNotUnique(medName){
    let isPresent = this.jsonData.some(function(element) {return element.medicineName === medName});
    return isPresent;
  }
}
