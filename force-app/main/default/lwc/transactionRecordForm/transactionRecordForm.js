import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import getSuccessCodeMessages from '@salesforce/apex/TransactionController.getSuccessCodeMessages';

export default class TransactionRecordForm extends LightningElement {

    objectApiName = "Transaction__c";
    successCodeMessages = [];
    message;
    
    connectedCallback(){
     this.fetchSuccessMessages();
    }
    
    async fetchSuccessMessages(){
        try {
            const result = await getSuccessCodeMessages();
            this.successCodeMessages = result.map((record)=> ({
                value : record.Success_Code__c,
                label : record.Message__c
            }));
        } catch (error) {
            this.handleErrorEvt();
        } 
    }
    
    handleSuccessCodeChange(event){
        let value = event.target.value;
        this.selectedMessage = this.successCodeMessages.find(
            (message) => message.value === value
          );
          this.message = this.selectedMessage?.label;
    }
    
    handleSubmit(event){
        event.preventDefault();
        const fields = event.detail.fields;
        if (this.message) {
            fields.Message__c = this.message;
        }
        this.template.querySelector("lightning-record-edit-form").submit(fields);
    }

    handleSuccess(event){
        const transId = event.detail.id;
        this.handleSuccessEvt(transId);
        this.handleReset();
    }

    handleSuccessEvt(data){
        const event = new ShowToastEvent({
            title: "Success!",
            message: "{0} Record created! See it {1}!",
            variant: "success",
            messageData: [
              "Transaction",
              {
                url: `/${data}`,
                label: "here"
              }
            ]
          });
          this.dispatchEvent(event);
    }

    handleReset(){
        const inputFields = this.template.querySelectorAll("lightning-input-field");
        if (inputFields) {
            inputFields.forEach((field) => {
                field.reset();
            });
        }
    }

    handleErrorEvt(){
        const event = new ShowToastEvent({
            title: "Error",
            message: "An error occurred while fetching the data",
            variant: "error"
          });
          this.dispatchEvent(event);
    }
}