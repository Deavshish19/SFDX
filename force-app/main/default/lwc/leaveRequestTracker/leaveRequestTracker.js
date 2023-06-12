import { LightningElement } from 'lwc';

export default class LeaveRequestTracker extends LightningElement {

    refreshLeaveReqeuestHandler(event) {
        this.refs.myLeavesComp.refreshGrid();
    }
}