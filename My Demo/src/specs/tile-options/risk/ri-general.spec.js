'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: ri-general', function() {

  describe('Test Step ID: Startup Instructions', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 565150', function() {

    it('Should open PA3 Application with "Client:default_doc_OLD"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

  });

  describe('Test Step ID: 565151', function() {

    // Select Risk Models tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Risk Models', 'Risk');

  });

  describe('Test Step ID: 565152', function() {
    var flag = 0;

    it('Should expand "Barra" from the Available container and click "Barra US Long-Term Model(USE3L)" from the available section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathAvailableContainer).getGroupByText('Barra');
      group.expand();

      // Verifying if "Barra" is expanding
      group.isExpanded().then(function(expanded) {
        console.log(expanded);
        if (expanded) {
          group.getItemByText('Barra US Long-Term Model (USE3L)').then(function(element) {
            element.select();

            element.isSelected().then(function(selected) {
              if (!selected) {
                expect(false).customError('"Barra US Long-Term Model(USE3L)" is not selected');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Barra" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }

      });
    });

    it('Should click "Right" arrow button', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying if "Barra US Long-Term Model(USE3L)" is added to Selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          console.log(childArr[i].text);
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Barra US Long-Term Model (USE3L)') === -1) {
          expect(false).customError('"Barra US Long-Term Model(USE3L)" is not added to selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Factor Grouping" drop down is enabled', function() {
      CommonFunctions.isElementEnabled('Dropdown', undefined, TileOptionsRiskRiskModels.xpathFactorGroupingButton).then(function(value) {
        if (!value) {
          flag = flag + 1;
          expect(false).customError('"Factor Grouping" drop down is not enabled');
          if (flag === 1) {
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });

    it('Verifying "Visible Factor" section is enabled', function() {
      ThiefHelpers.getDisableableClassReference(ThiefHelpers.getVirtualChecklistClassReference()).isDisabled().then(function(disabled) {
        console.log(disabled);
        if (disabled) {
          expect(false).customError('"Visible Factor" is not grayed out');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Blue" icon in selected section', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getItemByText('Barra US Long-Term Model (USE3L)');

      item.getIcons().then(function(icons) {
        icons.clickIcon('info');
      });
    });

    it('Verifying that Information box populates "Barra US Long- Term Model(USE3L)"', function() {

      TileOptionsRiskRiskModels.getInfoBoxHeader().getText().then(function(value) {
        if (value !== 'Barra US Long-Term Model (USE3L)') {
          expect(false).customError('"Barra US Long-Term Model(USE3L)" is not populated in Information Box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 565153', function() {

    it('Verifying that dates in the information box is displayed in the format "M/DD/YYYY" for "Latest Date"', function() {
      TileOptionsRiskRiskModels.getInfoBoxData('Latest Date').getText().then(function(value) {
        Utilities.isValidMDDYYYY(value);
      });
    });

    it('Verifying that dates in the information box is displayed in the format "M/DD/YYYY" for First Date', function() {
      TileOptionsRiskRiskModels.getInfoBoxData('First Date').getText().then(function(value) {
        Utilities.isValidMDDYYYY(value);
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Date Options', 'Dates', 'Document Options');

    it('Verifying that Date format in the information box is same as the Date format displayed in the Dates tab of Document options dialog', function() {
      ThiefHelpers.verifySelectedDropDownText('M/DD/YYYY', 'Date Format:');
    });
  });

  describe('Test Step ID: 565154', function() {

    it('Should select on "DD-MMM-YYYY" option from "Date Format:" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('DD-MMM-YYYY', 'Date Format:');
    });

    it('Verifying "DD-MMM-YYYY" option is selected from "Date Format:" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('DD-MMM-YYYY', 'Date Format:');
    });

    // Click on "Ok" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    // Select Risk Models tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Risk Models', 'Risk');

    it('Verifying that the "Risk Tab" has "Risk Model pill" highlighted in the View', function() {
      TileOptions.getLHPOption('Risk Models').getAttribute('class').then(function(value) {
        if (value.indexOf('selected') === -1) {
          expect(false).customError('"Risk Models" pill is not highlighted in LHP');
          CommonFunctions.takeScreenShot();
        }
      });

      browser.sleep(3000);
    });

    it('Should click on the "Blue" icon in selected section', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getItemByText('Barra US Long-Term Model (USE3L)');

      item.getIcons().then(function(icons) {
        icons.clickIcon('info');
      });
    });

    it('Verifying that dates in the information box is displayed in the format "DD-MMM-YYYY" for Latest Date', function() {
      TileOptionsRiskRiskModels.getInfoBoxData('Latest Date').getText().then(function(value) {
        Utilities.isValidDDMMMYYYY(value);
      });
    });

    it('Verifying that dates in the information box is displayed in the format "DD-MMM-YYYY" for First Date', function() {
      TileOptionsRiskRiskModels.getInfoBoxData('First Date').getText().then(function(value) {
        Utilities.isValidDDMMMYYYY(value);
      });
    });

  });

  describe('Test Step ID: 565155', function() {

    it('Should examine the base currency in the information box is displayed as "U.S. Dollar"', function() {
      TileOptionsRiskRiskModels.getInfoBoxData('Base Currency').getText().then(function(value) {
        if (value !== 'U.S. Dollar') {
          expect(false).customError('Base currency in the information box is not displayed as "U.S. Dollar"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Blue" icon in selected section to close', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getItemByText('Barra US Long-Term Model (USE3L)');

      item.getIcons().then(function(icons) {
        icons.clickIcon('info');
      });
    });

  });

  describe('Test Step ID: 565156', function() {

    it('Should select "FactSet: Risk Indices Breakout" option from "Factor Grouping" dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('FactSet: Risk Indices Breakout', 'Factor Grouping');
    });

    it('Verifying "FactSet: Risk Indices Breakout" option is selected from "Factor Grouping" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('FactSet: Risk Indices Breakout', 'Factor Grouping');
    });

    var arrGroups = ['Dividend Yield', 'Volatility', 'Value', 'Trading Activity', 'Size Non-Linearity', 'Size', 'Non-Estimation Universe', 'Momentum',
      'Leverage', 'Growth', 'Earnings Yield', 'Earnings Variation', 'Currency Sensitivity', 'Industries',];
    var raiseError = 0;

    it('Verifying the Factor groups in the Visible Factors section', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getChildrenText().then(function(checkBoxes) {
        console.log(checkBoxes);
        if (checkBoxes.length !== arrGroups.length) {
          expect(false).customError('Factor groups length is not as expected in the Visible Factors');
          CommonFunctions.takeScreenShot();
        } else {
          checkBoxes.forEach(function(checkBox, index) {
            if (checkBox.text !== arrGroups[index]) {
              raiseError = 1;
            }
          });
        }
      }).then(function() {
        if (raiseError === 1) {
          expect(false).customError('Factor groups in the Visible Factors section is not as expected');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 565178', function() {

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile options');
  });

});
