'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: dates-multi-horizon', function() {

  var arrayColumn = [];
  var highlightedDate;

  describe('Test Step ID: 550523', function() {

    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:default_doc_OLD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });
  });

  describe('Test Step ID: 550524', function() {

    var arraycolumns = ['Port. Weight', 'Bench. Weight', 'Difference'];

    it('Should enter "spn" in portfolio widget', function() {
      expect(PA3MainPage.setPortfolio('spn', 'Client:/new_pa_test_suite/pricing/SPN_SP50_ACCT.ACCT', 'CLIENT:/NEW_PA_TEST_SUITE/PRICING/SPN_SP50_ACCT.ACCT')).toBeTruthy();
    });

    it('Should enter "Russell:1000" in benchmark widget', function() {
      PA3MainPage.getWidgetBox('Benchmark').sendKeys('Russell:1000', protractor.Key.ENTER);

      // Verifying that "Russell: 1000" is entered
      PA3MainPage.getWidgetBox('Benchmark').getAttribute('value').then(function(value) {
        if (value !== 'RUSSELL:1000') {
          expect(false).customError('"RUSSELL:1000" is not entered in benchmark widget.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    var flag = 0;
    arraycolumns.forEach(function(colName) {
      it('Should verify that values are displayed under "' + colName + '" column', function() {
        // Find the name of first row from calculated report and then check its value for the given column
        // The value should not be an empty string
        PA3MainPage.getAllElementsFromCalculatedReport('Weights', 'slick-pane slick-pane-bottom slick-pane-left').get(0).getText().then(function(rowName) {
          PA3MainPage.getValueFromCalculatedReport('Weights', rowName, colName).then(function(rowVal) {
            if (rowVal === '') {
              flag = flag + 1;
              expect(false).customError('Values are not displayed under "' + colName + '" column');
              if (flag === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 550516', function() {

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Contribution', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Contribution`);

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Contribution', 'Options');
  });

  describe('Test Step ID: 550517', function() {

    it('Should select "Dates" from LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Dates').select();

      // Verifying if "Dates" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Dates').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Dates" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Report Frequency" drop down and select "Multi-Horizon"', function() {
      ThiefHelpers.selectOptionFromDropDown('Multi-Horizon', 'Report Frequency:');

      // Verifying if "Multi-Horizon" is set
      ThiefHelpers.verifySelectedDropDownText('Multi-Horizon', 'Report Frequency:');
    });

    it('Should set the "End date" to "9/25/2014"', function() {
      ThiefHelpers.setDateInCalendar('9/25/2014');
    });

    it('Verify that "End Date" field is showing "9/25/2014"', function() {
      ThiefHelpers.getDatepickerClassReference('End Date:').getDate().then(function(text) {
        if (text !== '9/25/2014') {
          expect(false).customError('End Date is not set to "9/25/2014" instead found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 550518', function() {

    it('Verify if "One Day Ago" is already present in "Start Date:" dropdown and click on Add button', function() {
      ThiefHelpers.getTextBoxClassReference('Start Date:').getText().then(function(text) {
        if (text !== 'One Day Ago') {
          expect(false).customError('"Start Date" drop down is not set to "One Day Ago". Found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        } else if (text === 'One Day Ago') {
          TileOptionsDates.getMultiHorizonAddBtn().click().then(function() {
            // Adding wait time as per the Engineer comment in RPD:41035011
            browser.sleep(1000);
            TileOptionsDates.getMultiHorizonAddBtn().click();
          }, function(err) {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    it('Verifying if "One Day Ago" is added to text field', function() {
      TileOptionsDates.getMultiHorizonListItem('One Day Ago').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"One Day Ago" is not added to text field');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrValueToSelect = ['One Quarter Ago', 'One Year Ago', 'Year to Date'];

    arrValueToSelect.forEach(function(value) {

      it('Should click on "Start Date" drop down and select "' + value + '"', function() {
        ThiefHelpers.getDatepickerClassReference('Start Date:').selectShortcutByText(value);

        ThiefHelpers.getDatepickerClassReference('Start Date:').getDate().then(function(text) {
          if (text !== value) {
            expect(false).customError('Expected:"End of Last Month" but Found: "' + text + '" in the Date text box');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Should click on Add button', function() {
        TileOptionsDates.getMultiHorizonAddBtn().click().then(function() {
          // Adding wait time as per the Engineer comment in RPD:41035011
          browser.sleep(1000);

          TileOptionsDates.getMultiHorizonAddBtn().click();
        }, function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });

      it('Verifying if "' + value + '" is added to text field', function() {
        TileOptionsDates.getMultiHorizonListItem(value).isPresent().then(function(present) {
          if (!present) {
            expect(false).customError('"' + value + '" is not added to text field');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var arrListboxItems = [{name: 'One Quarter Ago', newName: '1 Q Ago'}, {
      name: 'One Day Ago',
      newName: '1 Day Ago Test',
    },];

    arrListboxItems.forEach(function(listItem) {

      it('Should hover on "' + listItem.name + '" and select edit icon', function() {
        var item = ThiefHelpers.getListboxClassReference(TileOptionsDates.xpathMultiHorizonListbox).getItemByText(listItem.name);

        item.getActions().then(function(val) {
          return val.triggerAction('rename');
        }, function(error) {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });

      });

      it('Should change heading to "' + listItem.newName + '"', function() {
        ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsDates.getListBoxItemRenameField()).setText(listItem.newName);
      });

    });

    var screenShot = 0;
    var arrNewListBoxItems = ['1 Q Ago', 'One Year Ago', 'Year to Date', '1 Day Ago Test'];

    arrNewListBoxItems.forEach(function(value) {
      it('Verifying if "' + value + '" is added to text field', function() {
        TileOptionsDates.getMultiHorizonListItem(value).isPresent().then(function(present) {
          if (!present) {
            expect(false).customError('"' + value + '" is not added to text field');
            screenShot++;
            if (screenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

  });

  describe('Test Step ID: 550519', function() {

    it('Should clear "Start Date" field and type "-3m"', function() {
      // Typing "-3m" in "Start Date" field
      TileOptionsDates.getMultiHorizonStartDateField().sendKeys(protractor.Key.HOME, protractor.Key.SHIFT, protractor.Key.END, protractor.Key.NULL, protractor.Key.DELETE, '-3m');
    });

    it('Should click on Add button', function() {
      TileOptionsDates.getMultiHorizonAddBtn().click().then(function() {
        TileOptionsDates.getMultiHorizonAddBtn().click();
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //Verifying if -3m is added to list or not
      TileOptionsDates.getMultiHorizonListItem('-3m').isPresent().then(function(value) {
        if (!value) {
          TileOptionsDates.getMultiHorizonAddBtn().click().then(function() {
          }, function(err) {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    it('Should select "Start Date Relative to End Date"  check box', function() {
      TileOptionsDates.getCheckBox('Start Date Relative to End Date').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "-3m" is added to list field contains ', function() {
      TileOptionsDates.getMultiHorizonListItem('-3m').isPresent().then(function(value) {
        if (!value) {
          expect(false).customError('"-3m" is not added to the list even after performing click on "Add" button.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Start Date Relative to End Date" is selected', function() {
      // Verifying if 'Start Date Relative to End Date' check box
      expect(Utilities.isCheckboxSelected(TileOptionsDates.getCheckBox('Start Date Relative to End Date'))).toBeTruthy();
    });
  });

  describe('Test Step ID: 550520', function() {

    it('Should select "Columns" from LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Columns').select();

      // Verifying if "Columns" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Columns').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Columns" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "Total" in the search field', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('Total');

      browser.sleep(1000);
    });

    it('Should double click on "Port. Total Return (Local)" from the "Available" list', function() {
      // Getting the xpath of the Available section
      var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

      ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'FactSet', 'Port. Total Return ( Local )').then(function(item) {
        item.select();
        item.doubleClick();
      });
    });

    var arrElements = [];
    it('Verify that "Port. Total Return ( Local )" is added to the "Selected" list', function() {
      // Getting the xpath of the Selected section
      var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText().then(function(noOfElements) {
        // Check if 'Port.Total Return (Local)' is added from 'Selected' list
        noOfElements.forEach(function(listItem) {
          arrElements.push(listItem.text);
        });
        if (arrElements.indexOf('Port. Total Return ( Local )') === -1) {
          expect(false).customError('"Port. Total Return ( Local )"is not found in the "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 550521', function() {

    var arrayFrequencies = ['One Year Ago', 'Year to Date', '-3m', '1 Q Ago', '1 Day Ago Test'];

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Contribution');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Collecting all multi header column values', function() {
      PA3MainPage.getAllMultiHeaderColumns('Contribution').each(function(element) {
        Utilities.scrollElementToVisibility(element);
        element.getText().then(function(text) {
          arrayColumn.push(text);
        });
      });
    });

    arrayFrequencies.forEach(function(element, index) {
      if (arrayColumn.indexOf(element) > -1) {
        it('Verifying if Contribution report is calculated for the frequencies "' + element + '"', function() {
          expect(element).toEqual(arrayColumn[index]);
        });
      }
    });
  });

  describe('Test Step ID: 589764', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Dates');

    var arrayFrequencies = ['-3m', '1 Day Ago Test'];
    arrayFrequencies.forEach(function(element) {
      it('Should hover over on "' + element + '" and click on "X" icon from "Multi horizon" list box.', function() {
        TileOptionsDates.getRemoveButtonOfMultiHorizonListElement(element).click().then(function() {
        }, function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Contribution');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    arrayFrequencies.forEach(function(element) {
      it('Verifying if Contribution report does not displays frequency "' + element + '"', function() {
        PA3MainPage.getAllMultiHeaderColumns('Contribution').each(function(ele) {
          Utilities.scrollElementToVisibility(ele);
          if (ele.getText() === element) {
            expect(false).customError('"Contribution" report is calculated for frequency "' + element + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 638156', function() {

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Weights', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should right click on "Port. Weight" in "Weights" report and select "Custom Charts > Column" ', function() {
      var eleRefs = PA3MainPage.getAllColumnOfCalculatedReport('Weights');
      eleRefs.each(function(element) {
        element.getText().then(function(text) {
          var name = text.replace(/\n/g, ' ');
          if (name === 'Port. Weight') {
            PA3MainPage.rightClickAndSelectOption(element, 'Custom Charts|Column');
          }
        }, function(error) {
          if (error.name === 'StaleElementReferenceError') {
            eleRefs = PA3MainPage.getAllColumnOfCalculatedReport('Weights');
            eleRefs.then(function(references) {
              references.forEach(function(eleRef) {
                eleRef.getText().then(function(text) {
                  var name = text.replace(/\n/g, ' ');
                  if (name === 'Port. Weight') {
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

    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Port. Weight', 'Change Series');

    it('Verifying if "Change Series" dialog appeared', function() {
      ChangeSeries.getDialog('Change Series').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Change Series" dialog is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should double click on "Bench. Weight" under "Available" section', function() {
      var eleRef = ChangeSeries.getElementFromAvailableSection('Bench. Weight');

      // Double clicking on the element
      browser.actions().doubleClick(eleRef).perform();

      browser.sleep(3000);
    });

    it('Verifying if "Bench. Weight" is added to "Selected" section', function() {
      ChangeSeries.getElementsFromSelectedSection('Bench. Weight').isPresent().then(function(added) {
        if (!added) {
          expect(false).customError('"Bench. Weight" is not added to "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Port. Weight', 'Options');

  });

  describe('Test Step ID: 638157', function() {

    var date;
    var PortWeight1;
    var PortWeight2;
    var BenchWeigh1;
    var BenchWeigh2;

    it('Verifying if "Dates" is selected from the LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Dates').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Dates" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Report Frequency" drop down and select "Multi-Horizon"', function() {
      ThiefHelpers.selectOptionFromDropDown('Multi-Horizon', 'Report Frequency:');

      // Verifying if "Multi-Horizon" is set
      ThiefHelpers.verifySelectedDropDownText('Multi-Horizon', 'Report Frequency:');
    });

    it('Should verify that "End Date" field contains "One Day Ago"', function() {
      ThiefHelpers.getDatepickerClassReference('End Date:').getDate().then(function(text) {
        if (text !== 'One Day Ago') {
          expect(false).customError('Expected:"End of Last Month" but Found: "' + text + '" in the Date text box');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Should click on "Add" Button ', function() {
      TileOptionsDates.getAddButton().click().then(function() {
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "One Day Ago" is added to the list box', function() {
      TileOptionsDates.getMultiHorizonListItem('One Day Ago').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"One Day Ago" is not added to the list box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrOptions = ['One Week Ago', 'One Quarter Ago'];

    arrOptions.forEach(function(optionName) {

      it('Should click on "Start Date" drop down and select "' + optionName + '"', function() {
        ThiefHelpers.getDatepickerClassReference('End Date:').selectShortcutByText(optionName);

        ThiefHelpers.getDatepickerClassReference('End Date:').getDate().then(function(text) {
          if (text !== optionName) {
            expect(false).customError('Expected:"End of Last Month" but Found: "' + text + '" in the Date text box');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Should click on Add button', function() {
        TileOptionsDates.getMultiHorizonAddBtn().click().then(function() {
          // Adding wait time as per the Engineer comment in RPD:41035011
          browser.sleep(1000);

          TileOptionsDates.getMultiHorizonAddBtn().click();
        }, function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });

      it('Verifying if "' + optionName + '" is added to text field', function() {
        TileOptionsDates.getMultiHorizonListItem(optionName).isPresent().then(function(present) {
          if (!present) {
            expect(false).customError('"' + optionName + '" is not added to text field');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    var arrListboxItems = [{name: 'One Day Ago', newName: '1 Day Ago Test'}, {
      name: 'One Quarter Ago',
      newName: '1 Q Ago',
    },];

    arrListboxItems.forEach(function(listItem) {

      it('Should hover on "' + listItem.name + '" and select edit icon', function() {
        var item = ThiefHelpers.getListboxClassReference(TileOptionsDates.xpathMultiHorizonListbox).getItemByText(listItem.name);

        item.getActions().then(function(val) {
          return val.triggerAction('rename');
        }, function(error) {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      });

      it('Should change heading to "' + listItem.newName + '"', function() {
        ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsDates.getListBoxItemRenameField()).setText(listItem.newName);
      });

    });

    var arrNewListBoxItems = ['1 Q Ago', '1 Day Ago Test'];

    arrNewListBoxItems.forEach(function(value) {
      it('Verifying if "' + value + '" is added to text field', function() {
        TileOptionsDates.getMultiHorizonListItem(value).isPresent().then(function(present) {
          if (!present) {
            expect(false).customError('"' + value + '" is not added to text field');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on "Calender" icon beside the "End Date" drop down', function() {
      element(by.xpath(TileOptionsDates.xpathOfCalenderButton)).click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on the date highlighted in yellow', function() {
      TileOptionsDates.getSelectedDateFromCalender().click();
    });

    it('Should click on Add button', function() {
      TileOptionsDates.getMultiHorizonAddBtn().click().then(function() {
        // Adding wait time as per the Engineer comment in RPD:41035011
        browser.sleep(1000);
        TileOptionsDates.getMultiHorizonAddBtn().click();
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify that "End Date" field contains the date highlighted in yellow', function() {
      TileOptionsDates.getDateField('multi-horizon end date').getAttribute('value').then(function(value) {
        highlightedDate = value;
      });
    });

    it('Verifying if "' + highlightedDate + '" is added to text field', function() {
      TileOptionsDates.getMultiHorizonListItem(highlightedDate).isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"' + highlightedDate + '" is not added to the text field');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Contribution');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfChartIsDisplayed('Port. Weight');

    it('Should select "Communications" group from Interactive pane', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference();
      group.getGroupByText('Communications').select();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Should hover over the first blue bar to get Port. Weight value', function() {
      ChartingUtilities.hoverOnPixel('Series 1', 0);
      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        PortWeight1 = text.substring(text.indexOf('Port. Weight:') + 14, text.lastIndexOf('Date'));
      });
    });

    it('Should hover over the second blue bar to get Port. Weight value', function() {
      ChartingUtilities.hoverOnPixel('Series 1', 1);
      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        PortWeight2 = text.substring(text.indexOf('Port. Weight:') + 14, text.lastIndexOf('Date'));
      });
    });

    it('Verifying if "Port.Weight" values of the "Blue" bars are different', function() {
      if (PortWeight1 === PortWeight2) {
        expect(false).customError('"Port. Weight" values of the "Blue" bars are same.');
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should hover over the first green bar to get "Bench. Weight" value', function() {
      ChartingUtilities.hoverOnPixel('Series 2', 0);
      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        BenchWeigh1 = text.substring(text.indexOf('Bench. Weight:') + 15, text.lastIndexOf('Date'));
      });
    });

    it('Should hover over the second green bar to get "Bench. Weight" value', function() {
      ChartingUtilities.hoverOnPixel('Series 2', 1);
      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        BenchWeigh2 = text.substring(text.indexOf('Bench. Weight:') + 15, text.lastIndexOf('Date'));
      });
    });

    it('Verifying if "Bench. Weight" values of the "Green" bars are different', function() {
      if (BenchWeigh1 === BenchWeigh2) {
        expect(false).customError('"Bench. Weight" values of the "Green" bars are same.');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  describe('Test Step ID: 738814', function() {

    it('Should click on the "Grid" icon in "Port. Weight" chart', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Port. Weight').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Chart has changed" dialog box appears', function() {
      ThiefHelpers.isDialogOpen('Chart has changed');
    });

    it('Should click on "Discard Changes" button of "Chart has changed" dialog', function() {
      ThiefHelpers.getDialogButton('Chart has changed', 'Discard Changes').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should Click on Dates Hyperlink in the Weights report', function() {
      PA3MainPage.getDateHyperLink('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Multi-Horizon" from "Report Frequency:" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Multi-Horizon', 'Report Frequency:');
    });

    it('Verifying if  "Report Frequency:" drop down is set to "Multi-Horizon"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Report Frequency:').getSelectedText().then(function(text) {
        if (text !== 'Multi-Horizon') {
          expect(false).customError('"Report Frequency:" drop down did not set to "Multi-Horizon"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var arrMultiHeaders = ['1 Q Ago', 'One Week Ago', '1 Day Ago Test'];
    var screenshot = 0;
    var multiHeaders = [];

    it('verifying if "' + arrMultiHeaders + '" are present as multi headers in weights report', function() {
      browser.call(function() {
        PA3MainPage.getAllMultiHeaderColumns('Weights').each(function(element, index) {
          Utilities.scrollElementToVisibility(element);
          element.getText().then(function(text) {
            multiHeaders.push(text);
          });
        });
      }).then(function() {
        arrMultiHeaders.forEach(function(multiHeaderName) {
          if (multiHeaders.indexOf(multiHeaderName) < 0) {
            expect(false).customError(multiHeaderName + ' is not present in the report');
            screenshot++;
            if (screenshot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });

        if (multiHeaders.indexOf(highlightedDate) < 0) {
          expect(false).customError('Previously collected date was not seen as multi header in the calculated report. ' +
            'Expected date is ' + highlightedDate);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if previously collected date is present as multi header and count of multi headers is 4', function() {
      PA3MainPage.getAllMultiHeaderColumns('Weights').count().then(function(count) {
        if (count !== 4) {
          expect(false).customError('There are more than four multi headers present in the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 763181', function() {

    it('Should open PA3 Application with "Client:;pa3;accounts;FI_Acct_settings"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('multi-horizon-dates_rpt_freq');
    });

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Risk', 'Risk Summary', undefined, 'isSelected');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Risk Exposures - Multi Horizon');

  });

  describe('Test Step ID: 763182', function() {

    // Click on report wrench icon and select "Options" from the menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Risk Exposures - Multi Horizon', 'Options');

    it('Verifying if "Dates" is selected in the LHP', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Dates').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Dates" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrDropdown = [{name: 'Report Frequency:', value: 'Multi-Horizon'}, {name: 'Date Order:', value: 'Earliest to Latest'}];

    arrDropdown.forEach(function(dropDown) {
      it('Verifying if the "' + dropDown.name + '" is set to "' + dropDown.value + '"', function() {
        ThiefHelpers.getDropDownSelectClassReference(dropDown.name).getSelectedText().then(function(text) {
          if (text !== dropDown.value) {
            expect(false).customError('"' + dropDown.name + '" is not set to "' + dropDown.value + '"; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if the "End Date" drop down is set to "One Day Ago"', function() {
      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(text) {
        if (text !== 'One Day Ago') {
          expect(false).customError('"One Day Ago" did not present in the "End Date" field; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var dateRanges = ['30-Dec-2016', '31-May-2017'];
    dateRanges.forEach(function(itemName) {
      it('Verifying if "' + itemName + '" is present in the "Horizon" section', function() {
        ThiefHelpers.getListBoxItem(TileOptionsDates.xpathMultiHorizonListbox, itemName).getText().then(function(text) {
          if (text !== itemName) {
            expect(false).customError('"' + itemName + '" is not shown in the dropdown list; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        }, function(err) {

          if (err.toString().indexOf('No direct child') > 0) {
            expect(false).customError('"' + itemName + '" is not found in thethe dropdown list');
            CommonFunctions.takeScreenShot();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "Start Date Relative To End Date" checkbox is checked', function() {
      ThiefHelpers.getCheckBoxClassReference('Start Date Relative To End Date').isChecked().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Start Date Relative To End Date" checkbox did not check off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Date Order" drop down is set to "Earliest to Latest"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Date Order:').getSelectedText().then(function(text) {
        if (text !== 'Earliest to Latest') {
          expect(false).customError('"Date Order" drop down did not set to "Earliest to Latest"; Found:' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 550522', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Risk Exposures - Multi Horizon');

    it('Should click on "Refresh" icon in app toolbar', function() {
      ThiefHelpers.getButtonClassReference('refresh').press();
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Risk Exposures - Multi Horizon');

    var multiHears = ['30-DEC-2016', '31-MAY-2017'];
    multiHears.forEach(function(date, index) {
      it('Verifying if "Risk Exposures - Multi Horizon" report is calculated with date range "' + date + '"', function() {
        SlickGridFunctions.getMultiHeaderNames('Risk Exposures - Multi Horizon').then(function(multiheaderNames) {
          if (multiheaderNames[index] !== date) {
            expect(false).customError('"Risk Exposures - Multi Horizon" report did not calculate with date ' + 'range "' + date + '"; Found: ' + multiheaderNames[index]);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var takeScreenShot = 0;
    var arrColumnNames = ['Ending Portfolio Exposure', 'Ending Benchmark Exposure'];
    multiHears.forEach(function(multiHeaderName) {
      arrColumnNames.forEach(function(columnName) {
        it('Verifying if data is seen for "' + columnName + '" column of "' + multiHeaderName + '" multiheader', function() {
          SlickGridFunctions.getAllCellValuesFromSingleColumn('Risk Exposures - Multi Horizon', columnName, multiHeaderName).then(function(arrValues) {
            arrValues.forEach(function(value, index) {
              if (value === '') {
                expect(false).customError('Data is not present in "' + columnName + '" column of "' + multiHeaderName + '" ' +
                  'multiheader at row index ' + index);
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
