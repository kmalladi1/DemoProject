'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: ri-uneven-fg', function() {

  var arrOFFactorsUnderStyle = ['Exchange Rate Sensitivity', 'Growth', 'Leverage', 'Liquidity', 'Medium-Term Momentum', 'Short-Term Momentum', 'Size', 'Value', 'Volatility'];
  var arrOFFactorsUnderSector = ['Consumer Discretionary', 'Consumer Staples', 'Energy', 'Financials', 'Health Care', 'Industrials', 'Informaiton Technology', 'Materials', 'Telecommunications Services'];
  var arrOFFactorsUnderUtilities = ['Electric Utilities', 'Gas Utilities', 'Independent Power Producers & Energy Traders', 'Multi-Utilities', 'Water Utilities'];
  var arrOFFactorsUnderCountry = ['Canada', 'Japan', 'United Kingdom', 'United States'];
  var arrOFFactorsUnderEuropeexUK = ['Switzerland', 'Sweden', 'Norway', 'Denmark'];
  var arrOFFactorsUnderEMU = ['Spain', 'Portugal', 'Netherlands', 'Italy', 'Austria', 'Belgium', 'Finland', 'France', 'Germany', 'Ireland'];
  var arrOFFactorsUnderOtherCountry = ['Bulgaria', 'Chile'];

  var arrOfChildFactors = [arrOFFactorsUnderStyle, arrOFFactorsUnderSector, arrOFFactorsUnderUtilities, arrOFFactorsUnderCountry,
    arrOFFactorsUnderEuropeexUK, arrOFFactorsUnderEMU, arrOFFactorsUnderOtherCountry,];

  var expandGroupingsAndVerifyFactors = function(factorsPath) {
    var groups = factorsPath.split('|');
    var subGroup;
    var checklistRef = ThiefHelpers.getVirtualChecklistClassReference();

    if (groups.length === 1) {
      subGroup = checklistRef.getGroupByText(groups[0]);
      subGroup.isExpanded().then(function(expanded) {
        if (!expanded) {
          subGroup.expand();
        }
      });

      // Verifying if checklist is expanded
      subGroup.isExpanded().then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"' + groups[0] + '" checkbox is not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });

    } else if (groups.length === 2) {
      subGroup = checklistRef.getGroupByText(groups[0]);
      subGroup.isExpanded().then(function(expanded) {
        if (!expanded) {
          subGroup.expand();
        }
      });

      // Verifying if checklist is expanded
      subGroup.isExpanded().then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"' + groups[0] + '" checkbox is not expanded.');
          CommonFunctions.takeScreenShot();
        } else {
          subGroup.getGroupByText(groups[1]).then(function(subGroup1) {
            subGroup1.expand();

            // Verifying if checklist is expanded
            subGroup1.isExpanded().then(function(expanded) {
              if (!expanded) {
                expect(false).customError('"' + groups[1] + '" checkbox is not expanded.');
                CommonFunctions.takeScreenShot();
              }
            });

          });
        }
      });

    } else if (groups.length === 3) {
      subGroup = checklistRef.getGroupByText(groups[0]);
      subGroup.isExpanded().then(function(expanded) {
        if (!expanded) {
          subGroup.expand();
        }
      });

      subGroup.getGroupByText(groups[1]).then(function(subGroup1) {
        subGroup1.expand();

        // Verifying if checklist is expanded
        subGroup1.isExpanded().then(function(expanded) {
          if (!expanded) {
            expect(false).customError('"' + groups[1] + '" checkbox is not expanded.');
            CommonFunctions.takeScreenShot();
          } else {
            subGroup1.getGroupByText(groups[2]).then(function(subGroup2) {
              subGroup2.expand();

              // Verifying if checklist is expanded
              subGroup2.isExpanded().then(function(expanded) {
                if (!expanded) {
                  expect(false).customError('"' + groups[2] + '" checkbox is not expanded.');
                  CommonFunctions.takeScreenShot();
                }
              });
            });
          }
        });
      });

    }

  };

  describe('Test Step ID: 721384', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:;pa3;risk;ri_uneven_fg"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('ri-uneven-fg');
    });

    // Verify if the report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Exposures');

    var arrOfGroupsToBeCollapsed = ['Style', 'Market', 'Local'];

    arrOfGroupsToBeCollapsed.forEach(function(securityName) {
      it('Verifying if "' + securityName + '" group is in collapsed state in "Exposures"', function() {
        PA3MainPage.isTreeExpanded('Exposures', securityName, 'grid-canvas grid-canvas-top grid-canvas-left').then(function() {
        }, function(status) {
          if (status) {
            expect(false).customError('"' + securityName + '" goup is expanded.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var arrOfGroupsToBeExpanded = ['Sector', 'Country', 'Currency'];

    arrOfGroupsToBeExpanded.forEach(function(securityName) {
      it('Verifying if "' + securityName + '" group is expanded in "Exposures"', function() {
        PA3MainPage.isTreeExpanded('Exposures', securityName, 'grid-canvas grid-canvas-top grid-canvas-left').then(function() {
        }, function(status) {
          if (!status) {
            expect(false).customError('"' + securityName + '" goup is expanded.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 721385', function() {

    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Exposures', 'Security Name');

    it('Should click on the "Risk Models" tab under "Risk" category in the LHP of tile options', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Risk Models', 'Risk').select();

      // Verifying if "Risk Models" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Risk Models', 'Risk').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Risk Models" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('verifying if "Client: Uneven_Factor_Grouping" is displayed under "Factor Grouping"', function() {
      ThiefHelpers.verifySelectedDropDownText('Client: Uneven_Factor_Grouping', 'Factor Grouping');
    });

    it('Verify if "All" checklist is checked', function() {
      ThiefHelpers.verifyStatusOfCheckbox('All', undefined, 'IsChecked');
    });

    var factorsArrayItem = ['Style', 'Market', 'Local', 'Sector', 'Country', 'Currency'];
    factorsArrayItem.forEach(function(checklistName) {
      it('Verify if "' + checklistName + '" checklist is checked', function() {
        ThiefHelpers.getVirtualChecklistClassReference().getGroupByText(checklistName).isChecked().then(function(checked) {
          if (!checked) {
            expect(false).customError('"' + checklistName + '" check box is not checked');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Verify if "' + checklistName + '" is collapsed', function() {
        ThiefHelpers.getVirtualChecklistClassReference().getGroupByText(checklistName).isExpanded().then(function(expanded) {
          if (expanded) {
            expect(false).customError(checklistName + 'is expanded.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 721386', function() {

    it('Should expand "Style" factor group from factor section', function() {
      expandGroupingsAndVerifyFactors('Style');
    });

    it('Verify if "' + arrOFFactorsUnderStyle + '" are displayed under "Style" grouping', function() {
      var arrOfFactors = [];
      var subgroup = ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Style');
      subgroup.getChildrenText().then(function(childElementsArr) {
        for (var i = 0; i < childElementsArr.length; ++i) {
          arrOfFactors.push(childElementsArr[i].text);
        }

        arrOFFactorsUnderStyle.forEach(function(factor, index) {
          if (arrOfFactors.indexOf(arrOFFactorsUnderStyle[index]) === -1) {
            expect(false).customError(arrOFFactorsUnderStyle[index] + ' is not displayed under "Style" factor grouping');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should expand "Sector|Utilities" factor group from factor section', function() {
      expandGroupingsAndVerifyFactors('Sector|Utilities');
    });

    it('Verify if "' + arrOFFactorsUnderSector + '" are displayed under "Sector" grouping', function() {
      var arrOfFactors = [];
      var subgroup = ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Sector');
      subgroup.getChildrenText().then(function(childElementsArr) {
        for (var i = 0; i < childElementsArr.length; ++i) {
          arrOfFactors.push(childElementsArr[i].text);
        }

        arrOFFactorsUnderSector.forEach(function(factor, index) {
          if (arrOfFactors.indexOf(arrOFFactorsUnderSector[index]) === -1) {
            expect(false).customError(arrOFFactorsUnderSector[index] + ' is not displayed under "Sector" factor grouping');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verify if "' + arrOFFactorsUnderUtilities + '" are displayed under "Sector|Utilities" grouping', function() {
      var arrOfFactors = [];
      var subgroup = ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Sector');
      subgroup.getGroupByText('Utilities').then(function(subGroup1) {
        subGroup1.getChildrenText().then(function(childElementsArr) {
          for (var i = 0; i < childElementsArr.length; ++i) {
            arrOfFactors.push(childElementsArr[i].text);
          }

          arrOFFactorsUnderUtilities.forEach(function(factor, index) {
            if (arrOfFactors.indexOf(arrOFFactorsUnderUtilities[index]) === -1) {
              expect(false).customError(arrOFFactorsUnderUtilities[index] + ' is not displayed under "Utilities" factor grouping');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Should expand "Country|Europe ex UK|EMU" factor group from factor section', function() {
      expandGroupingsAndVerifyFactors('Country|Europe ex UK|EMU');
    });

    it('Verify if "' + arrOFFactorsUnderCountry + '" are displayed under "Country" grouping', function() {
      var arrOfFactors = [];
      var subgroup = ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Country');
      subgroup.getChildrenText().then(function(childElementsArr) {
        for (var i = 0; i < childElementsArr.length; ++i) {
          arrOfFactors.push(childElementsArr[i].text);
        }

        arrOFFactorsUnderCountry.forEach(function(factor, index) {
          if (arrOfFactors.indexOf(arrOFFactorsUnderCountry[index]) === -1) {
            expect(false).customError(arrOFFactorsUnderCountry[index] + ' is not displayed under "Country" factor grouping');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verify if "' + arrOFFactorsUnderEuropeexUK + '" are displayed under "Country|Europe ex UK" grouping', function() {
      var arrOfFactors = [];
      var subgroup = ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Country');
      subgroup.getGroupByText('Europe ex UK').then(function(subGroup1) {
        subGroup1.getChildrenText().then(function(childElementsArr) {
          for (var i = 0; i < childElementsArr.length; ++i) {
            arrOfFactors.push(childElementsArr[i].text);
          }

          arrOFFactorsUnderEuropeexUK.forEach(function(factor, index) {
            if (arrOfFactors.indexOf(arrOFFactorsUnderEuropeexUK[index]) === -1) {
              expect(false).customError(arrOFFactorsUnderEuropeexUK[index] + ' is not displayed under "Europe ex UK" factor grouping');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verify if "' + arrOFFactorsUnderEMU + '" are displayed under "Country|Europe ex UK|EMU" grouping', function() {
      var arrOfFactors = [];
      var subgroup = ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Country');
      subgroup.getGroupByText('Europe ex UK').then(function(subGroup1) {
        subGroup1.getGroupByText('EMU').then(function(subGroup2) {
          subGroup2.getChildrenText().then(function(childElementsArr) {
            for (var i = 0; i < childElementsArr.length; ++i) {
              arrOfFactors.push(childElementsArr[i].text);
            }

            arrOFFactorsUnderEMU.forEach(function(factor, index) {
              if (arrOfFactors.indexOf(arrOFFactorsUnderEMU[index]) === -1) {
                expect(false).customError(arrOFFactorsUnderEMU[index] + ' is not displayed under "EMU" factor grouping');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        });
      });
    });

    it('Should expand "Country|Other Country" factor group from factor section', function() {
      expandGroupingsAndVerifyFactors('Country|Other Country');
    });

    it('Verify if "' + arrOFFactorsUnderOtherCountry + '" are displayed under "Country|Other Country" grouping', function() {
      var arrOfFactors = [];
      var subgroup = ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Country');
      subgroup.getGroupByText('Other Country').then(function(subGroup1) {
        subGroup1.getChildrenText().then(function(childElementsArr) {
          for (var i = 0; i < childElementsArr.length; ++i) {
            arrOfFactors.push(childElementsArr[i].text);
          }

          arrOFFactorsUnderOtherCountry.forEach(function(factor, index) {
            if (arrOfFactors.indexOf(arrOFFactorsUnderOtherCountry[index]) === -1) {
              expect(false).customError(arrOFFactorsUnderOtherCountry[index] + ' is not displayed under "Other Country" factor grouping');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

  });

  describe('Test Step ID: 721387', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile options');

    // Verify if the report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Exposures');

    var arrOfElementsToExpand = ['Style', 'Sector|Utilities', 'Country|Europe ex UK|EMU', 'Country|Other Country'];
    var arrOfElementsToExclude = ['Sector', 'Country|Europe ex UK', 'Country'];

    arrOfElementsToExpand.forEach(function(elementPath, index) {
      it('Should expand "' + elementPath + '" in "Exposures" report', function() {
        var arrElements = elementPath.split('|');

        if (arrElements.length < 1) {
          PA3MainPage.expandTreeInCalculatedReport('Exposures', elementPath, undefined, 'top');
        } else {
          // Scrolling the row into view
          SlickGridFunctions.getRowIndex('Exposures', arrElements[arrElements.length - 1], '').then(function(rowNum) {
            SlickGridFunctions.scrollRowToTop('Exposures', rowNum - index);
          });
          PA3MainPage.expandTreeInCalculatedReport('Exposures', elementPath, arrOfElementsToExclude[index - 1], 'top');
        }
      });

      it('Verifying that "' + elementPath + '" is expanded', function() {
        PA3MainPage.checkIfTreeExpandedInCalculatedReport('Exposures', elementPath, 'grid-canvas grid-canvas-top grid-canvas-left');

        //waiting for the elements to load in the browser.
        browser.sleep(3000);
      });
    });

    var arrOfExpandedItems = ['Style', 'Sector', 'Sector|Utilities', 'Country', 'Country|Europe ex UK', 'Country|Europe ex UK|EMU', 'Country|Other Country'];

    arrOfExpandedItems.forEach(function(elementPath, index) {
      it('Verify if expected values are displayed under "' + elementPath + '"', function() {
        var needScreenShot = 0;
        var compareValuesOfReport = function(arrReportValues, arrExpectedValues) {
          for (var i = 0; i < arrExpectedValues.length; i++) {
            if (arrReportValues[i] !== arrExpectedValues[i]) {
              expect(false).customError('Expected "' + arrExpectedValues[i] + '" but Found"' + arrReportValues[i] + '"');
              needScreenShot++;
            }

            if (needScreenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        };

        SlickGridFunctions.getElementsFromTree('Exposures', '', elementPath, '').then(function(elements) {
          compareValuesOfReport(elements, arrOfChildFactors[index]);
        });
      });
    });
  });

});
