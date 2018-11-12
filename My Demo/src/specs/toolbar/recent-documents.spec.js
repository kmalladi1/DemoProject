'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: recent-documents', function() {

  var verifyOrderOfDocuments = function(documentArray, documentIndex) {
    var count = 0;

    if (documentIndex !== undefined) {
      ThiefHelpers.getMenuClassReference().getItems().then(function(itemsArr) {
        itemsArr[documentIndex].getText().then(function(menuItem) {
          if (menuItem !== documentArray[0]) {
            CommonFunctions.takeScreenShot();
            expect(false).customError('Expected to display ' + documentArray[0] + ' at ' + documentIndex + ' index in the menu but found ' + menuItem);
          }
        });
      });
    } else {
      ThiefHelpers.getMenuClassReference().getItems().then(function(itemsArr) {
        // Slicing the array to expected length.
        var temp = itemsArr.slice(0, documentArray.length);
        temp.forEach(function(itemRef, index) {
          itemRef.getText().then(function(menuItem) {
            if (menuItem !== documentArray[index]) {
              count = count + 1;
              expect(false).customError('Documents are not displayed in specified order, Expected: ' + documentArray[index] + ' but Found: ' + menuItem);
            }
          });
        });
      }).then(function() {
        if (count !== 0) {
          CommonFunctions.takeScreenShot();
        }
      });
    }
  };

  var clickFolderIcon = function() {
    it('Should click on folder icon from the application toolbar', function() {
      // Clicking on Folder Icon from application toolbar
      PA3MainPage.getFolderDropDown().click().then(function() {
      }, function(error) {
        CommonFunctions.takeScreenShot();
        expect(false).customError(error);
      });
    });
  };

  describe('Test Step ID: 744878', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(false);

    it('Should open PA3 Application with "Client:/pa3/accounts/ACCT_OVERRIDES', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('acct-overrides');
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    clickFolderIcon();

    var array1 = ['CLIENT:/PA3/ACCOUNTS/ACCT_OVERRIDES'];

    it('Verifying if the "CLIENT:/PA3/ACCOUNTS/ACCT_OVERRIDES" document is in top of the list', function() {
      // 0 indicates first position in the array.
      verifyOrderOfDocuments(array1, 0);
    });
  });

  describe('Test Step ID: 746226', function() {

    clickFolderIcon();

    it('Should open PA3 Application with "Client:/pa3/charts/chart_doc', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('chart-doc');
    });

    clickFolderIcon();

    var array2 = ['CLIENT:/PA3/CHARTS/CHART_DOC', 'CLIENT:/PA3/ACCOUNTS/ACCT_OVERRIDES'];

    it('Verifying if documents are displayed in "' + array2 + '" order in the menu', function() {
      verifyOrderOfDocuments(array2);
    });
  });

  describe('Test Step ID: 746227', function() {

    clickFolderIcon();

    it('Should open PA3 Application with "Client:/New_pa_test_suite/ATTRIB_TRANSPOSE_DATES', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('attrib-transpose-dates');
    });

    clickFolderIcon();

    var array2 = ['CLIENT:/NEW_PA_TEST_SUITE/ATTRIB_TRANSPOSE_DATES', 'CLIENT:/PA3/CHARTS/CHART_DOC', 'CLIENT:/PA3/ACCOUNTS/ACCT_OVERRIDES'];

    it('Verifying if documents are displayed in "' + array2 + '" order in the menu', function() {
      verifyOrderOfDocuments(array2);
    });
  });

  describe('Test Step ID: 746228', function() {

    clickFolderIcon();

    it('Should open PA3 Application with "Client:report-theme-carbon', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('report-theme-carbon');
    });

    clickFolderIcon();

    var array2 = ['CLIENT:REPORT-THEME-CARBON', 'CLIENT:/NEW_PA_TEST_SUITE/ATTRIB_TRANSPOSE_DATES', 'CLIENT:/PA3/CHARTS/CHART_DOC', 'CLIENT:/PA3/ACCOUNTS/ACCT_OVERRIDES'];

    it('Verifying if documents are displayed in "' + array2 + '" order in the menu', function() {
      verifyOrderOfDocuments(array2);
    });
  });

  describe('Test Step ID: 746229', function() {

    clickFolderIcon();

    it('Should open PA3 Application with "Super_client:Import_Super_Doc', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('import-super-doc');
    });

    clickFolderIcon();

    var array2 = ['SUPER_CLIENT:IMPORT_SUPER_DOC', 'CLIENT:REPORT-THEME-CARBON', 'CLIENT:/NEW_PA_TEST_SUITE/ATTRIB_TRANSPOSE_DATES', 'CLIENT:/PA3/CHARTS/CHART_DOC', 'CLIENT:/PA3/ACCOUNTS/ACCT_OVERRIDES'];

    it('Verifying if documents are displayed in "' + array2 + '" order in the menu', function() {
      verifyOrderOfDocuments(array2);
    });
  });

  describe('Test Step ID: 746230', function() {

    // Note: Menu is already in open state. so skipping step to click on folder icon

    it('Should select "Save As..." from the folder menu', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Save As…').then(function() {
      }, function() {

        expect(false).customError('Not able to select "Options" option from "wrench menu dropdown" in "Weights" report ');
        CommonFunctions.takeScreenShot();
      });
    });

    // Add .toUpperCase() if you want the document name to be in upper case to the function
    CommonPageObjectsForPA3.selectPersonalAndEnterDocumentNameInSaveAsDialog('Recent_Test', undefined, true);

    clickFolderIcon();

    var array2 = ['PERSONAL:RECENT_TEST', 'SUPER_CLIENT:IMPORT_SUPER_DOC', 'CLIENT:REPORT-THEME-CARBON', 'CLIENT:/NEW_PA_TEST_SUITE/ATTRIB_TRANSPOSE_DATES', 'CLIENT:/PA3/CHARTS/CHART_DOC'];

    it('Verifying if documents are displayed in "' + array2 + '" order in the menu', function() {
      verifyOrderOfDocuments(array2);
    });
  });

  describe('Test Step ID: 746231', function() {

    // Note: Menu is already in open state. so skipping step to click on folder icon

    it('Should select "CLIENT:REPORT-THEME-CARBON" from the folder menu', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('CLIENT:REPORT-THEME-CARBON').then(function() {
      }, function() {

        expect(false).customError('Not able to select "CLIENT:REPORT-THEME-CARBON" option from folder menu');
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('Delete…');

    // Add .toUpperCase() if you want the document name to be in upper case to the function
    CommonPageObjectsForPA3.deleteRequiredDocumentFromPersonalDirectory('Recent_Test');

    clickFolderIcon();

    var array2 = ['CLIENT:REPORT-THEME-CARBON', 'SUPER_CLIENT:IMPORT_SUPER_DOC', 'CLIENT:/NEW_PA_TEST_SUITE/ATTRIB_TRANSPOSE_DATES', 'CLIENT:/PA3/CHARTS/CHART_DOC'];

    it('Verifying if documents are displayed in "' + array2 + '" order in the menu', function() {
      verifyOrderOfDocuments(array2);
    });
  });
});
