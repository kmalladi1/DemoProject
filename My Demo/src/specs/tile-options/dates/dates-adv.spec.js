'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: dates-adv', function() {
  // Variable(s)
  var arrayAllDays;

  describe('Test Step ID: 544862', function() {

    // Should un-check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(false);

    it('Should launch the PA3 application with Client;default_doc_auto', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto');
    });

  });

  describe('Test Step ID: 544863', function() {

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Weights', true, 'isSelected');

    it('Should click on the report wrench button', function() {
      PA3MainPage.getReportWrenchButton('Weights').click();
    });

    it('Verify that drop down list is appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Edit Layout" from report options list', function() {
      PA3MainPage.getOption('Edit Layout').click();
    });

    it('Verify that Application changed to Editable mode', function() {
      // Check if Application changed to edit mode
      PA3EditMode.isEditMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Edit Mode" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that COG WHEEL button is not present in the "Edit Layout"', function() {
      PA3EditMode.getCogWheelBtn().isPresent().then(function(found) {
        if (found) {
          expect(false).customError('COG WHEEL button is present in the "Edit Layout".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 544864', function() {

    it('Click on "OK" button from "Edit Layout"', function() {
      PA3EditMode.getButton('OK').click();
    });

    it('Verifying that application is no more in "Edit Layout" mode', function() {
      PA3EditMode.isEditMode().then(function(flag) {
        if (flag) {
          expect(false).customError('"Edit Mode" page is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'Economic Sector');

  });

  describe('Test Step ID: 544865', function() {

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

    it('Shoul click on report frequesncy dropdown', function() {
      ThiefHelpers.getDropDownSelectClassReference('Report Frequency:').open();
    });

    TileOptionsDates.arrayReportFrequencyOptions.forEach(function(dropdownOption) {
      it('Verifying if the Dropdown contains "' + dropdownOption + '" options', function() {
        ThiefHelpers.getAllOptionsFromDropdown().then(function(options) {
          if (options.indexOf(dropdownOption) < 0) {
            expect(false).customError('The dropdown does not contains "' + dropdownOption);
            CommonFunctions.takeScreenShot();
          }

        });
      });
    });

    it('Shoul click on report frequesncy dropdown', function() {
      ThiefHelpers.getDropDownSelectClassReference('Report Frequency:').open();
    });

  });

  describe('Test Step ID: 544866', function() {

    it('Should click on "End Date" drop down and verify all the options are available', function() {
      TileOptionsDates.getDateDropDown('single\'s end date').click();

      // Verify that all the options are available
      TileOptionsDates.arrayEndDateOptions.forEach(function(option) {
        TileOptionsDates.getOptionFromDateDropDown(option).isPresent().then(function(flag) {
          if (!flag) {
            expect(false).customError(option + ' is not present in the "End Date" drop down');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should select "End of Last Month" option from drop down', function() {
      ThiefHelpers.getDatepickerClassReference('End Date:').selectShortcutByText('End of Last Month');

      ThiefHelpers.getDatepickerClassReference('End Date:').getDate().then(function(text) {
        if (text !== 'End of Last Month') {
          expect(false).customError('Expected:"End of Last Month" but Found: "' + text + '" in the Date text box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 544867', function() {

    it('Should click on "Month" drop down and verify all the months are available', function() {
      ThiefHelpers.getVirtualDropDownSelectClassReference(undefined, TileOptionsDates.getMonthOrYearDropDown('single\'s end date', 'month')).open();
    });

    TileOptionsDates.arrayMonths.forEach(function(dropdownOption) {
      it('Verifying if the Dropdown contains "' + dropdownOption + '" options', function() {
        ThiefHelpers.getAllOptionsFromDropdown().then(function(options) {
          if (options.indexOf(dropdownOption) < 0) {
            expect(false).customError('The dropdown does not contains "' + dropdownOption);
            CommonFunctions.takeScreenShot();
          }

        });
      });
    });

    it('Should click on "Month" drop down and verify all the months are available', function() {
      ThiefHelpers.getVirtualDropDownSelectClassReference(undefined, TileOptionsDates.getMonthOrYearDropDown('single\'s end date', 'month')).open();
    });

  });

  describe('Test Step ID: 544868', function() {

    it('Should click on "Year" drop down', function() {
      ThiefHelpers.getVirtualDropDownSelectClassReference(undefined, TileOptionsDates.getMonthOrYearDropDown('Single\'s End Date', 'year')).open();
    });

    // Only 30 elements of dropdown are available in DOM so as a work around scrolling few elements and then verifying if 1985 is last element.
    it('Should scroll the right side scroll bar to till 1990 is in visible', function() {
      Utilities.scrollElementToVisibility(TileOptionsDates.getMonthOrYear('1990'));
    });

    it('Verifying if the last year is "1985" in the dropdown', function() {
      // Verifying if 1985 is present in dropdwon list
      TileOptionsDates.getMonthOrYear('1985').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"1985" is not present in the "Month" drop down');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if 1984 is not present in dropdown list
      TileOptionsDates.getMonthOrYear('1984').isPresent().then(function(flag) {
        if (flag) {
          expect(false).customError('"1984" is present in the "Month" drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "12/31/1984" in the Date field and verify that calender is grayed out', function() {
      var needScreenShot1 = 0;
      var needScreenShot2 = 0;

      // Clearing Date field before entering any date
      TileOptionsDates.getDateField('single\'s end date').sendKeys(protractor.Key.HOME, protractor.Key.SHIFT,
        protractor.Key.END, protractor.Key.NULL, protractor.Key.DELETE, '12/31/1984');

      // wait for the web elements to load
      browser.sleep(3000);

      // Verify if Calendar is grayed out
      arrayAllDays = TileOptionsDates.getAllDays('single\'s end date');
      var i = 0;
      arrayAllDays.each(function(day) {
        if (i < 37) {
          day.getAttribute('class').then(function(val) {
            if (val.indexOf('disabled') === -1) {
              expect(false).customError('Calender is not grayed out. found "' + val + '"');
              ++needScreenShot2;
              if (needScreenShot2 === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        } else if (i >= 37 && i < 42) {
          day.getAttribute('class').then(function(value) {
            if (value.indexOf('day future') === -1) {
              expect(false).customError('Calender is not grayed out');
              ++needScreenShot1;
              if (needScreenShot1 === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        }

        i++;
      });
    });

  });

  describe('Test Step ID: 544870', function() {

    it('Should select "Weekly" from "Report Frequency" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Weekly', 'Report Frequency:');

      // Verifying if "Weekly" is set
      ThiefHelpers.verifySelectedDropDownText('Weekly', 'Report Frequency:');
    });

    it('Should enter "6/19/2014" into "Start Date" field', function() {
      TileOptionsDates.getDateField('start date').sendKeys(protractor.Key.HOME, protractor.Key.SHIFT, protractor.Key.END,
        protractor.Key.NULL, protractor.Key.DELETE, '6/19/2014');
    });

    it('Should enter "6/10/2014" into "End Date" field', function() {
      TileOptionsDates.getDateField('end date').sendKeys(protractor.Key.HOME, protractor.Key.SHIFT, protractor.Key.END,
        protractor.Key.NULL, protractor.Key.DELETE, '6/10/2014', protractor.Key.ENTER);

      // Adding delay to wait for request to process(RPD:41035011)
      browser.sleep(2000);
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile options');

    it('Verify that hyper link in the application changes to "6/10/2014-6/19/2014" while Calender dates remains constant', function() {
      // Verify if hyperlink display expected date
      PA3MainPage.getDateHyperLink().getText().then(function(value) {
        if (value !== '6/10/2014 - 6/19/2014') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Report was not grouped by date range: "6/10/2014 - 6/19/2014"');
        }
      });
    });

    it('Verifying that "End Date (6/10/2014)" is displayed at first position in hyperlink', function() {
      PA3MainPage.getDateHyperLink().getText().then(function(date) {
        if ((date.split('-')[0].trim()).indexOf('6/10/2014') === -1) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"End Date (6/10/2014)" is not displayed at first position in hyperlink, Found: ' + date);
        }
      });
    });

    it('Verifying that "Start Date (6/19/2014)" is displayed at second position in hyperlink', function() {
      PA3MainPage.getDateHyperLink().getText().then(function(date) {
        if ((date.split('-')[1].trim()).indexOf('6/19/2014') === -1) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Start Date (6/19/2014)" is not displayed at second position in hyperlink, Found: ' + date);
        }
      });
    });

  });

  describe('Test Step ID: 544869', function() {

    it('Should close PA3 application', function() {
      expect(true).toBeTruthy();
    });

  });

});
