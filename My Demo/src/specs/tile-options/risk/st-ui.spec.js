'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: st-ui', function() {

  describe('Test Step ID: Start Up Instructions', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 565157', function() {

    it('Should open PA3 Application with "Client:default_doc_OLD"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

  });

  describe('Test Step ID: 565158', function() {

    // Select Risk Models tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Risk Models', 'Risk');

  });

  describe('Test Step ID: 565159', function() {

    var names = ['Type', 'Factor', 'History Limit', 'Decay Rate Time', 'Decay Rate Event'];
    var values = ['Identifier', 'SP50.R', 'Risk Model Inception', '0.9800', '0.9400'];

    it('Should select "Stress Tests" under "Risk" from LHP and verify', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Stress Tests', 'Risk').select();

      // Verifying if "Stress Tests" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Stress Tests', 'Risk').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Stress Tests" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Clear All/X" button next selected section', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsRiskStressTests.xpathClearAllIcon).press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Clear All/X" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should type "decline" in the Available search field', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsRiskStressTests.xpathSearchBox).setText('decline');
    });

    it('Verifying if "decline" is typed in the Available search field', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsRiskStressTests.xpathSearchBox).getText().then(function(text) {
        if (text !== 'decline') {
          expect(false).customError('"decline" is not typed in the Available search field instead "' + text + '" found');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "S&P 500 30% Decline" from "Available" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('FactSet');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Factor Stress Tests').then(function(subGroup) {
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('Market').then(function(subGroup1) {
                  subGroup1.isExpanded().then(function(expanded) {
                    if (expanded) {
                      subGroup1.getItemByText('S&P 500 30% Decline').then(function(item) {
                        item.select();
                        item.isSelected().then(function(selected) {
                          if (!selected) {
                            expect(false).customError('"S&P 500 30% Decline" is not selected');
                            CommonFunctions.takeScreenShot();
                          }
                        });
                      });
                    } else {
                      expect(false).customError('"Market" is not expanded');
                      CommonFunctions.takeScreenShot();
                    }
                  });
                });
              } else {
                expect(false).customError('"Factor Stress Tests" is not expanded');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Factset" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on right arrow button to move "S&P 500 30% Decline" item to selected section', function() {
      ThiefHelpers.sendElementToSelectedSection('//*[contains(@data-qa-id,"options-header")]//following-sibling::*[not(contains(@class, "ng-hide"))]//tf-transferbox');
    });

    it('Verifying if "S&P 500 30% Decline" item is added to "Selected" section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('S&P 500 30% Decline') === -1) {
          expect(false).customError('"S&P 500 30% Decline" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    names.forEach(function(name, index) {
      it('Verifying if in the info box the "' + name + '" contains value as "' + values[index] + '"', function() {
        TileOptionsRiskStressTests.getInfoBoxData(name).getText().then(function(text) {
          if (text !== values[index]) {
            expect(false).customError('In the info box the "' + name + '" does not contain value as "' + values[index] + '" instead "' + text + '" found');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 565160', function() {

    var names = ['History Limit', 'Decay Rate Time', 'Decay Rate Event'];
    var values = ['Risk Model Inception', '0.9800', '0.9400'];

    // As per the Known issue RPD:34972794
    //var names = ['Type', 'Composite Stress Tests', 'History Limit', 'Decay Rate Time', 'Decay Rate Event'];
    //var values = ['Composite', 'S&P 500 30% Decline', 'Risk Model Inception', '0.9800', '0.9400'];

    it('Should click on "X" icon in the "Available" search box', function() {
      element(by.xpath(TileOptionsRiskStressTests.xpathSearchBoxDeleteIcon)).click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "X" icon in the "Available" search box');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should expand "Super_Client" in "Available" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Super_Client');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Super_Client" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // As per the Known issue RPD:34972794
    it('Verify if "MF1" is present under "Super_Client" in the Available section', function() {
      var arrElements = [];
      ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Super_Client').getChildrenText().then(function(columnName) {
        columnName.forEach(function(listItem) {
          arrElements.push(listItem.text);
        });
        if (arrElements.indexOf('MF1') > -1) {
          expect(false).customError('"MF1" is displayed under "Super_client"(Known issue RPD:34972794 fixed)');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    xit('Should select "MF1" from "Available" section', function() {
      TileOptionsRiskStressTests.getElementFromAvailableSection('Super_Client', 'MF1').click().then(function() {
      }, function() {
        expect(false).customError('Unable to select "MF1" from "Available" section');
        CommonFunctions.takeScreenShot();
      });
    });

    xit('Should click on right arrow button to move "MF1" item to selected section', function() {
      ThiefHelpers.sendElementToSelectedSection('//*[contains(@data-qa-id,"options-header")]//following-sibling::*[not(contains(@class, "ng-hide"))]//tf-transferbox');
    });

    xit('Verifying if "MF1" item is added to "Selected" section', function() {
      TileOptionsRiskStressTests.getElementFromSelectedContainer('MF1').isPresent().then(function(itemStatus) {
        if (!itemStatus) {
          expect(false).customError('"MF1" item is not added to "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    names.forEach(function(name, index) {
      it('Verifying if in the info box the "' + name + '" contains value as "' + values[index] + '"', function() {
        if (name !== 'Composite Stress Tests') {
          TileOptionsRiskStressTests.getInfoBoxData(name).getText().then(function(text) {
            if (text !== values[index]) {
              expect(false).customError('In the info box the "' + name + '" does not contain value as "' + values[index] + '" instead "' + text + '" found');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          element(by.xpath('//*[@data-qa-id="label-risk-st-' + name.toLowerCase().replace(/\s/g, '-') + '"]')).getText().then(function(text) {
            if (text.indexOf('S&P 500 30% Decline\nTSX 30% Decline') < 0) {
              expect(false).customError('In the info box the "' + name + '" does not contain value as "' + values[index] + '" instead "' + text + '" found');
              CommonFunctions.takeScreenShot();
            }
          });
        }
      });
    });

  });

  describe('Test Step ID: 565161', function() {

    it('Should select "QA Test for APT Europe" under "Client > APT Scenarios > APT Eastern Europe (EUR)" from "Available" section and perform double click', function() {
      // Getting the xpath of the Available section
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Client');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('APT Scenarios').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('APT Eastern Europe (EUR)').then(function(subGroup1) {
                  subGroup1.expand();
                  subGroup1.isExpanded().then(function(expanded) {
                    if (expanded) {
                      subGroup1.getItemByText('QA Test for APT Europe').then(function(item) {
                        item.select();
                        item.isSelected().then(function(selected) {
                          if (!selected) {
                            expect(false).customError('"QA Test for APT Europe" is not selected');
                            CommonFunctions.takeScreenShot();
                          }else {
                            item.doubleClick();
                          }
                        });
                      });
                    } else {
                      expect(false).customError('"APT Eastern Europe (EUR)" is not expanded');
                      CommonFunctions.takeScreenShot();
                    }
                  });
                });
              } else {
                expect(false).customError('"APT Scenarios" is not expanded');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Client" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "QA Test for APT Europe" item is added to "Selected" section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('QA Test for APT Europe') === -1) {
          expect(false).customError('"QA Test for APT Europe" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 565162', function() {

    var names = ['Type', 'Start Date', 'End Date'];
    var values = ['Extreme Event Stress Test', '8/15/1998', '8/15/1998'];

    it('Should collapse "Client" in "Available" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Client');
      group.collapse();

      group.isExpanded().then(function(flag) {
        if (flag) {
          expect(false).customError('"Client" is not collapsed in "Available" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "LTCM (8/1998)" under "FactSet > Extreme Event Stress Tests" from "Available" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('FactSet');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Extreme Event Stress Tests').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getItemByText('LTCM (8/1998)').then(function(item) {
                  item.select();
                  item.isSelected().then(function(selected) {
                    if (!selected) {
                      expect(false).customError('"LTCM (8/1998)" is not selected');
                      CommonFunctions.takeScreenShot();
                    }else {
                      item.doubleClick();
                    }
                  });
                });
              } else {
                expect(false).customError('"Extreme Event Stress Tests" is not expanded');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"FactSet" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "LTCM (8/1998)" item is added to "Selected" section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('LTCM (8/1998)') === -1) {
          expect(false).customError('"LTCM (8/1998)" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    names.forEach(function(name, index) {
      it('Verifying if in the info box the "' + name + '" contains value as "' + values[index] + '"', function() {
        TileOptionsRiskStressTests.getInfoBoxData(name).getText().then(function(text) {
          if (text !== values[index]) {
            expect(false).customError('In the info box the "' + name + '" does not contain value as "' + values[index] + '" instead "' + text + '" found');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 565163', function() {

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile options');

  });

});
