import { LightningElement,wire } from 'lwc';
import getLeaves from '@salesforce/apex/LeaveListController.getLeaves';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import Id from '@salesforce/user/Id';
import { refreshApex } from '@salesforce/apex';

import REQUEST_ID from '@salesforce/schema/LeaveRequest__c.Name';
import FROM_DATE from '@salesforce/schema/LeaveRequest__c.From_Date__c';
import TO_DATE from '@salesforce/schema/LeaveRequest__c.To_Date__c';
import REASON from '@salesforce/schema/LeaveRequest__c.Reason__c';
import STATUS from '@salesforce/schema/LeaveRequest__c.Status__c';
import MANAGER_COMMNENT from '@salesforce/schema/LeaveRequest__c.Manager_Comment__c';

const columns = [
    {label: "Request Id",fieldName: REQUEST_ID.fieldApiName,cellAttributes: { class: { fieldName: 'cellClass' } }},
    {label: "From Date",fieldName: FROM_DATE.fieldApiName,cellAttributes: { class: { fieldName: 'cellClass' } }},
    {label: "To Date" ,fieldName: TO_DATE.fieldApiName,cellAttributes: { class: { fieldName: 'cellClass' } }},
    {label: "Reason",fieldName: REASON.fieldApiName,cellAttributes: { class: { fieldName: 'cellClass' } }},
    {label: "Status",fieldName: STATUS.fieldApiName,cellAttributes: { class: { fieldName: 'cellClass' } }},
    {label: "Manager Comments",fieldName: MANAGER_COMMNENT.fieldApiName,cellAttributes: { class: { fieldName: 'cellClass' } }},
    {
        type: "button", typeAttributes: {
            label: 'Edit',
            name: 'Edit',
            title: 'Edit',
            value: 'edit',
            disabled: { fieldName: 'isEditDisabled' }
        }, cellAttributes: { class: { fieldName: 'cellClass' } }
    }
    ];
export default class MyLeaves extends LightningElement {

    data = [];
    columns = columns;
    myLeaveResult;
    showModalPopup = false;
    objectApiName = 'LeaveRequest__c';
    recordId = '';
    currentUserId = Id;

    @wire(getLeaves)
    wireMyLeaves(result){
        this.myLeaveResult = result;
        if (result.data) {
            this.myLeaves = result.data.map(a => ({
                ...a,
                cellClass: a.Status__c == 'Approved' ? 'slds-theme_success' : a.Status__c == 'Rejected' ? 'slds-theme_warning' : '',
                isEditDisabled: a.Status__c != 'Pending'
            }));
        }
        if (result.error) {
            console.log('Error occured while fetching my leaves- ', result.error);
        }
    } 
    
    get noRecordsFound(){
        return this.data .length == 0; 
    }

    newRequestClickHandler() {
        this.showModalPopup = true;
        this.recordId = '';
    }
    popupCloseHandler() {
        this.showModalPopup = false;
    }

    rowActionHandler(event) {
        this.showModalPopup = true;
        this.recordId = event.detail.row.Id;
    }

    successHandler(event) {
        this.showModalPopup = false;
        this.showToast('Data saved successfully');
        refreshApex(this.myLeavesWireResult);

        const refreshEvent = new CustomEvent('refreshleaverequests');
        this.dispatchEvent(refreshEvent);
    }
    submitHandler(event) {
        event.preventDefault();
        const fields = { ...event.detail.fields };
        fields.Status__c = 'Pending';
        if (new Date(fields.From_Date__c) > new Date(fields.To_Date__c)) {
            this.showToast('From date should not be grater then to date', 'Error', 'error');
        }
        else if (new Date() > new Date(fields.From_Date__c)) {
            this.showToast('From date should not be less then Today', 'Error', 'error');
        }
        else {
            this.refs.leaveReqeustFrom.submit(fields);
        }
    }
    showToast(message, title = 'success', variant = 'success') {
        const event = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(event);
    }
}