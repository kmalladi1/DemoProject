'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: multi-select-cols', function() {

  var initialWidth;
  var finalWidth;
  var multiplier;
  var beforeValue;
  var finalValue;
  var arrReportValues = new Array(6);
  for (var i = 0; i < 6; i++) {
    arrReportValues[i] = new Array(4);
  }

  var arrContributionRowNames = [];
  var arrBeginningPriceColumnValues = [];
  var arrEndingPriceColumnValues = [];

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  var shouldPerformActions = function(reportName, optionPaneName) {
    CommonPageObjectsForPA3.clickOnGroupingsHyperlink(reportName, 'Economic Sector');

    it('Should click on the "Columns" tab on the LHP of tile options view', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Columns').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Columns').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Columns" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrListItems = ['Port. MPT Volatility', 'Variation in Ending Weight', 'Bench. Ending Weight'];

    it('Should select "Port. MPT Volatility" and hold control key to select "Variation in Ending Weight" and "Bench. Ending Weight"', function() {
      // Getting the xpath of the Selected section
      var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');
      var container = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection);
      arrListItems.forEach(function(element, index) {
        if (index === 0) {
          container.getItemByText(element).select();
        } else {
          container.getItemByText(element).select(true);
        }

        // Check if item is selected
        container.getItemByText(element).isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"' + element + '" is not selected from "Selected" section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should expand "' + optionPaneName + '" accordion from "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane(optionPaneName).then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"' + optionPaneName + '" is not expanded in "Options" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  };

  describe('Test Step ID: 558440', function() {

    // Should check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:Pa3/Charts/CHART_DOC" document', function() {
      PA3MainPage.switchToDocument('chart-doc');
    });

    it('Should select "Automatic Calculation" option if not selected', function() {
      browser.wait(function() {
        return PA3MainPage.getReportCalculationDlg('Weights').isPresent().then(function(visible) {
          return visible;
        });
      }, 5000).then(function() {
      }, function() {
        // Un-check "Automatic Calculation" to force re-check it
        PA3MainPage.getWrenchIcon().click();
        PA3MainPage.setAutomaticCalculation(false);

        // Click on Wrench button to select "Automatic Calculation"
        PA3MainPage.getWrenchIcon().click();
        expect(PA3MainPage.setAutomaticCalculation(true)).toBeTruthy();
      });
    });

    it('Verify that "Weights" report is calculated', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 120000);

      //verifying if Weights report is calculated
      PA3MainPage.isReportCalculated('Weights').then(function(found) {
        if (!found) {
          expect(false).customError('"Weights" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Verifying that "Benchmark" widget displays "RUSSELL:1000"', function() {
      PA3MainPage.getWidgetBox('Benchmark').getAttribute('value').then(function(benchmark) {
        if (benchmark !== 'RUSSELL:1000') {
          expect(false).customError('"Benchmark" widget is not displayed as "RUSSELL:1000" Found: "' + benchmark + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Portfolio" widget displays "CLIENT:/PA3/TEST.ACCT"', function() {
      PA3MainPage.getWidgetBox('Portfolio').getAttribute('value').then(function(portfolio) {
        if (portfolio !== 'CLIENT:/PA3/TEST.ACCT') {
          expect(false).customError('"Portfolio" widget is noy displayed as "CLIENT:/PA3/TEST.ACCT" but ' +
            'Found: "' + portfolio + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should note the initial "Width" of the column', function() {
      PA3MainPage.getListofColumnHeaderForJustificationAndWidth('Weights').then(function(headerList) {
        headerList.forEach(function(ref) {
          ref.getText().then(function(value) {
            var newValue = value.replace(/\n/g, ' ');
            if (newValue === 'Difference') {
              ref.getAttribute('style').then(function(style) {
                var temp = style.split(';', 1);
                var temp1 = temp[0].split(' ');
                var width = temp1[1].split('p');
                initialWidth = parseInt(width[0]);
              });
            }
          });
        });
      });
    });

  });

  describe('Test Step ID: 558441', function() {

    it('Should click on the "Wrench" icon in the "Weights\'" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Wrench menu list appeared
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights', true).isPresent().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Wrench menu has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from the menu list', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(title) {
        if (title !== 'Tile Options - Weights') {
          expect(false).customError('View did not change to "Tile Options - Weights" mode.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP', function() {
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

    it('Should enter "MPT" in the search field of "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('MPT');

      // Verifying that "MPT" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(text) {
        if (text !== 'MPT') {
          expect(false).customError('"MPT" is not typed into the search field.');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for search action to take place
      browser.sleep(2000);
    });

    it('Should double click on "Port. MPT Volatility" from the "Available" list', function() {
      ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'FactSet', 'Port. MPT Volatility').then(function(element) {
        element.select();
        element.doubleClick();
      });
    });

    it('Verify that "Port.MPT Volatility" is added to the "Selected" list', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Port. MPT Volatility') === -1) {
          expect(false).customError('"Port. MPT Volatility" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 558442', function() {

    var arrOptions = ['Port. Ending Weight', 'Bench. Ending Weight'];

    it('Should select "Ending Price" in the selected section ', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Ending Price').select();

      // Verify if 'Ending Price' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Ending Price').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Ending Price" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    arrOptions.forEach(function(value) {
      it('Should Hold the ctrl key and select "' + value + '"', function() {
        var objVirtualListbox = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText(value);

        objVirtualListbox.select(true, false);
      });
    });

    it('Verifying that Expandable sections should contain :' +
      '1. Format, 2, Statistics, 3. Conditional Formatting, 4. Outlier, 5. Additional Options', function() {
      TileOptionsColumns.getExpandableSectionNames().each(function(element, index) {
        element.getAttribute('section-title').then(function(name) {
          if (name !== TileOptionsColumns.arrExpandableSections[index]) {
            expect(false).customError('"' + TileOptionsColumns.arrExpandableSections[index] + '" is not displayed in the RHS');
            CommonFunctions.takeScreenShot();
          }

        });
      });
    });

    it('Verifying that "Header" sub-section under "Format" section is disabled', function() {
      var eleRef = element(by.xpath(TileOptionsColumns.xpathFormatHeaderTextArea));
      eleRef.getAttribute('disabled').then(function(flag) {
        if (flag.indexOf('true') === -1) {
          expect(false).customError('"Header" sub section under "Format" section is not disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Show Column" checkbox is not selected', function() {
      TileOptionsColumns.getCheckBox('Show Column').getAttribute('data-checked').then(function(value) {
        if (value !== null) {
          expect(false).customError('"Show Column" check box is checked off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 558443', function() {

    it('Should select "Port. MPT Volatility" by Holding the ctrl key,', function() {
      var action = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Port. MPT Volatility');
      action.select(true, false);
    });

    it('Verifying that Risk accordion is displayed under Options section', function() {
      TileOptionsColumns.getExpandableElement('Risk').isPresent().then(function(displayed) {
        if (!displayed) {
          expect(false).customError('"Risk accordion" is not displayed under "Options" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 558444', function() {

    it('Should select "Port. MPT Volatility" from selected section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Port. MPT Volatility').select();

      // Verify if 'Port. MPT Volatility' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Port. MPT Volatility').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Port. MPT Volatility" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "STATISTICS" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Statistics').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"STATISTICS" section is not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that "MPT Volatility" is the default statistic', function() {
      TileOptionsColumns.getSelectedStatistic('MPT Volatility').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"MPT Volatility" is not present as default statistic');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that Port.Ending Weight is the default weight', function() {
      TileOptionsColumns.getSelectedWeightFromStatistics().getText().then(function(elementName) {
        if (elementName !== 'Port. Ending Weight') {
          expect(false).customError('"Port. Ending Weight" is not the default selected weight, Found:"' + elementName + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 558445', function() {

    var arrOptions = ['Bench. Ending Weight', 'Variation in Ending Weight'];
    arrOptions.forEach(function(columnName) {
      it('Should Hold the ctrl key and select "' + columnName + '"', function() {
        var objVirtualListbox = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText(columnName);

        objVirtualListbox.select(true, false);

        // Verify if 'Variation in Ending Weight' is selected
        ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText(columnName).isSelected().then(function(seleted) {
          if (!seleted) {
            expect(false).customError('"' + columnName + '" is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verify that "No statistic applied" for the selected Columns', function() {
      TileOptionsColumns.getSelectedStatistics().count().then(function(count) {
        if (count !== 0) {
          expect(false).customError('No statistics should apply for selected columns but Found:' + count);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify if "Port. Ending Weight" is displayed beside Custom Weight', function() {
      TileOptionsColumns.getSelectedWeightFromStatistics().element(by.xpath('.//*[contains(text(),"Port. Ending Weight")]')).isDisplayed().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Port. Ending Weight" is not displayed beside custom weights in column weights section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 558446', function() {

    it('Should expand "Format" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Format').then(function(value) {
        if (!value) {
          expect(false).customError('"Format" section is not expanded in accordion pane');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should change Decimal to "6" using upward arrow', function() {
      TileOptionsColumns.setOrGetValueInSpinBox('Decimals', '6', true, true);
    });

    it('Should select "Left" from "Justification" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Left', 'Justification');
    });

    it('Should change the "Width" to "25"', function() {
      //Get the Width initial value to calculate multiplier
      TileOptionsColumns.setOrGetValueInSpinBox('Width').getAttribute('value').then(function(initialValue) {
        beforeValue = parseInt(initialValue);
        multiplier = Math.round(initialWidth / parseInt(initialValue));
      });

      // Change the "Width" to 25
      TileOptionsColumns.setOrGetValueInSpinBox('Width', '25', false, true);
    });

    it('Verify "Format" options "Width" is set to "25"', function() {
      TileOptionsColumns.setOrGetValueInSpinBox('Width').getAttribute('value').then(function(value) {
        finalValue = parseInt(value);
      });

      TileOptionsColumns.setOrGetValueInSpinBox('Width').getAttribute('value').then(function(val) {
        if (val === 25) {
          expect(false).customError('Width is not set to 25, Found: ' + val);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from "Tile Options - Weights" header bar', function() {
      TileOptions.getHeaderButton('OK').click();
    });

    it('"Tile Options - Weights" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options - Weights" mode is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Weights" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 180000);
    });

    it('Verifying if "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Error found while calculating the "Weights" report' + error);
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    var arrColumns = ['Bench. Weight', 'Difference', 'Port. MPT Volatility'];
    arrColumns.forEach(function(column) {
      it('Should note the final "Width" of the "' + column + '" and Verify that specified width is applied', function() {
        PA3MainPage.getListofColumnHeaderForJustificationAndWidth('Weights').each(function(ref) {
          ref.getText().then(function(value) {
            var newValue = value.replace(/\n/g, ' ');
            if (newValue === column) {
              ref.getAttribute('style').then(function(style) {
                var temp = style.split(';', 1);
                var temp1 = temp[0].split(' ');
                var width = temp1[1].split('p');
                finalWidth = parseInt(width[0]);
                expect(parseInt(initialWidth + (parseInt(finalValue - beforeValue) * multiplier))).toEqual(finalWidth);
              });
            }
          });
        });
      });
    });

    var i = 0;
    it('Verifying that Bench Weight, Difference and Port MPT Volatility Columns are left Justified', function() {
      PA3MainPage.getListofColumnHeaderForJustificationAndWidth('Weights').then(function(headerList) {
        headerList.forEach(function(ref) {
          ref.getText().then(function(value) {
            var newValue = value.replace(/\n/g, ' ');
            if (newValue === arrColumns[i]) {
              expect(ref.getAttribute('class')).toContain('left');
              i++;
            }
          });
        });
      });
    });

    arrColumns.forEach(function(column) {
      it('Verifying "' + column + '" column Values contains 6 digits after decimal point ', function() {
        PA3MainPage.getAllCellsOfGivenColumn('Weights', column,
          'slick-viewport slick-viewport-bottom slick-viewport-right').then(function(difCol) {
          difCol.forEach(function(ref) {
            ref.getText().then(function(value) {
              if (value !== '--') {
                var temp = value.split('.', 2);
                expect(temp[1].length).toEqual(6);
              }
            });
          });
        });
      });
    });

  });

  describe('Test Step ID: 726719', function() {

    shouldPerformActions('Weights', 'Statistics');

    it('Should open "Add a statistic" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsColumns.getStatisticsDropDown()).open();

      // Verifying "Add a statistic" drop down appears
      ThiefHelpers.isDropDownOpen().then(function(open) {
        if (!open) {
          expect(false).customError('"Add a statistic" drop down is not open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Weighted Average" from "Add a statistic..." Dropdown', function() {
      ThiefHelpers.getOptionFromDropdown('Weighted Average').click();

      // Verifying if option is added to the selected list
      TileOptionsColumns.getSelectedStatistic('Weighted Average').isPresent().then(function(isexist) {
        if (!isexist) {
          expect(false).customError('"Weighted Average" is not added');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should uncheck "Industry" in "Apply to:" section', function() {
      ThiefHelpers.getChecklistClassRef().getItemByText('Industry').isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Industry" in "Apply to:" section is already unchecked');
          CommonFunctions.takeScreenShot();
        } else {
          ThiefHelpers.getChecklistClassRef().getItemByText('Industry').toggle();
        }
      });
    });

    it('Verifying if "Industry" in "Apply to:" section is unchecked', function() {
      ThiefHelpers.getChecklistClassRef().getItemByText('Industry').isChecked().then(function(checked) {
        if (checked) {
          expect(false).customError('"Industry" in "Apply to:" section is checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var arrGroupNames = ['Commercial Services', 'Communications'];
    var flag = 0;
    it('Verify if "Weighted Average" is present under "' + arrGroupNames + '"', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '', '').then(function(cellValues) {
        arrGroupNames.forEach(function(groupName) {
          if (cellValues.indexOf(groupName) > -1) {
            if (cellValues[(cellValues.indexOf(groupName) + 4)] !== 'Weighted Average') {
              expect(false).customError('"Weighted Average" is not present under "' + groupName + '"');
              flag++;
              if (flag === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          }
        });
      });
    });

  });

  describe('Test Step ID: 726720', function() {

    shouldPerformActions('Weights', 'Statistics');

    it('Verifying if "Weighted Average" is present above "Add a statistic..." Dropdown', function() {
      TileOptionsColumns.getSelectedStatistic('Weighted Average').isPresent().then(function(isexist) {
        if (!isexist) {
          expect(false).customError('"Weighted Average" is not added');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrChecked = ['Total Portfolio', 'Economic Sector'];
    arrChecked.forEach(function(checkBoxName) {
      it('Verifying if "' + checkBoxName + '" in "Apply to:" section is checked', function() {
        ThiefHelpers.getCheckBoxClassReference(checkBoxName).isChecked().then(function(checked) {
          if (!checked) {
            expect(false).customError('"' + checkBoxName + '" in "Apply to:" section is unchecked');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var arrUnChecked = ['All Groups', 'Industry'];
    arrUnChecked.forEach(function(checkBoxName) {
      it('Verifying if "' + checkBoxName + '" in "Apply to:" section is unchecked', function() {
        ThiefHelpers.getChecklistClassRef().getItemByText(checkBoxName).isChecked().then(function(checked) {
          if (checked) {
            expect(false).customError('"' + checkBoxName + '" in "Apply to:" section is checked');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 558447', function() {

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options - Weights');

    it('Should select "characteristics - Summary" report from LHP', function() {
      PA3MainPage.getReports('Characteristics - Summary').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Check if report - 'Weights' is selected
      expect(PA3MainPage.getReports('Characteristics - Summary').getAttribute('class')).toContain('selected');
    });

    it('Should Wait for "Characteristics - Summary" report to finish calculation', function() {
      browser.sleep(4000);
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Characteristics - Summary'), 180000);
    });

    it('Verifying if "Characteristics - Summary" report is calculated', function() {
      PA3MainPage.isReportCalculated('Characteristics - Summary').then(function(displayed) {
        expect(displayed).customError('"Characteristics - Summary" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Characteristics - Summary')).toBeTruthy();
        } else {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Error found while calculating the "Characteristics - Summary" report' + error);
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Should click on the "Wrench" icon in the "Characteristics - Summary" report workspace', function() {
      browser.sleep(4000);
      PA3MainPage.getWrenchIconFromReportWorkspace('Characteristics - Summary').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Wrench menu list appeared
      expect(PA3MainPage.getWrenchIconFromReportWorkspace('Characteristics - Summary', true).isPresent()).toBeTruthy();
    });

    it('Select "Options" from the menu list', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Characteristics - Summary" mode', function() {
      expect(element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText())
        .toEqual('Tile Options - Characteristics - Summary');
    });

    it('Verifying that "Dates" option from LHP is selected by default', function() {
      expect(TileOptions.getOptionTitle().getText()).toEqual('Dates');
    });

    it('Enter "10/13/2015" in the "End Date" widget', function() {
      ThiefHelpers.getDatepickerClassReference('End Date:').setDate('10/13/2015');

      // Verifying if "10/13/2015" is entered into the "End Date" input field
      ThiefHelpers.getDatepickerClassReference('End Date:').getDate().then(function(text) {
        if (text !== '10/13/2015') {
          expect(false).customError('Error: Failed to enter "10/13/2015" into the "End Date" input field');
        }
      });
    });

    it('Should click on "OK" button from "Tile Options - Characteristics - Summary" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - Characteristics - Summary" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options - Characteristics - Summary" mode is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should Wait for "Characteristics - Summary" report to finish calculation', function() {
      browser.sleep(2000);
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Characteristics - Summary'), 180000);
    });

    it('Verifying if "Characteristics - Summary" report is calculated', function() {
      PA3MainPage.isReportCalculated('Characteristics - Summary').then(function(displayed) {
        expect(displayed).customError('"Characteristics - Summary" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Characteristics - Summary')).toBeTruthy();
        } else {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Error found while calculating the "Characteristics - Summary" report' + error);
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    var arrRow = ['Market Capitalization', 'Weighted Average', 'Median', 'Weighted Median', 'Dividend Yield', 'ROA'];
    var colIndex = [1, 2, 3, 4];
    it('Should store the values  for "Available" and "Data" columns for Market Capitalization, ROA and Dividend Yield',
      function() {
        arrRow.forEach(function(rowName, index) {
          colIndex.forEach(function(columnIndex) {
            PA3MainPage.getCellValueForMultiHeaderColumn('Characteristics - Summary', rowName, columnIndex,
              'slick-pane slick-pane-top slick-pane-left', 'slick-pane slick-pane-top slick-pane-right',
              undefined, 1).then(function(val) {
              arrReportValues[index][columnIndex] = val;
            });
          });
        });

        CommonFunctions.captureScreenShot();
      });

    it('Should click on the "Wrench" icon in the "Characteristics - Summary" report workspace', function() {
      browser.sleep(4000);
      PA3MainPage.getWrenchIconFromReportWorkspace('Characteristics - Summary').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Wrench menu list appeared
      expect(PA3MainPage.getWrenchIconFromReportWorkspace('Characteristics - Summary', true).isPresent()).toBeTruthy();
    });

    it('Select "Options" from the menu list', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Characteristics - Summary" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(mode) {
        if (mode !== 'Tile Options - Characteristics - Summary') {
          expect(false).customError('"Tile Options - Characteristics - Summary" has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP', function() {
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

    var arrOptions = ['Dividend Yield', 'ROA'];
    arrOptions.forEach(function(columnName) {
      it('Should Hold the ctrl key and select "' + columnName + '"', function() {
        var objVirtualListbox = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText(columnName);

        objVirtualListbox.select(true, false);

        // Verify if 'Variation in Ending Weight' is selected
        ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText(columnName).isSelected().then(function(seleted) {
          if (!seleted) {
            expect(false).customError('"' + columnName + '" is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should expand "STATISTICS" section', function() {
      //expect(TileOptionsColumns.expandSectionInOptionsPane('Statistics')).toBeTruthy();
      TileOptionsColumns.expandSectionInOptionsPane('Statistics').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Statistics" is not expanded in "Options" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that Weighted Average is the only statistic applied to the selected columns', function() {
      // Verifying that there is only one statistics selected
      TileOptionsColumns.getSelectedStatistics().count().then(function(count) {
        if (count !== 1) {
          expect(false).customError('statistics should apply with one selected columns but Found:' + count);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying that selected statistic is "Weighted Average"
      TileOptionsColumns.getSelectedStatistic('Weighted Average').isPresent().then(function(isexist) {
        if (!isexist) {
          expect(false).customError('"Weighted Average" is not added');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 558448', function() {

    var arrStatistics = ['Average', 'Geometric Average', 'Mode'];
    arrStatistics.forEach(function(statistics) {
      it('Should select "' + statistics + '" from "Add a statistic..." dropdown', function() {
        TileOptionsColumns.getStatisticsDropDown().click().then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });

        // Select option from the drop down
        TileOptionsColumns.getDropDownOption(statistics).click().then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Should click on "OK" button from "Tile Options - Characteristics - Summary" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - Characteristics - Summary" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options - Characteristics - Summary" mode is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should Wait for "Characteristics - Summary" report to finish calculation', function() {
      browser.sleep(2000);
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Characteristics - Summary'), 180000);
    });

    it('Verifying if "Characteristics - Summary" report is calculated', function() {
      PA3MainPage.isReportCalculated('Characteristics - Summary').then(function(displayed) {
        expect(displayed).customError('"Characteristics - Summary" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Characteristics - Summary')).toBeTruthy();
        } else {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Error found while calculating the "Characteristics - Summary" report' + error);
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    arrStatistics.forEach(function(statistics) {
      it('Verifying that "' + statistics + '" row is added under "Market Capitalization"', function() {
        expect(PA3MainPage.getElementFromCalculatedTree('Characteristics - Summary', 'Market Capitalization', statistics,
          'slick-pane slick-pane-top slick-pane-left').isPresent()).toBeTruthy();
      });
    });

  });

  describe('Test Step ID: 558449', function() {

    var arrColumnNames = [
      'Large Cap Core Test > Data',
      'Large Cap Core Test > Available',
      'Russell 1000 > Data',
      'Russell 1000 > Available',
    ];

    it('Should compare Values for "Market Capitalization" with previous values', function() {
      browser.sleep(5000);
      var needScreenShot = 0;
      var arrRow = ['Market Capitalization', 'Weighted Average', 'Median', 'Weighted Median'];
      var colIndex = [1, 2, 3, 4];
      arrRow.forEach(function(rowName, index) {
        colIndex.forEach(function(columnIndex) {
          PA3MainPage.getCellValueForMultiHeaderColumn('Characteristics - Summary', rowName, columnIndex,
            'slick-pane slick-pane-top slick-pane-left', 'slick-pane slick-pane-top slick-pane-right',
            undefined, 1).then(function(val) {
            if (val !== arrReportValues[index][columnIndex]) {
              expect(false).customError('Value of "' + rowName + ' > ' + arrColumnNames[columnIndex] + '" did not match ' +
                'with the previous value. Expected: ' + arrReportValues[index][columnIndex] + ', Found: ' + val);
              ++needScreenShot;
              if (needScreenShot === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });

    it('Should compare Values for "Dividend Yield" with previous values', function() {
      var needScreenShot1 = 0;
      var needScreenShot2 = 0;
      var colIndex = [2, 4];
      colIndex.forEach(function(columnIndex) {
        PA3MainPage.getCellValueForMultiHeaderColumn('Characteristics - Summary', 'Dividend Yield', columnIndex,
          'slick-pane slick-pane-top slick-pane-left', 'slick-pane slick-pane-top slick-pane-right',
          undefined).then(function(val) {
          if (val !== arrReportValues[4][columnIndex]) {
            expect(false).customError('Value of "Dividend Yield > ' + arrColumnNames[columnIndex] + '" did not match with ' +
              'the previous value. Expected: ' + arrReportValues[4][columnIndex] + ', Found: ' + val);
            ++needScreenShot1;
            if (needScreenShot1 === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });

      colIndex = [1, 3];
      colIndex.forEach(function(columnIndex) {
        PA3MainPage.getCellValueForMultiHeaderColumn('Characteristics - Summary', 'Weighted Average', columnIndex,
          'slick-pane slick-pane-top slick-pane-left', 'slick-pane slick-pane-top slick-pane-right',
          undefined, 2).then(function(val) {
          if (val !== arrReportValues[4][columnIndex]) {
            expect(false).customError('Value of "Dividend Yield > ' + arrColumnNames[columnIndex] + '" did not match with ' +
              'the previous value. Expected: ' + arrReportValues[4][columnIndex] + ', Found: ' + val);
            ++needScreenShot2;
            if (needScreenShot2 === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    it('Should compare Values for "ROA" with previous values', function() {
      var needScreenShot1 = 0;
      var needScreenShot2 = 0;
      var colIndex = [2, 4];
      colIndex.forEach(function(columnIndex) {
        PA3MainPage.getCellValueForMultiHeaderColumn('Characteristics - Summary', 'ROA', columnIndex,
          'slick-pane slick-pane-top slick-pane-left', 'slick-pane slick-pane-top slick-pane-right',
          undefined).then(function(val) {
          if (val !== arrReportValues[5][columnIndex]) {
            expect(false).customError('Value of "Dividend Yield > ' + arrColumnNames[columnIndex] + '" did not match with ' +
              'the previous value. Expected: ' + arrReportValues[5][columnIndex] + ', Found: ' + val);
            ++needScreenShot1;
            if (needScreenShot1 === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });

      colIndex = [1, 3];
      colIndex.forEach(function(columnIndex) {
        PA3MainPage.getCellValueForMultiHeaderColumn('Characteristics - Summary', 'Weighted Average', columnIndex,
          'slick-pane slick-pane-top slick-pane-left', 'slick-pane slick-pane-top slick-pane-right',
          undefined, 9).then(function(val) {
          if (val !== arrReportValues[5][columnIndex]) {
            expect(false).customError('Value of "Dividend Yield > ' + arrColumnNames[columnIndex] + '" did not match with ' +
              'the previous value. Expected: ' + arrReportValues[5][columnIndex] + ', Found: ' + val);
            ++needScreenShot2;
            if (needScreenShot2 === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

  });

  describe('Test Step ID: 558450', function() {

    it('Should select "Contribution " report from LHP', function() {
      PA3MainPage.getReports('Contribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Check if report - 'Contribution' is selected
      expect(PA3MainPage.getReports('Contribution').getAttribute('class')).toContain('selected');
    });

    it('Should Wait for "Contribution" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Contribution'), 180000);
    });

    it('Verifying if "Contribution" report is calculated', function() {
      PA3MainPage.isReportCalculated('Contribution').then(function(displayed) {
        expect(displayed).customError('"Contribution" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Contribution')).toBeTruthy();
        } else {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Error found while calculating the "Contribution" report' + error);
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

      // wait for the web element to load
      browser.sleep(3000);
    });

    it('Expand all the elements from calculated report', function() {
      // Get the reference of first element from calculated report
      var firstElement = PA3MainPage.getAllElementsFromCalculatedReport('Contribution',
        'grid-canvas grid-canvas-bottom grid-canvas-left').get(1);

      // Right click on the element and select "Expand All"
      PA3MainPage.rightClickAndSelectOption(firstElement, 'Expand All');
    });

    it('Collect values of "Beginning Price" column for all the rows', function() {
      PA3MainPage.getAllElementsFromCalculatedReport('Contribution', 'grid-canvas grid-canvas-bottom grid-canvas-left')
        .map(function(element) {
          return {
            elementName: element.getText(),
          };
        }).then(function(allElementNames) {
        for (var i = 1; i < allElementNames.length; i += 2) {
          arrContributionRowNames.push(allElementNames[i].elementName);
        }
      }).then(function() {
        arrContributionRowNames.forEach(function(rowName) {
          PA3MainPage.getValueFromCalculatedReport('Contribution', rowName, 'Beginning Price').then(function(cellValue) {
            arrBeginningPriceColumnValues.push(cellValue);
          });
        });
      });
    });

    it('Collect values of "Ending Price" column for all the rows', function() {
      // Get values of "Total Return" column
      arrContributionRowNames.forEach(function(rowName) {
        PA3MainPage.getValueFromCalculatedReport('Contribution', rowName, 'Ending Price').then(function(cellValue) {
          arrEndingPriceColumnValues.push(cellValue);
        });
      });
    });

    it('Should click on the "Wrench" icon in the "Contribution\'" report workspace', function() {
      browser.sleep(4000);
      PA3MainPage.getWrenchIconFromReportWorkspace('Contribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Wrench menu list appeared
      expect(PA3MainPage.getWrenchIconFromReportWorkspace('Contribution', true).isPresent()).toBeTruthy();
    });

    it('Should select "Options" from the menu list', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Contribution" mode', function() {
      expect(element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText())
        .toEqual('Tile Options - Contribution');
    });

    it('Should select "Columns" from LHP', function() {
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

    var arrOptions = ['Beginning Price', 'Ending Price'];
    arrOptions.forEach(function(columnName) {
      it('Should  select "' + columnName + '"', function() {
        var objVirtualListbox = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText(columnName);

        objVirtualListbox.select(true, false);

        // Verify if column is selected
        ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText(columnName).isSelected().then(function(seleted) {
          if (!seleted) {
            expect(false).customError('"' + columnName + '" is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should expand "Outliers" section', function() {
      expect(TileOptionsColumns.expandSectionInOptionsPane('Outliers')).toBeTruthy();
    });

    var arrOption = ['Maximum Value', 'Minimum Value', 'Apply Outlier Settings'];
    arrOption.forEach(function(optionName) {
      it('Verifying that "Outlier" section has "' + optionName + '" Option', function() {
        expect(TileOptionsColumns.getOutliersSubSectionHeader(optionName).isPresent()).toBeTruthy();
      });
    });

  });

  describe('Test Step ID: 558451', function() {

    it('Should Set "Limit" to "Value" in Maximum Value Section ', function() {
      // Clicking on the drop down
      TileOptionsColumns.getLimitOrReplaceDropDown('Maximum', 'Limit').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Should select"Value" from the limit drop down
      TileOptionsColumns.getDropDownOption('Value').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should enter "20" in the Edit Box, In "Maximum Value" section', function() {
      TileOptionsColumns.setOrGetValueInSpinBox('Maximum', 20, true, false);
    });

    it('Should Set "Replace with" to "Maximum", In Maximum Value Section', function() {
      //Clicking on the drop down
      TileOptionsColumns.getLimitOrReplaceDropDown('Maximum', 'replace with').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Should select "Value" from the limit drop down
      TileOptionsColumns.getDropDownOption('Maximum').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should Set "Limit" to "Value", In Minimum Value Section', function() {
      // Clicking on the drop down
      TileOptionsColumns.getLimitOrReplaceDropDown('Minimum', 'Limit').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Should select "Value" from the limit drop down
      TileOptionsColumns.getDropDownOption('Value').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should enter "5" in the Edit Box of Minimum Value" section ', function() {
      TileOptionsColumns.setOrGetValueInSpinBox('Minimum', 5);
    });

    it('Should Set "replace with" to "NM (not meaningful)" In Minimum Value Section', function() {
      // Clicking on the drop down
      TileOptionsColumns.getLimitOrReplaceDropDown('Minimum', 'replace with').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Should select "Value" from the limit drop down
      TileOptionsColumns.getDropDownOption('NM (not meaningful)').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "OK" button from "Tile Options - Contribution" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - Contribution" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options - Contribution" mode is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should Wait for "Contribution" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Contribution'), 180000);
    });

    it('Verifying if "Contribution" report is calculated', function() {
      PA3MainPage.isReportCalculated('Contribution').then(function(displayed) {
        if (!displayed) {
          expect(false).customError('"Contribution" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Contribution')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating the "Contribution" report' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });

      // Waiting for web elements to load
      browser.sleep(3000);
    });

    it('Verifying that values greater than 20 in the "Beginning Price" and "Ending Price" column replaces with 20', function() {
      // Doing comparison for "Beginning Price" column
      arrBeginningPriceColumnValues.forEach(function(avgWeightValue, index) {
        var eleRefs = PA3MainPage.getValueFromCalculatedReport('Contribution', arrContributionRowNames[index], 'Beginning Price');
        eleRefs.then(function() {
        }, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            eleRefs = PA3MainPage.getValueFromCalculatedReport('Contribution', arrContributionRowNames[index], 'Beginning Price');
          } else {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          }
        });

        if (avgWeightValue > 20) {
          eleRefs.then(function(newAvgCellValue) {
            if (newAvgCellValue !== '20.00'.toString()) {
              expect(false).customError('"Beginning Price" value for "' + arrContributionRowNames[index] + '" row ' +
                'did not replace with 20. Expected: 20, Found: ' + newAvgCellValue);
              CommonFunctions.takeScreenShot();
            }
          });
        }
      });

      // Doing comparison for "Ending Price" column
      arrEndingPriceColumnValues.forEach(function(totalReturnValue, index) {
        if (totalReturnValue > 20) {
          PA3MainPage.getValueFromCalculatedReport('Contribution', arrContributionRowNames[index], 'Ending Price')
            .then(function(newTotalCellValue) {
              if (newTotalCellValue !== '20.00'.toString()) {
                expect(false).customError('"Ending Price" value for "' + arrContributionRowNames[index] + '" row ' +
                  'did not replace with 20. Expected: 20, Found: ' + newTotalCellValue);
                CommonFunctions.takeScreenShot();
              }
            });
        }
      });
    });

    it('Verifying that values  less than 5 in the "Beginning Price" and "Ending Price" ' +
      'Column replaces with NM( not meaning full)', function() {
      // Doing comparison for "Beginning Price" column
      arrBeginningPriceColumnValues.forEach(function(avgWeightValue, index) {
        if (avgWeightValue < 5) {
          PA3MainPage.getValueFromCalculatedReport('Contribution', arrContributionRowNames[index], 'Beginning Price')
            .then(function(newAvgCellValue) {
              if (newAvgCellValue !== '') {
                expect(false).customError('"Beginning Price" value for "' + arrContributionRowNames[index] + '" row ' +
                  'did not replace with NM( not meaning full). Expected: "", Found: ' + newAvgCellValue);
                CommonFunctions.takeScreenShot();
              }
            });
        }
      });

      // Doing comparison for "Ending Price" column
      arrEndingPriceColumnValues.forEach(function(totalReturnValue, index) {
        if (totalReturnValue < 5) {
          PA3MainPage.getValueFromCalculatedReport('Contribution', arrContributionRowNames[index], 'Ending Price')
            .then(function(newTotalCellValue) {
              if (newTotalCellValue !== '') {
                expect(false).customError('"Ending Price" value for "' + arrContributionRowNames[index] + '" row ' +
                  'did not replace with NM( not meaning full). Expected: "", Found: ' + newTotalCellValue);
                CommonFunctions.takeScreenShot();
              }
            });
        }
      });
    });

  });

  describe('Test Step ID: 558452', function() {

    it('Should select "Attribution " report from LHP', function() {
      PA3MainPage.getReports('Attribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Check if report - 'Weights' is selected
      expect(PA3MainPage.getReports('Attribution').getAttribute('class')).toContain('selected');
    });

    it('Should Wait for "Attribution" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Attribution'), 180000);
    });

    it('Verifying if "Attribution" report is calculated', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(displayed) {
        if (!displayed) {
          expect(false).customError('"Attribution" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating the "Attribution" report' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Should click on the "Wrench" icon in the "Attribution\'" report workspace', function() {
      browser.sleep(4000);
      PA3MainPage.getWrenchIconFromReportWorkspace('Attribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Wrench menu list appeared
      expect(PA3MainPage.getWrenchIconFromReportWorkspace('Attribution', true).isPresent()).toBeTruthy();
    });

    it('Should select "Options" from the menu list', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Attribution" mode', function() {
      expect(element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText())
        .toEqual('Tile Options - Attribution');
    });

    it('Should select "Columns" from LHP', function() {
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

    it('Should select "Variation in Contribution To Return" From the Selected list', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Variation');
      group.getItemByText('Variation in Contribution To Return').then(function(value) {
        value.select();

        // Verifying if "Variation in Contribution To Return" is selected
        value.isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"Variation in Contribution To Return" is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should select "Allocation Effect" from the selected list, By Holding the ctrl key', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Attribution Analysis');
      group.getItemByText('Allocation Effect').then(function(value) {
        value.select(true, false);

        // Verifying if "Allocation Effect" is selected
        value.isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"Allocation Effect" is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Should expand "Additional Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Additional Options').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Additional Options" section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrAdditionalOption = ['Display Total Column'];
    arrAdditionalOption.forEach(function(option) {
      it('Verify that "' + option + '" is the default "Additional Option"', function() {
        expect(TileOptionsColumns.getSelectedAdditionalOptions(option).isPresent()).toBeTruthy();
      });
    });

    it('Verify that "TBR Enhanced Calc" is not the default "Additional Option"', function() {
      expect(TileOptionsColumns.getSelectedAdditionalOptions('TBR Enhanced Calc').isPresent()).toBeFalsy();
    });

  });

  describe('Test Step ID: 558453', function() {

    it('Should select "Variation in Contribution To Return" From the Selected list', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Variation');
      group.getItemByText('Variation in Contribution To Return').then(function(value) {
        value.select();

        // Verifying if "Variation in Contribution To Return" is selected
        value.isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"Variation in Contribution To Return" is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should select "Port. Average Weight" from the selected list By Holding the SHIFT key', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Portfolio Name');
      group.getItemByText('Port. Average Weight').then(function(value) {
        value.select(false, true);

        // Verifying if "Port. Average Weight" is selected
        value.isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"Port. Average Weight" is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var dataItems1 = ['Port. Average Weight', 'Port. Total Return', 'Port. Contribution To Return'];
    dataItems1.forEach(function(columnName) {
      it('Verifying that "' + columnName + '" is selected', function() {
        var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Portfolio Name');
        group.getItemByText(columnName).then(function(value) {

          // Verifying if "Column Name" is selected
          value.isSelected().then(function(selected) {
            if (!selected) {
              expect(false).customError('"' + columnName + '" is not selected');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

    });

    var dataItems2 = ['Bench. Average Weight', 'Bench. Total Return', 'Bench. Contribution To Return'];
    dataItems2.forEach(function(columnName) {
      it('Verifying that "' + columnName + '" is selected', function() {
        var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Benchmark Name');
        group.getItemByText(columnName).then(function(value) {

          // Verifying if "Column Name" is selected
          value.isSelected().then(function(selected) {
            if (!selected) {
              expect(false).customError('"' + columnName + '" is not selected');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

    });

    var dataItems3 = ['Variation in Average Weight', 'Variation in Total Return', 'Variation in Contribution To Return'];
    dataItems3.forEach(function(columnName) {
      it('Verifying that "' + columnName + '" is selected', function() {
        var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Variation');
        group.getItemByText(columnName).then(function(value) {

          // Verifying if "Column Name" is selected
          value.isSelected().then(function(selected) {
            if (!selected) {
              expect(false).customError('"' + columnName + '" is not selected');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

    });

    var sectionItems = ['Portfolio Name', 'Benchmark Name', 'Variation'];
    sectionItems.forEach(function(columnName) {
      it('Verifying that "' + columnName + '" sections should not be highlighted', function() {
        ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText(columnName).isSelected().then(function(seleted) {
          if (seleted) {
            expect(false).customError('"' + columnName + '" is selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var arrAdditionalOption = ['Display Total Column', 'In Portfolio Returns', 'SPAR - Net Fees'];
    arrAdditionalOption.forEach(function(option) {
      it('Should Verify that "' + option + '" is the default "Additional Option"', function() {
        TileOptionsColumns.getSelectedAdditionalOptions(option).isPresent().then(function(option) {
          if (!option) {
            expect(false).customError('"' + option + '" is not default "Additional Option"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should Verify that "TBR Enhanced Calc" is not the default "Additional Option"', function() {
      TileOptionsColumns.getSelectedAdditionalOptions('TBR Enhanced Calc').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"TBR Enhanced Calc" is the default "Additional Option"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 726721', function() {

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options - Attribution');

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Attribution - Multi tile', true, 'isSelected');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    var arrCharts = ['Weights Over Time', 'Performance'];

    arrCharts.forEach(function(chartName) {
      it('Verifying if "' + chartName + '" chart is displayed', function() {
        PA3MainPage.isInChartFormat(chartName).then(function(flag) {
          if (!flag) {
            expect(false).customError('"' + chartName + '" chart is not displayed');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var arrColumns = ['Port. Contrib. To Return', 'Bench. Contrib. To Return'];
    var arrTotal = [];
    arrColumns.forEach(function(element) {
      it('Should note down the "Total" row value for "' + element + '" column', function() {
        SlickGridFunctions.getCellReference('Attribution', 'Total', '', element).then(function(ref) {
          ref.getText().then(function(text) {
            arrTotal.push(text);
          });
        });
      });
    });

    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Attribution', 'Economic Sector');

    it('Should click on the "Columns" tab on the LHP of tile options view', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Columns').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Columns').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Columns" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Port. Contribution to Return" and hold control key to select "Bench. Contribution to Return"', function() {
      ThiefHelpers.getVirtualListBoxItem(xpathOfSelectedSection, 'Port. Contribution To Return', 'Portfolio Name').then(function(item) {
        item.select();

        item.isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"Port. Contribution to Return" is not selected in the selected section');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      ThiefHelpers.getVirtualListBoxItem(xpathOfSelectedSection, 'Bench. Contribution To Return', 'Benchmark Name').then(function(item) {
        item.select(true);

        item.isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"Bench. Contribution to Return" is not selected in the selected section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should expand "Additional Options" accordion from "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Additional Options').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Additional Options" is not expanded in "Options" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Cash Flows at Start of day" from "Return Methodology" dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('Cash Flows at Start of day', 'Return Methodology');

      // verifying if 'Cash Flows at Start of day' is selected from "Additional Options" section dropdown
      ThiefHelpers.verifySelectedDropDownText('Cash Flows at Start of day', 'Return Methodology');
    });

    it('Should select "None" from "Compounding Algorithm" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('None', 'Compounding Algorithm');
    });

    it('Verifying "None" option is selected from "Compounding Algorithm" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('None', 'Compounding Algorithm');
    });

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Attribution');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    arrColumns.forEach(function(element, index) {
      it('Verifying if "Total" row value for "' + element + '" column is different from previous value', function() {
        SlickGridFunctions.getCellReference('Attribution', 'Total', '', element).then(function(ref) {
          ref.getText().then(function(text) {
            if (parseFloat(arrTotal[index]) === parseFloat(text)) {
              expect(false).customError('"Total" row value for "' + element + '" column is not different from ' +
                'previous value. Previous value ' + arrTotal[index] + ' report value ' + text);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

  });

});
