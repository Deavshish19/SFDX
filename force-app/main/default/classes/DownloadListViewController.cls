public with sharing class DownloadListViewController {
    private ApexPages.StandardSetController setController;

    public DownloadListViewController(ApexPages.StandardSetController controller) {
        this.setController = controller;
    }

    public PageReference downloadListView() {
        String listViewId = ApexPages.currentPage().getParameters().get('fcf');
        System.debug('>>>>>>>>>>>>>>'+listViewId);
        PageReference pageRef = new PageReference('/csv/listCustom');
        pageRef.getParameters().put('id', listViewId);
        System.debug('>>>>>>>>>>>>>>'+listViewId);
        pageRef.getParameters().put('exportType', 'csv');
        return pageRef;
    }
}