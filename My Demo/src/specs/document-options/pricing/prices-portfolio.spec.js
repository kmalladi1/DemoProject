'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: prices-portfolio', function() {

  // Variables
  var referenceNumber;
  describe('Test Step ID: 542535', function() {

    // Open default document and uncheck automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(false);

    it('Should open "Client:/default_doc_auto" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto');
    });
  });

  describe('Test Step ID: 542536', function() {

    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSelectOption('Document Options');
  });

  describe('Test Step ID: 542537', function() {

    it('Should select "Portfolio" from "Prices" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Portfolio', 'Prices').select();

      // Verifying if "Risk Models" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Portfolio', 'Prices').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Portfolio" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Client Provided" from "Prices > Available" section and select "Client Security Master" ' + 'to highlight', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer, 'Client Security Master', 'Client Provided').select();
    });

    it('Clicking the right arrow button', function() {
      ThiefHelpers.sendElementToSelectedSection(DocumentOptionsPricesPortfolio.getArrowButton('prices'));
    });

    it('Verifying if "Client Security Master" is added to "Selected" container', function() {
      ThiefHelpers.getListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer, 'Client Security Master').getText().then(function(text) {
        if (text !== 'Client Security Master') {
          expect(false).customError('"Client Security Master" is not shown in the "Selected" container of "PRICES" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"Client Security Master" is not found in the "Selected" container of "PRICES" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 542538', function() {

    it('Should expand "Derivatives" tree from "Available" container and double click on "FactSet - Futures" ' + 'Option to add it to "Selected" container', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer, 'FactSet - Futures', 'Derivatives').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Verifying if "FactSet - Futures" is added to "Selected" container', function() {
      ThiefHelpers.getListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer, 'FactSet - Futures').getText().then(function(text) {
        if (text !== 'FactSet - Futures') {
          expect(false).customError('"FactSet - Futures" is not shown in the "Selected" container of "Portfolio" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"FactSet - Futures" is not found in the "Selected" container of "Portfolio" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 542539', function() {

    it('Should scroll "Equity" tree element into visibility', function() {
      ThiefHelpers.getListboxGroup(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer, 'Equity').then(function(ref) {
        Utilities.makeElementVisible(ref);
      });
    });

    it('Should expand "Equity > FactSet" tree from "Available" container and double click on the item ' + '"FactSet - Equity - Bid', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer, 'FactSet - Equity - Bid', 'Equity|FactSet').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Verifying if "FactSet - Equity - Bid" is added to "Selected" container', function() {
      ThiefHelpers.getListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer, 'FactSet - Equity - Bid').getText().then(function(text) {
        if (text !== 'FactSet - Equity - Bid') {
          expect(false).customError('"FactSet - Equity - Bid" is not shown in the "Selected" container of "PRICES" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"FactSet - Equity - Bid" is not found in the "Selected" container of "PRICES" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 542540', function() {

    it('Should scrolling "Fixed Income" tree element into visibility', function() {
      ThiefHelpers.getListboxGroup(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer, 'Fixed Income').then(function(ref) {
        Utilities.makeElementVisible(ref);
      });
    });

    it('Should expand "Fixed Income" tree from "Available" container and Click on the item "ChinaBond Fixed Income" ' + 'to highlight', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer, 'ChinaBond Fixed Income', 'Fixed Income').select();
    });

    it('Clicking the right arrow button', function() {
      ThiefHelpers.sendElementToSelectedSection(DocumentOptionsPricesPortfolio.getArrowButton('prices'));
    });

    it('Verifying if "ChinaBond Fixed Income"  is added to the "Selected" container', function() {
      ThiefHelpers.getListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer, 'ChinaBond Fixed Income').getText().then(function(text) {
        if (text !== 'ChinaBond Fixed Income') {
          expect(false).customError('"ChinaBond Fixed Income" is not shown in the "Selected" container of "PRICES" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"ChinaBond Fixed Income" is not found in the "Selected" container of "PRICES" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 542541', function() {

    it('Fetching the position of "FactSet - Equity - Bid" from "Selected" container before moving', function() {
      DocumentOptionsPricesPortfolio.getIndexFromPricesSelected('FactSet - Equity - Bid').then(function(index) {
        referenceNumber = index;
      });
    });

    it('Clicking on item "FactSet - Equity - Bid" from "Selected" container to highlight', function() {
      ThiefHelpers.getListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer, 'FactSet - Equity - Bid').select();
    });

    it('Clicking the up arrow button twice', function() {
      for (var i = 0; i < 2; i++) {
        ThiefHelpers.getButtonClassReference(undefined, DocumentOptionsPricesPortfolio.getButtonFromSelectedSection('Prices', 'up')).press();
      }
    });

    it('Verifying if the "FactSet - Equity - Bid" is moved up by 2 positions', function() {
      DocumentOptionsPricesPortfolio.getIndexFromPricesSelected('FactSet - Equity - Bid').then(function(val) {
        if (val !== referenceNumber - 2) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"FactSet - Equity - Bid" is not moved up by 2 positions');
        }
      });
    });
  });

  describe('Test Step ID: 542542', function() {

    it('Clicking on the item "ChinaBond Fixed Income" to highlight', function() {
      ThiefHelpers.getListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer, 'ChinaBond Fixed Income').select();
    });

    it('Clicking the left arrow button', function() {
      ThiefHelpers.sendElementToAvailableSection(DocumentOptionsPricesPortfolio.getArrowButton('prices'));
    });

    it('Verifying if "ChinaBond Fixed Income" is removed from "Selected" container', function() {
      ThiefHelpers.getListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer, 'ChinaBond Fixed Income').getText().then(function(text) {
        if (text === 'ChinaBond Fixed Income') {
          expect(false).customError('"ChinaBond Fixed Income" is still shown in the "Selected" container of "PRICES"' + ' section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(true).toBeTruthy();
        } else {
          expect(false).customError('"ChinaBond Fixed Income" is still found in the "Selected" container of "PRICES" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 542543', function() {

    it('Fetching the position of "Client Security Master" from "Selected" container before moving', function() {
      DocumentOptionsPricesPortfolio.getIndexFromPricesSelected('Client Security Master').then(function(index) {
        referenceNumber = index;
      });
    });

    it('Clicking on item "Client Security Master" from "Selected" container to highlight', function() {
      ThiefHelpers.getListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer, 'Client Security Master').select();
    });

    it('Should click "Down" arrow button to move "Client Security Master" down by one position', function() {
      ThiefHelpers.getButtonClassReference(undefined, DocumentOptionsPricesPortfolio.getButtonFromSelectedSection('Prices', 'down')).press();
    });

    it('Verifying if the "Client Security Master" is moved down by 1 positions', function() {
      expect(DocumentOptionsPricesPortfolio.getIndexFromPricesSelected('Client Security Master')).toEqual(referenceNumber + 1);
    });
  });

  describe('Test Step ID: 542544', function() {

    // Click on "Cancel" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Document Options');
  });

  describe('Test Step ID: 542545', function() {

    it('Should close PA3 application', function() {
      // After completing all the test steps protractor will close the browser automatically
      expect(true).toBeTruthy();
    });
  });
});
