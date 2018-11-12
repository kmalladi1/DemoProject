'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: aoe-chart-value', function() {

  var arrNumber = [];
  var regExp = /^[A-Za-z,]+$/;

  var expandTresuryAndClick = function() {

    it('Should expand "Treasury" in the "3 Factor Brinson Attribution" report if not already expanded', function() {
      PA3MainPage.isTreeExpanded('3 Factor Brinson Attribution', 'Treasury').then(function(expanded) {
        if (!expanded) {
          PA3MainPage.expandTreeInCalculatedReport('3 Factor Brinson Attribution', 'Treasury');
        }
      });
    });

    it('Should right click on "Port. Beginning Effective Duration" for the security - "US912828QD52" in the ' + '"3 Factor Brinson Attribution" report', function() {
      SlickGridFunctions.getCellReference('3 Factor Brinson Attribution', 'US912828QD52', 'Ticker', 'Port. Beginning Effective Duration', '').then(function(cellRef) {
        PA3MainPage.rightClickOnGivenElement(cellRef).then(function(clickStatus) {
          if (!clickStatus) {
            expect(false).customError('Unable to perform right click operation on "Port. Beginning Effective Duration" ' +
              'for the security - "US912828QD52" in the "3 Factor Brinson Attribution" report');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should select "Override Security Value" in the displayed menu', function() {
      PA3MainPage.getOptionAfterRightClickOnReport('Override Security Value…').isPresent().then(function(optionStatus) {
        if (optionStatus) {
          PA3MainPage.getOptionAfterRightClickOnReport('Override Security Value…').click().then(function() {
          }, function() {

            expect(false).customError('Unable to select "Override Security Value" in the displayed menu');
            CommonFunctions.takeScreenShot();
          });
        } else {
          expect(false).customError('"Override Security Value" is not displayed in the menu');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Analytics Override Editor" dialog has appeared.', function() {
      ThiefHelpers.isDialogOpen('Analytics Override Editor').then(function(dialogBoxStatus) {
        if (!dialogBoxStatus) {
          expect(false).customError('"Analytics Override Editor" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  };

  describe('Test Step ID: 528645', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/PA3/Fixed_income/PA3_FI_OVERRIDE_EX2"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('pa3-fi-anlts-ovrds-chart');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('3 Factor Brinson Attribution');

    it('Verifying if "3 Factor Brinson Attribution Over Time" Chart is loaded', function() {
      PA3MainPage.isInChartFormat('3 Factor Brinson Attribution Over Time').then(function(flag) {
        if (!flag) {
          expect(false).customError('"3 Factor Brinson Attribution Over Time" Chart is not loaded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    expandTresuryAndClick();

    var count = 0;
    it('Verify if "US912828QD52" ticker is present in the grid, delete if it is and click on "Apply and Close" button', function() {
      AnalyticsOverrideEditor.getAllRows().then(function(arrRows) {
        arrRows.forEach(function(rowObject, rowIndex) {
          if (rowObject.sym === 'US912828QD52') {
            count = 1;
            AnalyticsOverrideEditor.getCellReference(rowIndex, 'Identifier').then(function(cellRef) {
              AnalyticsOverrideEditor.getXIconForGivenCellReference(cellRef, 'US912828QD52').click();
            });

            ThiefHelpers.getDialogButton('Analytics Override Editor', 'Apply & Close').click().then(function() {
            }, function() {

              expect(false).customError('Unable to click on "Apply & Close" button in "Analytics Override Editor" dialog');
              CommonFunctions.takeScreenShot();
            });

          }
        });

        if (count === 0) {
          // Should click on "Cancel" button in "Analytics Override Editor" dialog
          ThiefHelpers.getDialogButton('Analytics Override Editor', 'Cancel').click().then(function() {
          }, function() {

            expect(false).customError('Unable to click on "Cancel" button in "Analytics Override Editor" dialog');
            CommonFunctions.takeScreenShot();
          });
        }
      });

      browser.sleep(3000);
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('3 Factor Brinson Attribution');

    it('Verifying if "3 Factor Brinson Attribution Over Time" Chart is loaded', function() {
      PA3MainPage.isInChartFormat('3 Factor Brinson Attribution Over Time').then(function(flag) {
        if (!flag) {
          expect(false).customError('"3 Factor Brinson Attribution Over Time" Chart is not loaded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 528646', function() {

    it('Should hover on "Series 1" bar data series and collect value of "Port. Beginning Effective Duration" on tooltip', function() {
      ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        if (text.indexOf('Port. Beginning Effective Duration') < 0) {
          expect(false).customError('"Port. Beginning Effective Duration" is not appeared in tooltip.');
          CommonFunctions.takeScreenShot();
        } else {
          var arrText = text.split(':')[1].split('');
          var number = '';
          arrText.forEach(function(char) {
            if (!(regExp.test(char))) {
              number = number + char;
            }
          });
          arrNumber.push(parseFloat(number));
        }
      });

    });

    it('Should hover on "Series 2" bar data series and collect value of "Bench. Beginning Effective Duration" on tooltip', function() {
      browser.driver.executeScript(function() {
        //  Creating chart object.
        var chartObject = $('.pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart;

        // Getting pixel coordinates of the series.
        var p = chartObject.querySeriesPixel('Series 2', 0);

        // Hovers on the specified pixel.
        chartObject.hoverOnPixel(p.x, p.y);

        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        if (text.indexOf('Bench. Beginning Effective Duration') < 0) {
          expect(false).customError('"Bench. Beginning Effective Duration" is not appeared in tooltip.');
          CommonFunctions.takeScreenShot();
        } else {
          var arrText = text.split(':')[1].split('');
          var number = '';
          arrText.forEach(function(char) {
            if (!(regExp.test(char))) {
              number = number + char;
            }
          });
          arrNumber.push(parseFloat(number));
        }
      });

    });

    expandTresuryAndClick();

    it('Verifying if "Identifier" widget populates "US912828QD52"', function() {
      ThiefHelpers.getTextBoxClassReference('Identifier').getText().then(function(text) {
        if (text !== 'US912828QD52') {
          expect(false).customError('"Identifier" widget should populate "US912828QD52" instead "' + text + '" is displaying');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Start Date" shows "Earliest"', function() {
      ThiefHelpers.getDatepickerClassReference('Start Date').getDate().then(function(date) {
        if (date !== 'Earliest') {
          expect(false).customError('"Start Date" should display "Earliest" instead "' + date + '" is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "End Date" shows "Previous Close"', function() {
      ThiefHelpers.getDatepickerClassReference('End Date').getDate().then(function(date) {
        if (date !== 'Previous Close') {
          expect(false).customError('"End Date" should display "Previous Close" instead "' + date + '" is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Analytic" drop down displays "Effective Duration"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Analytic').getSelectedText().then(function(drpDwnSelectedItem) {
        if (drpDwnSelectedItem !== 'Effective Duration') {
          expect(false).customError('"Analytic" drop down should displays "Effective Duration" inste' + 'ad "' + drpDwnSelectedItem + '" is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 528648', function() {

    it('Should set "Start Date" to "26-MAR-2015"', function() {
      ThiefHelpers.getDatepickerClassReference('', AnalyticsOverrideEditor.xpathStartDate).setDate('26-MAR-2015');
    });

    it('Verifying if "Start Date" shows "26-MAR-2015"', function() {
      ThiefHelpers.getDatepickerClassReference('', AnalyticsOverrideEditor.xpathStartDate).getDate().then(function(date) {
        if (date !== '26-MAR-2015') {
          expect(false).customError('"Start Date" date is not set to "26-MAR-2015" instead "' + date + '" is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should set "End Date" to "27-MAR-2015"', function() {
      ThiefHelpers.getDatepickerClassReference('', AnalyticsOverrideEditor.xpathEndDate).setDate('27-MAR-2015');
    });

    it('Verifying if "End Date" shows "27-MAR-2015"', function() {
      ThiefHelpers.getDatepickerClassReference('', AnalyticsOverrideEditor.xpathEndDate).getDate().then(function(date) {
        if (date !== '27-MAR-2015') {
          expect(false).customError('"End Date" date is not set to "27-MAR-2015" instead "' + date + '" is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "99999" in "Value" field', function() {
      ThiefHelpers.getTextBoxClassReference('Value').setText(99999);
    });

    it('Verifying if "Value" field populates "99999"', function() {
      ThiefHelpers.getTextBoxClassReference('Value').getText().then(function(text) {
        if (text !== '99999') {
          expect(false).customError('"Value" field should populate "99999" instead "' + text + '" is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying  "Client"  option is selected by default in "Save Location" dropdown', function() {
      ThiefHelpers.verifySelectedDropDownText('Client', 'Save Location');
    });

    it('Should click on "Add" button in "Analytics Override Editor" dialog', function() {
      ThiefHelpers.getButtonClassReference('Add').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Add" button in "Analytics Override Editor" dialog');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "US912828QD52" override is added to the last row in the "Preview section" and is in view', function() {
      AnalyticsOverrideEditor.getAllRows(true).then(function(rowsCount) {
        // Fetching last row data
        AnalyticsOverrideEditor.getRowData(rowsCount - 1).then(function(cellRef) {
          if (cellRef[0] === 'US912828QD52') {
            AnalyticsOverrideEditor.getCellReference(rowsCount - 1, 'Identifier').then(function(rowRef) {
              rowRef.isDisplayed().then(function(rowStatus) {
                if (!rowStatus) {
                  expect(rowStatus).customError('Newly added "Override" is not in view');
                  CommonFunctions.takeScreenShot();
                }
              }, function(error) {

                expect(false).customError(error);
              });
            });
          } else {
            expect(false).customError('"US912828QD52" override is not added');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if newly added "Override" in the "Preview" section shows the fields "Identifier" as "US912828QD52", ' +
      '"Value" as "99999.0000", "Start Date" as "26-MAR-2015" and "End Date"  as "27-MAR-2015"', function() {
      var screenShot = 0;
      browser.executeScript(function() {
        var dataItem;
        var dataItems = $('.tf-slick-grid:eq(1)').data('$tfSlickGridController').grid.getData().getItems();
        dataItems.forEach(function(dataObject) {
          if (dataObject.sym === 'US912828QD52') {
            dataItem = dataObject;
          }
        });

        return dataItem;
      }).then(function(dataObject) {
        if (dataObject.startDate !== 20150326) {
          expect(false).customError('"Start Date" is not matching expected: inst' + 'ead "' + dataObject.startDate + '" displayed');
          screenShot++;
        }

        if (dataObject.endDate !== 20150327) {
          expect(false).customError('"End Date" is not matching expected: inst' + 'ead "' + dataObject.endDate + '" displayed');
          screenShot++;
        }

        if (dataObject.value !== 99999.0000) {
          expect(false).customError('"Value" is not matching expected: inst' + 'ead "' + dataObject.value + '" displayed');
          screenShot++;
        }
      });

      if (screenShot > 0) {
        CommonFunctions.takeScreenShot();
      }
    });
  });

  describe('Test Step ID: 528649', function() {

    it('Automation work:Ignoring synchronization to handle loading swirl', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should click on "Apply & Close" button in "Analytics Override Editor" dialog', function() {
      ThiefHelpers.getDialogButton('Analytics Override Editor', 'Apply & Close').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Apply & Close" button in "Analytics Override Editor" dialog');
        CommonFunctions.takeScreenShot();
      });
    });

    var reports = ['3 Factor Brinson Attribution', '3 Factor Brinson Attribution Over Time'];

    reports.forEach(function(reportname) {
      it('Verifying if loading icon is appeared for "' + reportname + '"', function() {
        ThiefHelpers.waitUntilSpinnerAppears(PA3MainPage.getProgressIndicatorClassReference(reportname), 60000);
      });
    });

    it('Automation work:Enabling synchronization', function() {
      browser.ignoreSynchronization = false;
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('3 Factor Brinson Attribution');

    it('Verifying if "3 Factor Brinson Attribution Over Time" Chart is loaded', function() {
      PA3MainPage.isInChartFormat('3 Factor Brinson Attribution Over Time').then(function(flag) {
        if (!flag) {
          expect(false).customError('"3 Factor Brinson Attribution Over Time" Chart is not loaded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Series 1" Bar Chart value is less when compared to previous value', function() {
      ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        if (text.indexOf('Port. Beginning Effective Duration') < 0) {
          expect(false).customError('"Port. Beginning Effective Duration" is not appeared in tooltip.');
          CommonFunctions.takeScreenShot();
        } else {
          var arrText = text.split(':')[1].split('');
          var number = '';
          arrText.forEach(function(char) {
            if (!(regExp.test(char))) {
              number = number + char;
            }
          });
          if (parseFloat(number) < arrNumber[0]) {
            expect(false).customError('"Port. Beginning Effective Duration" Bar Chart value is not greater than previously collected value. Previous value ' + arrNumber[0] + ', found ' + number);
            CommonFunctions.takeScreenShot();
          }
        }
      });

    });

    it('Verifying if "Series 2" Bar Chart value is equal with the previous value', function() {
      browser.driver.executeScript(function() {

        //  Creating chart object.
        var chartObject = $('.pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart;

        // Getting pixel coordinates of the series.
        var p = chartObject.querySeriesPixel('Series 2', 0);

        // Hovers on the specified pixel.
        chartObject.hoverOnPixel(p.x, p.y);

        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        if (text.indexOf('Bench. Beginning Effective Duration') < 0) {
          expect(false).customError('"Bench. Beginning Effective Duration" is not appeared in tooltip.');
          CommonFunctions.takeScreenShot();
        } else {
          var arrText = text.split(':')[1].split('');
          var number = '';
          arrText.forEach(function(char) {
            if (!(regExp.test(char))) {
              number = number + char;
            }
          });
          if (parseFloat(number) !== arrNumber[1]) {
            expect(false).customError('"Bench. Beginning Effective Duration" Bar Chart value is not equal to previously collected value. ' +
              'Expected ' + arrNumber[1] + ',found ' + number);
            CommonFunctions.takeScreenShot();
          }
        }
      });

    });

  });

  describe('Test Step ID: 528655', function() {

    expandTresuryAndClick();

    it('Should delete "US912828QD52" ticker in the grid and click on "Apply and Close" button', function() {
      AnalyticsOverrideEditor.getAllRows().then(function(arrRows) {
        arrRows.forEach(function(rowObject, rowIndex) {
          if (rowObject.sym === 'US912828QD52') {
            AnalyticsOverrideEditor.getCellReference(rowIndex, 'Identifier').then(function(cellRef) {
              AnalyticsOverrideEditor.getXIconForGivenCellReference(cellRef, 'US912828QD52').click();
            });

            ThiefHelpers.getDialogButton('Analytics Override Editor', 'Apply & Close').click().then(function() {
            }, function() {

              expect(false).customError('Unable to click on "Apply & Close" button in "Analytics Override Editor" dialog');
              CommonFunctions.takeScreenShot();
            });

          }
        });
      });

    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('3 Factor Brinson Attribution');

    it('Verifying if "3 Factor Brinson Attribution Over Time" Chart is loaded', function() {
      PA3MainPage.isInChartFormat('3 Factor Brinson Attribution Over Time').then(function(flag) {
        if (!flag) {
          expect(false).customError('"3 Factor Brinson Attribution Over Time" Chart is not loaded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should hover on "Port. Beginning Effective Duration" bar data series verify value is same as in test step id: 528646', function() {
      ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        if (text.indexOf('Port. Beginning Effective Duration') < 0) {
          expect(false).customError('"Port. Beginning Effective Duration" is not appeared in tooltip.');
          CommonFunctions.takeScreenShot();
        } else {
          var arrText = text.split(':')[1].split('');
          var number = '';
          arrText.forEach(function(char) {
            if (!(regExp.test(char))) {
              number = number + char;
            }
          });
          if (parseFloat(number) !== arrNumber[0]) {
            expect(false).customError(' "Port. Beginning Effective Duration" bar data series value is not same as in test step:528646.' +
              ' Expected ' + arrNumber[0] + ', found ' + number);
            CommonFunctions.takeScreenShot();
          }
        }
      });

    });

    it('Should hover on "Bench. Beginning Effective Duration" bar data series verify value is same as in test step id: 528646', function() {
      browser.driver.executeScript(function() {

        //  Creating chart object.
        var chartObject = $('.pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart;

        // Getting pixel coordinates of the series.
        var p = chartObject.querySeriesPixel('Series 2', 0);

        // Hovers on the specified pixel.
        chartObject.hoverOnPixel(p.x, p.y);

        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        if (text.indexOf('Bench. Beginning Effective Duration') < 0) {
          expect(false).customError('"Bench. Beginning Effective Duration" is not appeared in tooltip.');
          CommonFunctions.takeScreenShot();
        } else {
          var arrText = text.split(':')[1].split('');
          var number = '';
          arrText.forEach(function(char) {
            if (!(regExp.test(char))) {
              number = number + char;
            }
          });
          if (parseFloat(number) !== arrNumber[1]) {
            expect(false).customError(' "Bench. Beginning Effective Duration" bar data series value is not same as in test step:528646.' +
              ' Expected ' + arrNumber[1] + ', found ' + number);
            CommonFunctions.takeScreenShot();
          }
        }
      });

    });

  });

  describe('Test Step ID: 533151', function() {

    it('Should open PA3 Application with "Client:default_doc_OLD"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

    it('Should click on the "Wrench" button on the application toolbar', function() {
      ThiefHelpers.getButtonClassReference(undefined, PA3MainPage.xpathApplicationWrenchIcon).press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "wrench" button.');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify if "Enable Overrides" option from Analytics Overrides is not checked', function() {
      var xpathAnalyticsOverride = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathMenuItem, 'Analytics Overrides');
      browser.actions().mouseMove(element(by.xpath(xpathAnalyticsOverride))).perform();

      ThiefHelpers.getMenuClassReference().getCheckedState('Enable Overrides').then(function(isChecked) {
        if (isChecked) {
          expect(false).customError('"Enable Overrides" option from Analytics Overrides is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrOverrides = ['Show Only Override Columns', 'View Overrides'];
    arrOverrides.forEach(function(optionName) {
      it('Verifying if "' + optionName + '" is disabled', function() {
        element(by.xpath('//*[@data-qa-class="dropdown-menu-item-document" and normalize-space(.)="' + optionName + '"]//tf-menu-item')).getAttribute('class').then(function(value) {
          if (value.indexOf('disabled') < 0) {
            expect(false).customError('"' + optionName + '" is enabled');
            CommonFunctions.takeScreenShot();
          }
        }, function(err) {

          CommonFunctions.takeScreenShot();
          expect(false).customError(err);
        });

      });
    });
  });

});
