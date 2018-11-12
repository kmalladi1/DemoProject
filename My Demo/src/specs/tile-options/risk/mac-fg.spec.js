'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: mac-fg', function() {

  // Global Variables
  var count = 0;
  var screenShot = 0;

  describe('Test Step ID: Start Up Instructions', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 642443', function() {

    it('Should open PA3 Application with "Client:/default_doc_auto"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if "Large Cap Core Test vs Russell 1000" header is displayed', function() {
      PA3MainPage.getHeader().getText().then(function(headerName) {
        if (headerName !== 'Large Cap Core Test vs Russell 1000') {
          expect(false).customError('"Large Cap Core Test vs Russell 1000" header is not displayed' +
            'instead "' + headerName + '" is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 642444', function() {

    var factors = ['Credit Spread', 'Convertible Stock', 'Euro-Sovereign Credit Spread', 'Hard Currency Credit Spread'];

    // Select Risk Models tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Risk Models', 'Risk');

    it('Should double click on "FactSet Multi-Asset Class Model (USD)" in Available section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathAvailableContainer).getGroupByText('FactSet');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getItemByText('FactSet Multi-Asset Class Model (USD)').then(function(item) {
            item.select();
            item.doubleClick();
          });
        }
      });
    });

    it('Verifying "FactSet Multi-Asset Class Model (USD)" is added to selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('FactSet Multi-Asset Class Model (USD)') === -1) {
          expect(false).customError('"FactSet Multi-Asset Class Model (USD)" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "None" option from "Factor Grouping" dropdown if not already selected', function() {
      ThiefHelpers.getDropDownSelectClassReference('Factor Grouping', undefined).getSelectedText().then(function(selectedItem) {
        if (selectedItem !== 'None') {
          ThiefHelpers.getDropDownSelectClassReference('Factor Grouping', undefined).selectItemByText('None');
        }
      });
    });

    it('Verifying if "FactSet Multi-Asset Class Model (USD)" is selected in "Selected" section', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getItemByText('FactSet Multi-Asset Class Model (USD)');

      item.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"FactSet Multi-Asset Class Model (USD)" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    factors.forEach(function(factor) {
      it('Verifying if "' + factor + '" factor is displayed in "Visible" factors section', function() {
        ThiefHelpers.getVirtualChecklistClassReference().getItemByText(factor).getText().then(function() {
        }, function() {
          expect(false).customError(factor + ' factor is not available in the "Visible Factor" section');
          CommonFunctions.takeScreenShot();
        });
      });
    });

  });

  describe('Test Step ID: 642445', function() {

    var raiseError = 0;
    var factorsArray = ['Currency', 'Equity - Fundamental', 'Equity - Sector', 'Equity - Regional', 'Equity - Economic',
      'Equity - Statistical', 'Commodity', 'Returns Based', 'Australia Govn\'t Curve', 'Australia Libor Curve',
      'Brazil Govn\'t Curve', 'Canada Govn\'t Curve', 'Canada Libor Curve', 'Chile Govn\'t Curve', 'China Govn\'t Curve', 'China Offshore Curve',
      'Colombia Govn\'t Curve', 'Czech Govn\'t Curve', 'Denmark Govn\'t Curve', 'Denmark Libor Curve', 'Euro Govn\'t Curve',
      'Euro Libor Curve', 'Hong Kong Govn\'t Curve', 'Hong Kong Libor Curve', 'Hungary Govn\'t Curve', 'India Governm' +
      'ent Curve', 'Indonesia Govn\'t Curve', 'Israel Govn\'t Curve', 'Japan Govn\'t Curve', 'Japan Libor Curve',
      'Malaysia Govn\'t Curve', 'Mexico Govn\'t Curve', 'New Zealand Govn\'t Curve', 'New Zealand Libor Curve',
      'Nigeria Govn\'t Curve', 'Norway Govn\'t Curve', 'Norway Libor Curve', 'Peru Govn\'t Curve', 'Philippi' +
      'ne Govn\'t Curve', 'Polish Govn\'t Curve', 'Romania Govn\'t Curve', 'Russia Govn\'t Curve', 'Singapo' +
      're Govn\'t Curve', 'Singapore Libor Curve', 'South Africa Govn\'t Curve', 'South Korea Govn\'t Curve',
      'Sweden Govn\'t Curve', 'Sweden Libor Curve', 'Switzerland Govn\'t Curve', 'Switzerland Libor Curve', 'Taiw' +
      'an Govn\'t Curve', 'Thailand Govn\'t Curve', 'Turkey Govn\'t Curve', 'UK Govn\'t Curve', 'UK Libor Curve',
      'US Govn\'t Curve', 'US Libor Curve', 'US Municipal Curve', 'Quasi-Governmental', 'Muni', 'Inflation Protected',
      'MBS/ABS/CMBS', 'Euro-Sovereign Spread', 'Hard Currency Credit Spread', 'Convertible Stock', 'Credit Spread',];
    var containerGroupings = [];

    it('Should click on "Factor Grouping" dropdown in options pane', function() {
      ThiefHelpers.getDropDownSelectClassReference('Factor Grouping', undefined).open();
    });

    it('Should select "FactSet: Standard - Single Level" option from "Factor Grouping" dropdown', function() {
      ThiefHelpers.getDropDownSelectClassReference('Factor Grouping', undefined).selectItemByText('FactSet: Standa' +
        'rd - Single Level');
    });

    it('verifying if count of "Factor Grouping" is "66" and verify the listed factor groupings present in the factors section', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getChildrenText().then(function(checkBoxes) {
        console.log(checkBoxes.length);
        if (checkBoxes.length !== factorsArray.length) {
          expect(false).customError('Factor groups length is not as expected in the Visible Factors');
          CommonFunctions.takeScreenShot();
        } else {
          factorsArray.forEach(function(factorGroup, index) {
            ThiefHelpers.getVirtualChecklistClassReference().getGroupByIndex(index).getText().then(function(text) {
              console.log(text + ' - ' + index);

              // Storing Factors section groupings for future verification.
              containerGroupings.push(text);
            });
          });
        }
      }).then(function() {
        if (raiseError === 1) {
          expect(false).customError('Factor groups in the Visible Factors section is not as expected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if any "Factor Grouping" appeared more then once', function() {
      var factorsLength = containerGroupings.length;
      containerGroupings.forEach(function(factors) {
        for (var i = 0; i < factorsLength; i++) {
          if (factors === factorsArray[i]) {
            count++;
          }
        }

        if (count > 1) {
          expect(false).customError(factors + ' is appeared more than once that is ' + count + ' times');
          screenShot++;
        }

        count = 0;
      });
      if (screenShot > 0) {
        CommonFunctions.takeScreenShot();
      }
    });

    it('Verifying if 66 Factor Groupings listed( in containerGroupings array variable) are available as in "Visible" factor section', function() {
      factorsArray.forEach(function(factors) {
        if (containerGroupings.indexOf(factors) === -1) {
          screenShot++;
          expect(false).customError(factors + ' grouping is not present in the Factors sections');
        }
      });
      if (screenShot > 1) {
        CommonFunctions.takeScreenShot();
      }
    });

  });

  describe('Test Step ID: 643247', function() {

    it('Should expand "Credit Spread" groupings factor in "Visible" factors section', function() {
      var group = ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Credit Spread');
      group.isExpanded().then(function(status) {
        if (!status) {
          group.expand();
        } else {
          expect(false).customError('"Credit Spread" groupings factor is already expanded in "Visible" factors section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Credit Spread" factor is displayed under "Credit Spread" groupings factor', function() {
      var group = ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Credit Spread');

      group.getItemByText('Credit Spread').then(function(item) {
        item.getText().then(function(text) {
          if (text !== 'Credit Spread') {
            expect(false).customError('"Credit Spread" factor is not displayed under "Credit Spread" groupings factor');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should expand "Convertible Stock" groupings factor in "Visible" factors section', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Convertible Stock').isExpanded().then(function(status) {
        if (!status) {
          ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Convertible Stock').expand();
        } else {
          expect(false).customError('"Convertible Stock" groupings factor is already expanded in "Visible" factors section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Convertible Stock" factor is displayed under "Convertible Stock" groupings factor', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Convertible Stock').getItemByText('Convertible Stock').then(function(itemRef) {
        itemRef.getText().then(function(itemText) {
          if (itemText !== 'Convertible Stock') {
            expect(false).customError('"Convertible Stock" factor is not displayed under "Convertible Stock" groupings factor');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should expand "Euro-Sovereign Spread" groupings factor in "Visible" factors section', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Euro-Sovereign Spread').isExpanded().then(function(status) {
        if (!status) {
          ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Euro-Sovereign Spread').expand();
        } else {
          expect(false).customError('"Euro-Sovereign Spread" groupings factor is already expanded' +
            ' in "Visible" factors section');
          screenShot++;
        }
      });
    });

    it('Verifying if "Euro-Sovereign Credit Spread" is displayed under "Euro-Sovereign Spread" grouping', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Euro-Sovereign Spread').getItemByText('Euro-Sovereign Credit Spread').then(function(itemRef) {
        itemRef.getText().then(function(itemText) {
          if (itemText !== 'Euro-Sovereign Credit Spread') {
            expect(false).customError('"Euro-Sovereign Credit Spread" factor is not displayed under "Euro-Sovereign ' +
              'Spread" groupings factor');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should expand "Hard Currency Credit Spread" groupings factor in "Visible" factors section', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Hard Currency Credit Spread').isExpanded().then(function(status) {
        if (!status) {
          ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Hard Currency Credit Spread').expand();
        } else {
          expect(false).customError('"Hard Currency Credit Spread" groupings factor is already expanded ' +
            'in "Visible" factors section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Hard Currency Credit Spread" factor is displayed under "Hard Currency Credit Spread" grouping factor',
      function() {
        ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Hard Currency Credit Spread').getItemByText('Hard Currency Credit Spread').then(function(itemRef) {
          itemRef.getText().then(function(itemText) {
            if (itemText !== 'Hard Currency Credit Spread') {
              expect(false).customError('"Hard Currency Credit Spread" factor is not displayed under' +
                ' "Hard Currency Credit Spread" groupings factor');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

  });

  describe('Test Step ID: 643248', function() {

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile options');

  });

});
