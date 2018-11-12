'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: cols-general', function() {

  var lengthOfSelectedSection = 0;
  var indexOfRequiredElement = 0;
  var indexOfTicker;
  var indexOfSecurityName;
  var navCounter;
  var width1;
  var width2;

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  describe('Test Step ID: 387083', function() {

    // Should check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:/testqa2"', function() {
      PA3MainPage.switchToDocument('testqa2');
    });

    it('Wait for report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(true).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "CLIENT:/PA3/PA3_TEST2.ACCT" value in the "Portfolio" widget', function() {
      ThiefHelpers.getTextBoxClassReference('Portfolio', PA3MainPage.xpathPortfolioWidget).getText().then(function(option) {
        if (option !== 'CLIENT:/PA3/PA3_TEST2.ACCT') {
          expect(false).customError('"CLIENT:/PA3/PA3_TEST2.ACCT" is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "RUSSELL:1000" value in the "Benchmark" widget', function() {
      ThiefHelpers.getTextBoxClassReference('Benchmark', PA3MainPage.xpathBenchmarkWidget).getText().then(function(option) {
        if (option !== 'RUSSELL:1000') {
          expect(false).customError('"RUSSELL:1000" is not displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 387084', function() {

    it('Should click on the Wrench icon in the "Weights" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //Verifying wrench menu list is displayed in "Weights" report workspace'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Wrench menu drop down list is not displayed in ' +
            '"Weights" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from menu drop down of "Weights" report workspace ', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function() {

        expect(false).customError(' Not able to select "Options" option from "menu dropdown" of "Weights" report workspace');
        CommonFunctions.takeScreenShot();
      });

      //Verifying tile options mode is opened
      TileOptions.isTileOptionsMode().then(function(value) {
        if (!value) {
          expect(false).customError('Tile Options mode is Closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Columns" on the LHP of tile options', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "FactSet|Portfolio|Long / Short" and select "Net/Gross Ratio"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');
      group.isExpanded().then(function(expanded) {
        if (expanded) {

          // Expanding "Portfolio"
          group.getGroupByText('Portfolio').then(function(secondGroup) {
            secondGroup.expand();

            //  Verifying if "Portfolio" is expanded
            secondGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                secondGroup.getGroupByText('Long / Short').then(function(thirdGroup) {

                  // Expanding "Long / Short"
                  thirdGroup.expand();

                  // Verifying if "Long / Short" is expanded
                  thirdGroup.isExpanded().then(function(expanded) {
                    if (expanded) {

                      // Select "Net/Gross Ratio"
                      thirdGroup.getItemByText('Net/Gross Ratio').then(function(columnName) {
                        columnName.select();

                        columnName.isSelected().then(function(selected) {
                          if (!selected) {
                            expect(false).customError();
                            CommonFunctions.takeScreenShot();
                          }
                        });
                      });

                    } else {
                      expect(false).customError('"Portfolio" tree was not expanded');
                      CommonFunctions.takeScreenShot();
                    }
                  });
                });
              }
            });
          });
        }
      });
    });

    it('Should click on right arrow button', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying "Net/Gross Ratio" is added to selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Net/Gross Ratio') === -1) {
          expect(false).customError('"Net/Gross Ratio" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 387085', function() {

    var flag = 0;

    it('Should expand "FactSet|Portfolio|Fixed Income" and select "Port. Ending Factor"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');
      group.isExpanded().then(function(expanded) {
        if (expanded) {

          // Expanding "Portfolio"
          group.getGroupByText('Portfolio').then(function(secondGroup) {

            //  Verifying if "Portfolio" is expanded
            secondGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                secondGroup.getGroupByText('Fixed Income').then(function(thirdGroup) {

                  // Expanding "Fixed Income"
                  thirdGroup.expand();

                  // Verifying if "Fixed Income" is expanded
                  thirdGroup.isExpanded().then(function(expanded) {
                    if (expanded) {

                      // Select "Port. Ending Factor"
                      thirdGroup.getItemByText('Port. Ending Factor').then(function(columnName) {
                        columnName.select();

                        // Verifying if "Port. Ending Factor" is selected
                        columnName.isSelected().then(function(selected) {
                          if (!selected) {
                            expect(false).customError();
                            CommonFunctions.takeScreenShot();
                          }
                        });
                      });

                    } else {
                      expect(false).customError('"Portfolio" tree was not expanded');
                      CommonFunctions.takeScreenShot();
                    }
                  });
                });
              }
            });
          });
        }
      });
    });

    it('Should click on right arrow button', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying "Port. Ending Factor" ratio is added to selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Port. Ending Factor') === -1) {
          expect(false).customError('"Port. Ending Factor" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Ending Price" ratio from selected section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Ending Price').select();

      // Verify if 'Ending Price' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Ending Price').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Ending Price" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on left arrow button', function() {
      ThiefHelpers.sendElementToAvailableSection();
    });

    it('Should select "Bench. Ending Weight" ratio from selected section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Bench. Ending Weight').select();

      // Verify if 'Bench. Ending Weight' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Bench. Ending Weight').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Bench. Ending Weight" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Down arrow" button two times', function() {
      ThiefHelpers.getTransferBoxReference().target.down();
      ThiefHelpers.getTransferBoxReference().target.down().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Net/Gross Ratio" ratio from selected section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Net/Gross Ratio').select();

      // Verify if 'Net/Gross Ratio' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Net/Gross Ratio').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Net/Gross Ratio" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Up arrow" button two times', function() {
      ThiefHelpers.getTransferBoxReference().target.up();

      ThiefHelpers.getTransferBoxReference().target.up().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Port.Ending Quantity Held" from selected section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Port. Ending Quantity Held').select();

      // Verify if 'Port. Ending Quantity Held' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Port. Ending Quantity Held').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Port. Ending Quantity Held" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Automation only:Count of elements from selected section and index of "Port. Ending Quantity Held"', function() {
      //Get selected section length
      TileOptionsColumns.getAllElements('Selected').count().then(function(value) {
        lengthOfSelectedSection = value;
      });

      //Get index of "Port. Ending Quantity Held" ratio from selected section
      TileOptionsColumns.getIndexFromSelected('Port. Ending Quantity Held').then(function(value) {
        indexOfRequiredElement = value;
      });
    });

    it('Should move "Port.Ending Quantity Held" to end of selected section', function() {
      navCounter = lengthOfSelectedSection - indexOfRequiredElement;

      for (var intCount = 0; intCount < navCounter; intCount++) {
        ThiefHelpers.getTransferBoxReference().target.down();
      }
    });

    it('Should select "Ticker" from selected section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Ticker').select();

      // Verify if 'Ticker' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Ticker').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Ticker" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });

      //Get index of "Ticker" from selected section
      TileOptionsColumns.getIndexFromSelected('Ticker').then(function(index) {
        indexOfTicker = index;
      });
    });

    it('Should click "Down arrow" button ', function() {
      ThiefHelpers.getTransferBoxReference().target.down().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Security Name" from selected section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Security Name').select();

      // Verify if 'Security Name' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Security Name').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Security Name" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });

      //Get index of "Security Name" ratio from selected section
      TileOptionsColumns.getIndexFromSelected('Security Name').then(function(index) {
        indexOfSecurityName = index;
      });
    });

    it('Should click "Down arrow" button ', function() {
      ThiefHelpers.getTransferBoxReference().target.down().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    var elementName = ['Ticker', 'Port. Ending Quantity Held', 'Bench. Ending Quantity Held'];
    it('Verifying "' + elementName + '" is of grey color', function() {
      elementName.forEach(function(elementName) {
        TileOptionsColumns.getSelectedSectionElement(elementName).getAttribute('class').then(function(value) {
          if (value.indexOf('hidden') === -1) {
            flag = flag + 1;
            expect(false).customError('"' + elementName + '" is not in grey color');
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    it('Verifying "Ticker" is fixed', function() {
      TileOptionsColumns.getIndexFromSelected('Ticker').then(function(index) {
        if (index !== indexOfTicker) {
          expect(false).customError('Ticker is not fixed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Security Name" is fixed', function() {
      TileOptionsColumns.getIndexFromSelected('Security Name').then(function(index) {
        if (index !== indexOfSecurityName) {
          expect(false).customError('Security Name is not fixed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying the selected list column order', function() {
      TileOptionsColumns.getAllElements('Selected').then(function(eles) {
        var arr = [];
        eles.forEach(function(ele) {
          ele.getText().then(function(val) {
            arr.push(val);
          });
        });

        return arr;
      }).then(function(arr) {
        var arrCompare = ['Ticker', 'Security Name', 'Port. Ending Weight', 'Net/Gross Ratio', 'Bench. Ending Quantity Held',
          'Variation in Ending Weight', 'Bench. Ending Weight', 'Port. Ending Factor', 'Port. Ending Quantity Held',];
        Utilities.arrayCompare(arrCompare, arr);
      });
    });

  });

  describe('Test Step ID: 387099', function() {

    var flag = 0;
    it('Should select "Ticker" from selected section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Ticker').select();

      // Verify if 'Ticker' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Ticker').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Ticker" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Format" is present in accordion pane', function() {
      TileOptionsColumns.getExpandableElement('Format').isPresent().then(function(ispresent) {
        if (ispresent === false) {
          flag = flag + 1;
          expect(false).customError('"Format" is not present in accordion pane');
          if (flag === 1) {
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });

    it('Verifying "Definition" is present in accordion pane', function() {
      TileOptionsColumns.getExpandableElement('Definition').isPresent().then(function(ispresent) {
        if (ispresent === false) {
          flag = flag + 1;
          expect(false).customError('"Definition" is not present in accordion pane');
          if (flag === 1) {
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });

    it('Verifying "Width" option is enabled in "Format" accordion', function() {
      CommonFunctions.isElementEnabled('Textbox', 'Width').then(function(value) {
        if (!value) {
          flag = flag + 1;
          expect(false).customError('"Width" option is not enabled in "Format" accordion');
          if (flag === 1) {
            CommonFunctions.takeScreenShot();
          }
        }
      });

    });

    it('Verifying "Header" is grayed out in "Format" accordion', function() {
      TileOptionsColumns.getFormatHeader().isEnabled().then(function(value) {
        if (value) {
          flag = flag + 1;
          expect(false).customError('"Header" is not grayed out in "Format" accordion');
          if (flag === 1) {
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });

    it('Verifying "Justification" is grayed out in "Format" accordion', function() {
      ThiefHelpers.getButtonClassReference('Justification').isDisabled().then(function(status) {
        if (!status) {
          expect(false).customError('"Justification" is not grayed out in "Format" accordian');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Decimals" is grayed out in "Format" accordion', function() {
      CommonFunctions.isElementEnabled('Textbox', 'Decimals').then(function(value) {
        if (value) {
          flag = flag + 1;
          expect(false).customError('"Decimal" is not grayed out in "Format" accordion');
          if (flag === 1) {
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });

  });

  describe('Test Step ID: 387122', function() {

    it('Should select "Bench. Ending Quantity Held" from selected section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Bench. Ending Quantity Held').select();

      // Verify if 'Bench. Ending Quantity Held' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Bench. Ending Quantity Held').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Bench. Ending Quantity Held" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check "show coloumn" check box in format accordion', function() {
      ThiefHelpers.getCheckBoxClassReference('Show Column').check();

      //Verifying the checkbox is checked
      expect(ThiefHelpers.getCheckBoxClassReference('Show Column').isChecked()).toBeTruthy();
    });

    it('Should Place the cursor at the end of column name in the Header section and hit enter key 3 times', function() {
      TileOptionsColumns.getFormatHeader().click();
      TileOptionsColumns.getFormatHeader().sendKeys(protractor.Key.ARROW_UP);
      TileOptionsColumns.getFormatHeader().sendKeys(protractor.Key.DELETE);
      TileOptionsColumns.getFormatHeader().click();
      TileOptionsColumns.getFormatHeader().sendKeys(protractor.Key.ENTER);
      TileOptionsColumns.getFormatHeader().sendKeys(protractor.Key.ENTER);
      TileOptionsColumns.getFormatHeader().sendKeys(protractor.Key.ENTER);
    });

    it('Verifying that "Bench. Ending Quantity Held" is enabled', function() {
      TileOptionsColumns.getSelectedSectionElement('Bench. Ending Quantity Held').getAttribute('class').then(function(value) {
        if (value.indexOf('hidden') !== -1) {
          expect(false).customError('"Bench. Ending Quantity Held" is in grey color');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Header" box can accommodate maximum of four lines', function() {
      TileOptionsColumns.getFormatHeader().getAttribute('value').then(function(value) {
        if (value.split(/\r\n|\r|\n/).length !== 4) {
          expect(false).customError('"Header" box cannot accommodate maximum of four lines');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 387125', function() {

    it('Should select "Variation in Ending Weight" from selected section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Variation in Ending Weight').select();

      // Verify if 'Variation in Ending Weight' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Variation in Ending Weight').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Variation in Ending Weight" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Format" section in accordion pane', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Format').then(function(value) {
        if (!value) {
          expect(false).customError('"Format" section is not expanded in accordion pane');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should change the decimal value to ""', function() {
      ThiefHelpers.getTextBoxClassReference('Decimals').setText('');

      //Verifying the decimal value to be ""
      ThiefHelpers.getTextBoxClassReference('Decimals').getText().then(function(value) {
        if (value !== '') {
          expect(false).customError('"Decimals value is not empty. Found' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying the text after clicking on warning icon', function() {
      ThiefHelpers.getTextBoxClassReference('Decimals').getErrors().then(function(text) {
        if (text[0] !== 'Decimals must be entered as a positive number.') {
          expect(false).customError('"Decimals must be entered as a positive number" is not present as text');
          CommonFunctions.takeScreenShot();
        }

      });
    });

  });

  describe('Test Step ID: 666405', function() {

    var flag = 0;

    it('Should click on up arrow button in decimal drop down', function() {
      TileOptionsColumns.setOrGetValueInSpinBox('Decimals', '1', false, true);
    });

    it('Verifying the value is set to "1" in decimal drop down', function() {
      ThiefHelpers.getTextBoxClassReference('Decimals').getText().then(function(value) {
        if (value !== '1') {
          expect(false).customError('value not equal to "1" in decimal drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should change the decimal value to "4"', function() {
      ThiefHelpers.getTextBoxClassReference('Decimals').setText('4');

      //Verifying the decimal value to be "4"
      ThiefHelpers.getTextBoxClassReference('Decimals').getText().then(function(value) {
        if (value !== '4') {
          expect(false).customError('"Decimals value is not 4');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should get the "Width" value', function() {
      ThiefHelpers.getTextBoxClassReference('Width').getText().then(function(text) {
        width1 = text;
      });
    });

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(true).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Net/Gross Ratio" column is added to the "Weights" report', function() {
      SlickGridFunctions.getColumnNames('Weights').then(function(option) {
        if (option.indexOf('Net/Gross Ratio') === -1) {
          expect(false).customError('"Net/Gross Ratio" column is not added to the Weights report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying value is right aligned in "Weights" report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(options) {
        options.forEach(function(option) {
          SlickGridFunctions.getCellReference('Weights', option, '', 'Difference').then(function(option) {
            option.getAttribute('class').then(function(value) {
              if (value.indexOf('right') === -1) {
                flag = flag + 1;
                expect(false).customError('Values are not right aligned in "Weights" report');
                if (flag === 1) {
                  CommonFunctions.takeScreenShot();
                }
              }
            });
          });
        });
      });
    });

    it('Verifying  value is having 4 digits display after decimal point', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '', 'Total').then(function(references) {
        references.forEach(function(reference, index) {
          if (index !== 0) {
            //browser.sleep(6000);
            SlickGridFunctions.getCellReference('Weights', reference, '', 'Difference').then(function(option) {
              option.getText().then(function(value) {
                var numberOfDigits = (value + '').split('.');
                if (numberOfDigits[1].length !== 4) {
                  flag = flag + 1;
                  expect(false).customError('More than 4 digits displayed after decimal point');
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

  });

  describe('Test Step ID: 472316', function() {

    var flag = 0;

    it('Should click on the Wrench icon in the "Weights" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function() {

        expect(false).customError('Not able to  click on the "Wrench icon" in the "Weights" report workspace');
        CommonFunctions.takeScreenShot();
      });

      //Verifying wrench menu list is displayed in "Weights" report workspace'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Wrench menu drop down list is not displayed in ' +
            '"Weights" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from menu drop down of "Weights" report workspace ', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function() {

        expect(false).customError('Not able to select "Options" option from "menu drop down" of "Weights" report workspace');
        CommonFunctions.takeScreenShot();
      });

      //Verifying tile options mode is opened
      TileOptions.isTileOptionsMode().then(function(value) {
        if (!value) {
          expect(false).customError('Tile Options mode is Closed');
          CommonFunctions.takeScreenShot();

        }
      });
    });

    it('Should click on the "Columns" tab on the LHP on tile options', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to " Columns " Mode
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('" Columns " tab is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Variation in Ending Weight" from selected section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Variation in Ending Weight').select();

      // Verify if 'Variation in Ending Weight' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Variation in Ending Weight').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Variation in Ending Weight" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should Change the justification to Left ', function() {
      ThiefHelpers.selectOptionFromDropDown('Left', 'Justification');
    });

    it('Should change the Width value to "25"', function() {
      ThiefHelpers.getTextBoxClassReference('Width').setText('25');

      //Verifying the "width" value
      ThiefHelpers.getTextBoxClassReference('Width').getText().then(function(text) {
        width2 = text;
        if (text !== '25') {
          expect(false).customError('Width value is not 25');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(true).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Verifying value value is left aligned in "Weights" report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '', 'Total').then(function(option) {
        option.forEach(function(option) {
          SlickGridFunctions.getCellReference('Weights', option, '', 'Difference').then(function(option) {
            option.getAttribute('class').then(function(value) {
              if (value.indexOf('left') === -1) {
                flag = flag + 1;
                expect(false).customError('values are not left aligned in "Weights" report');
                if (flag === 1) {
                  CommonFunctions.takeScreenShot();
                }
              }
            });
          });
        });
      });
    });

    it('Verifying Difference column is now wider than the columns on either side ', function() {
      expect(width2 > width1).customError('Difference column is not wider than the columns on either side');
      if (width2 < width1) {
        CommonFunctions.takeScreenShot();
      }
    });

  });

  describe('Test Step ID: 387140', function() {

    it('Should click on pre & post trade in LHP', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Reports', 'Pre & Post Trade').then(function(ele) {
        ele.click();
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Wait for report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if calculated data for "Pre & Post Trade" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Pre & Post Trade').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Pre & Post Trade" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Pre & Post Trade')).toBeTruthy();
        } else {
          expect(true).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the drop down arrow next to wrench icon and select Edit Layout.', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Reports', 'Pre & Post Trade').getActions().then(function(actions) {
        actions.triggerAction('edit').then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Wait for report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying report view changes to Edit mode', function() {
      PA3EditMode.isEditMode().then(function(value) {
        if (!value) {
          expect(false).customError('Report view is not in edit mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that header displays "Edit Layout - Pre & Post Trade"', function() {
      element(by.xpath(PA3EditMode.xpathHeaderName)).getText().then(function(value) {
        if (value.indexOf('Edit Layout - Pre & Post Trade') === -1) {
          expect(false).customError('Header is not displaying as "Edit Layout - Pre & Post Trade');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 387141', function() {

    it('Should click on "Cancel" button of "Edit Layout - Pre & Post Trade" mode header', function() {
      ThiefHelpers.getButtonClassReference('Cancel').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Wait for report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if calculated data for "Pre & Post Trade" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Pre & Post Trade').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Pre & Post Trade" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Pre & Post Trade')).toBeTruthy();
        } else {
          expect(true).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the Wrench icon in the "Pre & Post Trade" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Pre & Post Trade').click().then(function() {
      }, function() {

        expect(false).customError('Not able to  click on the "Wrench icon" in the "Pre & Post Trade" report workspace');
        CommonFunctions.takeScreenShot();
      });

      //Verifying wrench menu list is displayed in "Pre & Post Trade" report workspace'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Wrench menu drop down list is not displayed in ' +
            '"Contribution to Report" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from menu drop down of "Pre & Post Trade" report workspace ', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function() {

        expect(false).customError(' Not able to select "Options" option from "menu drop down" of "Pre & Post Trade" report workspace');
        CommonFunctions.takeScreenShot();
      });

      //Verifying tile options mode is opened
      TileOptions.isTileOptionsMode().then(function(value) {
        if (!value) {
          expect(false).customError('Tile Options mode is Closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the " Columns " on the LHP of tile options', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to " Columns "
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns " is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var selectedSectionElement = ['Trade Impact Quantity Held', 'Port. Ending Weight', 'Bench. Ending Weight',
      'Variation in Ending Weight',];
    selectedSectionElement.forEach(function(selectedSectionElement) {
      it('Verifying "' + selectedSectionElement + '" is in grey color', function() {
        TileOptionsColumns.getSelectedSectionElement(selectedSectionElement, 'Pre-Trade vs. Post-Trade Impact').getAttribute('class').then(function(value) {
          if (value.indexOf('hidden') === -1) {
            expect(false).customError('"' + selectedSectionElement + '" is not in grey color');
          }
        });
      });
    });

  });

  describe('Test Step ID: 387142', function() {

    it('Should select "Trade Impact Quantity Held" ratio from selected section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Pre-Trade vs. Post-Trade Impact');
      group.getItemByText('Trade Impact Quantity Held').then(function(element) {

        // Select "Trade Impact Quantity Held" from "Pre-Trade vs. Post-Trade Impact".
        element.select();

        // Verifying if "Trade Impact Quantity Held" is selected
        element.isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"Trade Impact Quantity Held" is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should Expand "Statistics" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Statistics').then(function(option) {
        if (!option) {
          expect(false).customError('"Statistics" section is not expanded in accordion pane');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Verifying that Reference Calculation item is displayed above the Add a statistic..drop down', function() {
      TileOptionsColumns.getSelectedStatistics().get(0).getText().then(function(text) {
        if (text !== 'Reference Calculation') {
          expect(false).customError('"Reference Calculation" is not displayed above the Add a statistic..drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 387143', function() {

    var flag = 0;

    it('Should Expand "Additional Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Additional Options').then(function(option) {
        if (!option) {
          expect(false).customError('"Additional Options" section is not expanded in accordion pane');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var elementName = ['Display Total Column', 'In Portfolio'];
    elementName.forEach(function(elementName) {
      it('Verifying that "' + elementName + '" item is displayed ', function() {
        TileOptionsColumns.getSelectedAdditionalOptions(elementName).isPresent().then(function(value) {
          if (!value) {
            flag = flag + 1;
            expect(false).customError('"' + elementName + '" item is not displayed');
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

  });

  describe('Test Step ID: 472318', function() {

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should launch the PA3 application with "Client:;pa3;pa3_docs;QA_Analytics_BofA_Merrill"', function() {
      PA3MainPage.switchToDocument('qa-analytics-bofa-merrill');
    });

    it('Wait for report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(true).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "MFI:MLUS00" value in the "Portfolio" widget', function() {
      ThiefHelpers.getTextBoxClassReference('Portfolio', PA3MainPage.xpathPortfolioWidget).getText().then(function(option) {
        if (option !== 'MFI:MLUS00') {
          expect(false).customError('"MFI:MLUS00" is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "MFI:MLGBMI" value in the "Benchmark" widget', function() {
      ThiefHelpers.getTextBoxClassReference('Benchmark', PA3MainPage.xpathBenchmarkWidget).getText().then(function(option) {
        if (option !== 'MFI:MLGBMI') {
          expect(false).customError('"MFI:MLGBMI" is not displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 472320', function() {

    var flag = 0;

    it('Should click on the "Wrench" icon in the "Weights" report ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from application toolbar.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Weights" view', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Weights') {
          expect(false).customError('"Tile Options - Weights" view has not appeared. ' +
            'Expected: "Tile Options - Weights" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the " Columns " on the LHP of tile options', function() {
      //Clicking Columns  link from LHP
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to " Columns "
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns " is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on clear all button in selected section', function() {
      ThiefHelpers.getButtonClassReference('Clear All').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying groupings are removed from selected section', function() {
      var allElements = TileOptionsColumns.getAllElements('selected');
      allElements.count().then(function(count) {
        if (count !== 2) {
          expect(false).customError('Groupings are not removed from selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "Maturity" into search field in available section', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('Maturity');

      //Verifying the text in search field
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(value) {
        if (value !== 'Maturity') {
          expect(false).customError('Maturity is not entered into search field');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Maturity Date" in available section', function() {
      ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'FactSet', 'Maturity Date').then(function(item) {
        item.select();
      });

      // Verifying if 'Maturity Date' is selected
      ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'FactSet', 'Maturity Date').then(function(item) {
        item.isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"Maturity Date" is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click right arrow button ', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying "Maturity Date" is added to selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Maturity Date') === -1) {
          expect(false).customError('"Maturity Date" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter sed into search field in available section', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('Sed');

      //Verifying the text in search field
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(value) {
        if (value !== 'Sed') {
          expect(false).customError('sed is not entered into search field');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should double click on "Sedol" option from Available section', function() {
      ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'Client', 'Sedol').then(function(item) {
        item.select();
        item.doubleClick();
      });
    });

    it('Verifying "Sedol" is added to selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Sedol') === -1) {
          expect(false).customError('"Sedol" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(true).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that Sedols are displayed as strings', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Sedol').then(function(references) {
        references.forEach(function(value) {
          expect(value).not.toContain(',');
        });
      });
    });

    it('Verifying that maturity dates are in MM/DD/YYYY format', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Maturity Date').then(function(references) {
        references.forEach(function(value) {
          if (value !== '@NA') {
            Utilities.isDate(value).then(function(ispresent) {
              if (!ispresent) {
                flag = flag + 1;
                expect(false).customError('Not in MM/DD/YYYY format');
                if (flag === 1) {
                  CommonFunctions.takeScreenShot();
                }
              }
            });
          }
        });
      });
    });
  });

});
