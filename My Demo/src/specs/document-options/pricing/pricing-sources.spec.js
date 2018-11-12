'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: pricing-sources', function() {

  var columns = ['Price', 'Port. Weight', 'Bench. Weight', 'Difference'];

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  describe('Test Step ID: 572112', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:default_doc_OLD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });
  });

  describe('Test Step ID: 572114', function() {

    it('Entering value "Client:/pa3/test" in the "Portfolio" widget and select TEST.ACCT | Client:/pa3/ from the type ahead results', function() {
      PA3MainPage.setPortfolio('Client:/pa3/test', 'TEST.ACCT | Client:/pa3/', 'Client:/pa3/TEST.ACCT').then(function(value) {
        if (!value) {
          expect(false).customError('"TEST.ACCT | Client:/pa3/" is not selected from type ahead results');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    // Verify the option from the lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Weights', undefined, 'isSelected');

    it('Verifying values are displayed for the columns Port. Weight, Bench. Weight and Difference for Commercial Services grouping', function() {
      var flag = 0;
      columns.forEach(function(column) {
        if (column !== 'Price') {
          SlickGridFunctions.getCellReference('Weights', 'Commercial Services', '', column).then(function(value) {
            value.getText().then(function(text) {
              if (text === '' || text === '--' || text === null || text === '@NA') {
                expect(false).customError('value is not displayed for commercial services grouping for ' + column + 'column');
                flag = flag + 1;
                if (flag === 1) {
                  CommonFunctions.takeScreenShot();
                }
              }
            });
          });
        }
      });
    });
  });

  describe('Test Step ID: 572116', function() {

    it('Should expand the Commercial Services > Advertising/Marketing Services from Weights reports', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Commercial Services|Advertising/Marketing Services', undefined, undefined);
    });

    it('Verifying if Commercial Services > Advertising/Marketing Services group is expanded', function() {
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Commercial Services|Advertising/Marketing Services');
    });

    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSelectOption('Document Options');

    it('Verifying if "Document Options" page is opened', function() {
      ThiefHelpers.isModeBannerDisplayed('Document Options').then(function(found) {
        if (!found) {
          expect(false).customError('View is not changed to "Document Options".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on X icon next to upper Selected section in Prices - Portfolio pane', function() {
      DocumentOptionsPricesPortfolio.getClearSelectedItemsButton('prices').click().then(function() {}, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying all elements are removed from prices-available selected section
      DocumentOptionsPricesPortfolio.getAllListElements('Prices', 'Selected').count().then(function(count) {
        if (count !== 0) {
          expect(false).customError('Elements are not removed from prices-available section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if Commercial Services > Advertising/Marketing Services group is expanded', function() {
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Commercial Services|Advertising/Marketing Services');
    });

    it('Verifying Port. Weight and Difference columns display dashes (--) for Advertising/Marketing Services sector', function() {
      var flag = false;
      columns.forEach(function(column) {
        if (column === 'Port. Weight' || column === 'Difference') {
          SlickGridFunctions.getElementsFromTree('Weights', '', 'Commercial Services|Advertising/Marketing Services').then(function(reference) {
            reference.forEach(function(ele) {
              SlickGridFunctions.getCellReference('Weights', ele, '', column, '', 'Commercial Services|Advertising/Marketing Services').then(function(option) {
                option.getText().then(function(colVal) {
                  if (colVal !== '--') {
                    expect(false).customError('For ' + ele + ' in column ' + column + ' dashes (--) is not displayed. Found ' + colVal);
                    flag = true;
                  }
                });
              });
            });
          });
        }
      });

      if (flag) {
        CommonFunctions.takeScreenShot();
      }
    });
  });

  describe('Test Step ID: 572125', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Columns');

    it('Should select "Ending Price" from selected section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Ending Price').select();

      // Verify if 'Ending Price' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Ending Price').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Ending Price" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Show Column" check box from "FORMAT" accordion', function() {
      ThiefHelpers.getCheckBoxClassReference('Show Column').check();

      // Verifying the checkbox is checked
      ThiefHelpers.getCheckBoxClassReference('Show Column').isChecked().then(function(value) {
        if (!value) {
          expect(false).customError('Show Column checkbox not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if Commercial Services > Advertising/Marketing Services group is expanded', function() {
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Commercial Services|Advertising/Marketing Services');
    });

    it('Verifying Price, Port Weight and Difference columns display dashes (--) for Advertising/Marketing Services sector', function() {
      var flag = false;
      columns.forEach(function(column) {
        if (column !== 'Bench. Weight') {
          SlickGridFunctions.getElementsFromTree('Weights', '', 'Commercial Services|Advertising/Marketing Services').then(function(reference) {
            reference.forEach(function(ele) {
              SlickGridFunctions.getCellReference('Weights', ele, '', column, '', 'Commercial Services|Advertising/Marketing Services').then(function(option) {
                option.getText().then(function(colVal) {
                  if (colVal !== '--') {
                    expect(false).customError('For ' + ele + ' in column ' + column + ' dashes (--) is not displayed. Found ' + colVal);
                    flag = true;
                  }
                });
              });
            });
          });
        }
      });

      if (flag) {
        CommonFunctions.takeScreenShot();
      }
    });
  });

  describe('Test Step ID: 572131', function() {

    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSelectOption('Document Options');

    it('Verifying if "Document Options" page is opened', function() {
      ThiefHelpers.isModeBannerDisplayed('Document Options').then(function(found) {
        if (!found) {
          expect(false).customError('View is not changed to "Document Options".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "Equity" in the "Price - Available" section input box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, DocumentOptionsPricesPortfolio.getSearchField('Prices')).setText('Equity');
    });

    it('Verifying if "Equity" is entered in the "Price - Available" section input box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, DocumentOptionsPricesPortfolio.getSearchField('Prices')).getText().then(function(value) {
        if (value !== 'Equity') {
          expect(false).customError('"Equity" is not entered in the "Price - Available" section input box, instead' + ' found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Double click on "FactSet - Equity" to add it to "Selected" section', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer, 'FactSet - Equity', 'Equity|FactSet', 'Equity|FactSet').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Verifying that "Equity|FactSet" is added to the "Selected" section', function() {
      DocumentOptionsPricesPortfolio.getElementFromPricesSelectedContainer('FactSet - Equity').isDisplayed().then(function(value) {
        if (!value) {
          expect(false).customError('"FactSet - Equity" is not added to the "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "port" in "Prices-Available" search field in the Prices - Portfolio pane', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, DocumentOptionsPricesPortfolio.getSearchField('Prices')).setText('Port');

      //Verifying value entered in prices - available search field
      ThiefHelpers.getTextBoxClassReference(undefined, DocumentOptionsPricesPortfolio.getSearchField('Prices')).getText().then(function(value) {
        if (value !== 'Port') {
          expect(false).customError('"Port" is not entered in the "Price - Available" section input box, instead' + ' found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Double click on "Client Portfolio" to add it to "Selected" section', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer, 'Client Portfolio', 'Client Provided', 'Client Provided').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Verifying that "Client Portfolio" is added to the "Selected" section', function() {
      DocumentOptionsPricesPortfolio.getElementFromPricesSelectedContainer('Client Portfolio').isDisplayed().then(function(value) {
        if (!value) {
          expect(false).customError('"Client Portfolio" is not added to the "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Click on "Ok" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if Commercial Services > Advertising/Marketing Services group is expanded', function() {
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Commercial Services|Advertising/Marketing Services');
    });

    var flag = 0;
    it('Verifying Price, Difference columns display the values for Advertising/Marketing Services sector', function() {
      columns.forEach(function(column) {
        if (column === 'Price' || column === 'Difference') {
          SlickGridFunctions.getElementsFromTree('Weights', '', 'Commercial Services|Advertising/Marketing Services').then(function(reference) {
            reference.forEach(function(ele) {
              SlickGridFunctions.getCellReference('Weights', ele, '', column, '', 'Commercial Services|Advertising/Marketing Services').then(function(option) {
                option.getText().then(function(colVal) {
                  if (colVal === '--' || colVal === '' || colVal === ' ' || colVal === null) {
                    expect(false).customError('For ' + ele + ' in column ' + column + ' value is not displayed. Found ' + colVal);
                    flag = flag + 1;
                    if (flag === 1) {
                      CommonFunctions.takeScreenShot();
                    }
                  }
                });
              });
            });
          });
        }
      });

      if (flag) {
        CommonFunctions.takeScreenShot();
      }
    });

    // As per known issue RPD:22135611
    it('Verifying Port. Weight column displays values for Advertising/Marketing Services sector except for Clear Channel and ' + 'Groupon Inc displayes dashes (--)', function() {
      var flag = false;
      SlickGridFunctions.getElementsFromTree('Weights', '', 'Commercial Services|Advertising/Marketing Services').then(function(reference) {
        reference.forEach(function(ele) {
          SlickGridFunctions.getCellReference('Weights', ele, '', 'Port. Weight', '', 'Commercial Services|Advertising/Marketing Services').then(function(option) {
            option.getText().then(function(colVal) {
              if (ele === 'Clear Channel Outdoor Holdings, Inc. Class A' || ele === 'Groupon, Inc.') {
                if (colVal !== '--') {
                  expect(false).customError('For ' + ele + ' in Port. Weight column for Advertising/Marketing Services sector dashes (--) is not displayed found :' + colVal);
                  flag = flag + 1;
                }
              } else {
                if (colVal === '--' || colVal === '' || colVal === ' ' || colVal === null) {
                  expect(false).customError('For ' + ele + ' in Port. Weight column for Advertising/Marketing Services sector value is not displayed found :' + colVal);
                  flag = flag + 1;
                }
              }

              if (flag === 1) {
                CommonFunctions.takeScreenShot();
              }
            });
          });
        });
      });
    });
  });
});
