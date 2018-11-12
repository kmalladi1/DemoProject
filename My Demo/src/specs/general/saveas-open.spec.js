'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: saveas-open', function() {

  describe('Test Step ID: 553416', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    // Click on the Folder icon and click and select "New" from drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('New');

    it('Should click on folder icon from the application toolbar', function() {
      // Clicking on Folder Icon from application toolbar
      PA3MainPage.getFolderDropDown().click().then(function() {
      }, function(error) {
        CommonFunctions.takeScreenShot();
        expect(false).customError(error);
      });
    });

    CommonPageObjectsForPA3.selectOptionFromFolderAndVerifyDialogBoxOpened('Save As…', 'Save Document As');

    it('Should verify if "Name" text box is blank', function() {
      FileDialog.getFileNameInput().getText().then(function(text) {
        if (text !== '') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Name" text box is not blank, Found: ' + text);
        }
      });
    });
  });

  describe('Test Step ID: 553417', function() {

    it('Should click "Cancel" on the "Save Document As" dialog', function() {
      ThiefHelpers.getDialogButton('Save Document As', 'Cancel').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should open PA3 Application with "Client:/Pa3/Risk/COMPOSITE_STRESS_TEST"', function() {
      // Select Open from folder menu and open Client:/Pa3/Risk/COMPOSITE_STRESS_TEST document
      PA3MainPage.launchHtmlDialogAndOpenDocument('composite-stress-test');
    });

    it('Should verify if Calculation Error dialog appeared', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        if (!found) {
          expect(false).customError('"Calculation Error" dialog did not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "OK" in the "Calculation Error" dialog', function() {
      PA3MainPage.getButton('OK').click();

      // Verify that Calculation Error dialog is closed
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrValues = [{name: 'Portfolio', val: 'US:DJII', xpath: PA3MainPage.xpathPortfolioWidget},
      {name: 'benchmark', val: 'CASH:USD', xpath: PA3MainPage.xpathBenchmarkWidget},];

    arrValues.forEach(function(values) {
      CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(values.name, values.xpath, values.val);
    });

    it('Should verify if "Weights" remains blank', function() {
      PA3MainPage.isReportCalculated('Weights', true).then(function(displayed) {
        if (displayed) {
          expect(false).customError('"Weights" report is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 553418', function() {

    it('Should click on folder icon from the application toolbar', function() {
      // Clicking on Folder Icon from application toolbar
      PA3MainPage.getFolderDropDown().click().then(function() {
      }, function(error) {
        CommonFunctions.takeScreenShot();
        expect(false).customError(error);
      });
    });

    CommonPageObjectsForPA3.selectOptionFromFolderAndVerifyDialogBoxOpened('Save As…', 'Save Document As');

    // Verify if "Client > Pa3 > Risk" is set as document path
    PA3MainPage.verifyDocumentPathInHTMLDialog('Client > Pa3 > Risk');

    it('Should expand "Client|Pa3" and verify "Risk" is selected by default', function() {
      CommonPageObjectsForPA3.expandDocumentDirectoriesInFileDialog('Client|Pa3', 'Risk');
    });
  });

  describe('Test Step ID: 558668', function() {

    it('Should select "PERSONAL" group is if not selected', function() {
      FileDialog.getDirectory('Personal').click();
    });

    it('Should enter Risk-Test in "Name" text box', function() {
      FileDialog.getFileNameInput().sendKeys('Risk-Test');

      FileDialog.getFileNameInput().getText().then(function(text) {
        console.log(text + 'text');
      });
    });

    it('Should click "Save" on the "Save Document As" dialog', function() {
      ThiefHelpers.getDialogButton('Save Document As', 'Save').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify if Calculation Error dialog appeared', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        if (!found) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "OK" in the "Calculation Error" dialog', function() {
      PA3MainPage.getButton('OK').click();

      // Verify that Calculation Error dialog is closed
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on folder icon from the application toolbar', function() {
      // Clicking on Folder Icon from application toolbar
      PA3MainPage.getFolderDropDown().click().then(function() {
      }, function(error) {
        CommonFunctions.takeScreenShot();
        expect(false).customError(error);
      });
    });

    CommonPageObjectsForPA3.selectOptionFromFolderAndVerifyDialogBoxOpened('Save As…', 'Save Document As');

    it('Should verify if "Personal" is selected by default', function() {
      ThiefHelpers.getListboxGroup(undefined, 'Personal').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Personal" is not selected by default in "Save As" dialog');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 558669', function() {

    it('Should click "Cancel" on the "Save Document As" dialog', function() {
      ThiefHelpers.getDialogButton('Save Document As', 'Cancel').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Click on the folder icon and select "Open..." from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('Open...');

    it('Should verify if "Personal" is selected by default', function() {
      ThiefHelpers.getListboxGroup(undefined, 'Personal').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Personal" is not selected by default in "Save As" dialog');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 558673', function() {

    it('Should click "Cancel" on the "Open" dialog', function() {
      ThiefHelpers.getDialogButton('Open', 'Cancel').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify if the "Open" dialog box is closed', function() {
      ThiefHelpers.isDialogOpen('Open').then(function(bool) {
        if (bool) {
          expect(false).customError('"Open" dialog is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 779647', function() {

    // Click on the Folder icon and click and select "New" from drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('New');

    // Click on the Folder icon and click and select "Delete..." from drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('Delete…');

    // Select the required document and click on delete button
    // Add .toUpperCase() if you want the document name to be in upper case to the function
    CommonPageObjectsForPA3.deleteRequiredDocumentFromPersonalDirectory('Risk-Test');
  });
});
