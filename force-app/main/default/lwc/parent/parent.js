import { LightningElement,api } from 'lwc';

export default class Parent extends LightningElement {

    selectedValue;
    showChildComponent = false;

    get options() {
        return [
          { label: "Show input name", value: "name" },
          { label: "Show input phone", value: "phone" },
          { label: "Show input email", value: "email" }
        ];
    }

    handleInputChange(event){
       this.selectedValue = event.target.value;
       this.showChildComponent = Boolean(this.selectedValue); 
    }
}