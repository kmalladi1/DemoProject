'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: col-format-chartview', function() {

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');
  var arrDropdownOptions = ['Add Section', 'Add Fixed Columns'];

  describe('Test Step ID: 473233', function() {

    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:default_doc_OLD" document', function() {
      PA3MainPage.switchToDocument('default-doc-old');
    });

    it('Should type "PA3_Test" into "Portfolio" widget box and select "PA3_Test.ACCT | Client:" from type ahead', function() {
      PA3MainPage.setPortfolio('PA3_Test', 'PA3_TEST.ACCT | Client:', 'Client:PA3_TEST.ACCT').then(function(select) {
        if (!select) {
          expect(false).customError('Error occurred while selecting "PA3_TEST.ACCT | Client:" from type ahead');
          expect(false).customError('Error occurred while selecting "PA3_TEST.ACCT | Client:" from type ahead');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

  });

  describe('Test Step ID: 473235', function() {

    it('Should right click on "Port. Weight" in "Weights" report and select "Columns > Add Column..." ', function() {
      PA3MainPage.getAllColumnOfCalculatedReport('Weights').each(function(element) {
        Utilities.scrollElementToVisibility(element);
        element.getText().then(function(text) {
          var name = text.replace(/\n/g, ' ');
          if (name === 'Port. Weight') {
            PA3MainPage.rightClickAndSelectOption(element, 'Columns|Add Column\u2026');
          }
        });
      });
    });

    it('Verifying if "Tile Options" View mode is appeared', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (!option) {
          expect(false).customError('"Tile Options" View mode has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Bench. Ending Weight" from selected section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Bench. Ending Weight').select();

      // Verify if 'Bench. Ending Weight' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Bench. Ending Weight').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Bench. Ending Weight" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "30" in the "Width" text box', function() {
      ThiefHelpers.getTextBoxClassReference('Width').setText('30');

      // Verifying that "30" is typed into the Width box
      ThiefHelpers.getTextBoxClassReference('Width').getText().then(function(text) {
        if (text !== '30') {
          expect(false).customError('"30" did not type into the "Width" field. Found ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "4" in the "Decimal" text box', function() {
      ThiefHelpers.getTextBoxClassReference('Decimal').setText('4');

      // Verifying that "4" is typed into the Decimal box
      ThiefHelpers.getTextBoxClassReference('Decimal').getText().then(function(text) {
        if (text !== '4') {
          expect(false).customError('"4" did not type into the "Decimal" field. Found ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should Change the justification to Left ', function() {
      ThiefHelpers.selectOptionFromDropDown('Left', 'Justification');
    });

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var flag = 0;
    it('Verifying "Bench. Weight" column value is left aligned in "Weights" report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(option) {
        option.forEach(function(option) {
          SlickGridFunctions.getCellReference('Weights', option, '', 'Bench. Weight').then(function(option) {
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

    var screenShot = 0;
    it('Verifying if "Bench. Weight" column cell value is displayed only four decimal places', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(option) {
        option.forEach(function(option, inedx) {
          SlickGridFunctions.getCellReference('Weights', option, '', 'Bench. Weight').then(function(ref) {
            ref.getText().then(function(value) {
              var temp = value.split('.');
              if (temp[1].length !== 4) {
                expect(false).customError('Cell value did not display only four decimal places for ' +
                  '"Bench. Weight" column at row ' + inedx + '. Found ' + value);
                screenShot++;
                if (screenShot === 1) {
                  CommonFunctions.takeScreenShot();
                }
              }
            });
          });
        });
      });
    });

    var takeScreenShot = 0;
    it('Verify if "Bench. Weight" column cells width is increased compared to Difference column', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(option) {
        option.forEach(function(rowName) {
          SlickGridFunctions.getCellReference('Weights', rowName, '', 'Difference').then(function(ref) {
            ref.getCssValue('width').then(function(width1) {
              width1 = width1.slice(0, 3);
              SlickGridFunctions.getCellReference('Weights', rowName, '', 'Bench. Weight').then(function(option) {
                option.getCssValue('width').then(function(width) {
                  width = width.slice(0, 3);
                  if ((parseInt(width)) < (parseInt(width1)) || (parseInt(width)) === (parseInt(width1))) {
                    expect(false).customError('"Bench. Weight" column cells width is not increased compared Difference column. ' +
                      'Previous width ' + width1 + 'px, width after performing actions ' + width + 'px');
                    takeScreenShot++;
                    if (takeScreenShot === 1) {
                      CommonFunctions.takeScreenShot();
                    }
                  }
                });
              });
            });
          });
        });
      });
    });

  });

  describe('Test Step ID: 473236', function() {

    it('Should right click on "Bench. Weight" and select "Custom Chart > Column"', function() {
      var eleRefs = PA3MainPage.getAllColumnOfCalculatedReport('Weights');
      eleRefs.each(function(element) {
        element.getText().then(function(text) {
          var name = text.replace(/\n/g, ' ');
          if (name === 'Bench. Weight') {
            PA3MainPage.rightClickAndSelectOption(element, 'Custom Charts|Column');
          }
        }, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            eleRefs = PA3MainPage.getAllColumnOfCalculatedReport('Weights');
            eleRefs.then(function(references) {
              references.forEach(function(eleRef) {
                eleRef.getText().then(function(text) {
                  var name = text.replace(/\n/g, ' ');
                  if (name === 'Bench. Weight') {
                    PA3MainPage.rightClickAndSelectOption(eleRef, 'Custom Charts|Column');
                  }
                });
              });
            });
          } else {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if report is changed to "Chart" mode', function() {
      PA3MainPage.isInChartFormat('Bench. Weight').then(function(flag) {
        if (!flag) {
          expect(false).customError('Report did not changed to "Chart" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Chart" is "Columns" chart', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(style) {
        if (style !== 'Columns') {
          expect(false).customError('Chart" showed is not "Columns" chart. Instead Found :' + style);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 473237', function() {

    it('Should click on the grid icon available at the top in "Bench. Weight" chart', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Bench. Weight').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var flag = 0;
    it('Verifying "Bench. Weight" column value is left aligned in "Weights" report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(option) {
        option.forEach(function(option) {
          SlickGridFunctions.getCellReference('Weights', option, '', 'Bench. Weight').then(function(option) {
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

    it('Verifying if "Bench. Weight" column cell value is displayed only four decimal places', function() {
      flag = 0;
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(option) {
        option.forEach(function(option, inedx) {
          SlickGridFunctions.getCellReference('Weights', option, '', 'Bench. Weight').then(function(ref) {
            ref.getText().then(function(value) {
              var temp = value.split('.');
              if (temp[1].length !== 4) {
                expect(false).customError('Cell value did not display only four decimal places for ' +
                  '"Bench. Weight" column at row ' + inedx + '. Found ' + value);
                flag++;
                if (flag === 1) {
                  CommonFunctions.takeScreenShot();
                }
              }
            });
          });
        });
      });
    });

    it('Verify if "Bench. Weight" column cells width is increased compared to Difference column', function() {
      flag = 0;
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(option) {
        option.forEach(function(rowName) {
          SlickGridFunctions.getCellReference('Weights', rowName, '', 'Difference').then(function(ref) {
            ref.getCssValue('width').then(function(width1) {
              width1 = width1.slice(0, 3);
              SlickGridFunctions.getCellReference('Weights', rowName, '', 'Bench. Weight').then(function(option) {
                option.getCssValue('width').then(function(width) {
                  width = width.slice(0, 3);
                  if ((parseInt(width)) < (parseInt(width1)) || (parseInt(width)) === (parseInt(width1))) {
                    expect(false).customError('"Bench. Weight" column cells width is not increased compared Difference column. ' +
                      'Previous width ' + width1 + ', width after calculating the report ' + width);
                    flag++;
                    if (flag === 1) {
                      CommonFunctions.takeScreenShot();
                    }
                  }
                });
              });
            });
          });
        });

      });
    });

  });

  describe('Test Step ID: 710873', function() {

    it('Should click on "Attribution" report to get select', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Reports', 'Attribution').then(function(reportRef) {
        reportRef.click().then(function() {
        }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      });

      // Verifying "Attribution" Report is selected.
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Reports', 'Attribution').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') <= 0) {
            expect(false).customError('"Attribution" report did not highlight');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    //Variables
    var arrElements = [{
      name: 'Portfolio',
      xpath: PA3MainPage.xpathPortfolioWidget,
      value: 'CLIENT:DEMO_ACCT.ACCT',
    }, {name: 'Benchmark', xpath: PA3MainPage.xpathBenchmarkWidget, value: 'MSCI:WORLD'},];

    arrElements.forEach(function(element) {
      it('Should type "' + element.value + '" in the "' + element.name + '" widget and hit enter', function() {
        // Entering the value to Widget box
        ThiefHelpers.getTextBoxClassReference('', element.xpath).setText(element.value);
      });
    });

    arrElements.forEach(function(element) {
      it('Verifying if "' + element.value + '" is added to "' + element.name + '" widget', function() {
        ThiefHelpers.getTextBoxClassReference('', element.xpath).getText().then(function(val) {
          if (val !== element.value) {
            expect(false).customError('"' + element.name + '" widget did not has "' + element.value + '" in it.' + ' Found: "' + val + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    it('Should click on "wrench" icon in the report', function() {
      PA3MainPage.selectWrenchIcon('Attribution');
    });

    it('Verifying if the "wrench" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Wrench" drop down did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from the drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Attribution" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Attribution').then(function(found) {
        if (!found) {
          expect(false).customError('View if not changed to "Tile Options - Attribution" mode.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Columns" tab in the LHP of tile options', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Columns').select();

      // Verifying if "Columns" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Columns').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Columns" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "Asset Type" into the search field of "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('Asset Type');

      // Verifying that "PE" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(text) {
        if (text !== 'Asset Type') {
          expect(false).customError('"Asset Type" is not present in search field of "Available" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should double click on "Asset Type (Client Definition\/ FactSet)" from search result', function() {
      // Getting the xpath of the Available section
      var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');

      group.getItemByText('Asset Type (Client Definition\/ FactSet)').then(function(item) {
        item.select();
        item.doubleClick();
      });
    });

    it('Verifying if "Asset Type (Client Definition/ FactSet)" is added to "Selected" section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Asset Type (Client Definition\/ FactSet)').isPresent().then(function(present) {
        if (!present) {
          expect(false).then('"Asset Type (Client Definition\/ FactSet)" is not added to "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "4" in the "Decimal" text box', function() {
      ThiefHelpers.getTextBoxClassReference('Decimal').setText('4');

      // Verifying that "4" is typed into the Decimal box
      ThiefHelpers.getTextBoxClassReference('Decimal').getText().then(function(text) {
        if (text !== '4') {
          expect(false).customError('"4" did not type into the "Decimal" field.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Statistics" section from "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Statistics').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Statistics" is not expanded in "Options" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should open "Add a statistic" drop down', function() {
      TileOptionsColumns.getStatisticsDropDown().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Number Available" from "Add a statistic" drop down', function() {
      ThiefHelpers.getOptionFromDropdown('Number Available').click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if option is added to the selected list
      TileOptionsColumns.getSelectedStatistic('Number Available').isPresent().then(function(isexist) {
        if (!isexist) {
          expect(false).customError('"Number Available" is not added');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Attribution');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    var screenShot = 0;
    it('Verifying if "Asset Type(Client Definition/FactSet)" column cell value is displayed only four decimal places', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Attribution', '').then(function(option) {
        option.forEach(function(rowName) {
          SlickGridFunctions.getCellReference('Attribution', rowName, '', 'Asset Type (Client Definition\/ FactSet)').then(function(ref) {
            ref.getText().then(function(value) {
              var temp = value.split('.');
              if (temp[1].length !== 4) {
                expect(false).customError('Cell value did not display four decimals for ' +
                  '"Bench. Weight" column at row ' + rowName + '. Found ' + value);
                screenShot++;
                if (screenShot === 1) {
                  CommonFunctions.takeScreenShot();
                }
              }
            });
          });
        });

      });
    });
  });

  describe('Test Step ID: 759367', function() {

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Weights', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should right click on "Port. Weight" in "Weights" report and select "Columns > Add Column..." ', function() {
      PA3MainPage.getAllColumnOfCalculatedReport('Weights').each(function(element) {
        Utilities.scrollElementToVisibility(element);
        element.getText().then(function(text) {
          var name = text.replace(/\n/g, ' ');
          if (name === 'Port. Weight') {
            PA3MainPage.rightClickAndSelectOption(element, 'Columns|Add Column\u2026');
          }
        });
      });
    });

    it('Verifying if "Tile Options" View mode is appeared', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (!option) {
          expect(false).customError('"Tile Options" View mode has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on the "+" icon next to available section and select the option from the drop-down
    CommonPageObjectsForPA3.clickOnAddButtonAndSelectOptionFromDropdown('New/Reference', 'Columns');

    it('Should select "Reference" radio button in "Columns" window', function() {
      ThiefHelpers.getRadioClassReference('Reference').select();

      // Verifying if the "Reference" radio button is selected
      ThiefHelpers.getRadioClassReference('Reference').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Reference" radio button did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var xpathOfFormulaTextArea = element(by.xpath(CreateEditCustomColumns.xpathOfFormulaTextArea));
    it('Should select "Col 3: Port. Ending Weight" from the "Formula" tab', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfFormulaTextArea).getItemByText('Col 3: Port. Ending Weight').select();
    });

    // Send text into the formula section and verify the text
    CommonPageObjectsForPA3.sendTextOrVerifyTextInCodeMirror('Formula', '"1000"', '"1000"', false);

    it('Type "Test" into the "Name" field', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('Test');

      // Verifying that "Test" is typed into the "Name" field
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'Test') {
          expect(false).customError('"Test" is not present in the "Name" field');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on "Save" button to save the settings', function() {
      ThiefHelpers.getButtonClassReference(undefined, CreateEditCustomColumns.getButton('Save')).press().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "Save" button' + err);
      });
    });

    it('Waiting for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomColumns.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verifying that "Columns" dialog is no more displayed', function() {
      ThiefHelpers.isDialogOpen('Columns', undefined, undefined).then(function(appeared) {
        if (appeared) {
          expect(false).customError('"Columns" dialog box is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand the "Statistics" option and verifying the "Statistics" section is expanded', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Statistics').then(function(option) {
        if (!option) {
          expect(false).customError('"Statistics" section is not expanded ');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should open "Add a statistic" drop down', function() {
      TileOptionsColumns.getStatisticsDropDown().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should expand "Statistics" section from "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Statistics').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Statistics" is not expanded in "Options" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Mode" from "Add a statistic" drop down', function() {
      ThiefHelpers.getOptionFromDropdown('Mode').click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if option is added to the selected list
      TileOptionsColumns.getSelectedStatistic('Mode').isPresent().then(function(isexist) {
        if (!isexist) {
          expect(false).customError('"Mode" is not added');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Conditional Formatting" accordion', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Conditional Formatting').then(function(expandStatus) {
        if (!expandStatus) {
          expect(expandStatus).customError('"Conditional Formatting" accordion is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Conditional Formatting" accordion is expanded', function() {
      TileOptionsColumns.getExpandableElement('Conditional Formatting').getAttribute('class').then(function(status) {
        if (status.indexOf('collapsed') > 0) {
          expect(false).customError('"Conditional Formatting" accordion is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check "Group Level" checkbox', function() {
      ThiefHelpers.getCheckBoxClassReference('Group Level').isChecked().then(function(status) {
        if (status) {
          expect(false).customError('"Group Level" checkbox is already checked');
          CommonFunctions.takeScreenShot();
        } else {
          ThiefHelpers.getCheckBoxClassReference('Group Level').check();
        }
      });
    });

    it('Verifying if "Group Level" checkbox is checked', function() {
      ThiefHelpers.getCheckBoxClassReference('Group Level').isChecked().then(function(status) {
        if (!status) {
          expect(false).customError('"Group Level" checkbox is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if "Test" column is added to the "Weights" report', function() {
      SlickGridFunctions.getColumnNames('Weights').then(function(option) {
        if (option.indexOf('Test') < 0) {
          expect(false).customError('"Test" column is not added to the "Weights" report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var screenShot = 0;
    it('Verifying if the report displays "1000" under "Test" column', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Test').then(function(columnValues) {
        columnValues.forEach(function(text, inedx) {
          if (text !== '1000') {
            expect(false).customError('"1000" is not present in the Test column at index ' + inedx);
            screenShot++;
            if (screenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

  });

  describe('Test Step ID: 759371', function() {

    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights', 'Options');

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Weights') {
          expect(false).customError('"Tile Options - Weights" view has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Columns" tab in the LHP of tile options', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Columns').select();

      // Verifying if "Columns" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Columns').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Columns" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "X" icon next to "Test" in the "Selected section"', function() {
      // Getting the xpath of the Selected section
      var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');
      var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Test');

      item.getActions().then(function(actions) {
        actions.triggerAction('remove');
      });
    });

    it('Verify that "Test" is removed in "Selected" list', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Test') > -1) {
          expect(false).customError('"Test" is not removed in the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    it('Verifying if "Test" column is removed in the "Weights" report', function() {
      SlickGridFunctions.getColumnNames('Weights').then(function(option) {
        if (option.indexOf('Test') > -1) {
          expect(false).customError('"Test" column is still present in the "Weights" report');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 790821', function() {

    it('Should open PA3 Application with "Client:;pa3;columns;Fixed%20Columns-charc%20and%20Perf%20reports" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('fixed-columns-charc-and-Perf-reports');
    });

    it('Verifying "Exposures" Report is selected from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'have FIX col', 'Exposures').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') <= 0) {
            expect(false).customError('"Exposure" report is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');
  });

  describe('Test Step ID: 790825', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Columns');

    it('Should click on "+" icon in the "Selected" section', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsColumns.xpathOfSelectedSectionFolderIcon).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    arrDropdownOptions.forEach(function(optionName) {
      it('Verifying if "' + optionName + '" is enabled in the dropdown', function() {
        ThiefHelpers.getOptionFromDropdown(optionName).getAttribute('class').then(function(text) {
          if (text.indexOf('disabled') > -1) {
            expect(false).customError('"' + optionName + '" option is disabled');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 790826', function() {

    // Click on "Cancel" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options');

    it('Should select "Characteristics Overview" from the LHP', function() {
      PA3MainPage.getReports('Characteristics Overview').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Characteristics Overview" report is selected
      PA3MainPage.getReports('Characteristics Overview').getAttribute('class').then(function(value) {
        expect(value.indexOf('selected') > -1).customError('"Characteristics Overview" is not selected.');
        if (value.indexOf('selected') < 0) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    let arrayOfReports = [`Summary Characteristics`, `Detail Characteristics`];

    arrayOfReports.forEach(function(reportName) {

      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportName);
    });

    CommonPageObjectsForPA3.verifyIfChartIsDisplayed(`Characteristics Over Time`);

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Summary Characteristics', 'Columns');

    it('Should click on "+" icon in the "Selected" section', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsColumns.xpathOfSelectedSectionFolderIcon).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Add Section" is enabled in the dropdown', function() {
      ThiefHelpers.getOptionFromDropdown('Add Section').getAttribute('class').then(function(text) {
        if (text.indexOf('disabled') > -1) {
          expect(false).customError('"Add Section" option is disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Add Fixed Columns" is disabled in the dropdown', function() {
      ThiefHelpers.getOptionFromDropdown('Add Fixed Columns').getAttribute('class').then(function(text) {
        if (text.indexOf('disabled') < 0) {
          expect(false).customError('"Add Fixed Columns" option is enabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: Shut Down Instructions', function() {

    // Click on "Cancel" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options');
  });

});
