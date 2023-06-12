import { LightningElement,api } from 'lwc';

export default class Child extends LightningElement {
    @api selectedItem;

    get showName(){
       return  this.selectedItem === 'name';
    }
    get showPhone(){
        return  this.selectedItem === 'phone';
    }
     get showEmail(){
        return  this.selectedItem === 'email';
    }


}