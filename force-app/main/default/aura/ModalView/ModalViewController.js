({
	handleShowModal : function (component, event, helper) {
        var myName= component.get("v.myVal");
        var modalBody;
        $A.createComponent("c:modalContent", {"nameParent":myName},
                           function(content, status) {
                               if (status === "SUCCESS") {
                                   modalBody = content;
                                   component.find('overlayLib').showCustomModal({
                                       header: "Entered Details",
                                       body: modalBody,
                                       showCloseButton: true,
                                       cssClass: "mymodal",
                                       closeCallback: function() {
                                           console.log('You closed the alert!');
                                       }
                                   })
                               }
                           });
	},
})