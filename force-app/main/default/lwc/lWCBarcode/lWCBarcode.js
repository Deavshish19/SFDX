import { LightningElement,api } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {getBarcodeScanner} from 'lightning/mobileCapabilities';
export default class LWCBarcode extends LightningElement {
	  scannerBarcode= '';
		@api buttonLabel;
		@api buttonColor;
		@api barcodeResult;	
		
		connectedCallback(){
				this.myScanner =  getBarcodeScanner(); 
				document.documentElement.style.setProperty('--buttonColor', this.buttonColor);
		}
		
		initBarcodeScanner(event){
				this.scannerBarcode= '';
				if(this.myScanner != null && this.myScanner.isAvailable()){
						const scanningOptions = {
                barcodeTypes: [this.myScanner.barcodeTypes.QR,
                               this.myScanner.barcodeTypes.CODE_128,
                               this.myScanner.barcodeTypes.CODE_93,
                               this.myScanner.barcodeTypes.CODE_39,
                               this.myScanner.barcodeTypes.DATA_MATRIX,
                               this.myScanner.barcodeTypes.EAN_13,
                               this.myScanner.barcodeTypes.EAN_8,
                               this.myScanner.barcodeTypes.ITF,
                               this.myScanner.barcodeTypes.PDF_417,
                               this.myScanner.barcodeTypes.UPC_E],
                instructionText: 'Scan a Barcode',
                successText: 'Scanning complete.'
            };
						this.myScanner
						.beginCapture(scanningOptions)
						.then((result)=>{
								comsole.log(result);
								
								this.barcodeResult = result.value;
								this.dispatchEvent(
									new ShowToastEvent({
											title: 'Successful Scan',
                      message: 'Barcode scanned successfully.',
                      variant: 'success'
									})
								);
						})
						.catch((error)=>{
								if (error.code == 'userDismissedScanner') {
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: 'Scanning Cancelled',
                                message:
                                    'You cancelled the scanning session.',
                                mode: 'sticky'
                            })
                        );
                    }
                    else { 
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: 'Barcode Scanner Error',
                                message:
                                    'There was a problem scanning the barcode: ' +
                                    error.message,
                                variant: 'error',
                                mode: 'sticky'
                            })
                        );
                    }
                })
				 .finally(() => {
                    this.myScanner.endCapture();
                });
        } else {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Barcode Scanner Is Not Available',
                    message:
                        'Try again from the Salesforce app on a mobile device.',
                    variant: 'error'
                })
            );
        }
		}
		
}