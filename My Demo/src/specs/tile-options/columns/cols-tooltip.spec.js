'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: cols-tooltip', function() {

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  describe('Test Step ID: 544471', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:default_doc_OLD"', function() {
      PA3MainPage.switchToDocument('default-doc-old');
    });

    it('Type "Client:/Pa3/test" into the "Portfolio" widget box and select "Client:/pa3/TEST.ACCT" from type ahead', function() {
      PA3MainPage.setPortfolio('Client:/Pa3/test', 'Client:/pa3/TEST.ACCT', 'Client:/pa3/TEST.ACCT').then(function(option) {
        if (!option) {
          expect(false).customError('Client:/pa3/TEST.ACCT" was not selected from type ahead');
          CommonFunctions.takeScreenShot();
        }
      });

      // Checking for 'Error Setting portfolio' dialog box (if appear)
      PA3MainPage.getDialog('Error Setting portfolio').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Error Setting portfolio" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();

      browser.sleep(4000);  // Waiting for calculated report to appear
    });

    it('Verifying if calculated data for "Weights" report appeared', function() {
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

  });

  describe('Test Step ID: 544472', function() {

    it('Should click on the "Wrench" icon in the "Weights"\' report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Wrench menu list appeared
      expect(PA3MainPage.getWrenchIconFromReportWorkspace('Weights', true).isPresent()).toBeTruthy();
    });

    it('Select "Options" from the menu list', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Weights') {
          expect(false).customError('View does not changed to "Tile Options - Weights" mode');
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
          expect(false).customError('View does not changed to "Columns" mode');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Should hover over "Bench. Ending Weight" column from "Selected" container ' +
      'and tooltip should be displayed saying "FactSet/Benchmark/Position Data"', function() {
      var action = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Bench. Ending Weight');

      action.getTooltipText().then(function(tooltipText) {
        if (tooltipText !== 'FactSet/Benchmark/Position Data') {
          expect(false).customError('Tooltip "FactSet/Benchmark/Position Data" has not apeared when hovered on "Bench. Ending Weight". Found: "' + tooltipText + '"');
          CommonFunctions.takeScreenShot();
        }
      });

    });

  });

  describe('Test Step ID: 544474', function() {

    it('Should type "Price" in the "Available" search field', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('Price');

      // Verifying that "Price" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(text) {
        if (text !== 'Price') {
          expect(false).customError('"Price" is not typed into the search field.');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for search action to execute
      browser.sleep(3000);
    });

    it('Should hover over "Port. Ending Price" from "Available" container. It should show tool tip saying "FactSet/Prices/Portfolio".',
      function() {
        var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');
        group.isExpanded().then(function(expanded) {
          if (expanded) {
            var action = group.getItemByText('Port. Ending Price');

            action.then(function(tooltip) {
              tooltip.getTooltipText().then(function(tooltipText) {
                if (tooltipText !== 'FactSet/Prices/Portfolio') {
                  expect(false).customError('Tooltip "FactSet/Prices/Portfolio" has not apeared when hovered on "Port. Ending Price". Found: "' + tooltipText + '"');
                  CommonFunctions.takeScreenShot();
                }
              });
            });
          } else {
            expect(false).customError('"Factset" is not expanded.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
  });

  describe('Test Step ID: 544476', function() {

    it('Click on "X" button in "Available" search field to clear the search', function() {
      TileOptionsColumns.getSearchClearButton().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if search field is cleared
      expect(element(by.xpath(TileOptionsColumns.xpathSearchField)).getAttribute('value')).toEqual('');

      // Wait for search field to clear
      browser.sleep(3000);
    });

    it('Expand "Client > Test Column Category" from "Available" container and double click on "Ending Quarter" to add it to "Selected" container', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Client');
      group.expand();
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Test Column Category').then(function(secondGroup) {
            secondGroup.expand();
            secondGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                secondGroup.getItemByText('Ending Quarter').then(function(element) {

                  // Selecting the element before performing double click as double click function does not work by itself
                  element.select();
                  element.doubleClick();
                });
              } else {
                expect(false).customError('"Test Column Category" group was not expanded.');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Client" was not expanded from "Available" container');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Ending Quarter" is added to the "Selected" container', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Ending Quarter') === -1) {
          expect(false).customError('"Ending Quarter" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand "Super_Client" from "Available" container select "SC Text" and double click on it', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Super_Client');

      // Expanding "Super_client"
      group.expand();

      // Verifying that "Super_Client" tree is expanded
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getItemByText('SC Text').then(function(element) {

            // Select "SC Text" from "Super_Client"
            element.select();

            // Verifying if "SC Text" is selected
            element.isSelected().then(function(selected) {
              if (!selected) {
                expect(false).customError('"SC Text" is not selected');
                CommonFunctions.takeScreenShot();
              }
            });

            // Double click on "SC Text"
            element.doubleClick();
          });
        } else {
          expect(false).customError('"Super_Client" tree is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "SC Text" is added to the "Selected" container', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('SC Text') === -1) {
          expect(false).customError('"SC Text" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Expand "FactSet > High Low" from "Available" container select "Avg Vol" and double click on it', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');

      group.getGroupByText('High Low').then(function(secondGroup) {
        secondGroup.expand();

        // Verifying that "High Low" tree is expanded
        secondGroup.isExpanded().then(function(expanded) {
          if (expanded) {
            secondGroup.getItemByText('Avg Vol').then(function(element) {

              // Select "Avg Vol" from "High Low"
              element.select();

              // Verifying if "Avg Vol" is selected
              element.isSelected().then(function(selected) {
                if (!selected) {
                  expect(false).customError('"Avg Vol" is not selected');
                  CommonFunctions.takeScreenShot();
                }
              });

              // Double click on "Avg Vol"
              element.doubleClick();
            });
          } else {
            expect(false).customError('"High Low" group was not expanded.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "Avg Vol" is added to the "Selected" container', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Avg Vol') === -1) {
          expect(false).customError('"Avg Vol" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Hover over "Ending Quarter". It should show tooltip saying "Client/Test Column Category"', function() {
      var action = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Ending Quarter');

      action.getTooltipText().then(function(tooltipText) {
        if (tooltipText !== 'Client/Test Column Category') {
          expect(false).customError('Tooltip "Client/Test Column Category" has not apeared when hovered on "Ending Quarter". Found: "' + tooltipText + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Hover over "SC Text". It should show tooltip saying "Super_Client"', function() {
      var action = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('SC Text');

      action.getTooltipText().then(function(tooltipText) {
        if (tooltipText !== 'Super_Client') {
          expect(false).customError('Tooltip "Super_Client" has not apeared when hovered on "SC Text". Found: "' + tooltipText + '"');
          CommonFunctions.takeScreenShot();
        }
      });

      //expect(TileOptionsColumns.verifyToolTip('Selected', 'SC Text', 'Super_Client')).toBeTruthy();
    });

    it('Hover over "Avg Vol". It should show tooltip saying "FactSet/High Low"', function() {
      var action = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Avg Vol');

      action.getTooltipText().then(function(tooltipText) {
        if (tooltipText !== 'FactSet/High Low') {
          expect(false).customError('Tooltip "FactSet/High Low" has not apeared when hovered on "Avg Vol". Found: "' + tooltipText + '"');
          CommonFunctions.takeScreenShot();
        }
      });

      //expect(TileOptionsColumns.verifyToolTip('Selected', 'Avg Vol', 'FactSet/High Low')).toBeTruthy();
    });

  });

  describe('Test Step ID: 558455', function() {

    it('Hover over "Variation in Ending Weight". It should show tooltip saying "FactSet/Variation/Variation in Weights"', function() {
      //expect(TileOptionsColumns.verifyToolTip('Selected', 'Variation in Ending Weight', 'FactSet/Variation/Variation in Weights'))
      //  .toBeTruthy();
      var action = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Variation in Ending Weight');

      action.getTooltipText().then(function(tooltipText) {
        if (tooltipText !== 'FactSet/Variation/Variation in Weights') {
          expect(false).customError('Tooltip "FactSet/Variation/Variation in Weights" has not appeared when hovered on "Variation in Ending Weight". Found: "' + tooltipText + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Hover over "Ending Quarter". It should show tooltip saying "Client/Test Column Category"', function() {
      //expect(TileOptionsColumns.verifyToolTip('Selected', 'Ending Quarter', 'Client/Test Column Category')).toBeTruthy();
      var action = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Ending Quarter');

      action.getTooltipText().then(function(tooltipText) {
        if (tooltipText !== 'Client/Test Column Category') {
          expect(false).customError('Tooltip "Client/Test Column Category" has not appeared when hovered on "Ending Quarter". Found: "' + tooltipText + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Hover over "SC Text". It should show tooltip saying "Super_Client"', function() {
      //expect(TileOptionsColumns.verifyToolTip('Selected', 'SC Text', 'Super_Client')).toBeTruthy();
      var action = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('SC Text');

      action.getTooltipText().then(function(tooltipText) {
        if (tooltipText !== 'Super_Client') {
          expect(false).customError('Tooltip "Super_Client" has not appeared when hovered on "SC Text". Found: "' + tooltipText + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Hover over "Avg Vol". It should show tooltip saying "FactSet/High Low"', function() {
      //expect(TileOptionsColumns.verifyToolTip('Selected', 'Avg Vol', 'FactSet/High Low')).toBeTruthy();
      var action = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Avg Vol');

      action.getTooltipText().then(function(tooltipText) {
        if (tooltipText !== 'FactSet/High Low') {
          expect(false).customError('Tooltip "FactSet/High Low" has not appeared when hovered on "Avg Vol". Found: "' + tooltipText + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 544477', function() {

    it('Should click on "OK" button from "Tile Options - Weights" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - Weights" view should be closed after clicking on OK button', function() {
      expect(TileOptions.isTileOptionsMode()).toBeFalsy();
    });

    it('Waiting for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared', function() {
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

  });

  describe('Test Step ID: 760788', function() {

    it('Should check "Automatic Calculation" option', function() {
      // Un-check "Automatic Calculation" to force re-check it
      PA3MainPage.getWrenchIcon().click();
      PA3MainPage.setAutomaticCalculation(false);

      // Click on Wrench button to select "Automatic Calculation"
      PA3MainPage.getWrenchIcon().click();
      expect(PA3MainPage.setAutomaticCalculation(true)).toBeTruthy();
    });

    it('Should open PA3 Application with "Client:/Pa3/Columns/sort_col_doc"', function() {
      PA3MainPage.switchToDocument('sort-col-doc');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if Portfolio widget is populated with "LFI:LHMN0001"', function() {
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathPortfolioWidget).getText().then(function(val) {
        if (val !== 'LFI:LHMN0001') {
          expect(false).customError('Portfolio widget is not populated with "LFI:LHMN0001"; Found: ' + val);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Benchmark widget is populated with "LFI:LHMN0011"', function() {
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathBenchmarkWidget).getText().then(function(val) {
        if (val !== 'LFI:LHMN0011') {
          expect(false).customError('Benchmark widget is not populated with "LFI:LHMN0011"; Found: ' + val);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

  });

  describe('Test Step ID: 760801', function() {

    it('Should click on "Security Name" hyperlink', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Weights').then(function(found) {
        if (!found) {
          expect(false).customError('View is not changed to "Tile Options - Weights" mode.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

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

    it('Should enter "DTS" into the search field of "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference('Available', '//*[@data-qa-id="column-avail-tree-search"]').setText('DTS');

      // Verifying that "DTS" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Available', '//*[@data-qa-id="column-avail-tree-search"]').getText().then(function(text) {
        if (text !== 'DTS') {
          expect(false).customError('"DTS" is not present in search field of "Available" section');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the Search Result to appear
      browser.sleep(4000);
    });

    var screenShot = 0;
    var arrListItems = ['Port. Ending Duration Times Spread', 'Bench. Ending Duration Times Spread', 'Port. Contribution to Ending DTS', 'Bench. Contribution to Ending DTS'];
    it('Verify if "' + arrListItems + '" are displayed under "FactSet" in Available section', function() {
      // Getting the xpath of the Available section
      var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');

      group.getChildrenText().then(function(children) {
        children.forEach(function(childObj, index) {
          if (childObj.text !== arrListItems[index]) {
            expect(false).customError('"' + arrListItems[index] + '" is not found under FactSet. Found ' + childObj.text);
            screenShot++;
            if (screenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }

          console.log(childObj);
        });
      });
    });

  });

  describe('Test Step ID: 760802', function() {

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options - Weights');

  });

});
