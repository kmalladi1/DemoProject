'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: chart-custom-report-toggle', function() {
  //Variables
  var arrElements = [{
    name: 'Portfolio',
    xpath: PA3MainPage.xpathPortfolioWidget,
    value: 'CLIENT:/NEW_PA_TEST_SUITE/PRICING/SPN_SP50_ACCT.ACCT',
  },
    {name: 'Benchmark', xpath: PA3MainPage.xpathBenchmarkWidget, value: 'RUSSELL:1000'},];

  var arrOfMonthInFullName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December',];

  var xpathDeletedialog = '//tf-dialog[contains(@open,"deleteChart")]//tf-dialog-overlay';

  var arrDate = [];
  var arrDateRef = [];

  describe('Test Step ID: 488859', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/default_doc_OLD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

  });

  describe('Test Step ID: 488852', function() {

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
            expect(false).customError('"' + element.name + '" widget did not has "' + element.value + '" in it.' +
              ' Found: "' + val + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should wait for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 180000)).toBeTruthy();
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

      // Verifying if "Calculation Error" dialog appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Contribution" report from LHP', function() {
      PA3MainPage.getReports('Contribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Contribution" Report is selected.
      PA3MainPage.getReports('Contribution').getAttribute('class').then(function(val) {
        if (val.indexOf('selected') < -1) {
          expect(false).customError('"Contribution" report is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Contribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Contribution'), 180000)).toBeTruthy();
    });

    it('Verifying if "Contribution" report is calculated', function() {
      PA3MainPage.isReportCalculated('Contribution').then(function(displayed) {
        expect(displayed).customError('"Contribution" report is not displayed on the web page.');
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

      // Verifying if "Calculation Error" dialog appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 488853', function() {

    it('Should right click on "Contribution To Return" column and select "Custom Charts|Column"', function() {

      var eleRefs = PA3MainPage.getAllColumnOfCalculatedReport('Contribution');
      eleRefs.each(function(element) {
        element.getText().then(function(text) {
          var name = text.replace(/\n/g, ' ');
          if (name === 'Contribution To Return') {
            PA3MainPage.rightClickAndSelectOption(element, 'Custom Charts|Column');
          }
        }, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            eleRefs = PA3MainPage.getAllColumnOfCalculatedReport('Contribution');
            eleRefs.then(function(references) {
              references.forEach(function(eleRef) {
                eleRef.getText().then(function(text) {
                  var name = text.replace(/\n/g, ' ');
                  if (name === 'Contribution To Return') {
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
      PA3MainPage.isInChartFormat('Contribution To Return').then(function(flag) {
        if (!flag) {
          expect(false).customError('Report did not changed to "Chart" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Right click on "Finance" bar', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');
    });

    it('Should click on "Change Series" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Change Series').click().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError(err);
      });

      //Verifying if "Change Series" transfer box appeared
      ChangeSeries.isChangeSeries().then(function(found) {
        if (!found) {
          expect(false).customError('"Change Series" transfer box is not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should hover over "Contribution To Return" in the "Selected" section and click on "X" next to it', function() {
      var type = 'Contribution To Return';
      browser.driver.executeScript('$("tf-transferbox-target [ng-repeat]:contains(' + type + ')" ).mouseover();', type);

      browser.sleep(5000);

      ChangeSeries.getElementRemoveButton('Contribution To Return').click().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError(err);
      });
    });

    it('Verifying if "Contribution To Return" is removed from "Selected" section', function() {
      //Verifying if "Contribution To Return" is removed or not
      ChangeSeries.getElementsFromSelectedSection('Contribution To Return').isPresent().then(function(bol) {
        if (bol) {
          expect(false).customError('"Contribution To Return" is still present in "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that chart is blank', function() {
      //Verifying number of series to know that chart is blank or not. If series = 0, then chart is blank.
      ChartHelpers.getNumberOfSeriesInChart('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart')
        .then(function(count) {
          if (count !== 0) {
            expect(false).customError('Chart is not blank');
            CommonFunctions.takeScreenShot();
          }
        });
    });

  });

  describe('Test Step ID: 503712', function() {

    it('Should double click on "Contribution To Return" in "Available" section', function() {
      browser.actions().doubleClick(ChangeSeries.getElementFromAvailableSection('Contribution To Return')).perform();

      //Verify if "ContributionToReturn" is added to the selected container
      ChangeSeries.getElementsFromSelectedSection('Contribution To Return').isPresent().then(function(bol) {
        if (!bol) {
          expect(false).customError('"Contribution To Return "is not present in the "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on wrench Icon from "Contribution To Return" workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Contribution To Return').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //Verifying if drop down is open or not
      PA3MainPage.getWrenchIconFromReportWorkspace('Contribution To Return', true);
    });

    it('Should select "Options" from the drop down', function() {
      var eleRef = PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options');

      //Wait 3 seconds until "Options" option appears from the drop down
      CommonFunctions.waitUntilElementAppears(eleRef, 3000);

      eleRef.isDisplayed().then(function(displayed) {
        if (displayed) {
          eleRef.click().then(function() {
          }, function(err) {

            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Columns" from LHP', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //Verifying that view changed to "Tile Options-Contribution To Return"
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Contribution To Return') {
          expect(false).customError('View hasn\'t changed to "Tile Options - Contribution To Return" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "variation" into the search field of "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('variation');

      //Verifying that "Average" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(text) {
        if (text !== 'variation') {
          expect(false).customError('"variation"is not typed into the search field. Found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });

      //Wait for the Search Result to appear
      browser.sleep(4000);
    });

    it('Double click on "Variation in Total Return" to add it to "Selected" container', function() {
      // Getting the xpath of the Available section
      var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');

      group.getItemByText('Variation in Total Return').then(function(item) {
        item.select();
        item.doubleClick();
      });
    });

    //Clicking on the OK button to close Tile Options Mode
    it('Click on the "OK" button', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //Verifying if mode is closed.
      TileOptions.isTileOptionsMode().then(function(bol) {
        if (bol) {
          expect(false).customError('Tile Options mode is not closed even after clicking on "OK" button');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if only 2 legends displayed in chart report', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(elements) {
        //Verify if 2 legends are present in chart report
        if (elements.length !== 2) {
          expect(false).customError('Number of legends which are displayed in chart report are not equal to 2. ' +
            'Found: "' + elements.length + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrElements = ['Contribution To Return', 'Variation in Total Return'];
    arrElements.forEach(function(ele, index) {
      it('Verifying if "' + ele + '" is displayed as chart legend', function() {
        ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(elements) {
          if (elements.indexOf(ele) < 0) {
            expect(false).customError('"' + ele + '" is not displayed as chart legend. Found: "' + elements[index] + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if title of the chart is "Contribution To Return"', function() {
      PA3MainPage.isInChartFormat('Contribution To Return').then(function(bol) {
        if (!bol) {
          expect(false).customError('Title of the chart is not found as "Contribution To Return".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 503716', function() {

    it('Should click on "Grid" icon in the report', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Contribution To Return').click().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError(err);
      });
    });

    it('Verify if background is grayed out', function() {
      Utilities.getBgColorofDialog('Chart has changed').then(function(val) {
        if (val !== 'rgba(200, 200, 200, 1)') {
          expect(false).customError('Background of "Chart has changed" dialog is not greyed out.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Chart has changed" dialog is opened', function() {
      ThiefHelpers.isDialogOpen('Chart has changed').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Chart has changed" dialog box did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify if text saying "Do you want to save your changes as a custom chart?" is present in the dialog box', function() {
      ThiefHelpers.getDialogClassReference('Chart has changed').getContent().getText().then(function(text) {
        if (text.indexOf('Do you want to save your changes as a custom chart?') < 0) {
          expect(false).customError('The text saying "Do you want to save your changes as a custom chart?" is not ' +
            'present in the dialog box. Found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 503717', function() {

    it('Set "Chart Name" text box to "Bar Contribution"', function() {
      ThiefHelpers.getTextBoxClassReference('Chart Name').setText('Bar Contribution');

      //Verifying if "Chart Name" text is set to "Bar Contribution"
      ThiefHelpers.getTextBoxClassReference('Chart Name').getText().then(function(text) {
        if (text !== 'Bar Contribution') {
          expect(false).customError('"Chart Name" text box is not set to "Bar Contribution".' +
            'Found:"' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save Changes" button', function() {
      ThiefHelpers.getDialogButton('Chart has changed', 'Save Changes').click().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError(err);
      });

    });

    it('Verifying if "Chart has changed" dialog box is closed', function() {
      ThiefHelpers.getDialogClassReference('Chart has changed').isOpen().then(function(open) {
        if (open) {
          expect(false).customError('"Chart has changed" dialog box is not closed even after clicking ' +
            'on "Save Changes" button.');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Verify if "Variation in Total Return" column is added to the report ', function() {
      SlickGridFunctions.getColumnNames('Contribution').then(function(allColumnName) {
        if (allColumnName.indexOf('Variation in Total Return') < 0) {
          expect(false).customError('"Variation in Total Return" column is not added to the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 503724', function() {

    ChartingUtilities.selectChartFromReport('Contribution', 'Bar Contribution|Select…');

    it('Should click on "wrench" icon in the report', function() {
      PA3MainPage.selectWrenchIcon('Bar Contribution');
    });

    it('Verifying if the "wrench" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen(undefined, true).then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Wrench" drop down did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from the drop down', function() {
      ThiefHelpers.getMenuClassReference(undefined, true).selectItemByText('Options').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Bar Contribution" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Bar Contribution') {
          expect(false).customError('View hasn\'t changed to "Tile Options - Bar Contribution" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Start Date" dropdown', function() {
      TileOptionsDates.getDateDropDown('Start Date').click().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError(err);
      });
    });

    it('Should select "One Month Ago" from options', function() {
      TileOptionsDates.getOptionFromDateDropDown('One Month Ago').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //Verify if "One Month Ago" is selected in Start Date Field
      ThiefHelpers.getTextBoxClassReference('Start Date:').getText().then(function(text) {
        if (text !== 'One Month Ago') {
          expect(false).customError('"Start Date" drop down is not set to "One Month Ago". Found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var dateRef;
    var optionDate = ['Start Date', 'End Date'];
    optionDate.forEach(function(date, index) {
      it('Should store "' + date + '" date for future', function() {
        //Get Month
        TileOptionsDates.getMonthOrYearDropDown(date, 'Month').getText().then(function(month) {
          var monthNum = arrOfMonthInFullName.indexOf(month);
          dateRef = (monthNum + 1) + '/';
        });

        //Get Date
        TileOptionsDates.getSelectedDay(date).then(function(day) {
          if (day > 9) {
            dateRef = dateRef + day + '/';
          } else {
            dateRef = dateRef + ('0').concat(day) + '/';
          }
        });

        //Get Year
        TileOptionsDates.getMonthOrYearDropDown(date, 'Year').getText().then(function(year) {
          dateRef = dateRef + year;

          //Store date in arrDate array
          arrDate[index] = dateRef;
        });
      });
    });

    it('Should click on "OK" button from "Tile Options - Bar Contribution" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - Bar Contribution" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options - Bar Contribution" mode is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if view changed to chart mode', function() {
      //Verify if view is changed to chart mode
      PA3MainPage.isInChartFormat('Bar Contribution').then(function(bol) {
        if (!bol) {
          expect(false).customError('Title of the chart is not found as "Bar Contribution".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    //Verifying if previously stored Start Date is displayed in first position of hyperlink
    it('Verifying that "One Month Ago date" is displayed at first position in hyperlink', function() {
      PA3MainPage.getDateHyperLink().getText().then(function(date) {
        if ((date.split('-')[0].trim()) !== arrDate[0]) {
          expect(false).customError('"One Month Ago (' + arrDate[0] + ') date" is not displayed at first position in ' +
            'hyperlink. Found: "' + date.split('-')[0].trim() + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    //Verifying if previously stored Last Date is displayed in second position of hyperlink
    it('Verifying that "Latest date" is displayed at second position in hyperlink', function() {
      PA3MainPage.getDateHyperLink().getText().then(function(date) {
        if ((date.split('-')[1].trim()) !== arrDate[1]) {
          expect(false).customError('"Latest (' + arrDate[1] + ') date" is not displayed at second position in ' +
            'hyperlink. Found: "' + date.split('-')[1].trim() + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 505555', function() {

    it('Click on "Grid" icon in chart view', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Bar Contribution').click();
    });

    it('Should wait for "Contribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Contribution'), 180000)).toBeTruthy();
    });

    it('Verifying if "Contribution" report is calculated', function() {
      PA3MainPage.isReportCalculated('Contribution').then(function(displayed) {
        expect(displayed).customError('"Contribution" report is not displayed on the web page.');
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

      // Verifying if "Calculation Error" dialog appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify if "save popup" dialog box is not appeared', function() {
      ThiefHelpers.isDialogOpen('save popup').then(function(option) {
        if (option) {
          expect(false).customError('"save popup" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 505556', function() {

    ChartingUtilities.selectChartFromReport('Contribution', 'Bar Contribution|Select…');

    it('Should click on "wrench" icon in the report', function() {
      PA3MainPage.selectWrenchIcon('Bar Contribution');
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

    it('Verifying if Tile Options View mode is appeared', function() {
      TileOptions.isTileOptionsMode().then(function(found) {
        if (!found) {
          expect(false).customError('Error: "Tile Options" view mode is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if view changed to "Tile Options - Bar Contribution" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Bar Contribution') {
          expect(false).customError('View hasn\'t changed to "Tile Options - Bar Contribution" mode. ' +
            'Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Report Frequency" drop down ', function() {
      TileOptionsDates.getReportFrequencyBtn().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Weekly" from "Report Frequency" dropdown', function() {
      TileOptionsDates.getOption('Weekly').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verify that "Multi-Horizon" is selected
      TileOptionsDates.getReportFrequencyBtn().getText().then(function(value) {
        if (value !== 'Weekly') {
          expect(false).customError('"Report Frequency" dropdown is not set to "Weekly". Found: "' + value + '"');
        }
      });
    });

    var dateRef;
    var optionDate = ['Start Date', 'End Date'];
    optionDate.forEach(function(date) {
      it('Should store "' + date + '" date for future', function() {
        //Get Month
        TileOptionsDates.getMonthOrYearDropDown(date, 'Month').getText().then(function(month) {
          var monthNum = arrOfMonthInFullName.indexOf(month);
          dateRef = (monthNum + 1) + '/';
        });

        //Get Date
        TileOptionsDates.getSelectedDay(date).then(function(day) {
          if (day > 9) {
            dateRef = dateRef + day + '/';
          } else {
            dateRef = dateRef + ('0').concat(day) + '/';
          }
        });

        //Get Year
        TileOptionsDates.getMonthOrYearDropDown(date, 'Year').getText().then(function(year) {
          dateRef = dateRef + year;
          arrDateRef.push(dateRef);
        });
      });
    });

    it('Should Select GROUPINGS tab', function() {
      TileOptions.getLHPOption('Groupings').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Groupings"
      TileOptions.getOptionTitle().getText().then(function(title) {
        if (title !== 'Groupings') {
          expect(title === 'Groupings').customError('"Groupings" tab is not selected. Found: "' + title + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "industry" into the search field of "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('industry');

      // Verifying that "Average" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(text) {
        if (text !== 'industry') {
          expect(false).customError('"industry" is not typed into the search field. Found:"' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the Search Result to appear
      browser.sleep(3000);
    });

    it('Double click on "Industry" to add it to "Selected" container', function() {
      browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('FactSet|Sector & Industry|FactSet',
        'Industry')).perform();
    });

    it('Verifying if "Industry - FactSet" is added to the "Selected" container', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Industry - FactSet').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Industry" is not added to the "Selected" container');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "OK" Button', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError(err);
      });
    });

    it('Verify if view changed to chart mode', function() {
      //Verify if view is changed to chart mode
      PA3MainPage.isInChartFormat('Bar Contribution').then(function(bol) {
        if (!bol) {
          expect(false).customError('Title of the chart is not found as "Bar Contribution".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    //Verifying if previously stored Start Date is displayed in first position of hyperlink
    it('Verifying that "One Month Ago date" is displayed at first position in hyperlink', function() {
      PA3MainPage.getDateHyperLink().getText().then(function(date) {
        if ((date.split('-')[0].trim()) !== arrDateRef[0]) {
          expect(false).customError('"One Month Ago date(' + arrDateRef[0] + ')" is not displayed at first position in ' +
            'hyperlink. Found: "' + date.split('-')[0].trim() + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    //Verifying if previously stored Last Date is displayed in second position of hyperlink
    it('Verifying that "Latest date" is displayed at second position in hyperlink', function() {
      PA3MainPage.getDateHyperLink().getText().then(function(date) {
        if ((date.split('-')[1].trim()) !== arrDateRef[1]) {
          expect(false).customError('"Latest date(' + arrDateRef[1] + ')" is not displayed at second position in ' +
            'hyperlink. Found: "' + date.split('-')[1].trim() + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify if "Interactive Pane" is displayed and "Total" is highlighted', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference().getItemByText('Total');
      group.isSelected().then(function(bool) {
        if (bool !== true) {
          expect(false).customError('"Total" did not highlight in "Interactive pane"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 503727', function() {

    it('Should select "Retail Trade" and "Energy Minerals" by holding control key from interactove pane', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference();
      group.getGroupByText('Retail Trade').select();
      group.getGroupByText('Energy Minerals').select(true, false);
    });

    it('Should click on wrench Icon from "Bar Contribution" workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Bar Contribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Save Chart" from the drop down', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Save Chart').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if wrench menu closed out', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Bar Contribution').getAttribute('class').then(function(val) {
        if (val.indexOf('selected') > -1) {
          expect(false).customError('Wrench menu is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 503728', function() {

    it('Should click on "Grid" icon in the report', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Bar Contribution').click();
    });

    it('Should wait for "Bar Contribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Bar Contribution'), 180000)).toBeTruthy();
    });

    it('Verifying if "Contribution" report is calculated', function() {
      PA3MainPage.isReportCalculated('Contribution').then(function(displayed) {
        expect(displayed).customError('"Contribution" report is not displayed on the web page.');
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

      // Verifying if "Calculation Error" dialog appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    ChartingUtilities.selectChartFromReport('Contribution', 'Bar Contribution');

    it('Should click on wrench Icon from "Bar Contribution" workspace', function() {
      var dropdownRef = PA3MainPage.getWrenchIconFromReportWorkspace('Bar Contribution');
      dropdownRef.click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //Wait for drop down to appear
      CommonFunctions.waitUntilElementAppears(dropdownRef, 3000);
    });

    it('Should select "Line" from the "Chart Type" drop down', function() {
      PA3MainPage.getOptionFromWrenchMenu('Chart Type|Line').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Should click on "Grid" icon in the report', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Contribution To Return').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Chart has changed" dialog is opened', function() {
      ThiefHelpers.isDialogOpen('Chart has changed').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Chart has changed" dialog box did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify if text saying "Do you want to save changes to Contribution To Return?" is present in the dialog box', function() {
      ThiefHelpers.getDialogClassReference('Chart has changed').getContent().getText().then(function(text) {
        if (text.indexOf('Do you want to save changes to Contribution To Return?') < 0) {
          expect(false).customError('The text saying "Do you want to save changes to Contribution To Return?" ' +
            'is not present in the dialog box. Found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 505557', function() {

    it('Should click on "Save Changes" button', function() {
      ThiefHelpers.getDialogButton('Chart has changed', 'Save Changes').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //Verify if dialog box closed
      ThiefHelpers.isDialogOpen('Chart has changed').then(function(flag) {
        if (flag) {
          expect(false).customError('"Chart has changed" dialog box is not closed even after clicking ' +
            'on "Save Changes" button.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    ChartingUtilities.selectChartFromReport('Contribution', 'Contribution To Return|Select…');

    it('Verify if Line chart appears in workspace', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(chartName) {
        if (chartName !== 'Line') {
          expect(false).customError('Line chart is not appeared in work space. Found:"' + chartName + '" chart.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrOptions = ['Retail Trade', 'Energy Minerals'];
    arrOptions.forEach(function(value) {
      it(' Verify if "' + value + '" is highlighted in "Interactive Pane"', function() {
        //Verifying if value is selected
        var group = ThiefHelpers.getVirtualListboxClassReference();

        group.getGroupByText(value).isSelected().then(function(bool) {
          if (bool !== true) {
            expect(false).customError('"' + value + '" did not highlight in "Interactive pane"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verify if 4 legends are displayed in the chart report', function() {
      //Verify if 4 legends are present in chart report
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(elements) {
        if (elements.length !== 4) {
          expect(false).customError('There are more than 4 Legends present in the chart view. Found:"' + elements.length + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrLegends = ['Contribution To Return - Retail Trade', 'Contribution To Return - Energy Minerals',
      'Variation in Total Return - Retail Trade', 'Variation in Total Return - Energy Minerals',];
    arrLegends.forEach(function(element, index) {
      it('Verify if "' + element + '" is displayed as chart legend', function() {
        ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(elements) {
          if (elements.indexOf(element) < 0) {
            expect(false).customError('"' + element + '" is not displayed as chart legend. Found: "' + elements[index] + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 503729', function() {

    it('Should click on "Grid" icon in the report', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Contribution To Return').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Contribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Contribution'), 180000)).toBeTruthy();
    });

    it('Verifying if "Contribution" report is calculated', function() {
      PA3MainPage.isReportCalculated('Contribution').then(function(displayed) {
        expect(displayed).customError('"Contribution" report is not displayed on the web page.');
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

      // Verifying if "Calculation Error" dialog appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    ChartingUtilities.selectChartFromReport('Contribution', 'Contribution To Return|Remove');

    it('Verify if background is grayed out', function() {
      Utilities.getBgColor(element(by.xpath(xpathDeletedialog))).then(function(val) {
        if (val !== 'rgba(200, 200, 200, 1)') {
          expect(false).customError('Background of "Delete chart" dialog is not grayed out.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify a pop up appears stating "Are you sure you want to delete Contribution To Return?"', function() {
      //Verify if "Are you sure you want to delete Contribution To Return?" text is appeared in dialog box
      PA3MainPage.getDialogWithText('Are you sure you want to delete Contribution To Return?').isPresent().then(function(bol) {
        if (!bol) {
          expect(false).customError('The text saying "Are you sure you want to delete Contribution To ' +
            'Return?" is not present in the dialog box.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 503875', function() {

    it('Should click on "Cancel" button', function() {
      PA3MainPage.getButton('Cancel').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on wrench icon from "Contribution" workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Contribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Options" from the drop down', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should  select "Columns" from LHP', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //Verifying that view changed to "Tile Options-Contribution"
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Contribution') {
          expect(false).customError('View hasn\'t changed to "Tile Options - Contribution" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should perform mouse hover on "Variation in Total Return" from "Selected" section and Click "X" Icon', function() {
      // Getting the xpath of the Selected section
      var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');
      var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Variation in Total Return');

      item.getActions().then(function(actions) {
        actions.triggerAction('remove');
      });
    });

    //Clicking on the OK button to close Tile Options Mode
    it('Should click on the "OK" button', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //Verifying if mode is closed.
      TileOptions.isTileOptionsMode().then(function(bol) {
        if (bol) {
          expect(false).customError('Tile Options mode is not closed even after clicking on "OK" button');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on Chart icon available in Workspace', function() {
      PA3MainPage.getChartMenuButtonFromReportWorkspace('Contribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Contribution To Return" is not present in drop down', function() {
      PA3MainPage.getChartMenuOption('Contribution To Return').isPresent().then(function(bol) {
        if (bol) {
          expect(false).customError('"Contribution To Return" is present in drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

});
