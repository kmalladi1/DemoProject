'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: mac-custom', function() {

  var countBeforeDelete = [];

  describe('Test Step ID: Startup Instructions', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 608308', function() {

    it('Should open PA3 Application with "Client:;Pa3;Risk;CUSTOM_MAC"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('custom-mac');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if "ICE BofAML US High Yield Index vs S&P 500" header is displayed in calculated report', function() {
      PA3MainPage.getHeader().getText().then(function(headerName) {
        if (headerName !== 'ICE BofAML US High Yield Index vs S&P 500') {
          expect(false).customError('"ICE BofAML US High Yield Index vs S&P 500" header is not displayed ' +
            'instead "' + headerName + '" is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 608309', function() {

    // Select Risk Models tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Risk Models', 'Risk');

    it('Should click on "+" icon next to Available section', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsRiskRiskModels.xpathAddNewButton).press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "MAC Custom Model" dialog appeared', function() {
      ThiefHelpers.isDialogOpen('MAC Custom Model').then(function(option) {
        if (!option) {
          expect(false).customError('"MAC Custom Model" dialog has not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 608313', function() {

    it('Should click "Select Base risk Model" drop down to expand it', function() {
      TileOptionsRiskRiskModels.getComboBoxDropDown('Select Base risk Model').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if drop down opened
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('"Select Base risk Model" drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "FactSet" from the drop down', function() {
      TileOptionsRiskRiskModels.expandElementTreeInDropDown('FactSet');

      // Verifying if "FactSet" is expanded
      TileOptionsRiskRiskModels.checkIfExpandedDDElement('FactSet');
    });

    it('Should click "FactSet > FactSet Multi-Asset Class Model (USD)" from the dropdown', function() {
      TileOptionsRiskRiskModels.getElementFromDropDown('FactSet', 'FactSet Multi-Asset Class Model (USD)').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "FactSet Multi-Asset Class Model (USD)" is selected from the drop down', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsRiskRiskModels.getComboTextBox('Select Base risk Model')).getText().then(function(val) {
        if (val !== 'FactSet Multi-Asset Class Model (USD)') {
          expect(false).customError('"FactSet Multi-Asset Class Model (USD)" is not selected from the drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "0.99" in the "Decimal Decay" field', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsRiskRiskModels.getInputBox('Decimal Decay')).setText('0.99');

      // Verifying if 0.99 is entered in the Decimal Decay input
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsRiskRiskModels.getInputBox('Decimal Decay')).getText().then(function(val) {
        if (val !== '0.99') {
          expect(false).customError('"0.99" is not entered in the "Decimal Decay" input');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "10" in the "Min Lookback" field', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsRiskRiskModels.getInputBox('Min Lookback')).setText('10');

      // Verifying if 10 is entered in the Min Lookback input
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsRiskRiskModels.getInputBox('Min Lookback')).getText().then(function(val) {
        if (val !== '10') {
          expect(false).customError('"10" is not entered in the Min Lookback input');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "90" in the "Max Lookback" field', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsRiskRiskModels.getInputBox('Max Lookback')).setText('90');

      // Verifying if 90 is entered in the Max Lookback input
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsRiskRiskModels.getInputBox('Max Lookback')).getText().then(function(val) {
        if (val !== '90') {
          expect(false).customError('"90" is not entered in the Max Lookback input');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Select Base risk Model" drop down', function() {
      TileOptionsRiskRiskModels.getComboBoxDropDown('Select Base risk Model').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if drop down opened
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('"Select Base risk Model" drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrElements = ['FactSet Multi-asset class Linear Risk Model', 'FactSet Mult-asst class Fat Tailed Risk Model'];

    it('Verify if "' + arrElements + '" are not present in the Risk model dropdown', function() {
      arrElements.forEach(function(element) {
        TileOptionsRiskRiskModels.getElementFromDropDown('FactSet', element).isPresent().then(function(present) {
          if (present) {
            expect(false).customError('"' + element + '" is present in the Risk model dropdown');
            CommonFunctions.takeScreenShot();
          }
        }, function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });
    });

  });

  describe('Test Step ID: 608314', function() {

    var arrHeaders = [];
    var sectionHeaders = ['Equity - Fundamental', 'Equity - Sector', 'Equity - Regional', 'Equity - Economic'];
    var sectionHeaders2 = ['FI - Yield Curve', 'FI - Other'];

    it('Should select "Personal" from the "Save To" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Personal', 'Save To');

      // Verifying if "Personal" is selected form the "Save To" drop down
      ThiefHelpers.verifySelectedDropDownText('Personal', 'Save To');
    });

    it('Should click "OK" button from the "MAC Custom Model" dialog', function() {
      // Verifying that text box is set to the value
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsRiskRiskModels.xpathButtonFromDialogBox, 'OK');
      ThiefHelpers.getButtonClassReference(undefined, xpath).press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Wait for custom model to save', function() {
      // Waiting for custom model to finish calculation
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(undefined,
        TileOptionsRiskRiskModels.xpathProgressIndicator), 40000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while saving custom model.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "MAC Custom Model" dialog is closed', function() {
      ThiefHelpers.isDialogOpen('MAC Custom Model').then(function(option) {
        if (option) {
          expect(false).customError('"MAC Custom Model" dialog is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Remove icon( X )" for the "FactSet Multi-Asset Class Model (USD)" from the Selected section', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getItemByText('FactSet Multi-Asset Class Model (USD)');

      item.getActions().then(function(val) {
        val.triggerAction('remove');
      });
    });

    it('Should select "FactSet Multi-Asset Class Model (USD) - D:0.99, L:10-90 days" from the "FactSet - Custom"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathAvailableContainer).getGroupByText('FactSet - Custom');
      group.expand();
      group.getItemByText('FactSet Multi-Asset Class Model (USD) - D:0.99, L:10-90 days').then(function(listItem) {
        listItem.select();

        // Check if 'FactSet Multi-Asset Class Model (USD) - D:0.99, L:10-90 days' is selected
        listItem.isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"FactSet Multi-Asset Class Model (USD) - D:0.99, L:10-90 days" is not selected from "Selected" section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click "Right arrow" button to move element from Available to Selected section', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying if "FactSet Multi-Asset Class Model (USD) - D:0.99, L:10-90 days" is added to Selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('FactSet Multi-Asset Class Model (USD) - D:0.99, L:10-90 days') === -1) {
          expect(false).customError('"FactSet Multi-Asset Class Model (USD) - D:0.99, L:10-90 days" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "FactSet Multi-Asset Class Model (USD) - D:0.99, L:10-90 days" from Selected section if not already selected', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getItemByText('FactSet Multi-Asset Class Model (USD) - D:0.99, L:10-90 days');

      // Verifying if "FactSet Multi-Asset Class Model (USD) - D:0.99, L:10-90 days" is selected.
      item.isSelected().then(function(selected) {
        if (!selected) {
          item.select();
        }
      });
    });

    it('Wait for loading spinner to disappear', function() {
      //Waiting for report to finish calculation
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(undefined,
        TileOptionsRiskRiskModels.xpathProgressIndicator), 40000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while loading elements.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Client: Custom MAC USD Group" option from "Factor Grouping" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Client: Custom MAC USD Group', 'Factor Grouping');
    });

    it('Verifying "Client: Custom MAC USD Group" option is selected from "Factor Grouping" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Client: Custom MAC USD Group', 'Factor Grouping');
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Collect all headers from calculated report for verification', function() {
      PA3MainPage.getAllMultiHeaderNamesOfSpecifiedLevel('Weights', 1).then(function(headersArr) {
        headersArr.forEach(function(header) {
          arrHeaders.push(header);
        });
      });
    });

    it('Verifying if "' + sectionHeaders + '" are displayed as headers in calculated report', function() {
      sectionHeaders.forEach(function(header) {
        if (arrHeaders.indexOf(header) === -1) {
          expect(false).customError(header + ' header is not displayed in the calculated report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "' + sectionHeaders + '" headers has no values for "MC % Factor Contribution 1 Calendar Day, 95%" column', function() {
      var columnFound = false;
      SlickGridFunctions.getRowIndex('Weights', 'Equity', '', undefined).then(function(rowIndex) {
        sectionHeaders.forEach(function(headerName) {

          // Fetching column number range from multi-header
          PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', headerName).then(function(colRange) {
            colRange.forEach(function(colIndex) {
              SlickGridFunctions.getColumnNames('Weights').then(function(colNamesArr) {
                if ((colNamesArr[colIndex].indexOf('MC % Factor Contribution 1 Calendar Day, 95%')) !== -1) {
                  columnFound = true;
                  browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
                    '.grid.scrollCellIntoView( arguments[0], arguments[1])', rowIndex, colIndex);
                  browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
                    '.grid.getCellNode( arguments[0], arguments[1] )', rowIndex, colIndex).then(function(cellRef) {
                    cellRef.getText().then(function(cellValue) {
                      if (isNaN(cellValue) === false) {
                        expect(false).customError(sectionHeaders + '|MC % Factor Contribution 1 Calendar Day, 95% column has value for "Equity" row');
                        CommonFunctions.takeScreenShot();
                      }
                    });
                  });
                }
              });
            });
          }).then(function() {
            if (!columnFound) {
              columnFound = false;
              expect(false).customError('"MC % Factor Contribution 1 Calendar Day, 95%" column is not found under ' + headerName);
              CommonFunctions.takeScreenShot();
            } else {
              columnFound = false;
            }
          });
        });
      });
    });

    it('Verifying if "' + sectionHeaders2 + '" headers has values for "MC % Factor Contribution 1 Calendar Day, 95%" column', function() {
      var columnFound;
      SlickGridFunctions.getRowIndex('Weights', 'Fixed Income', '', undefined).then(function(rowIndex) {
        sectionHeaders2.forEach(function(headerName) {
          columnFound = false;

          // Fetching column number range from multi-header
          PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', headerName).then(function(colRange) {
            colRange.forEach(function(colIndex) {
              SlickGridFunctions.getColumnNames('Weights').then(function(colNamesArr) {
                if ((colNamesArr[colIndex].indexOf('MC % Factor Contribution 1 Calendar Day, 95%')) !== -1) {
                  columnFound = true;
                  browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
                    '.grid.scrollCellIntoView( arguments[0], arguments[1])', rowIndex, colIndex);
                  browser.sleep(2000);
                  browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
                    '.grid.getCellNode( arguments[0], arguments[1] )', rowIndex, colIndex).then(function(cellRef) {
                    cellRef.getText().then(function(cellValue) {
                      if (isNaN(cellValue) === true) {
                        expect(false).customError(sectionHeaders2 + '|MC % Factor Contribution 1 Calendar Day, 95% column has no value for "Fixed Income" row');
                        CommonFunctions.takeScreenShot();
                      }
                    });
                  });
                }
              });
            });
          }).then(function() {
            if (!columnFound) {
              columnFound = false;
              expect(false).customError('"MC % Factor Contribution 1 Calendar Day, 95%" column is not found under ' + headerName);
              CommonFunctions.takeScreenShot();
            } else {
              columnFound = false;
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 657396', function() {

    var expectedElements = ['FactSet Multi-Asset Class Model (USD) - D:0.99, L:10-90 days',
      'FactSet Multi-Asset Class Model (AUD)', 'FactSet Multi-Asset Class Model (CAD)',];

    // Clicking on wrench Icon from 'Weights' report toolbar
    // Select Risk Models tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Risk Models', 'Risk');

    it('Should select "FactSet Multi-Asset Class Model (AUD)" from the "FactSet"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathAvailableContainer).getGroupByText('FactSet');
      group.expand();
      group.getItemByText('FactSet Multi-Asset Class Model (AUD)').then(function(listItem) {
        listItem.select();

        // Check if 'FactSet Multi-Asset Class Model (AUD)' is selected
        listItem.isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"FactSet Multi-Asset Class Model (AUD)" is not selected from "Selected" section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click "Right arrow" button to move element from Available to Selected section', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Should select "FactSet Multi-Asset Class Model (CAD)" from the "FactSet"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathAvailableContainer).getGroupByText('FactSet');

      group.getItemByText('FactSet Multi-Asset Class Model (CAD)').then(function(listItem) {
        listItem.select();

        // Check if 'FactSet Multi-Asset Class Model (CAD)' is selected
        listItem.isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"FactSet Multi-Asset Class Model (CAD)" is not selected from "Selected" section');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Should click "Right arrow" button to move element from Available to Selected section', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying if count of elements in selected section is 3 and the ' + expectedElements + ' are list in the section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText();

      children.then(function(childArr) {
        console.log(childArr.length + ' in loop');
        if (childArr.length !== 3) {
          expect(false).customError(children.length + ' risk models are available in selected section to be 3');
          CommonFunctions.takeScreenShot();
        } else {
          children.then(function(childArr) {
            for (var i = 0; i < childArr.length; ++i) {
              myArray.push(childArr[i].text);
            }

            for (var j = 0; j < expectedElements.length; j++) {
              if (myArray.indexOf(expectedElements[j]) === -1) {
                expect(false).customError('"' + expectedElements[j] + '" is not added to the selected section');
                CommonFunctions.takeScreenShot();
              }
            }
          });
        }
      });
    });
  });

  describe('Test Step ID: 657400', function() {

    it('Should select "FactSet Multi-Asset Class Model (AUD)" from Selected section if not already selected', function() {
      ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getItemByText('FactSet Multi-Asset Class Model (AUD)').select();

      // Verify if 'FactSet Multi-Asset Class Model (AUD)' is selected
      ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getItemByText('FactSet Multi-Asset Class Model (AUD)').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"FactSet Multi-Asset Class Model (AUD)" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for factors to load', function() {
      //Waiting for report to finish calculation
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(undefined,
        TileOptionsRiskRiskModels.xpathProgressIndicator), 40000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while loading factors.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Factor Grouping" drop down in options pane', function() {
      ThiefHelpers.getDropDownSelectClassReference('Factor Grouping', undefined).open();

      // Verifying "Select an option" drop down appears
      ThiefHelpers.isDropDownOpen().then(function(open) {
        if (!open) {
          expect(false).customError('"Factor Grouping" drop down is not open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Client: Custom MAC USD Group" option is not present in the drop down', function() {
      ThiefHelpers.getAllOptionsFromDropdown().then(function(val) {
        if (val.indexOf('Client: Custom MAC USD Group') !== -1) {
          expect(false).customError('"Client: Custom MAC USD Group" option is present in the drop down options.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 657404', function() {

    it('Should select "FactSet Multi-Asset Class Model (CAD)" Selected section if not already selected', function() {
      ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getItemByText('FactSet Multi-Asset Class Model (CAD)').select();

      // Verify if 'FactSet Multi-Asset Class Model (CAD)' is selected
      ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getItemByText('FactSet Multi-Asset Class Model (CAD)').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"FactSet Multi-Asset Class Model (CAD)" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for factors to load', function() {
      // Waiting for report to finish calculation
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(undefined,
        TileOptionsRiskRiskModels.xpathProgressIndicator), 40000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while loading factors.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Factor Grouping" drop down in options pane', function() {
      // Verifying "Select an option" drop down appears
      ThiefHelpers.isDropDownOpen().then(function(open) {
        if (!open) {
          ThiefHelpers.getDropDownSelectClassReference('Factor Grouping', undefined).open().then(function() {
          }, function(error) {

            expect(false).customError('Not able to click on "Factor Grouping" drop down , Error: ' + error);
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    it('Verifying if "Client: Custom MAC USD Group" option is not present in the drop down', function() {
      ThiefHelpers.getAllOptionsFromDropdown().then(function(val) {
        if (val.indexOf('Client: Custom MAC USD Group') !== -1) {
          expect(false).customError('"Client: Custom MAC USD Group" option is present in the drop down options.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 608315', function() {

    it('Should click on "Clear All" button next to the selected section', function() {
      // Getting the xpath of the button
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsRiskRiskModels.xpathButton, 'Clear All');
      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Verifying if all the risk models are removed from the selected section', function() {
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText();

      if (children.length < 0) {
        expect(false).customError(children.length + ' risk models are available in selected section to be 0');
        CommonFunctions.takeScreenShot();
      }
    });

    it('Fetching count of elements under "FactSet - Custom" group for future verification', function() {
      var parentGroup = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('FactSet - Custom');

      parentGroup.expand();

      parentGroup.getChildrenText().then(function(childArr) {
        console.log(childArr.length);
        countBeforeDelete = childArr.length;
      });
    });

  });

  describe('Test Step ID: 608352', function() {

    it('Should hover on "FactSet Multi-Asset Class Model (USD) - D:0.99, L:10-90 days" and perform click on "X" icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('FactSet - Custom');

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getItemByText('FactSet Multi-Asset Class Model (USD) - D:0.99, L:10-90 days').then(function(item) {
            item.getActions().then(function(val) {
              val.triggerAction('remove');
            });
          }, function(error) {
            expect(false).toBe(error);
          });
        } else {
          expect(false).customError('"FactSet - Custom" group is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "MAC Custom Model" dialog appeared', function() {
      ThiefHelpers.isDialogOpen('MAC Custom Model').then(function(option) {
        if (!option) {
          expect(false).customError('"MAC Custom Model" dialog has not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for elements to load in dialog box', function() {
      //Waiting for report to finish calculation
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(undefined,
        TileOptionsRiskRiskModels.xpathProgressIndicator), 40000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while loading elements.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Personal" from the "Delete From:" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Personal', 'Delete From:');

      // Verifying if "Personal" is selected form the "Delete From:" drop down
      ThiefHelpers.verifySelectedDropDownText('Personal', 'Delete From:');
    });

    it('Should click "OK" button from the "MAC Custom Model" dialog', function() {
      // Verifying that text box is set to the value
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsRiskRiskModels.xpathButtonFromDialogBox, 'OK');
      ThiefHelpers.getButtonClassReference(undefined, xpath).press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Wait for deleting custom model spinner to disappear', function() {
      //Waiting for report to finish calculation
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(undefined,
        TileOptionsRiskRiskModels.xpathProgressIndicator), 40000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while deleting model.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Known Issue: RPD:35621902
    // FactSet Multi-Asset Class Model (USD) - D:0.99, L:10-90 days is present in Available Section
    it('Verifying if "FactSet Multi-Asset Class Model (USD) - D:0.99, L:10-90 days" element is present in available section by count', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathAvailableContainer).getGroupByText('FactSet - Custom');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getChildrenText().then(function(arrObject) {
            var countAfterDelete = arrObject.length;
            console.log(countAfterDelete + ' - ' + (countBeforeDelete));
            if (countAfterDelete !== (countBeforeDelete)) {
              expect(false).customError('Count of elements under "FactSet - Custom" group, Expected: ' + (countBeforeDelete) + ', Found: ' + countAfterDelete);
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"FactSet - Custom" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Known Issue: RPD:35621902
    // FactSet Multi-Asset Class Model (USD) - D:0.99, L:10-90 days is present in Available Section
    var arrElements = [];
    it('Verifying if "FactSet Multi-Asset Class Model (USD) - D:0.99, L:10-90 days" element is deleted from "Available" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathAvailableContainer).getGroupByText('FactSet - Custom');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getChildrenText().then(function(arrObject) {
            arrObject.forEach(function(listItem) {
              console.log(listItem.text);
              arrElements.push(listItem.text);
            });
          }).then(function() {
            if (arrElements.indexOf('FactSet Multi-Asset Class Model (USD) - D:0.99, L:10-90 days') === -1) {
              expect(false).customError('"FactSet Multi-Asset Class Model (USD) - D:0.990" is not present in "Available" section');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"FactSet - Custom" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 608353', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');
  });

});
