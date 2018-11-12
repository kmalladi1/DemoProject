'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: lot-level-book-calc', function() {

  // Variables
  var portEnd;

  describe('Test Step ID: Start Up Instructions', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 545018', function() {

    it('Should navigate the "PA3 application" with "Client:;Pa3;Lot_detail;LOT_LEV_DET_3"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('lot-lev-det-3');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    it('Verifying if "30-JAN-2015 - 03-MAR-2015" date range is displayed', function() {
      // Verifying date range "30-JAN-2015 - 03-MAR-2015" are displayed
      PA3MainPage.getDateHyperLink('Contribution to Return').getText().then(function(value) {
        if (value !== '30-JAN-2015 - 03-MAR-2015') {
          expect(false).customError('Date range "30-JAN-2015 - 03-MAR-2015" are not displayed.');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();

      });
    });

    it('Verifying if "Long/Short" grouping is displayed', function() {
      // Verifying Long/Short grouping is displayed
      PA3MainPage.getGroupingsHyperLink('Contribution to Return').getText().then(function(value) {
        if (value !== 'Long/Short') {
          expect(false).customError('"Long/Short" grouping is not displayed.');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();

      });
    });
  });

  describe('Test Step ID: 545781', function() {

    it('Should click on the Wrench icon in the "Contribution to Report" report workspace', function() {
      // clicking wrench icon in "Contribution to Report" report workspace
      PA3MainPage.getWrenchIconFromReportWorkspace('Contribution to Return').click().then(function() {
      }, function() {

        expect(false).customError('Not able to  click on the "Wrench icon" in the "Contribution to Report" report workspace');
        CommonFunctions.takeScreenShot();
      });

      //Verifying wrench menu list is displayed in "Contribution to Report" report workspace'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Wrench menu drop down list is not displayed in ' +
            '"Contribution to Report" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from menu drop down of "Contribution to Report" report workspace ', function() {
      //Clicking "Custom Charts" from Charts drop down
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function() {

        expect(false).customError(' Not able to select "Options" option from "menu dropdown" of ' +
          '"Contribution to Report" report workspace');
        CommonFunctions.takeScreenShot();
      });

      //verifying tile options mode is opened
      TileOptions.isTileOptionsMode().then(function(value) {
        if (!value) {
          expect(false).customError('Tile Options mode is Closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Universe" on the LHP of tile options', function() {
      //Clicking universe  link from LHP
      TileOptions.getLHPOption('Universe').click().then(function() {
      }, function() {

        expect(false).customError('"Universe tab" is not clicked on LHP in tile options');
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to " Universe "
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Universe') {
          expect(false).customError('Universe " is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should Click on "Expand Lot Level Data" check box', function() {
      //Checking Expand Lot Level Data check box
      ThiefHelpers.getCheckBoxClassReference('undefined', TileOptionsUniverse.xpathExpandLotLevelDataCheckBox).check();

      //Verifying the checkbox is checked
      expect(ThiefHelpers.getCheckBoxClassReference('undefined',
        TileOptionsUniverse.xpathExpandLotLevelDataCheckBox).isChecked()).toBeTruthy();
    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    it('Verify that the "Total values" for the columns Port. Book Yield is displayed as 3.72', function() {
      //Verifying values for the columns Port. Book Yield is displayed as 3.72
      SlickGridFunctions.getCellReference('Contribution to Return', 'Total', '', 'Port. Book Yield', '').then(
        function(cellRef) {
          cellRef.getText().then(function(value) {
            if (value !== '3.72') {
              expect(false).customError('columns Port. Book Yield is not displayed as 3.72');
              CommonFunctions.takeScreenShot();
            }
          });
        });
    });

    it('Verify that the Total values for the columns Port. Book Value is displayed as 25262.06', function() {
      //Verifying values for the column Port. Book Value is displayed as 25262.06
      SlickGridFunctions.getCellReference('Contribution to Return', 'Total', '', 'Port. Book Value', '').then(
        function(cellReff) {
          cellReff.getText().then(function(value) {
            if (value !== '25,262.06') {
              expect(false).customError('column Port. Book Value is not displayed as 25262.06');
              CommonFunctions.takeScreenShot();
            }
          });
        });
    });
  });

  describe('Test Step ID: 545784', function() {

    it('Should click on the "Wrench" button on the application toolbar', function() {
      //Clicking the wrench button in application tool bar
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function() {

        expect(false).customError('Not able to click on "Wrench" button in the application toolbar');
        CommonFunctions.takeScreenShot();
      });

      // Verifying if drop down menu appear.
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(value) {
        if (!value) {
          expect(false).customError('Wrench icon dropdown is not present.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Document Options" from drop down in aplication tool bar', function() {
      //Clicking Documents Options in wrench dropdown from application tool bar
      PA3MainPage.getOptionFromWrenchMenu('Document Options').click();
    });

    it('Should verify "Documents Options" page is opened', function() {
      //verifying Documents options mode is opened
      DocumentOptions.isDocumentOptionsMode().then(function(option) {
        if (!option) {
          expect(false).customError('"Documents options" mode is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Analytics Pill" in "Fixed Income"', function() {
      //Clicking on Analytics Pill in Fixed income tab
      DocumentOptions.getLHPOption('Analytics').click();

      // Verifying if Analytics pill is selected
      DocumentOptions.getLHPOption('Analytics').getAttribute('class').then(function(value) {
        if (value.indexOf('selected') === -1) {
          expect(false).customError('"Analytics pill" is not selected in "Fixed income tab"');
        }
      });

    });

    it('Should click on "Analytics for Lot-Level Detail" drop down', function() {
      ThiefHelpers.getButtonClassReference('Analytics for Lot-Level Detail').press().then(function() {
      }, function() {

        expect(false).customError('Not able to click on "Analytics for Lot-Level Detail" drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying  "Use Security-Level Data"  option is selected by default in "Analytics for Lot-Level Detail" dropdown', function() {
      // Verifying  "Use Security-Level Data"  option is selected by default from Analytics for Lot-Level Detail drop down
      ThiefHelpers.verifySelectedDropDownText('Use Security-Level Data', 'Analytics for Lot-Level Detail');
    });

    it('Verifying all the options are displayed in "Analytics for Lot-Level Detail" drop down', function() {
      //Verifying all the options are displayed in "Analytics for Lot-Level Detail" drop down
      var list = ['Use Security-Level Data', 'Only on Purchase Date', 'On Purchase, Security- Level Data After Purchase'];
      ThiefHelpers.getAllOptionsFromDropdown().then(function(array) {
        if (list.length === array.length) {
          array.forEach(function(element) {
            var isExist = list.indexOf(element);
            if (isExist === -1) {
              expect(false).customError('Analytics for Lot-Level Detail Options miss match at element ' + element);
            }
          });
        }
      });

    });

  });

  describe('Test Step ID: 545787', function() {

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Document Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    it('Verify that the total value for the column "Port. Beginning Effective Duration" is "3.217909" ', function() {
      //Verifying the total value for "column Port. Beginning Effective Duration" is 3.217909
      var eleRef = SlickGridFunctions.getCellReference('Contribution to Return', 'Total', '',
        'Port. Beginning Effective Duration', '');
      eleRef.then(function(cellRef) {
        cellRef.getText().then(function(value) {
          value = value.split(', ').join('');
          value = parseFloat(value);
          if (value !== 3.217909) {
            expect(false).customError('Total value for the column "Port. Beginning Effective Duration" ' +
              'is not "3.217909"');
            CommonFunctions.takeScreenShot();
          }
        });
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          eleRef = SlickGridFunctions.getCellReference('Contribution to Return', 'Total', '',
            'Port. Beginning Effective Duration', '');
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      eleRef.then(function(cellRef) {
        cellRef.getText().then(function(value) {
          value = value.split(', ').join('');
          value = parseFloat(value);
          if (value !== 3.217909) {
            expect(false).customError('Total value for the column "Port. Beginning Effective Duration" ' +
              'is not "3.217909"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verify that the total value for the column "Port. Ending Effective Duration" is "5.746199" ', function() {
      //Verifying the total value for "column Port. Ending Effective Duration" is 5.746199
      var eleRef = SlickGridFunctions.getCellReference('Contribution to Return', 'Total', '',
        'Port. Ending Effective Duration', '');
      eleRef.then(function(cellRef) {
        cellRef.getText().then(function(value) {
          value = value.split(', ').join('');
          value = parseFloat(value);
          portEnd = value;
          if (value !== 5.746199) {
            expect(false).customError('Total value for the column "Port. Ending Effective Duration" ' +
              'is not "5.746199"');
            CommonFunctions.takeScreenShot();
          }
        });
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          eleRef = SlickGridFunctions.getCellReference('Contribution to Return', 'Total', '',
            'Port. Beginning Effective Duration', '');
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      eleRef.then(function(cellRef) {
        cellRef.getText().then(function(value) {
          value = value.split(', ').join('');
          value = parseFloat(value);
          portEnd = value;
          if (value !== 5.746199) {
            expect(false).customError('Total value for the column "Port. Ending Effective Duration" ' +
              'is not "5.746199"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 545800', function() {

    it('Should click on the "Wrench Icon" button on the application toolbar', function() {
      //Clicking the wrench button in application tool bar
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function() {

        expect(false).customError('Not able to click on "Wrench Icon" button in application toolbar');
        CommonFunctions.takeScreenShot();
      });

      // Verifying if drop down menu appear.
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('"Wrench icon dropdown" is not present.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Document Options" from drop down in application tool bar', function() {
      //Clicking Dcouments Options in wrench dropdown from application tool bar
      PA3MainPage.getOptionFromWrenchMenu('Document Options').click();
    });

    it('Should click on the "Fixed Income" tab in "documents option dialog"', function() {
      //Clicking Analytics Overrides in wrench dropdown from application tool bar
      DocumentOptions.getLHPOption('Analytics').click();
    });

    it('Should click on "Analytics for Lot-Level Detail" drop down', function() {
      ThiefHelpers.getButtonClassReference('Analytics for Lot-Level Detail').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should Select on "Only on Purchase Date" option from "Analytics for Lot-Level Detail" drop down', function() {
      //Should Select on "Only on Purchase Date" from "Analytics for Lot-Level Detail" drop down
      ThiefHelpers.selectOptionFromDropDown('Only on Purchase Date', 'Analytics for Lot-Level Detail');
    });

    it('Verifying "Only on Purchase Date" option is selected from "Analytics for Lot-Level Detail" drop down', function() {
      //Verifying "Only on Purchase Date" option is selected from "Analytics for Lot-Level Detail" drop down
      ThiefHelpers.verifySelectedDropDownText('Only on Purchase Date', 'Analytics for Lot-Level Detail');
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    it('Verify that the total value for the column "Port. Beginning Effective Duration" is "3.217167" ', function() {
      //Verifying the total value for "column Port. Beginning Effective Duration" is 3.217167
      var eleRef = SlickGridFunctions.getCellReference('Contribution to Return', 'Total', '',
        'Port. Beginning Effective Duration', '');
      eleRef.then(function(cellRef) {
        cellRef.getText().then(function(value) {
          value = value.split(', ').join('');
          value = parseFloat(value);
          if (value !== 3.217167) {
            expect(false).customError('Total value for the column "Port. Beginning Effective Duration" ' +
              'is not "3.217167"');
            CommonFunctions.takeScreenShot();
          }
        });
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          eleRef = SlickGridFunctions.getCellReference('Contribution to Return', 'Total', '',
            'Port. Beginning Effective Duration', '');
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      eleRef.then(function(cellRef) {
        cellRef.getText().then(function(value) {
          value = value.split(', ').join('');
          value = parseFloat(value);
          if (value !== 3.217167) {
            expect(false).customError('Total value for the column "Port. Beginning Effective Duration" ' +
              'is not "3.217167"');
            CommonFunctions.takeScreenShot();
          }
        });
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify that the total value for the column "Port. Ending Effective Duration" is blank ', function() {
      //Verifying that the total value for the column Port. Ending Effective Duration is blank
      var eleRef = SlickGridFunctions.getCellReference('Contribution to Return', 'Total', '',
        'Port. Ending Effective Duration', '');
      eleRef.then(function(cellRef) {
        cellRef.getText().then(function(value) {
          if (value !== '--') {
            expect(false).customError('Total value for the column "Port. Ending Effective Duration" is not blank');
            CommonFunctions.takeScreenShot();
          }
        });
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          eleRef = SlickGridFunctions.getCellReference('Contribution to Return', 'Total', '',
            'Port. Beginning Effective Duration', '');
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      eleRef.then(function(cellRef) {
        cellRef.getText().then(function(value) {
          if (value !== '--') {
            expect(false).customError('Total value for the column "Port. Ending Effective Duration" is not blank');
            CommonFunctions.takeScreenShot();
          }
        });
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that The "Port. Beginning Effective Duration" column shows values for all rows which has the ' +
      'corresponding "Lot Purchase Date" column value as "30-JAN-2015" ', function() {
        //Verifying that The Port. Beginning Effective Duration column shows values for all rows which has the
        // corresponding Lot Purchase Date column value as 30-JAN-2015
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution to Return', 'Lot Purchase Date', '').then(
          function(lotPurchaseDate) {
            SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution to Return', 'Port. Beginning Effective Duration',
              '').then(function(beginningDuration) {
                lotPurchaseDate.forEach(function(dt, index) {
                  if (dt === '30-JAN-2015' && beginningDuration[index] === 'NA') {
                    expect(false).customError('The "Port. Beginning Effective Duration" column does not ' +
                      'shows values for all rows which has the corresponding "Lot Purchase Date" column value ' +
                      'as "30-JAN-2015"');
                    CommonFunctions.takeScreenShot();
                  }
                });
              });
          });
      });

    it('Verifying that the "Port. Beginning Effective Duration" column shows values as blank for all rows which has ' +
      'the corresponding "Lot Purchase Date" column value not as "30-JAN-2015" ', function() {
        //Verifying that The Port. Beginning Effective Duration column shows values as blank for all rows which has the
        // corresponding Lot Purchase Date column value not as 30-JAN-2015
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution to Return', 'Lot Purchase Date', '').then(
          function(lotPurchaseDate) {
            SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution to Return',
              'Port. Ending Effective Duration', '').then(function(beginningDuration) {
                lotPurchaseDate.forEach(function(dt, index) {
                  if (dt !== '30-JAN-2015' && beginningDuration[index] !== 'NA') {
                    expect(false).customError('The "Port. Beginning Effective Duration" column shows ' +
                      'values for rows which has the corresponding "Lot Purchase Date" column values not as "30-JAN-2015"');
                    CommonFunctions.takeScreenShot();
                  }
                });
              });
          });
      });
  });

  describe('Test Step ID: 545804', function() {

    it('Should click on the "Wrench" button" on the application toolbar', function() {
      //Clicking the wrench Icon button on application tool bar
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      PA3MainPage.getWrenchIcon(true).isPresent().then(function(option) {
        // Verifying if drop down menu appears.
        if (!option) {
          expect(false).customError('Wrench icon dropdown is not present.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Document Options" option from "Wrench dropdown" on the application toolbar', function() {
      //Clicking on "Documents Options" in wrench dropdown from application tool bar
      PA3MainPage.getOptionFromWrenchMenu('Document Options').click();
    });

    it('Should verify "Document Options" page is opened', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(value) {
        if (!value) {
          expect(false).customError('Document Options mode is Closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Analytics pill" in "Fixed Income" tab', function() {
      //Clicking on  Analytics pill in Fixed income tab
      DocumentOptions.getLHPOption('Analytics').click();
    });

    it('Verifying if "Analytics pill" is selected in "Fixed income tab"', function() {
      //Verifying if Analytics pill is selected in Fixed income tab
      DocumentOptions.getLHPOption('Analytics').getText().then(function(text) {
        if (text !== 'Analytics') {
          expect(false).customError('"Analytics pill" is not selected in "Fixed income tab"');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Analytics for Lot-Level Detail" drop down', function() {
      //clicking on "Analytics for Lot-Level Detail" drop down
      ThiefHelpers.getButtonClassReference('Analytics for Lot-Level Detail').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should Select on "On Purchase, Security- Level Data After Purchase" option from "Analytics for Lot-Level ' +
      'Detail" drop down', function() {
        //Should Select on "On Purchase, Security- Level Data After Purchase" from "Analytics for Lot-Level Detail" drop down
        ThiefHelpers.selectOptionFromDropDown('On Purchase, Security- Level Data After Purchase', 'Analytics for Lot-Level Detail');
      });

    it('Verifying "On Purchase, Security- Level Data After Purchase" option is selected from "Analytics for ' +
      'Lot-Level Detail" drop down', function() {
        //Verifying "On Purchase, Security- Level Data After Purchase" option is selected from "Analytics for
        // Lot-Level Detail" drop down
        ThiefHelpers.verifySelectedDropDownText('On Purchase, Security- Level Data After Purchase', 'Analytics for Lot-Level Detail');
      });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    it('Verify that the total value for the column "Port. Beginning Effective Duration" is 3.217167 ', function() {
      //Verifying total value for the column Port. Beginning Effective Duration is 3.217167
      var eleRef = SlickGridFunctions.getCellReference('Contribution to Return', 'Total', '',
        'Port. Beginning Effective Duration', '');
      eleRef.then(function(cellRef) {
        cellRef.getText().then(function(value) {
          value = value.split(', ').join('');
          value = parseFloat(value);
          if (value !== 3.217167) {
            expect(false).customError('Total value for the column "Port. Beginning Effective Duration" ' +
              'is not "3.217167"');
            CommonFunctions.takeScreenShot();
          }
        });
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          eleRef = SlickGridFunctions.getCellReference('Contribution to Return', 'Total', '',
            'Port. Beginning Effective Duration', '');
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      eleRef.then(function(cellRef) {
        cellRef.getText().then(function(value) {
          value = value.split(', ').join('');
          value = parseFloat(value);
          if (value !== 3.217167) {
            expect(false).customError('Total value for the column "Port. Beginning Effective Duration" ' +
              'is not "3.217167"');
            CommonFunctions.takeScreenShot();
          }
        });
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify that the total value for the column "Port. Ending Effective Duration" is "5.746199" ', function() {
      //Verifying total value for the column Port. Ending Effective Duration is 5.746199
      var eleRef = SlickGridFunctions.getCellReference('Contribution to Return', 'Total', '',
        'Port. Ending Effective Duration', '');
      eleRef.then(function(cellRef) {
        cellRef.getText().then(function(value) {
          value = value.split(', ').join('');
          value = parseFloat(value);
          if (value !== portEnd) {
            expect(false).customError('Total value for the column "Port. Ending Effective Duration" ' +
              'is not "' + portEnd + '" as per captured screen shot at Test Step: 545787');
            CommonFunctions.takeScreenShot();
          }
        });
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          eleRef = SlickGridFunctions.getCellReference('Contribution to Return', 'Total', '',
            'Port. Beginning Effective Duration', '');
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      eleRef.then(function(cellRef) {
        cellRef.getText().then(function(value) {
          value = value.split(', ').join('');
          value = parseFloat(value);
          if (value !== portEnd) {
            expect(false).customError('Total value for the column "Port. Ending Effective Duration" ' +
              'is not "' + portEnd + '" as per captured screen shot at Test Step: 545787');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

});
