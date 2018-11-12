'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: chart-scatter-format', function() {

  var xAxisTitleFormatOptions = [{attribute: 'TitleFontHeight', value: 18, format: 'Font Size'},
    {attribute: 'TitleFontFamily', value: 'Tahoma', format: 'Font Family'}, {
      attribute: 'TitleFontItalic',
      value: true,
      format: 'Italic',
    },
    {
      attribute: 'TitleFontColor',
      value: 16711935,
      format: 'Color',
    },];
  var yAxisTitleFormatOptions = [{attribute: 'TitleFontHeight', value: 16, format: 'Font Size'},
    {attribute: 'TitleFontFamily', value: 'Calibri', format: 'Font Family'}, {
      attribute: 'TitleFontWeight',
      value: 700,
      format: 'Bold',
    },
    {attribute: 'TitleFontColor', value: 11037743, format: 'Color'},];
  var arrOfMonthInFullName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December',];

  var getXpathAfterReplace = function(xpath, string) {
    return CommonFunctions.replaceStringInXpath(xpath, string);
  };

  describe('Test Step ID: 453913', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/default_doc_OLD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

    it('Verifying if "default_doc_OLD" document is opened without any issues', function() {
      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Calculation Error" popup was appeared');
        }
      });
    });
  });

  describe('Test Step ID: 453914', function() {

    it('Should type "Client:/pa3/TEST" into "Portfolio" widget and select ' +
      '"Client:/pa3/TEST.ACCT" from type ahead', function() {
      PA3MainPage.setPortfolio('Client:/pa3/TEST', 'TEST.ACCT | Client:/pa3/', 'Client:/pa3/TEST.ACCT')
        .then(function(option) {
            if (!option) {
              expect(false).customError('Not able to Type "test" into "Portfolio"' +
                ' widget and select "Test.ACCT | Client:/pa3" from type ahead');
              CommonFunctions.takeScreenShot();
            }
          },

          function(error) {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          });
    });

    it('Verifying if "Client:/pa3/TEST.ACCT" is set in to the Portfolio text box', function() {
      PA3MainPage.getWidgetBox('Portfolio').getAttribute('value').then(function(text) {
        if (text !== 'Client:/pa3/TEST.ACCT') {
          expect(false).customError('"Client:/pa3/TEST.ACCT" did not set to ' +
            '"Portfolio" text box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Attribution" from the LHP', function() {
      PA3MainPage.getReports('Attribution').click();
    });

    it('Should Wait for "Attribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 200000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Attribution', true).then(function(displayed) {
        expect(displayed).customError('"Attribution" report is not displayed on the web page.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });

    });

  });

  describe('Test Step ID: 453916', function() {

    it('Should click on the Wrench icon from the "Attribution" report', function() {
      PA3MainPage.selectWrenchIcon('Attribution');

      // Verifying wrench menu drop down is displayed
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Wrench menu drop down list is not displayed');
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

    it('Verifying if "Tile Options" page is opened', function() {
      //verifying tile options mode is opened
      TileOptions.isTileOptionsMode().then(function(value) {
        if (!value) {
          expect(false).customError('Tile Options mode is Closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "One Year Ago" from the Start Date drop down', function() {
      ThiefHelpers.getTextBoxClassReference('Start Date:').selectOptionByText('One Year Ago').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "One year Ago" is selected from the drop down', function() {
      // Verifying that "One Year Ago" is set in Start Date input box
      ThiefHelpers.getTextBoxClassReference('Start Date:').getText().then(function(text) {
        if (text !== 'One Year Ago') {
          expect(false).customError('"One Year Ago" is not set in "Start Date" input box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var dateRef;
    var arrDateRef = [];
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

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {

        expect(false).customError('Can not able to click on OK button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(value) {
        if (value) {
          expect(false).customError('"Tile Options" mode is not Closed');
          CommonFunctions.takeScreenShot();
        }
      }, function() {
      });
    });

    it('Should wait until loading icon disappears', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Attribution'),
        360000)).toBeTruthy();

      // wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if "Attribution" Report calculated', function() {
      PA3MainPage.isReportCalculated('Attribution', true).then(function(found) {
        if (!found) {
          expect(false).customError('"Attribution" Report not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if Calculation error displayed
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify if "Attribution" report is calculated with selected date range', function() {
      PA3MainPage.getDateHyperLink('Attribution').getText().then(function(value) {
        var temp = arrDateRef[0] + ' - ' + arrDateRef[1];
        if (value !== temp) {
          expect(false).customError('"Attribution" report is not calculated with "' + temp + '", Found:' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 453917', function() {

    it('Verifying that report is grouped by "Economic Sector" and should click on it', function() {
      PA3MainPage.getGroupingsHyperLink('Attribution').getText().then(function(name) {
        if (name !== 'Economic Sector') {
          expect(false).customError('The report is Expected to grouped by: "Economic Sector" but Found: "' + name + '"');
          CommonFunctions.takeScreenShot();
        } else {
          PA3MainPage.getGroupingsHyperLink('Attribution').click().then(function() {
          }, function(err) {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    it('Verifying that "Tile Options" mode appeared', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Tile Options" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clicking on Groupings LHP item to select.
    it('Should click on Groupings LHP item to select', function() {
      TileOptions.getLHPOption('Groupings').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Checking if 'Groupings' item is opened.
      TileOptions.getOptionTitle().getText().then(function(title) {
        expect(title === 'Groupings').customError('"Groupings" item did not select from LHP');
        if (title !== 'Groupings') {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "Industry" into the search field of "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('Industry');

      // Verifying that "Average" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(text) {
        if (text !== 'Industry') {
          expect(false).customError('"Industry" is not typed into the search field. Found:"' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Double click on "Industry" to add it to "Selected" container', function() {
      // Wait for filter elements to appear
      browser.sleep(2000);
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

    it('Should wait until loading icon disappears', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Attribution'),
        360000)).toBeTruthy();
    });

    it('Verifying if "Attribution" Report calculated', function() {
      PA3MainPage.isReportCalculated('Attribution', true).then(function(found) {
        if (!found) {
          expect(false).customError('"Attribution" Report not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if Calculation error displayed
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand the Commercial Services > Advertising/Marketing Services from Attribution reports', function() {
      PA3MainPage.expandTreeInCalculatedReport('Attribution', 'Commercial Services|Advertising/Marketing Services', undefined, undefined);
    });

    it('Verifying if Commercial Services > Advertising/Marketing Services group is expanded', function() {
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Attribution', 'Commercial Services|Advertising/Marketing Services');
    });

    it('Verifying if industries displayed under "Commercial Services|Advertising/Marketing Services"', function() {
      SlickGridFunctions.getElementsFromTree('Attribution', '', 'Commercial Services|Advertising/Marketing Services').then(function(reference) {
        if (reference.length < 1) {
          expect(false).customError('"Commercial Services|Advertising/Marketing Services" is not displayed with any industries under it');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Fetching and Verifying if "Nielsen Holdings Plc" is present under "Commercial Services|Advertising/Marketing Services" tree', function() {
      SlickGridFunctions.getElementsFromTree('Attribution', '', 'Commercial Services|Advertising/Marketing Services').then(function(reference) {
        if (reference.indexOf('Nielsen Holdings Plc') === -1) {
          expect(false).customError('"Nielsen Holdings Plc" is not present in under "Commercial Services|Advertising/Marketing Services"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 453915', function() {

    it('Should right click on "Attribution Analysis|Allocation Effect" in "Attribution" report and select "Custom Charts > Column" ', function() {
      SlickGridFunctions.getHeaderCellReference('Attribution', 'Allocation Effect').then(function(cellRef) {
        PA3MainPage.rightClickAndSelectOption(cellRef, 'Custom Charts|Column');
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Waiting for chart to load
      browser.sleep(3000);
    });

    it('Should click on the "Wrench" button from report', function() {
      PA3MainPage.selectWrenchIcon('Allocation Effect');

      //Verifying menu drop down is appeared'
      ThiefHelpers.isDropDownOpen(undefined, true).then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Menu drop down list did not display in "Allocation Effect vs Allocation Effect" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Chart Type" from the drop down', function() {
      ThiefHelpers.getMenuClassReference(undefined, true).selectItemByText('Chart Type').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Should select "Scatter" from the "Chart Type" drop down', function() {
      ThiefHelpers.getMenuClassReference(2, true).selectItemByText('Scatter').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
      browser.sleep(3000);
    });

    it('Verifying if "Chart" is "Scatter(Marker)" chart', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(style) {
        // Scatter chart is labeled as Marker chart in utility file.
        if (style !== 'Marker') {
          expect(false).customError('"Marker" chart is not displayed; Found :' + style);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that report header displays "Allocation Effect vs Allocation Effect"', function() {
      PA3EditMode.getTileHeader('Allocation Effect vs Allocation Effect').isDisplayed().then(function(isFound) {
        if (!isFound) {
          expect(false).customError('"Allocation Effect vs Allocation Effect" tile is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function() {
      });
    });
  });

  describe('Test Step ID: 453918', function() {

    it('Should click on the "Wrench" button from chart report', function() {
      PA3MainPage.selectWrenchIcon('Allocation Effect vs Allocation Effect');

      //Verifying menu drop down is appeared'
      ThiefHelpers.isDropDownOpen(undefined, true).then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Menu drop down list did not display in "Allocation Effect vs Allocation Effect" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Change Series" from the drop down', function() {
      ThiefHelpers.getMenuClassReference(undefined, true).selectItemByText('Change Series').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Verifying "Change series" dialog is appeared', function() {
      ChangeSeries.getDialog('Change Series', true).isDisplayed().then(function(flag) {
        if (!flag) {
          expect(false).customError('Change Series dialog did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Y Series:" drop down and select "Selection + Interaction"', function() {
      ThiefHelpers.selectOptionFromDropDown('Selection + Interaction', 'Y Series:', undefined);
    });

    it('Verifying if "Y Series:" drop down is set to "Selection + Interaction"', function() {
      ThiefHelpers.verifySelectedDropDownText('Selection + Interaction', 'Y Series:');
    });

    it('Verifying if "X" axis title text is "Allocation Effect"', function() {
      ChartHelpers.getXorYAxisPropertiesByAttribute('.pa-chart-non-formatting-mode', '$fdsChartController', 'X', 'TitleText')
        .then(function(text) {
          if (text !== 'Allocation Effect') {
            expect(false).customError('"X" axis title did not match with "Allocation Effect"; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Verifying if "Y" axis title text is "Selection + Interaction"', function() {
      ChartHelpers.getXorYAxisPropertiesByAttribute('.pa-chart-non-formatting-mode', '$fdsChartController', 'Y', 'TitleText')
        .then(function(text) {
          if (text !== 'Selection + Interaction') {
            expect(false).customError('"Y" axis title did not match with "Selection + Interaction"; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should click any where outside to dismiss the drop down menu', function() {
      // Click anywhere to close the drop down
      PA3MainPage.getReports('Attribution').click();
    });

    it('Verifying that report title displays "Allocation Effect vs Selection + Interaction"', function() {
      PA3EditMode.getTileHeader('Allocation Effect vs Selection + Interaction').isDisplayed().then(function(isFound) {
        if (!isFound) {
          expect(false).customError('"Allocation Effect vs Selection + Interaction" tile is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function() {
      });
    });
  });

  describe('Test Step ID: 453919', function() {

    it('Should right click on "X" axis title "Allocation Effect"', function() {
      ChartHelpers.rightClickOnXorYAxisTitle('.pa-chart-non-formatting-mode', '$fdsChartController', 'X');
    });

    it('Should select "Format..." from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Format...').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Chart: X Axis Title" drop down is opened', function() {
      ChangeSeries.getDialog('Chart: X Axis Title', true).isDisplayed().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Chart: X Axis Title" dialog did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var setFormatOptions = [{
      sectionName: 'Font',
      dropdownName: 'Font Style',
      valueToSet: 'Tahoma',
    }, {sectionName: 'Font', dropdownName: 'Font Size', valueToSet: '18'},];
    setFormatOptions.forEach(function(option) {
      it('Should click on "' + option.dropdownName + '" drop down', function() {

        ChartingUtilities.getElementsFromPanel(option.sectionName, option.dropdownName).click();

        // Verifying if drop down opened
        ThiefHelpers.isDropDownOpen(1).then(function(isOpen) {
          if (!isOpen) {
            expect(false).customError('"' + option.dropdownName + '" drop down is not opened');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Should select "' + option.valueToSet + '" from the "' + option.dropdownName + '" drop down', function() {
        ThiefHelpers.getDropDownSelectClassReference(undefined, getXpathAfterReplace(ChartingUtilities.xpathDropdown, option.dropdownName)).selectItemByText(option.valueToSet);
      });

      it('Verifying if "' + option.valueToSet + '" is selected in the "' + option.dropdownName + '" drop down', function() {
        ThiefHelpers.getDropDownSelectClassReference(undefined, getXpathAfterReplace(ChartingUtilities.xpathDropdown, option.dropdownName)).getSelectedText().then(function(text) {
          if (text !== option.valueToSet) {
            expect(false).customError('"' + option.valueToSet + '" is not selected in the "' + option.dropdownName + '" drop down; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should select "Color Picker" button from the drop down', function() {
      ChartingUtilities.getElementsFromPanel('Font', 'Color Picker').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if drop down opened
      ThiefHelpers.isDropDownOpen(1).then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('"Color Picker" drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Pink" from the color picker', function() {
      ChartingUtilities.selectColorFrmDD('rgb(255, 0, 255)');
    });

    it('Should click on "Italic" icon from the Y Axis drop drop down', function() {
      ChartingUtilities.getBoldItalicUnderlineButton('Italic').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Allocation Effect" is present in text box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, ChartingUtilities.axisTitleXpath).getText().then(function(text) {
        if (text !== 'Allocation Effect') {
          expect(false).customError('"Allocation Effect" did not type in Axix Title text box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should remove "Allocation Effect" and enter "Demo" in the Axis Title text box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, ChartingUtilities.axisTitleXpath).setText('Demo');

      // Verifying that "Demo" is typed into the search box
      ThiefHelpers.getTextBoxClassReference(undefined, ChartingUtilities.axisTitleXpath).getText().then(function(text) {
        if (text !== 'Demo') {
          expect(false).customError('"Demo" did not type in Axix Title text box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Close" button from X Axis drop down', function() {
      ThiefHelpers.getButtonClassReference('Close').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Close" button from X Axis drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "X" axis title is labeled as "Demo"', function() {
      ChartHelpers.getXorYAxisPropertiesByAttribute('.pa-chart-non-formatting-mode', '$fdsChartController', 'X', 'TitleText')
        .then(function(text) {
          if (text !== 'Demo') {
            expect(false).customError('"X" axis title did not match with "Demo"; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
    });

    xAxisTitleFormatOptions.forEach(function(ele) {
      it('Verifying if "Demo" is set with "' + ele.format + '" "' + ele.value + '"', function() {
        ChartHelpers.getXorYAxisPropertiesByAttribute('.pa-chart-non-formatting-mode', '$fdsChartController', 'X', ele.attribute)
          .then(function(text) {
            if (text !== ele.value) {
              expect(false).customError('"Demo"(X-axis title) is not formatted ' + ele.format + '" to "' + ele.value + '"; Found: ' + text);
              CommonFunctions.takeScreenShot();
            }
          });
      });
    });
  });

  describe('Test Step ID: 559978', function() {

    it('Should perform right click on "blue"(scatter plot) series in chart', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');
    });

    it('Should hover on "Show Y-Axis" after perform right click', function() {
      browser.actions().mouseMove(ChartingUtilities.getOptionAfterRightClickOnChart('Show Y-Axis')).perform();
    });

    var options = ['On Left', 'On Right', 'On Both', 'On Neither'];

    options.forEach(function(option) {
      it('Verifying if "' + option + '" is displayed after hover mouse', function() {
        ChartingUtilities.getOptionAfterRightClickOnChart(option).isPresent().then(function(flag) {
          if (!flag) {
            expect(false).customError('"' + option + '" did not present in drop down');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "On Right" is selected by default', function() {
      element(by.xpath(getXpathAfterReplace(ChartingUtilities.xpathIconAfterRightClick, 'On Right'))).isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"On Right" did not active by default');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Series 1" (Y) axis display in "Right" position', function() {
      ChartHelpers.getYAxisPosition('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(value) {
        if (value !== 'Right') {
          expect(false).customError('"Series 1" axis (Y) did not display at "Right" position; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Y" axis title is displayed as "Selection + Interaction"', function() {
      ChartHelpers.getXorYAxisPropertiesByAttribute('.pa-chart-non-formatting-mode', '$fdsChartController', 'Y', 'TitleText')
        .then(function(text) {
          if (text !== 'Selection + Interaction') {
            expect(false).customError('"Y" axis title did not match with "Selection + Interaction"; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
    });

  });

  describe('Test Step ID: 559979', function() {

    it('Should hover on "Show Y-Axis" after perform right click', function() {
      browser.actions().mouseMove(ChartingUtilities.getOptionAfterRightClickOnChart('Show Y-Axis')).perform();
      browser.sleep(3000);
    });

    it('Should select "On Left" from the right click menu', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('On Left').click().then(function() {
        // Wait for chart to load
        browser.sleep(2000);
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should perform right click on "blue"(scatter point) series in chart', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');
    });

    it('Should hover on "Show Y-Axis" after perform right click', function() {
      browser.actions().mouseMove(ChartingUtilities.getOptionAfterRightClickOnChart('Show Y-Axis')).perform();
    });

    var options = ['On Left', 'On Right', 'On Both', 'On Neither'];

    options.forEach(function(option) {
      it('Verifying if "' + option + '" is displayed after hover mouse', function() {
        ChartingUtilities.getOptionAfterRightClickOnChart(option).isPresent().then(function(flag) {
          if (!flag) {
            expect(false).customError('"' + option + '" did not present in drop down');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "On Left" is selected by default', function() {
      var xpathOf2DIconAfterRightClick = CommonFunctions.replaceStringInXpath(ChartingUtilities.xpathIconAfterRightClick, 'On Left');
      element(by.xpath(xpathOf2DIconAfterRightClick)).isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"On Left" did not active by default');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Series 1" (Y) axis  display in "Left" position', function() {
      ChartHelpers.getYAxisPosition('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(value) {
        if (value !== 'Left') {
          expect(false).customError('"Series 1" axis did not display at "Left" position; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Y" axis title text is "Selection + Interaction"', function() {
      ChartHelpers.getXorYAxisPropertiesByAttribute('.pa-chart-non-formatting-mode', '$fdsChartController', 'Y', 'TitleText', 2)
        .then(function(text) {
          if (text !== 'Selection + Interaction') {
            expect(false).customError('"Y" axis title did not match with "Selection + Interaction"; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
    });
  });

  describe('Test Step ID: 453920', function() {

    it('Verifying if "Y" axis title text is "Selection + Interaction"', function() {
      ChartHelpers.getXorYAxisPropertiesByAttribute('.pa-chart-non-formatting-mode', '$fdsChartController', 'Y2', 'TitleText')
        .then(function(text) {
          if (text !== 'Selection + Interaction') {
            expect(false).customError('"Y" axis title did not match with "Selection + Interaction"; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should right click on "Y" axis title which is "Selection + Interaction"', function() {
      ChartHelpers.rightClickOnXorYAxisTitle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Y2', '');
    });

    it('Should select "Format..." from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Format...').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Chart: Y2 Axis Title" drop down is opened', function() {
      ChangeSeries.getDialog('Chart: Y2 Axis Title', true).isDisplayed().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Chart: Y2 Axis Title" dialog did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var setFormatOptions = [{
      sectionName: 'Font',
      dropdownName: 'Font Style',
      valueToSet: 'Calibri',
    }, {sectionName: 'Font', dropdownName: 'Font Size', valueToSet: '16'},];
    setFormatOptions.forEach(function(option) {
      it('Should click on "' + option.dropdownName + '" drop down', function() {
        ChartingUtilities.getElementsFromPanel(option.sectionName, option.dropdownName).click();

        // Verifying if drop down opened
        ThiefHelpers.isDropDownOpen(1).then(function(isOpen) {
          if (!isOpen) {
            expect(false).customError('"' + option.dropdownName + '" drop down is not opened');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Should select "' + option.valueToSet + '" from the "' + option.dropdownName + '" drop down', function() {
        ThiefHelpers.getDropDownSelectClassReference(undefined, getXpathAfterReplace(ChartingUtilities.xpathDropdown, option.dropdownName)).selectItemByText(option.valueToSet);
      });

      it('Verifying if "' + option.valueToSet + '" is selected in the "' + option.dropdownName + '" drop down', function() {
        ThiefHelpers.getDropDownSelectClassReference(undefined, getXpathAfterReplace(ChartingUtilities.xpathDropdown, option.dropdownName)).getSelectedText().then(function(text) {
          if (text !== option.valueToSet) {
            expect(false).customError('"' + option.valueToSet + '" is not selected in the "' + option.dropdownName + '" drop down; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should select "Color Picker" button from the drop down', function() {
      ChartingUtilities.getColorPickerButton().press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if drop down opened
      ThiefHelpers.isDropDownOpen(1, true).then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('"Color Picker" drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Blue" from the color picker', function() {
      ChartingUtilities.selectColorFrmDD('rgb(47, 108, 168)');
    });

    it('Should click on "Bold" icon from the Y Axis drop drop down', function() {
      ChartingUtilities.getBoldItalicUnderlineButton('Bold').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should remove "Selection + Interaction" and enter "Test" in the Axis Title text box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, ChartingUtilities.axisTitleXpath).setText('Test');

      // Verifying that "Test" is typed into the search box
      ThiefHelpers.getTextBoxClassReference(undefined, ChartingUtilities.axisTitleXpath).getText().then(function(text) {
        if (text !== 'Test') {
          expect(false).customError('"Test" did not type in Axix Title text box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Close" button from Y Axis drop down', function() {
      ThiefHelpers.getButtonClassReference('Close').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Close" button from Y Axis drop down');
        CommonFunctions.takeScreenShot();
      });
      browser.sleep(3000);
    });

    it('Verifying if "Y" axis title is displayed as "Test"', function() {
      ChartHelpers.getXorYAxisPropertiesByAttribute('.pa-chart-non-formatting-mode', '$fdsChartController', 'Y2', 'TitleText')
        .then(function(text) {
          if (text !== 'Test') {
            expect(false).customError('"Y" axis title did not match with "Test"; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
    });

    yAxisTitleFormatOptions.forEach(function(ele) {
      it('Verifying if "Test" is set with "' + ele.format + '" "' + ele.value + '"', function() {
        ChartHelpers.getXorYAxisPropertiesByAttribute('.pa-chart-non-formatting-mode', '$fdsChartController', 'Y2', ele.attribute)
          .then(function(text) {
            if (text !== ele.value) {
              expect(false).customError('"Test" is not formatted ' + ele.format + '" to "' + ele.value + '"; Found: ' + text);
              CommonFunctions.takeScreenShot();
            }
          });
      });
    });
  });

  describe('Test Step ID: 559981', function() {

    it('Should perform right click on "blue" series(scatter plot) in chart', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');
    });

    it('Should hover on "Show Y-Axis" after perform right click', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Show Y-Axis').click().then(function() {
      }, function(err) {
        expect(false).customError('Unable to perform click on "Show Y-Axis" option from the menu, Found:' + err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "On Both" from the right click menu', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('On Both').click().then(function() {
        // Wait for chart to load
        browser.sleep(2000);
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Series 1" (Y) axis  display in "Both" positions', function() {
      ChartHelpers.getYAxisPosition('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(value) {
        if (value !== 'Both') {
          expect(false).customError('"Series 1" Y axis did not display at "Both" positions; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Here Y3 axis in chart indicates both sides of the y axis
    it('Verifying if "Y" axis title text is "Selection + Interaction" on Both Sides', function() {
      ChartHelpers.getXorYAxisPropertiesByAttribute('.pa-chart-non-formatting-mode', '$fdsChartController', 'Y3', 'TitleText')
        .then(function(text) {
          if (text !== 'Selection + Interaction') {
            expect(false).customError('"Y" axis title did not match with "Selection + Interaction" on both sides; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
    });

  });

  describe('Test Step ID: 530485', function() {

    it('Should perform right click on scatter label', function() {
      browser.driver.executeScript(function() {
        //  Creating chart object.
        var chartObject = $('.pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart;
        var p = chartObject.querySeriesLabelPixel('Series 1');
        chartObject.rightClickOnPixel(p.x, p.y);
      });
    });

    it('Should select "Format..." from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Format...').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Allocation Effect vs Selection + Interaction: SeriesLabels" drop down is opened', function() {
      ChangeSeries.getDialog('Allocation Effect vs Selection + Interaction: SeriesLabels', true).isDisplayed().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Allocation effect vs Selection+Interaction" dialog did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Formatting in Fill Style section
    var setFormatOptions = [{sectionName: 'Fill Color', dropdownName: 'BG Style', valueToSet: 'Hatch'}];
    setFormatOptions.forEach(function(option) {
      it('Should click on "' + option.dropdownName + '" drop down', function() {
        ChartingUtilities.getElementsFromPanel(option.sectionName, option.dropdownName).click().then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });

        // Verifying if drop down opened
        ThiefHelpers.isDropDownOpen(1).then(function(isOpen) {
          if (!isOpen) {
            expect(false).customError('"BG Style" drop down of "Fill Style" section is not opened');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Should select "Hatch" from the "BG Style" drop down of "Fill Style" section', function() {
        ThiefHelpers.getDropDownSelectClassReference(undefined, getXpathAfterReplace(ChartingUtilities.xpathDropdown, option.dropdownName)).selectItemByText(option.valueToSet);
      });

      it('Verifying if "' + option.valueToSet + '" is selected in the "' + option.dropdownName + '" drop down', function() {
        ThiefHelpers.getDropDownSelectClassReference(undefined, getXpathAfterReplace(ChartingUtilities.xpathDropdown, option.dropdownName)).getSelectedText().then(function(text) {
          if (text !== option.valueToSet) {
            expect(false).customError('"' + option.valueToSet + '" is not selected in the "' + option.dropdownName + '" drop down; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should select "Color Picker" button from the drop down', function() {
      //var xpath = getXpathAfterReplace(ChartingUtilities.xpathDropdown, 'BG Style');
      ChartingUtilities.getElementsFromPanel('Fill Color', 'Color Picker').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if drop down opened
      ThiefHelpers.isDropDownOpen(1, true).then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('"Color Picker" drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Red" from the color picker', function() {
      ChartingUtilities.selectColorFrmDD('rgb(255, 55, 55)');
    });

    // Formatting in Fill Style section
    it('Should click on "Line Style" drop down', function() {
      ChartingUtilities.getElementsFromPanel('Line Style', 'Line Style').click();
    });

    it('Should select Dashed ("- - - -" ) 2nd option from Line Style Drop down', function() {
      element(by.xpath(getXpathAfterReplace(ChartingUtilities.xpathOfLineStyleOption, 'Dashed'))).click().then(function() {
      }, function(error) {
        expect(false).customError('Unable to select item from drop down, Error: ' + error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Line Style" drop down', function() {
      ChartingUtilities.getElementsFromPanel('Line Style', 'Color Picker').click();
    });

    it('Should select "Maroon" from the color picker', function() {
      ChartingUtilities.selectColorFrmDD('rgb(153, 0, 0)');
    });

    it('Should click on "Line Style" drop down', function() {
      ChartingUtilities.getElementsFromPanel('Line Style', 'Line Width').click();
    });

    it('Should select "5px" from the "Line Style Width" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, getXpathAfterReplace(ChartingUtilities.xpathDropdown, 'Line Width')).selectItemByText('5px');
    });

    // formatting Font section
    var setFontOptions = [{
      sectionName: 'Font',
      dropdownName: 'Font Style',
      valueToSet: 'Times New Roman',
    }, {sectionName: 'Font', dropdownName: 'Font Size', valueToSet: '14'},];
    setFontOptions.forEach(function(option) {
      it('Should click on "' + option.dropdownName + '" drop down', function() {
        ChartingUtilities.getElementsFromPanel(option.sectionName, option.dropdownName).click();

        // Verifying if drop down opened
        ThiefHelpers.isDropDownOpen(1).then(function(isOpen) {
          if (!isOpen) {
            expect(false).customError('"' + option.dropdownName + '" drop down is not opened');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Should select "' + option.valueToSet + '" from the "' + option.dropdownName + '" drop down', function() {
        ThiefHelpers.getDropDownSelectClassReference(undefined, ChartingUtilities.getElementsFromPanel('Font', 'Font Size')).selectItemByText(option.valueToSet);
      });

      it('Verifying if "' + option.valueToSet + '" is selected in the "' + option.dropdownName + '" drop down', function() {
        ThiefHelpers.getDropDownSelectClassReference(undefined, getXpathAfterReplace(ChartingUtilities.xpathDropdown, option.dropdownName)).getSelectedText().then(function(text) {
          if (text !== option.valueToSet) {
            expect(false).customError('"' + option.valueToSet + '" is not selected in the "' + option.dropdownName + '" drop down; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on "Bold" icon from the Y Axis drop drop down', function() {
      ChartingUtilities.getBoldItalicUnderlineButton('Bold').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Font" color picker drop down', function() {
      ChartingUtilities.getElementsFromPanel('Font', 'Color Picker').click();
    });

    it('Should select "Maroon" from the color picker', function() {
      ChartingUtilities.selectColorFrmDD('rgb(255, 153, 0)');
    });

    it('Should click on "Close" button from Y Axis drop down', function() {
      ThiefHelpers.getButtonClassReference('Close').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Close" button from Y Axis drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    var arr = [{
      attributeName: 'SeriesValueFontFamily',
      value: 'Times New Roman', verification: 'Font Family', verificationValue: 'Times New Roman',
    }, {attributeName: 'SeriesValueFontWeight', value: 700, verification: 'Font Weight', verificationValue: 'Bold'},
      {attributeName: 'SeriesValueFontColor', value: 39423, verification: 'Font Color', verificationValue: 'Orange'}, {
        attributeName: 'SeriesValueBGStyle',
        value: 2,
        verification: 'Fill Style',
        verificationValue: 'Hatch',
      },
      {attributeName: 'SeriesValueBGColor', value: 3618815, verification: 'Hatch color', verificationValue: 'Red'}, {
        attributeName: 'SeriesValueFGColor', value: 153,
        verification: 'Line color', verificationValue: 'Maroon',
      }, {attributeName: 'SeriesValueFGWidth', value: 5, verification: 'Line width', verificationValue: '5px'},
      {attributeName: 'SeriesValueFGStyle', value: 1, verification: 'Line Style', verificationValue: 'Dashed'},];
    var count = 0;
    arr.forEach(function(val, index) {
      it('Verifying if "' + arr[index].verification + '" of labels are displayed with "' + arr[index].verificationValue + '"', function() {
        ChartHelpers.getAttributeValue('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', arr[index].attributeName).then(function(text) {
          if (text !== arr[index].value) {
            expect(false).customError(arr[index].verification + ' is not set to ' + arr[index].verificationValue + ' Expected value to be ' + arr[index].value + ', Found:' + text);
            count = count + 1;
          }
        });
        if (count === 1) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 453921', function() {

    it('Should perform right click on chart white space', function() {
      // Performing right click on Series index
      ChartHelpers.rightClickOnPlot('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart', '', 1);
    });

    it('Should select "Format..." from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Format...').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying "Chart: Backgrounds & Borders" dialog is appeared', function() {
      ChangeSeries.getDialog('Chart: Backgrounds & Borders', true).isDisplayed().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Chart: Backgrounds & Borders" dialog did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Color Picker" button from the drop down', function() {
      var dropdownButtonXpath = element(by.xpath('//*[contains(@data-qa-class, "bg-style-dropdown")]/parent::*/following-sibling::*[@data-qa-class="bg-colorpicker-container"]//tf-colorpicker//tf-button'));
      ThiefHelpers.getButtonClassReference(undefined, dropdownButtonXpath).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if drop down opened
      ThiefHelpers.isDropDownOpen(1, true).then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('"Color Picker" drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Yellow" from the color picker', function() {
      ChartingUtilities.selectColorFrmDD('rgb(255, 204, 0)');
    });

    it('Should open "Line Style" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, getXpathAfterReplace(ChartingUtilities.xpathDropdown, 'Line Style')).open();
    });

    it('Should select Dashed ("- - - -" ) 2nd option from Line Style Drop down', function() {
      element(by.xpath(getXpathAfterReplace(ChartingUtilities.xpathOfLineStyleOption, 'Dashed'))).click().then(function() {
      }, function(error) {
        expect(false).customError('Unable to select item from drop down, Error: ' + error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Color Picker" button from the "Line Style" drop down', function() {
      var dropdownButtonXpath = element(by.xpath('//*[contains(@data-qa-class, "line-style-options-section")]//tf-colorpicker//tf-button'));
      ThiefHelpers.getButtonClassReference(undefined, dropdownButtonXpath).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if drop down opened
      ThiefHelpers.isDropDownOpen(2, true).then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('"Color Picker" drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Maroon" from the color picker', function() {
      ChartingUtilities.selectColorFrmDD('rgb(153, 0, 0)');
    });

    it('Should select "5px" from the "Line Style Width" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, getXpathAfterReplace(ChartingUtilities.xpathDropdown, 'Line Width')).selectItemByText('5px');
    });

    it('Should click on "Close" button drop down', function() {
      ThiefHelpers.getButtonClassReference('Close').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Close" button from Y Axis drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    var arr = [{
      attributeName: 'PlotBGColor',
      value: 52479, verification: 'Back ground color', verificationValue: 'Yellow color',
    }, {attributeName: 'PlotFGColor', value: 153, verification: 'border color', verificationValue: 'Maroon color'},
      {attributeName: 'PlotFGStyle', value: 1, verification: 'border', verificationValue: 'Dashes'},];
    arr.forEach(function(val, index) {
      it('Verifying if chart ' + arr[index].verification + ' is set to ' + arr[index].verificationValue + '', function() {
        ChartHelpers.getAttributeValue('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart', arr[index].attributeName, '').then(function(text) {
          if (text !== arr[index].value) {
            expect(false).customError('chart ' + arr[index].verification + ' is not set to ' + arr[index].verificationValue + ' Expected: ' + arr[index].value + ', Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 531649', function() {

    it('Should click on the "Grid" icon in "Allocation Effect vs Selection + Interaction" chart', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Allocation Effect vs Selection + Interaction').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Chart has changed" dialog box appears', function() {
      ThiefHelpers.isDialogOpen('Chart has changed');

    });

    it('Set "Chart Name" text box to "Scatter Format"', function() {
      ThiefHelpers.getTextBoxClassReference('Chart Name').setText('Scatter Format');

      //Verifying if "Chart Name" text is set to "Scatter Format"
      ThiefHelpers.getTextBoxClassReference('Chart Name').getText().then(function(text) {
        if (text !== 'Scatter Format') {
          expect(false).customError('"Chart Name" text box is not set to "Scatter Format".' +
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

      //Verify if dialog box closed
      ThiefHelpers.isDialogOpen('Chart has changed').then(function(flag) {
        if (flag) {
          expect(false).customError('"Chart has changed" dialog box is not closed even after clicking ' +
            'on "Save Changes" button.');
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

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Attribution" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
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

  });

  describe('Test Step ID: 531650', function() {

    it('Should open PA3 Application with "Client:;PA3;Charts;CHART_DOC', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('chart-doc');
    });

    it('Should wait until loading icon in "Weights" disappears', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'),
        360000)).toBeTruthy();
    });

    it('Verifying if "Weights" Report calculated without any issue', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(found) {
        if (!found) {
          expect(false).customError('"Weights" Report not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if Calculation error displayed
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Attribution - Multi tile" in LHP - Reports ', function() {
      //Click on "Attribution - Multi tile"  in LHP - Reports.
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Attribution - Multi tile').then(function(ele) {
        ele.click();
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if 'Attribution - Multi tile report is selected
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Attribution - Multi tile').then(function(ele) {
        ele.getAttribute('class').then(
          function(val) {
            if (val.indexOf('selected') === -1) {
              expect(false).customError('"Attribution - Multi tile" report from LHP is not selected');
            }
          }, function(err) {

            expect(false).customError(err);
          });
      });
    });

    it('Verifying if "Attribution" is displayed at the top', function() {
      PA3MainPage.getMatrixTile(1, 1).getText().then(function(val) {
        if (val !== 'Attribution') {
          expect(false).customError('"Attribution" is not loaded at the top of the view');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Weights Over Time" is displayed at the top', function() {
      PA3MainPage.getMatrixTile(2, 1).getText().then(function(val) {
        if (val !== 'Weights Over Time') {
          expect(false).customError('"Weights Over Time" is not loaded at the bottom left corner in the view');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Performance" is displayed at the top', function() {
      PA3MainPage.getMatrixTile(2, 2).getText().then(function(val) {
        if (val !== 'Performance') {
          expect(false).customError('"Performance" is not loaded at the bottom right "Weights Over Time"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait until loading icon in all 3 tiles disappears', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights over time'),
        360000)).toBeTruthy();

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Performance'),
        300000)).toBeTruthy();

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Attribution'),
        300000)).toBeTruthy();
    });

    it('Verifying if reports calculated without any issues', function() {
      // Verifying if Calculation error displayed
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 531651', function() {

    ChartingUtilities.selectChartFromReport('Attribution', 'Scatter Format|Select…');

    it('Should right click on "X" axis title "Allocation Effect" in "Weights Over Time" tile', function() {
      ChartHelpers.rightClickOnXorYAxisLabel('.pa-chart-non-formatting-mode:eq(1)', '$fdsChartController', 'X', undefined, '');
    });

    it('Should select "Show axis label" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Show axis label').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should right click on "Y" axis title in "Weights Over Time" tile', function() {
      ChartHelpers.rightClickOnXorYAxisLabel('.pa-chart-non-formatting-mode:eq(1)', '$fdsChartController', 'Y', undefined, '');
    });

    it('Should select "Show axis label" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Show axis label').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should perform right click on the Benchmark Total Return- Total line in "Performance" chart', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode:eq(2)', '$fdsChartController', 'Series 2', undefined, undefined, '');
    });

    it('Should select "Format..." from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Format...').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying "Benchmark Total Return - Total" dialog is appeared', function() {
      ChangeSeries.getDialog('Benchmark Total Return - Total', true).isDisplayed().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Benchmark Total Return - Total" dialog did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Line Style" drop down', function() {
      ChartingUtilities.getElementsFromPanel('Line Style', 'Line Style').click();
    });

    it('Should select Dashed ("- - - -" ) 2nd option from Line Style Drop down', function() {
      element(by.xpath(getXpathAfterReplace(ChartingUtilities.xpathOfLineStyleOption, 'Dashed'))).click().then(function() {
      }, function(error) {
        expect(false).customError('Unable to select item from drop down, Error: ' + error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Color Picker" button from the "Line Style" drop down', function() {
      ChartingUtilities.getElementsFromPanel('Line Style', 'Color Picker').click();

      // Verifying if drop down opened
      ThiefHelpers.isDropDownOpen(2, true).then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('"Color Picker" drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Dark gray" from the color picker', function() {
      ChartingUtilities.selectColorFrmDD('rgb(75, 75, 75)');
    });

    it('Should click on "Line Style" drop down', function() {
      ChartingUtilities.getElementsFromPanel('Line Style', 'Line Width').click();
    });

    it('Should select "5px" from the "Line Style Width" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, getXpathAfterReplace(ChartingUtilities.xpathDropdown, 'Line Width')).selectItemByText('2px');
    });

    it('Should click on "Close" button drop down', function() {
      ThiefHelpers.getButtonClassReference('Close').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Close" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Chart" is "Scatter(Marker)" chart', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', undefined, '').then(function(style) {
        if (style !== 'Marker') {
          expect(false).customError('"Chart" did not "Marker" chart; Found :' + style);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "X" axis title text is "X"', function() {
      ChartHelpers.getXorYAxisPropertiesByAttribute('.pa-chart-non-formatting-mode:eq(1)', '$fdsChartController', 'X', 'TitleText', undefined, '')
        .then(function(text) {
          if (text !== 'X') {
            expect(false).customError('"X axis" is not displayed "X" as title, Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Verifying if "Y" axis title text is "Y"', function() {
      ChartHelpers.getXorYAxisPropertiesByAttribute('.pa-chart-non-formatting-mode:eq(1)', '$fdsChartController', 'Y', 'TitleText', undefined, '')
        .then(function(text) {
          if (text !== 'Y') {
            expect(false).customError('"Y axis" is not displayed "Y" as title, Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
    });

    var arr = [{
      attributeName: 'SeriesValueBGColor',
      value: 0,
      verification: 'Line Color',
      verificationValue: 'Black',
    }, {attributeName: 'SeriesValueFGWidth', value: 1, verification: 'Line width', verificationValue: '2px'},
      {attributeName: 'SeriesValueBGStyle', value: 1, verification: 'Line Style', verificationValue: 'Dashed'},];
    var count1 = 0;
    arr.forEach(function(val, index) {
      it('Verifying if labels in "Performance" chart is displayed, "' + arr[index].verification + '" as "' + arr[index].verificationValue + '"', function() {
        ChartHelpers.getAttributeValue('.pa-chart-non-formatting-mode:eq(2)', '$fdsChartController', 'Series 2', arr[index].attributeName, '').then(function(text) {
          if (text !== arr[index].value) {
            expect(false).customError(arr[index].verification + ' is not set to ' + arr[index].verificationValue + ' Expected value to be ' + arr[index].value + ', Found:' + text);
            count1 = count1 + 1;
          }
        });
        if (count1 === 1) {
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 559984', function() {

    it('Should perform right click on "blue" series in chart', function() {
      browser.driver.executeScript(function() {
        //  Creating chart object.
        var chartObject = $('.pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart;
        var p = chartObject.querySeriesLabelPixel('Series 1');
        chartObject.rightClickOnPixel(p.x, p.y);
      });
    });

    it('Should hover on "Show Y-Axis" after perform right click', function() {
      browser.actions().mouseMove(ChartingUtilities.getOptionAfterRightClickOnChart('Show Y-Axis')).perform();

      // Wait to element appear
      browser.sleep(2000);
    });

    it('Should select "On Neither" from the right click menu', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('On Neither').click().then(function() {
        // Wait for chart to load
        browser.sleep(2000);
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Series 1" (Y) axis  is not displayed on "Neither" positions', function() {
      ChartHelpers.getYAxisPosition('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', '').then(function(value) {
        if (value !== 'Neither') {
          expect(false).customError('"Series 1" Y axis did not display in "Neither" positions; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 532877', function() {

    it('Should select "Commercial Services" from Interactive pane in "Performance" chart', function() {
      PA3MainPage.getElementFromInteractivePane('Performance', 'Commercial Services', true).click();
    });

    it('Should click any where outside to dismiss the tooltip', function() {
      // Click anywhere to dismiss the tooltip
      PA3MainPage.getReports('Attribution - Multi tile').click();
    });

    it('Verifying if "Commercial Services" is highlighted in the Interactive pane of "Performance" chart', function() {
      ThiefHelpers.getVirtualListboxClassReference('//*[@data-qa-class="tile" and descendant::*[normalize-space(.)="Performance"]]//tf-virtual-listbox').getGroupByText('Commercial Services').isSelected().then(function(bool) {
        if (bool !== true) {
          expect(false).customError('"Commercial Services" did not highlighted in "Interactive pane"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should perform right click on "blue" series(Portfolio Total Return- Commercial Services) in chart', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode:eq(2)', '$fdsChartController', 'Series 1', 11, '');
    });

    it('Should select "Format..." from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Format...').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying "Portfolio Total Return- Commercial Services" dialog is appeared', function() {
      ChangeSeries.getDialog('Portfolio Total Return - Commercial Services', true).isDisplayed().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Portfolio Total Return- Commercial Services" dialog did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Line Style" drop down', function() {
      ChartingUtilities.getElementsFromPanel('Line Style', 'Line Style').click();
    });

    it('Should select Dashed ("- - - -" ) 2nd option from Line Style Drop down', function() {
      element(by.xpath(getXpathAfterReplace(ChartingUtilities.xpathOfLineStyleOption, 'Dashed'))).click().then(function() {
      }, function(error) {
        expect(false).customError('Unable to select item from drop down, Error: ' + error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Line Style" drop down', function() {
      ChartingUtilities.getElementsFromPanel('Line Style', 'Line Width').click();
    });

    it('Should select "4px" from the "Line Style Width" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, getXpathAfterReplace(ChartingUtilities.xpathDropdown, 'Line Width')).selectItemByText('4px');
    });

    it('Should click on "Close" button drop down', function() {
      ThiefHelpers.getButtonClassReference('Close').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Close" button');
        CommonFunctions.takeScreenShot();
      });
    });

    var arr = [{attributeName: 'SeriesValueFGWidth', value: 1, verification: 'Line width', verificationValue: '4px'},
      {attributeName: 'SeriesValueBGStyle', value: 1, verification: 'Line Style', verificationValue: 'Dashed'},];
    var count1 = 0;
    arr.forEach(function(val, index) {
      it('Verifying if labels in "Performance" chart is displayed, "' + arr[index].verification + '" as "' + arr[index].verificationValue + '"', function() {
        ChartHelpers.getAttributeValue('.pa-chart-non-formatting-mode:eq(2)', '$fdsChartController', 'Series 1', arr[index].attributeName, '').then(function(text) {
          if (text !== arr[index].value) {
            expect(false).customError(arr[index].verification + ' is not set to ' + arr[index].verificationValue + ' Expected value to be ' + arr[index].value + ', Found:' + text);
            count1 = count1 + 1;
          }
        });
        if (count1 === 1) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });
});
