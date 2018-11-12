'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: lot-level-pl-values', function() {

  // Getting the xpath of the Selected section for exclusions
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Selected');

  // Getting the xpath of the Selected section for columns
  var xpathOfColumnsSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Available');

  describe('Test Step ID: Startup Instructions', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 538637', function() {

    it('Should launch the PA3 application with "Client:/Pa3/lot_detail/LOT_LEV_DET_VALUES" document', function() {
      PA3MainPage.switchToDocument('lot-lev-det-values');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    it('Verifying if "Ungrouped" is selected from the LHP', function() {
      PA3MainPage.getReports('Ungrouped').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Ungrouped" did not get selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Security Name" grouping is present in "Contribution to Return" report', function() {
      PA3MainPage.getGroupingsHyperLink('Contribution to Return').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Security Name" grouping did not present in "Contribution to Return" report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Contribution to Return" report is grouped by "Security Name"', function() {
      PA3MainPage.getGroupingsHyperLink('Contribution to Return').getText().then(function(text) {
        if (text.indexOf('Security Name') < 0) {
          expect(false).customError('"Contribution to Return" report did not group by "Security Name"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the date range of "Contribution to Return" report is displayed', function() {
      PA3MainPage.getDateHyperLink().isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Contribution to Return" report did not display date range');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the date range of "Contribution to Return" report is displayed as "30-JAN-2015 - 25-FEB-2015"', function() {
      PA3MainPage.getDateHyperLink().getText().then(function(value) {
        if (value !== '30-JAN-2015 - 25-FEB-2015') {
          expect(false).customError('The date range in "Contribution to Return" report did not set to ' +
            '"30-JAN-2015 - 25-FEB-2015"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 538682', function() {

    it('Should click "RPC - L/S + Security Name" report from LHP', function() {
      PA3MainPage.getReports('RPC - L/S + Security Name').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that RPC - L/S + Security Name is selected in LHP
      PA3MainPage.getReports('RPC - L/S + Security Name').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"RPC - L/S + Security Name" did not get selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution to Return', 'Universe');

    it('Should check "Expand Lot Level Data" check box', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, TileOptionsUniverse.xpathExpandLotLevelDataCheckBox)
        .isChecked().then(function(checked) {
          if (!checked) {
            ThiefHelpers.getCheckBoxClassReference(undefined, TileOptionsUniverse.xpathExpandLotLevelDataCheckBox)
              .check();
          }
        });
    });

    it('Verifying if the "Expand Lot Level Data" check box is checked', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, TileOptionsUniverse.xpathExpandLotLevelDataCheckBox)
        .isChecked().then(function(checked) {
          if (!checked) {
            expect(false).customError('"Expand Lot Level Data" check box did not check off');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    var colNames = ['Port. Realized Profit & Loss Rpt. Period Cost', 'Port. Unrealized Profit & Loss Rpt. Period Cost',
      'Port. Total Profit & Loss Rpt. Period Cost',];
    var totalValues = ['-6,735.99', '10,187.44', '3,451.46'];

    colNames.forEach(function(column, index) {

      it('Verifying if the "Total" row for "' + column + '" is set to "' + totalValues[index] + '"', function() {
        SlickGridFunctions.getCellReference('Contribution to Return', 'Total', '', column, '').then(function(ref) {
          ref.getText().then(function(value) {
            if (value !== totalValues[index]) {
              expect(false).customError('"' + column + '" column did not display "' + totalValues[index] + ' in ' +
                '"Total" row"; Found: ' + value);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

    });

  });

  describe('Test Step ID: 538686', function() {

    it('Should click "Client Cost" report from LHP', function() {
      PA3MainPage.getReports('Client Cost').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Client Cost is selected in LHP
      PA3MainPage.getReports('Client Cost').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Client Cost" did not get selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution to Return', 'Universe');

    it('Should check "Expand Lot Level Data" check box', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, TileOptionsUniverse.xpathExpandLotLevelDataCheckBox)
        .isChecked().then(function(checked) {
          if (!checked) {
            ThiefHelpers.getCheckBoxClassReference(undefined, TileOptionsUniverse.xpathExpandLotLevelDataCheckBox)
              .check();
          }
        });
    });

    it('Verifying if the "Expand Lot Level Data" check box is checked', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, TileOptionsUniverse.xpathExpandLotLevelDataCheckBox)
        .isChecked().then(function(checked) {
          if (!checked) {
            expect(false).customError('"Expand Lot Level Data" check box did not check off');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    // Known Issue: RPD:20873443
    var colNames = ['Port. Realized Profit & Loss Client Cost', 'Port. Unrealized Profit & Loss Client Cost',
      'Port. Total Profit & Loss Client Cost',];
    var totalValues = ['-15,867', '7,128', '-8,739'];

    colNames.forEach(function(column, index) {

      it('Verifying if the "Total" row for "' + column + '" is set to "' + totalValues[index] + '"', function() {
        SlickGridFunctions.getCellReference('Contribution to Return', 'Total', '', column, '').then(function(ref) {
          ref.getText().then(function(value) {
            if (value !== totalValues[index]) {
              expect(false).customError('"' + column + '" column did not display "' + totalValues[index] + ' in ' +
                '"Total" row"; Found: ' + value);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

    });

  });

  describe('Test Step ID: 544990', function() {

    it('Should click "Custom Grouping" report from LHP', function() {
      PA3MainPage.getReports('Custom Grouping').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Custom Grouping is selected in LHP
      PA3MainPage.getReports('Custom Grouping').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Custom Grouping" did not get selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution to Return', 'Universe');

    it('Should check "Expand Lot Level Data" check box', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, TileOptionsUniverse.xpathExpandLotLevelDataCheckBox)
        .isChecked().then(function(checked) {
          if (!checked) {
            ThiefHelpers.getCheckBoxClassReference(undefined, TileOptionsUniverse.xpathExpandLotLevelDataCheckBox)
              .check();
          }
        });
    });

    it('Verifying if the "Expand Lot Level Data" check box is checked', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, TileOptionsUniverse.xpathExpandLotLevelDataCheckBox)
        .isChecked().then(function(checked) {
          if (!checked) {
            expect(false).customError('"Expand Lot Level Data" check box did not check off');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution to Return', 'Groupings');

    it('Should type "Lot" into the "Search" field of "Available" section', function() {
      TileOptionsGroupings.getAvailableSectionSearchBox().sendKeys('Lot').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Lot" is entered into the Search field
      TileOptionsGroupings.getAvailableSectionSearchBox().getAttribute('value').then(function(name) {
        if (name !== 'Lot') {
          expect(false).customError('Expected: "Lot" to be entered into the Search field but' +
            ' Found: "' + name + '"');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for search to happen
      browser.sleep(3000);
    });

    it('Select "Lot Purchase Date" from "FactSet > Other" in "Available" section', function() {
      TileOptionsGroupings.getElementFromAvailableSection('FactSet|Other', 'Lot Purchase Date').click()
        .then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });

      // Verifying that "Lot Purchase Date" is selected
      TileOptionsGroupings.getElementFromAvailableSection('FactSet|Other', 'Lot Purchase Date')
        .getAttribute('class').then(function(value) {
          if (value.indexOf('selected') < 0) {
            expect(false).customError('"Lot Purchase Date" did not get selected in the Available section');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should click on "Right" arrow button to add "Lot Purchase Date" to the "Selected" section', function() {
      TileOptionsGroupings.getArrowButton('Right').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Lot Purchase Date" is added to the "Selected" section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Lot Purchase Date').isPresent().then(function(added) {
        if (!added) {
          expect(false).customError('"Lot Purchase Date" did not get added to the "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');
    it('Verifying if the securities are grouped by "Lot Purchase Dates"', function() {
      var parentID;
      browser.driver.executeScript('return $(".tf-slick-grid").data("$tfSlickGridController")' +
        '.grid.getData().getItems()').then(function(dataView) {
          dataView.forEach(function(element) {
            if (element[1] === 'Apple Inc.' && element.hasChildren === true) {
              parentID = element.id;
              dataView.forEach(function(element) {
                if (element.parentId === parentID && (element[1] !== '1/30/2015' || element[1] !==
                  '2/2/2015') && element.hasChildren !== true) {
                  expect(false).customError('Securities did not group by "Lot Purchase Dates"');
                  CommonFunctions.takeScreenShot();
                }
              });
            }
          });
        });

    });

  });

  describe('Test Step ID: 544993', function() {

    it('Should click "Custom Column" report from LHP', function() {
      PA3MainPage.getReports('Custom Column').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Custom Column is selected in LHP
      PA3MainPage.getReports('Custom Column').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Custom Column" did not get selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution to Return', 'Universe');

    it('Should check "Expand Lot Level Data" check box', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, TileOptionsUniverse.xpathExpandLotLevelDataCheckBox)
        .isChecked().then(function(checked) {
          if (!checked) {
            ThiefHelpers.getCheckBoxClassReference(undefined, TileOptionsUniverse.xpathExpandLotLevelDataCheckBox)
              .check();
          }
        });
    });

    it('Verifying if the "Expand Lot Level Data" check box is checked', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, TileOptionsUniverse.xpathExpandLotLevelDataCheckBox)
        .isChecked().then(function(checked) {
          if (!checked) {
            expect(false).customError('"Expand Lot Level Data" check box did not check off');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    it('Verifying if the groupings hyperlink is "Long/Short"', function() {
      PA3MainPage.getGroupingsHyperLink('Contribution to Return').getText().then(function(text) {
        if (text !== 'Long/Short') {
          expect(false).customError('Grouping hyperlink did not contain "Long/Short"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Long/Short" hyperlink in "Weights" report', function() {
      PA3MainPage.getGroupingsHyperLink('Contribution to Return').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Columns" tab from LHP to select', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Columns is selected in LHP
      TileOptions.getLHPOption('Columns').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Columns" did not get selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });

      // Checking if 'Columns' item is opened.
      TileOptions.getOptionTitle().getText().then(function(text) {
        if (text.indexOf('Columns') < 0) {
          expect(false).customError('"Columns" tile did not get opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "+" icon in the "Available" section', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsColumns.xpathAddNewButton).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Lot Columns" from the drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Lot Columns').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Reference" radio button in window', function() {
      ThiefHelpers.getRadioClassReference('Reference').select();

      // Verifying if the "Reference" radio button is selected
      ThiefHelpers.getRadioClassReference('Reference').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Reference" radio button did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var dialogText = ['LOT_PURCHASE_DATE', '#SD', 'LOT_PURCHASE_DATE'];
    var fieldName = ['Column:', 'Date:', 'Name:'];

    dialogText.forEach(function(text, index) {

      it('Should enter "' + text + '" in the "' + fieldName[index] + '" field', function() {
        // Entering text into the field
        var xpath = CommonFunctions.replaceStringInXpath(CreateEditCustomColumns.xpathTextBoxFromCreateEditCustomLot,
          fieldName[index]);
        ThiefHelpers.getTextBoxClassReference(undefined, xpath).setText(text);

        // Verifying that requires text is typed into the field
        ThiefHelpers.getTextBoxClassReference(undefined, xpath).getText().then(function(value) {
          if (value !== text) {
            expect(false).customError('"' + text + '" did not get typed ' +
              'into "' + fieldName[index] + '" field; Found: ' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Should click on "Save" button to save the settings', function() {
      CreateEditCustomColumns.getButton('Save').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should highlight "LOT_PURCHASE_DATE" from "Selected" section', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfColumnsSelectedSection).getItemByText('LOT_PURCHASE_DATE');
      item.select();
    });

    it('Should click the up arrow till the "LOT_PURCHASE_DATE" is moved to "third" position', function() {

      var countOfElements;

      var moveUp = function() {
        TileOptionsColumns.getArrowButton('Up').click().then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      };

      TileOptionsColumns.getAllElements('Selected').count().then(function(elements) {
        countOfElements = elements;
      }).then(function() {
        for (var i = 1; i < countOfElements - 2; i++) {
          moveUp();
        }
      });

      // Verifying that "LOT_PURCHASE_DATE" is on the third position of "Selected" section
      TileOptionsColumns.getAllElements('Selected').get(2).getText().then(function(text) {
        if (text !== 'LOT_PURCHASE_DATE') {
          expect(false).customError('"LOT_PURCHASE_DATE" did not present in third position of "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    it('Verifying if the "Custom Column" is selected in LHP', function() {
      PA3MainPage.getReports('Custom Column').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Custom Column" did not get selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var groupsarray = ['Anthem, Inc.', 'Apple Inc.', 'Apple Inc.', 'Bank of America Corporation', 'Bank of America Corporation',
      'Biocept, Inc.', 'Biocept, Inc.', 'Boston Scientific Corporation', 'Boston Scientific Corporation',
      'Electronic Arts Inc.', 'Electronic Arts Inc.', 'Electronic Arts Inc.', 'Electronic Arts Inc.',
      'FactSet Research Systems Inc.', 'FactSet Research Systems Inc.', 'Ford Motor Company', 'General Electric Company',
      'General Electric Company', 'General Motors Company', 'General Motors Company', 'Intel Corporation', 'Intel Corporation',
      'JPMorgan Chase &amp; Co.', 'JPMorgan Chase & Co.', 'Micron Technology, Inc.', 'Micron Technology, Inc.',
      'Microsoft Corporation', 'Microsoft Corporation', 'Mohawk Industries, Inc.',
      'National Bank of Greece S.A. Sponsored ADR', 'National Bank of Greece S.A. Sponsored ADR', 'Netflix, Inc.',
      'Office Depot, Inc.', 'Office Depot, Inc.', 'PAR Technology Corporation', 'Petroleo Brasileiro SA Sponsored ADR',
      'Petroleo Brasileiro SA Sponsored ADR', 'Vale S.A. Sponsored ADR', 'Vale S.A. Sponsored ADR', 'Fossil Group, Inc.',
      'Genpact Limited', 'Ralph Lauren Corporation Class A', 'Thomson Reuters Corporation', 'Tiffany &amp; Co.',];
    var dates = ['17-FEB-2015', '02-FEB-2015', '30-JAN-2015', '02-FEB-2015', '30-JAN-2015', '02-FEB-2015', '30-JAN-2015',
      '02-FEB-2015', '30-JAN-2015', '13-FEB-2015', '13-FEB-2015', '19-FEB-2015', '19-FEB-2015', '02-FEB-2015',
      '30-JAN-2015', '03-FEB-2015', '02-FEB-2015', '30-JAN-2015', '02-FEB-2015', '30-JAN-2015', '02-FEB-2015',
      '30-JAN-2015', '02-FEB-2015', '30-JAN-2015', '02-FEB-2015', '30-JAN-2015', '02-FEB-2015', '30-JAN-2015', '17-FEB-2015',
      '02-FEB-2015', '30-JAN-2015', '12-FEB-2015', '02-FEB-2015', '30-JAN-2015', '24-FEB-2015',
      '02-FEB-2015', '30-JAN-2015', '02-FEB-2015', '30-JAN-2015', '06-FEB-2015', '25-FEB-2015', '06-FEB-2015', '06-FEB-2015',
      '06-FEB-2015',];

    it('Verifying if all securities in the "Contribution to Return" report display date in "LOT_PURCHASE_DATE" column', function() {
      groupsarray.forEach(function(value, index) {
        browser.driver.executeScript(function() {
          var slickObject = $('.tf-slick-grid').data('$tfSlickGridController');

          var dataObjs = [];
          slickObject.grid.getData().getItems().forEach(function(dataItem) {
            if (dataItem.hasChildren === undefined) {
              dataObjs.push(dataItem);
            }
          });

          return dataObjs;
        }).then(function(dataItems) {
          dataItems.forEach(function(dataItem, dataItemIndex) {
            if (dataItem[1] === value && dataItemIndex - 1 === index) {
              if (dataItem[2] !== dates[index]) {
                expect(false).customError('"LOT_PURCHASE_DATE" column in "Contribution to Return" report did ' +
                  'not set to "' + dates[index] + '" for the security "' + value + '"; Found: ' + dataItem[2]);
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });

  });

  describe('Test Step ID: 544998', function() {

    it('Should click "Exclusions" report from LHP', function() {
      PA3MainPage.getReports('Exclusions').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Exclusions is selected in LHP
      PA3MainPage.getReports('Exclusions').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Exclusions" did not get selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution to Return', 'Universe');

    it('Should check "Expand Lot Level Data" check box', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, TileOptionsUniverse.xpathExpandLotLevelDataCheckBox)
        .isChecked().then(function(checked) {
          if (!checked) {
            ThiefHelpers.getCheckBoxClassReference(undefined, TileOptionsUniverse.xpathExpandLotLevelDataCheckBox)
              .check();
          }
        });
    });

    it('Verifying if the "Expand Lot Level Data" check box is checked', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, TileOptionsUniverse.xpathExpandLotLevelDataCheckBox)
        .isChecked().then(function(checked) {
          if (!checked) {
            expect(false).customError('"Expand Lot Level Data" check box did not check off');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    it('Should right click on "Report" and select "Collapse|Level1"', function() {
      PA3MainPage.rightClickAndSelectOption(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Contribution to Return',
        1, 'Long'), 'Collapse|Level 1');
      browser.sleep(2000);
    });

    var group = ['Long', 'Short', '[Cash]'];

    group.forEach(function(value, index) {

      it('Verifying if the report shows "' + value + '" group is present in the slick grid', function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution to Return', '').then(function(col) {
          col.splice(0, 1);
          if (value !== col[index]) {
            expect(false).customError('"' + value + '" group did not present in the slick grid; Found: ' + col[index]);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Verifying if the count of the row is "3"', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution to Return', '').then(function(col) {
        col.splice(0, 1);
        if (col.length !== 3) {
          expect(false).customError('Count did not match with 3; Found: ' + col.length);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 545081', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution to Return', 'Exclusions');

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000))
        .toBeTruthy();
    });

    it('Should double click "Long" in "Available" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Long');
      group.select();
      group.doubleClick();
    });

    it('Verifying if the element "Long" is moved to "Selected" section', function() {
      var myArray = [];
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Long/Short > Security Name > Lot ID');
      var children = group.getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Long') === -1) {
          expect(false).customError('"Long" is not added to the selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    it('Should right click on "Report" and select "Expand|All"', function() {
      PA3MainPage.rightClickAndSelectOption(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Contribution to Return',
        1, 'Short'), 'Expand|All');
      browser.sleep(2000);
    });

    var group = ['Short', '[Cash]'];

    group.forEach(function(value) {

      it('Verifying if the report shows "' + value + '" group is present in the slick grid', function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution to Return', '').then(function(columnData) {
          if (columnData.indexOf(value) < 0) {
            expect(false).customError('"' + value + '" group did not present in the slick grid');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Verifying if the report displays "Long" group in the slick grid', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution to Return', '').then(function(columnData) {
        if (columnData.indexOf('Long') >= 0) {
          expect(false).customError('"Long" group is present in the slick grid');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Exclusions" hyperlink is present in the report', function() {
      PA3MainPage.getExclusionsHyperLink('Contribution to Return').isPresent().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Exclusions" hyperlink did not present in the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Excluded: Long" hyperlink is present in the report', function() {
      PA3MainPage.getExclusionsHyperLink('Contribution to Return').getText().then(function(text) {
        if (text !== 'Excluded: Long') {
          expect(false).customError('"Excluded: Long" hyperlink did not display in the report; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

});
