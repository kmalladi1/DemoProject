'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: ri-fg-show-hide1', function() {

  var getDataView = function() {
    var defer = protractor.promise.defer();
    var promise = defer.promise;
    browser.driver.executeScript('return $(".tf-slick-grid").data("$tfSlickGridController")' +
      '.grid.getData().getItems()').then(function(dataview) {
      defer.fulfill(dataview);
    });

    return promise;
  };

  var reports = ['Factor Groups Only', 'Risk Indices with selected Style Factors', 'Risk Indices Only', 'Two Layer and Show/Hide'];
  var FG_1 = [];
  var factorGroups = ['Risk Indices', 'Industries', 'Market'];

  describe('Test Step ID: Startup Instructions', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 677956', function() {

    it('Should open PA3 Application with "Client:/Pa3/Risk/FACTOR_GROUP_SHOW_HIDE"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('factor-group-show-hide');
    });

    reports.forEach(function(report) {
      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(report);
    });

    // Verify the option from the lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Weights', 'Risk Summary', undefined, 'isSelected');

    it('Verifying if the report displays four tiles', function() {
      PA3MainPage.getAllTilesFromReport().count().then(function(count) {
        if (count !== 4) {
          expect(false).customError('The report is not displaying four tiles; Found: ' + count);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Factor Groups Only" tile is present in the top left corner of the report', function() {
      PA3MainPage.getMatrixTile(1, 1, 1).getText().then(function(val) {
        if (val !== 'Factor Groups Only') {
          expect(false).customError('"Factor Groups Only" is not present in the top left corner of the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Risk Indices with selected Style Factors" tile is present in the top right corner of the report', function() {
      PA3MainPage.getMatrixTile(1, 2, 1).getText().then(function(val) {
        if (val !== 'Risk Indices with selected Style Factors') {
          expect(false).customError('"Risk Indices with selected Style Factors" is not present in the top right corner of the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Risk Indices Only" tile is present in the bottom left corner of the report', function() {
      PA3MainPage.getMatrixTile(1, 1, 2).getText().then(function(val) {
        if (val !== 'Risk Indices Only') {
          expect(false).customError('"Risk Indices Only" is not present in the bottom left corner of the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Two Layer and Show/Hide" tile is present in the bottom right corner of the report', function() {
      PA3MainPage.getMatrixTile(1, 2, 2).getText().then(function(val) {
        if (val !== 'Two Layer and Show/Hide') {
          expect(false).customError('"Two Layer and Show/Hide" is not present in the bottom right corner of the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 677957', function() {

    // Select Other Options tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Factor Groups Only', 'Other Options', 'Risk');

    it('Should check "Show Top Level Factor Groups Only" check box if not already checked', function() {
      ThiefHelpers.getCheckBoxClassReference('Show Top Level Factor Groups Only').isChecked().then(function(checked) {
        if (!checked) {
          ThiefHelpers.getCheckBoxClassReference('Show Top Level Factor Groups Only').check();
        }
      });
    });

    it('Verifying if the "Show Top Level Factor Groups Only" check box is checked', function() {
      ThiefHelpers.getCheckBoxClassReference('Show Top Level Factor Groups Only').isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Show Top Level Factor Groups Only" check box is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 677958', function() {

    it('Should click on "Risk Models" under "Risk" tab from LHP to select', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Risk Models', 'Risk').select();

      // Verifying if "Risk Models" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Risk Models', 'Risk').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Risk Models" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Recording 3 factor group names for later verification', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getChildrenText().then(function(valArray) {
        valArray.forEach(function(factorGroups) {
          FG_1.push(factorGroups.text);
        });
      });
    });

    it('Should click on "+" icon on the top right corner of "Visible Factors" section', function() {
      TileOptionsRiskRiskModels.getVisibleFactorsExpandAndCollapseAllButton('Expand').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if there are "3" "Visible Factors" groups', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getChildrenText().then(function(valArray) {
        if (valArray.length !== 3) {
          expect(false).customError('"3" "Visible Factors" groups are not present; Found: ' + valArray.length);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    factorGroups.forEach(function(group) {

      it('Verifying if the "' + group + '" is present in the "Visible Factors" groups', function() {
        ThiefHelpers.getVirtualChecklistClassReference().getGroupByText(group).getText().then(function() {
        }, function() {
          expect(false).customError('"' + group + '" is not present in the "Visible Factor" groups');
          CommonFunctions.takeScreenShot();
        });
      });

      it('Verifying if "' + group + '" checkbox is checked', function() {
        ThiefHelpers.getVirtualChecklistClassReference().getGroupByText(group).isChecked().then(function(checked) {
          if (!checked) {
            expect(false).customError('"' + group + '" checkbox is not checked');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    factorGroups.forEach(function(group) {

      var childElements = [];

      it('Verifying if the "' + group + '" group under "Visible Factors" section contains factors', function() {
        ThiefHelpers.getVirtualChecklistClassReference().getGroupByText(group).getChildrenText().then(function(valArray) {
          if (valArray.length <= 0) {
            expect(false).customError('"' + group + '" group under "Visible Factors" section does not contains factors');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 677959', function() {

    var count = 0;

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Factor Groups Only');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Factor Groups Only');

    it('Verifying if the "3" factor groups in "Visible Factors" section which are saved in "FG_1" are displayed under each group ' +
      'in the "Factor Groups Only" slickgrid', function() {
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Factor Groups Only', 1, 'slick-pane slick-pane-top ' +
        'slick-pane-left').each(function(elementref) {
        elementref.getText().then(function(ele) {
          SlickGridFunctions.getElementsFromTree('Factor Groups Only', '', ele, '').then(function(array) {
            array.forEach(function(factor, index) {
              if (FG_1.length === array.length) {
                if (factor !== FG_1[index]) {
                  expect(false).customError('Element under "' + ele + '" group is not matching with the element under ' +
                    '"Visible Factors" section; Expected: "' + FG_1[index] + '"; Found: "' + factor + '"');
                  CommonFunctions.takeScreenShot();
                }
              } else {
                if (ele !== '% Factor Contr. To Tot. Risk - Cov*2') {
                  expect(false).customError('Number of child elements under "' + ele + '" group is not matching with ' +
                    'expected number of elements in "Visible Factors" section; Found: ' + array.length);
                  CommonFunctions.takeScreenShot();
                } else if (ele === '% Factor Contr. To Tot. Risk - Cov*2') {
                  if (factor === 'Covariance * 2') {
                    count = count + 1;
                  } else if (factor !== FG_1[index]) {
                    expect(false).customError('Element under "' + ele + '" group is not matching with the element under ' +
                      '"Visible Factors" section; Expected: "' + FG_1[index] + '"; Found: "' + factor + '"');
                    CommonFunctions.takeScreenShot();
                  }
                }
              }
            });
          });
        });
      });
    });

    it('Verifying if "Covariance * 2" is present under "% Factor Contr. To Tot. Risk - Cov*2" group as exception', function() {
      if (count === 0) {
        expect(false).customError('"Covariance * 2" is not present under "% Factor Contr. To Tot. Risk - Cov*2" group as exception');
        CommonFunctions.takeScreenShot();
      }
    });

  });

  describe('Test Step ID: 677960', function() {

    // Select Other Options tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Risk Indices Only', 'Other Options', 'Risk');

    it('Verifying if the "Show Top Level Factor Groups Only" check box is checked', function() {
      ThiefHelpers.getCheckBoxClassReference('Show Top Level Factor Groups Only').isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Show Top Level Factor Groups Only" check box is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 677961', function() {

    it('Should click on "Risk Models" under "Risk" tab from LHP to select', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Risk Models', 'Risk').select();

      // Verifying if "Risk Models" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Risk Models', 'Risk').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Risk Models" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    factorGroups.forEach(function(group) {

      it('Verifying if the "' + group + '" is present in the "Visible Factors" groups', function() {
        ThiefHelpers.getVirtualChecklistClassReference().getGroupByText(group).getText().then(function() {
        }, function() {
          expect(false).customError('"' + group + '" is not present in the "Visible Factor" groups');
          CommonFunctions.takeScreenShot();
        });
      });

    });

    it('Verifying if "Risk Indices" checkbox is checked', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Risk Indices').isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Risk Indices" checkbox is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var factors = ['Industries', 'Market'];

    factors.forEach(function(group) {

      it('Verifying if "' + group + '" checkbox is not checked', function() {
        ThiefHelpers.getVirtualChecklistClassReference().getGroupByText(group).isChecked().then(function(checked) {
          if (checked) {
            expect(false).customError('"' + group + '" checkbox is checked');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 677972', function() {

    it('Should click on "+" icon on the top right corner of "Visible Factors" section', function() {
      TileOptionsRiskRiskModels.getVisibleFactorsExpandAndCollapseAllButton('Expand').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if there are "3" "Visible Factors" groups', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getChildrenText().then(function(array) {
        if (array.length !== 3) {
          expect(false).customError('"3" "Visible Factors" groups are not present; Found: ' + array.length);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    factorGroups.forEach(function(group) {

      var childElements = [];

      it('Verifying if the "' + group + '" group under "Visible Factors" section contains factors', function() {
        ThiefHelpers.getVirtualChecklistClassReference().getGroupByText(group).getChildrenText().then(function(valArray) {
          if (valArray.length <= 0) {
            expect(false).customError('"' + group + '" group under "Visible Factors" section does not contains factors');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Verifying if all the factors under "Risk Indices" grouping are checked', function() {
      var group = ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Risk Indices');
      group.getChildrenText().then(function(childArr) {
        childArr.forEach(function(childItems, index) {
          group.getItemByText(childArr[index].text).then(function(childItemRef) {
            childItemRef.isChecked().then(function(flag) {
              if (!flag) {
                expect(false).customError('"' + childArr[index].text + '" item under "Risk Indices" factor group is unchecked');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        });
      });
    });

  });

  describe('Test Step ID: 677962', function() {

    var count = 0;

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Risk Indices Only');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Risk Indices Only');

    it('Verifying if the "Risk Indices" factor is displayed under each group in the "Risk Indices Only" slickgrid', function() {
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Risk Indices Only', 1, 'slick-pane slick-pane-top ' +
        'slick-pane-left').each(function(elementref) {
        elementref.getText().then(function(ele) {
          SlickGridFunctions.getElementsFromTree('Risk Indices Only', '', ele, '').then(function(array) {
            array.forEach(function(factor) {
              if (array.length === 1) {
                if (factor !== 'Risk Indices') {
                  expect(false).customError('Element under "' + ele + '" group is not matching with the element under ' +
                    '"Visible Factors" section; Expected: "Risk Indices"; Found: "' + factor + '"');
                  CommonFunctions.takeScreenShot();
                }
              } else {
                if (ele !== '% Factor Contr. To Tot. Risk - Cov*2') {
                  expect(false).customError('Number of child elements under "' + ele + '" group is not matching with ' +
                    'expected number of elements in "Visible Factors" section; Found: ' + array.length);
                  CommonFunctions.takeScreenShot();
                } else if (ele === '% Factor Contr. To Tot. Risk - Cov*2') {
                  if (factor === 'Covariance * 2') {
                    count = count + 1;
                  } else if (factor !== 'Risk Indices') {
                    expect(false).customError('Element under "' + ele + '" group is not matching with the element under ' +
                      '"Visible Factors" section; Expected: "Risk Indices"; Found: "' + factor + '"');
                    CommonFunctions.takeScreenShot();
                  }
                }
              }
            });
          });
        });
      });
    });

    it('Verifying if "Covariance * 2" is present under "% Factor Contr. To Tot. Risk - Cov*2" group as exception', function() {
      if (count === 0) {
        expect(false).customError('"Covariance * 2" is not present under "% Factor Contr. To Tot. Risk - Cov*2" group as exception');
        CommonFunctions.takeScreenShot();
      }
    });

    it('Verifying if "Risk Indices" is not expandable', function() {
      getDataView().then(function(dataView) {
        dataView.forEach(function(element) {
          if (element[1] === 'Risk Indices') {

            // Verifying if it is expandable
            if (element.expanded !== undefined) {
              expect(false).customError('Risk indices is expandable');
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

  });

  describe('Test Step ID: 677963', function() {

    // Select Other Options tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Risk Indices with selected Style Factors', 'Other Options', 'Risk');

    it('Verifying if the "Show Top Level Factor Groups Only" check box is unchecked', function() {
      ThiefHelpers.getCheckBoxClassReference('Show Top Level Factor Groups Only').isChecked().then(function(checked) {
        if (checked) {
          expect(false).customError('"Show Top Level Factor Groups Only" check box is checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 677964', function() {

    it('Should click on "Risk Models" under "Risk" tab from LHP to select', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Risk Models', 'Risk').select();

      // Verifying if "Risk Models" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Risk Models', 'Risk').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Risk Models" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "+" icon next to "Risk Indices" in "Visible Factors"', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Risk Indices').isExpanded().then(function(expanded) {
        if (!expanded) {
          ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Risk Indices').expand();
        }
      });
    });

    it('Verifying if the "Risk Indices" group is expanded', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Risk Indices').isExpanded().then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Risk Indices" group is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var checkedFactors = ['US Growth', 'US Size', 'US Dividend Yield', 'US Book-to-Price', 'US Earnings Yield', 'US Beta'];

    checkedFactors.forEach(function(factorChecked) {

      it('Verifying if the "' + factorChecked + '" factor under "Risk Indices" grouping are checked', function() {
        var group = ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Risk Indices');
        group.getItemByText(factorChecked).then(function(subFactor) {
          subFactor.isChecked().then(function(checked) {
            if (!checked) {
              expect(false).customError('"' + factorChecked + '" factor in "Risk Indices" is not checked');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

    });

  });

  describe('Test Step ID: 677965', function() {

    var count = 0;
    var count1 = 0;
    var factors = ['US Growth', 'US Size', 'US Dividend Yield', 'US Book-to-Price', 'US Earnings Yield', 'US Beta'];
    var factorgroups = [];

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Risk Indices with selected Style Factors');

    it('Recording the factor group names in first level', function() {
      browser.driver.executeScript(function() {
        var elementarray = [];
        var slickObject = $('.tf-slick-grid:eq(2)').data('$tfSlickGridController');

        slickObject.grid.getData().getItems().forEach(function(dataItem) {
          if (dataItem.level === 0) {
            elementarray.push(dataItem[0]);
          }
        });

        return elementarray;
      }).then(function(valuearray) {
        factorgroups = valuearray;
      });
    });

    it('Verifying if the "Risk Indices" group is displayed under each group in the "Risk Indices in selected ' +
      'Style Factors" slick grid', function() {
      factorgroups.forEach(function(ele) {
        SlickGridFunctions.getElementsFromTree('Risk Indices with selected Style Factors', '', ele, '').then(function(array) {
          array.forEach(function(factor) {
            if (array.length === 1) {
              if (factor !== 'Risk Indices') {
                expect(false).customError('Element under "' + ele + '" group is not matching with the element under ' +
                  '"Visible Factors" section; Expected: "Risk Indices"; Found: "' + factor + '"');
                CommonFunctions.takeScreenShot();
              }
            } else {
              if (ele !== '% Factor Contr. To Tot. Risk - Cov*2') {
                expect(false).customError('Number of child elements under "' + ele + '" group is not matching with ' +
                  'expected number of elements in "Visible Factors" section; Found: ' + array.length);
                CommonFunctions.takeScreenShot();
              } else if (ele === '% Factor Contr. To Tot. Risk - Cov*2') {
                if (factor === 'Covariance * 2') {
                  count = count + 1;
                } else if (factor !== 'Risk Indices') {
                  expect(false).customError('Element under "' + ele + '" group is not matching with the element under ' +
                    '"Visible Factors" section; Expected: "Risk Indices"; Found: "' + factor + '"');
                  CommonFunctions.takeScreenShot();
                }
              }
            }
          });
        });
      });
    });

    it('Verifying if "Covariance * 2" is present under "% Factor Contr. To Tot. Risk - Cov*2" group as exception', function() {
      if (count === 0) {
        expect(false).customError('"Covariance * 2" is not present under "% Factor Contr. To Tot. Risk - Cov*2" group as exception');
        CommonFunctions.takeScreenShot();
      }
    });

    it('Verifying if "Risk Indices" is not expandable', function() {
      getDataView().then(function(dataView) {
        dataView.forEach(function(element) {
          if (element[1] === 'Risk Indices') {

            // Verifying if it is expandable
            if (element.expanded === undefined) {
              expect(false).customError('Risk indices is not expandable');
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    it('Verifying if some factors are displayed under each group under "Risk Indices"', function() {
      factorgroups.forEach(function(ele) {
        SlickGridFunctions.getElementsFromTree('Risk Indices with selected Style Factors', '', ele + '|Risk Indices', '').then(function(array) {
          array.forEach(function(factor, index) {
            if (factors.length === array.length) {
              if (factor !== factors[index]) {
                expect(false).customError('Element under "' + ele + '|Risk Indices" group is not matching with the expected; ' +
                  'Expected: "' + factors[index] + '"; Found: "' + factor + '"');
                CommonFunctions.takeScreenShot();
              }
            } else {
              if (ele !== '% Factor Contr. To Tot. Risk - Cov*2') {
                expect(false).customError('Number of child elements under "' + ele + '| Risk Indices" group is not matching with ' +
                  'expected; Found: ' + array.length);
                CommonFunctions.takeScreenShot();
              } else if (ele === '% Factor Contr. To Tot. Risk - Cov*2') {
                if (factor === 'Covariance * 2') {
                  count1 = count1 + 1;
                } else if (factor !== factors[index]) {
                  expect(false).customError('Element under "' + ele + '| Risk Indices" group is not matching with the expected; ' +
                    'Expected: "' + factors[index] + '"; Found: "' + factor + '"');
                  CommonFunctions.takeScreenShot();
                }
              }
            }
          });
        });
      });
    });

    it('Verifying if "Covariance * 2" is present under "% Factor Contr. To Tot. Risk - Cov*2" group as exception', function() {
      if (count1 === 0) {
        expect(false).customError('"Covariance * 2" is not present under "% Factor Contr. To Tot. Risk - Cov*2" group as exception');
        CommonFunctions.takeScreenShot();
      }
    });

  });

  describe('Test Step ID: 677966', function() {

    // Select Other Options tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Two Layer and Show/Hide', 'Other Options', 'Risk');

    it('Verifying if the "Show Top Level Factor Groups Only" check box is unchecked', function() {
      ThiefHelpers.getCheckBoxClassReference('Show Top Level Factor Groups Only').isChecked().then(function(checked) {
        if (checked) {
          expect(false).customError('"Show Top Level Factor Groups Only" check box is checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 677967', function() {

    it('Should click on "Risk Models" under "Risk" tab from LHP to select', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Risk Models', 'Risk').select();

      // Verifying if "Risk Models" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Risk Models', 'Risk').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Risk Models" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "+" icon on the top right corner of "Visible Factors" section', function() {
      TileOptionsRiskRiskModels.getVisibleFactorsExpandAndCollapseAllButton('Expand').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if except "US Beta" and "US Non-linear Beta" all the factors under "A > A.1" grouping are not checked', function() {
      var excludeItems = ['US Beta', 'US Non-linear Beta'];
      var parentGroup = ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('A');
      parentGroup.getGroupByText('A.1').then(function(subGroup) {
        subGroup.getChildrenText().then(function(childArr) {
          childArr.forEach(function(childItems) {
            if (excludeItems.indexOf(childItems.text) === -1) {
              subGroup.getItemByText(childItems.text).then(function(itemRef) {
                itemRef.isChecked().then(function(flag) {
                  if (flag) {
                    expect(false).customError('"' + childItems.text + '" item under "A.1" factor group is checked off');
                    CommonFunctions.takeScreenShot();
                  }
                });
              });
            } else {
              subGroup.getItemByText(childItems.text).then(function(itemRef) {
                itemRef.isChecked().then(function(flag) {
                  if (!flag) {
                    expect(false).customError('"' + childItems.text + '" item under "A.1" factor group is unchecked');
                    CommonFunctions.takeScreenShot();
                  }
                });
              });
            }
          });
        });
      });
    });

    it('Verifying if except "US Book-to-Price" all the factors under "A > A.2" grouping are not checked', function() {
      var excludeItems = ['US Beta', 'US Non-linear Beta'];
      var parentGroup = ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('A');
      parentGroup.getGroupByText('A.2').then(function(subGroup) {
        subGroup.getChildrenText().then(function(childArr) {
          childArr.forEach(function(childItems) {
            if (childItems.text !== 'US Book-to-Price') {
              subGroup.getItemByText(childItems.text).then(function(itemRef) {
                itemRef.isChecked().then(function(flag) {
                  if (flag) {
                    expect(false).customError('"' + childItems.text + '" item under "A.2" factor group is checked off');
                    CommonFunctions.takeScreenShot();
                  }
                });
              });
            } else {
              subGroup.getItemByText(childItems.text).then(function(itemRef) {
                itemRef.isChecked().then(function(flag) {
                  if (!flag) {
                    expect(false).customError('"' + childItems.text + '" item under "A.2" factor group is un-checked');
                    CommonFunctions.takeScreenShot();
                  }
                });
              });
            }
          });
        });
      });
    });

    var factorsInB = ['US Dividend Yield', 'US Earnings Yield', 'US Growth', 'US Leverage', 'US Liquidity', 'US Momentum', 'US Residual Volatility', 'US Size', 'US Non-linear Size'];

    it('Verifying if except some factors mentioned in the array all the other factors under "B" grouping are un-checked', function() {
      var parentGroup = ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('B');
      parentGroup.getChildrenText().then(function(childArr) {
        childArr.forEach(function(childItems) {
          if (factorsInB.indexOf(childItems.text) !== -1) {
            parentGroup.getItemByText(childItems.text).then(function(itemRef) {
              itemRef.isChecked().then(function(flag) {
                if (!flag) {
                  expect(false).customError('"' + childItems.text + '" item under "B" factor group is unchecked');
                  CommonFunctions.takeScreenShot();
                }
              });
            });
          } else {
            parentGroup.getItemByText(childItems.text).then(function(itemRef) {
              itemRef.isChecked().then(function(flag) {
                if (flag) {
                  expect(false).customError('"' + childItems.text + '" item under "B" factor group is checked off');
                  CommonFunctions.takeScreenShot();
                }
              });
            });
          }
        });
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Two Layer and Show/Hide');

    var groupings = ['Active Exposure', '% Factor Contr. to Tot. Risk', '% Factor Contr. To Tot. Risk - Cov*2'];
    var groupings1 = ['A', 'B'];
    var groupingsA = ['A.1', 'A.2'];
    var groupingsB = ['US Dividend Yield', 'US Earnings Yield', 'US Growth', 'US Leverage', 'US Liquidity', 'US Momentum', 'US Residual Volatility', 'US Size', 'US Non-linear Size'];

    groupings.forEach(function(group) {

      it('Verifying if factor groups that are checked in the "Visible Factors" section are displayed in the slick grid ' +
        'under "' + group + '"', function() {
        SlickGridFunctions.getElementsFromTree('Two Layer and Show/Hide', '', group, '').then(function(elements) {
          elements.forEach(function(element, index) {
            if (group !== '% Factor Contr. To Tot. Risk - Cov*2') {
              if (element !== groupings1[index]) {
                expect(false).customError('"' + groupings1[index] + '" is not displayed under slick grid; Found: ' + element);
                CommonFunctions.takeScreenShot();
              }
            } else {
              if (index !== elements.length - 1) {
                if (element !== groupings1[index]) {
                  expect(false).customError('"' + groupings1[index] + '" is not displayed under slick grid; Found: ' + element);
                  CommonFunctions.takeScreenShot();
                }
              } else {
                if (element !== 'Covariance * 2') {
                  expect(false).customError('"Covariance * 2" is not displayed under slick grid; Found: ' + element);
                  CommonFunctions.takeScreenShot();
                }
              }
            }
          });
        });
      });

      it('Verifying if the second level of factors that are checked in the "Visible Factors" section are displayed ' +
        'in the slick grid under "' + group + '"', function() {
        groupings1.forEach(function(group1) {
          SlickGridFunctions.getElementsFromTree('Two Layer and Show/Hide', '', group + '|' + group1, '').then(function(elements) {
            elements.forEach(function(element, index) {
              if (group1 === 'A') {
                if (group !== '% Factor Contr. To Tot. Risk - Cov*2') {
                  if (element !== groupingsA[index]) {
                    expect(false).customError('"' + groupingsA[index] + '" is not displayed under slick grid; Found: ' + element);
                    CommonFunctions.takeScreenShot();
                  }
                } else {
                  if (index !== elements.length - 1) {
                    if (element !== groupingsA[index]) {
                      expect(false).customError('"' + groupingsA[index] + '" is not displayed under slick grid; Found: ' + element);
                      CommonFunctions.takeScreenShot();
                    }
                  } else {
                    if (element !== 'Covariance * 2') {
                      expect(false).customError('"Covariance * 2" is not displayed under slick grid; Found: ' + element);
                      CommonFunctions.takeScreenShot();
                    }
                  }
                }
              } else if (group1 === 'B') {
                if (group !== '% Factor Contr. To Tot. Risk - Cov*2') {
                  if (element !== groupingsB[index]) {
                    expect(false).customError('"' + groupingsB[index] + '" is not displayed under slick grid; Found: ' + element);
                    CommonFunctions.takeScreenShot();
                  }
                } else {
                  if (index !== elements.length - 1) {
                    if (element !== groupingsB[index]) {
                      expect(false).customError('"' + groupingsB[index] + '" is not displayed under slick grid; Found: ' + element);
                      CommonFunctions.takeScreenShot();
                    }
                  } else {
                    if (element !== 'Covariance * 2') {
                      expect(false).customError('"Covariance * 2" is not displayed under slick grid; Found: ' + element);
                      CommonFunctions.takeScreenShot();
                    }
                  }
                }
              }
            });
          });
        });
      });

      it('Verifying if the third level of factors that are checked in the "Visible Factors" section are displayed ' +
        'in the slick grid under "' + group + '"', function() {
        groupingsA.forEach(function(groupA) {
          SlickGridFunctions.getElementsFromTree('Two Layer and Show/Hide', '', group + '|A|' + groupA, '').then(function(elements) {
            elements.forEach(function(element, index) {
              if (groupA === 'A.1') {
                if (group !== '% Factor Contr. To Tot. Risk - Cov*2') {
                  if (element !== 'US Beta' && element !== 'US Non-linear Beta') {
                    expect(false).customError('"US Beta" or "US Non-linear Beta" is not displayed under slick grid; Found: ' + element);
                    CommonFunctions.takeScreenShot();
                  }
                } else {
                  if (index !== elements.length - 1) {
                    if (element !== 'US Beta' && element !== 'US Non-linear Beta') {
                      expect(false).customError('"US Beta" or "US Non-linear Beta" is not displayed under slick grid; Found: ' + element);
                      CommonFunctions.takeScreenShot();
                    }
                  } else {
                    if (element !== 'Covariance * 2') {
                      expect(false).customError('"Covariance * 2" is not displayed under slick grid; Found: ' + element);
                      CommonFunctions.takeScreenShot();
                    }
                  }
                }
              } else if (groupA === 'A.2') {
                if (group !== '% Factor Contr. To Tot. Risk - Cov*2') {
                  if (element !== 'US Book-to-Price') {
                    expect(false).customError('"US Book-to-Price" is not displayed under slick grid; Found: ' + element);
                    CommonFunctions.takeScreenShot();
                  }
                } else {
                  if (index !== elements.length - 1) {
                    if (element !== 'US Book-to-Price') {
                      expect(false).customError('"US Book-to-Price" is not displayed under slick grid; Found: ' + element);
                      CommonFunctions.takeScreenShot();
                    }
                  } else {
                    if (element !== 'Covariance * 2') {
                      expect(false).customError('"Covariance * 2" is not displayed under slick grid; Found: ' + element);
                      CommonFunctions.takeScreenShot();
                    }
                  }
                }
              }
            });
          });
        });
      });

    });

  });

  describe('Test Step ID: 677968', function() {

    // Verify the option from the lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Weights', 'Risk Exposures', true, 'isSelected');

    it('Should click on "refresh" button', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Risk Exposures');

    var groupings = ['A', 'B'];
    var groupingsA = ['A.1', 'A.2'];
    var groupingsB = ['US Dividend Yield', 'US Earnings Yield', 'US Growth', 'US Leverage', 'US Liquidity', 'US Momentum', 'US Residual Volatility', 'US Size', 'US Non-linear Size'];
    var groupingsA1 = ['US Beta', 'US Non-linear Beta'];

    groupings.forEach(function(group, index) {

      it('Verifying if the "' + group + '" is present in the 1st level of the "Risk Exposures" slick grid', function() {
        PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Risk Exposures', 1, 'slick-pane slick-pane-top ' +
          'slick-pane-left').get(index).getText().then(function(element) {
          if (group !== element) {
            expect(false).customError('"' + group + '" is not present in the 1st level of the "Risk Exposures" ' +
              'slick grid; Found: ' + element);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    groupingsA.forEach(function(groupA, index) {

      it('Verifying if the "' + groupA + '" is present in the second level under "A" grouping in the ' +
        '"Risk Exposures" slick grid', function() {
        SlickGridFunctions.getElementsFromTree('Risk Exposures', '', 'A', '').then(function(elements) {
          if (groupA !== elements[index]) {
            expect(false).customError('"' + groupA + '" is not present in the second level under "A" grouping in the ' +
              '"Risk Exposures" slick grid; Found: ' + elements[index]);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    groupingsA1.forEach(function(groupA1, index) {

      it('Verifying if the "' + groupA1 + '" is present in the second level under "A>A.1" grouping in the ' +
        '"Risk Exposures" slick grid', function() {
        SlickGridFunctions.getElementsFromTree('Risk Exposures', '', 'A|A.1', '').then(function(elements) {
          if (groupA1 !== elements[index]) {
            expect(false).customError('"' + groupA1 + '" is not present in the third level under "A>A.1" grouping in the ' +
              '"Risk Exposures" slick grid; Found: ' + elements[index]);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Verifying if the "US Book-to-Price" is present in the second level under "A>A.2" grouping in the ' +
      '"Risk Exposures" slick grid', function() {
      SlickGridFunctions.getElementsFromTree('Risk Exposures', '', 'A|A.2', '').then(function(elements) {
        if (elements[0] !== 'US Book-to-Price') {
          expect(false).customError('"US Book-to-Price" is not present in the third level under "A>A.2" grouping in the ' +
            '"Risk Exposures" slick grid; Found: ' + elements[0]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    groupingsB.forEach(function(groupB, index) {

      it('Verifying if the "' + groupB + '" is present in the second level under "B" grouping in the ' +
        '"Risk Exposures" slick grid', function() {
        SlickGridFunctions.getElementsFromTree('Risk Exposures', '', 'B', '').then(function(elements) {
          if (groupB !== elements[index]) {
            expect(false).customError('"' + groupB + '" is not present in the second level under "B" grouping in the ' +
              '"Risk Exposures" slick grid; Found: ' + elements[index]);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    var columnNames = ['Ending Portfolio Exposure', 'Ending Benchmark Exposure', 'Ending Active Exposure'];
    var val = ['1.82', '1.92', '-0.10'];

    columnNames.forEach(function(column, index) {

      it('Verifying if the "' + column + '" column is displayed in the slick grid', function() {
        SlickGridFunctions.getColumnNames('Risk Exposures').then(function(col) {
          if (column !== col[index + 1]) {
            expect(false).customError('"' + column + '" column is not displayed in the slick grid');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Verifying if the "Total" row for "' + column + '" column is "' + val[index] + '"', function() {
        SlickGridFunctions.getCellReference('Risk Exposures', 'Total', '', column).then(function(reference) {
          reference.getText().then(function(text) {
            if (text !== val[index]) {
              expect(false).customError('"Total" row for "' + column + '" column is not set as "' + val[index] + '"; Found: ' + text);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

    });

  });

  describe('Test Step ID: 677969', function() {

    // Verify the option from the lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Weights', 'Exposure Report', true, 'isSelected');

    it('Verifying if the "Factor Groups Only" tile is present in the top left corner of the report', function() {
      PA3MainPage.getMatrixTile(1, 1, 1).getText().then(function(val) {
        if (val !== 'Factor Groups Only') {
          expect(false).customError('"Factor Groups Only" is not present in the top left corner of the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Security Name" grouping is present in "Factor Groups Only" tile', function() {
      PA3MainPage.getGroupingsHyperLink('Factor Groups Only').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Security Name" grouping did not present in "Factor Groups Only" tile');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Factor Groups Only" tile is grouped by "Security Name"', function() {
      PA3MainPage.getGroupingsHyperLink('Factor Groups Only').getText().then(function(text) {
        if (text.indexOf('Security Name') < 0) {
          expect(false).customError('"Factor Groups Only" tile did not group by "Security Name"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the date range of "Factor Groups Only" tile is displayed', function() {
      PA3MainPage.getDateHyperLink('Factor Groups Only').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Factor Groups Only" tile did not display date range');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the date range of "Factor Groups Only" tile is displayed as "30-JUN-2016"', function() {
      PA3MainPage.getDateHyperLink('Factor Groups Only').getText().then(function(value) {
        if (value !== '30-JUN-2016') {
          expect(false).customError('The date range in "Factor Groups Only" tile did not set to ' +
            '"30-JUN-2016"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Factor" groupings are not present in the report', function() {
      PA3MainPage.getAllExpandCollapseButtonsFromCalculatedReport('Factor Groups Only', 'slick-pane slick-pane-bottom ' +
        'slick-pane-left').each(function(reference) {
        reference.isPresent().then(function(present) {
          if (present) {
            Utilities.scrollElementToVisibility(PA3MainPage.getAllExpandCollapseButtonsFromCalculatedReport('Factor Groups Only',
              'slick-pane slick-pane-bottom slick-pane-left'));
            expect(false).customError('"Factor" groupings are present in the report');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var multiheader1 = ['% Factor Risk', '% Factor Risk Cov Isolated'];
    var multiheader2 = ['Risk Indices', 'Industries', 'Market', 'Risk Indices', 'Industries', 'Market', 'Covariance * 2'];

    multiheader1.forEach(function(column) {

      it('Verifying if the "' + column + '" header is present in the "Factor Groups Only" slick grid', function() {
        PA3MainPage.getAllMultiHeaderNamesOfSpecifiedLevel('Factor Groups Only', 1).then(function(names) {
          if (names.indexOf(column) < 0) {
            expect(false).customError('"' + column + '" is not displayed in first level of multi-header section');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    multiheader2.forEach(function(multiheader, index) {

      it('Verifying if the "' + multiheader + '" header is present in the "Factor Groups Only" slick grid', function() {
        PA3MainPage.getAllMultiHeaderNamesOfSpecifiedLevel('Factor Groups Only', 2).then(function(array) {
          if (array[index] !== multiheader) {
            expect(false).customError('"' + multiheader + '" is not displayed in second level of multi-header ' +
              'section; Found: ' + array[index]);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    var multiheaderPath = ['% Factor Risk|Risk Indices', '% Factor Risk|Industries', '% Factor Risk|Market'];
    var colindex = 0;
    var values = ['8.79', '26.04', '--'];

    multiheaderPath.forEach(function(multiheader, index) {

      it('Verifying if the "' + multiheader + '" multiheader contain "% Factor Contr. to Tot. Risk"', function() {
        PA3MainPage.getColumnNumberRangeForMultiHeader('Factor Groups Only', multiheader).then(function(range) {
          colindex = range[0];
          SlickGridFunctions.getColumnNames('Factor Groups Only').then(function(array) {
            if (array[range[0]] !== '% Factor Contr. to Tot. Risk') {
              expect(false).customError('"' + multiheader + '" multiheader does not contain "% Factor Contr. to Tot. Risk"');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

      it('Verifying if the "' + multiheader + '|% Factor Contr. to Tot. Risk" column for "Total" row is set to ' +
        '"' + values[index] + '"', function() {
        // Scrolling
        browser.driver.executeScript('return $( ".tf-slick-grid:eq(0)" ).data( "$tfSlickGridController" )' +
          '.grid.scrollCellIntoView( arguments[0], arguments[1] ) ', 0, colindex);
        PA3MainPage.getCellValueForMultiHeaderColumn('Factor Groups Only', 'Total', colindex, 'grid-canvas grid-canvas-top ' +
          'grid-canvas-left', 'grid-canvas grid-canvas-top grid-canvas-right').then(function(colValue) {
          if (colValue !== values[index]) {
            expect(false).customError('' + multiheader + '|% Factor Contr. to Tot. Risk" column for "Total" row is not ' +
              'set to "' + values[index] + '"; Found: ' + colValue);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    var multiheaderPath1 = ['% Factor Risk Cov Isolated|Risk Indices', '% Factor Risk Cov Isolated|Industries', '% Factor Risk Cov Isolated|Market', '% Factor Risk Cov Isolated|Covariance * 2'];
    var values2 = ['7.98', '25.23', '--', '1.62'];

    multiheaderPath1.forEach(function(multiheader, index) {

      it('Verifying if the "' + multiheader + '" multiheader contain "% Factor Contr. To Tot. Risk - Cov*2"', function() {
        PA3MainPage.getColumnNumberRangeForMultiHeader('Factor Groups Only', multiheader).then(function(range) {
          colindex = range[0];
          SlickGridFunctions.getColumnNames('Factor Groups Only').then(function(array) {
            if (array[range[0]] !== '% Factor Contr. To Tot. Risk - Cov*2') {
              expect(false).customError('"' + multiheader + '" multiheader does not contain "% Factor Contr. To Tot. Risk - Cov*2"');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

      it('Verifying if the "' + multiheader + '|% Factor Contr. To Tot. Risk - Cov*2" column for "Total" row is ' +
        'set to "' + values2[index] + '"', function() {
        // Scrolling
        browser.driver.executeScript('return $( ".tf-slick-grid:eq(0)" ).data( "$tfSlickGridController" )' +
          '.grid.scrollCellIntoView( arguments[0], arguments[1] ) ', 0, colindex);
        PA3MainPage.getCellValueForMultiHeaderColumn('Factor Groups Only', 'Total', colindex, 'grid-canvas ' +
          'grid-canvas-top grid-canvas-left', 'grid-canvas grid-canvas-top grid-canvas-right').then(function(colValue) {
          if (colValue !== values2[index]) {
            expect(false).customError('' + multiheader + '|% Factor Contr. To Tot. Risk - Cov*2" column for "Total" row is not ' +
              'set to "' + values2[index] + '"; Found: ' + colValue);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 677970', function() {

    it('Verifying if the "Risk Indices with selected Style Factor" tile is present in the top right corner of the report', function() {
      PA3MainPage.getMatrixTile(1, 2).getText().then(function(val) {
        if (val !== 'Risk Indices with selected Style Factor') {
          expect(false).customError('"Risk Indices with selected Style Factor" is not present in the top right corner of the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Security Name" grouping is present in "Risk Indices with selected Style Factor" tile', function() {
      PA3MainPage.getGroupingsHyperLink('Risk Indices with selected Style Factor').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Security Name" grouping did not present in "Risk Indices with selected Style Factor" tile');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Risk Indices with selected Style Factor" tile is grouped by "Security Name"', function() {
      PA3MainPage.getGroupingsHyperLink('Risk Indices with selected Style Factor').getText().then(function(text) {
        if (text.indexOf('Security Name') < 0) {
          expect(false).customError('"Risk Indices with selected Style Factor" tile did not group by "Security Name"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the date range of "Risk Indices with selected Style Factor" tile is displayed', function() {
      PA3MainPage.getDateHyperLink('Risk Indices with selected Style Factor').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Risk Indices with selected Style Factor" tile did not display date range');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the date range of "Risk Indices with selected Style Factor" tile is displayed as "30-JUN-2016"', function() {
      PA3MainPage.getDateHyperLink('Risk Indices with selected Style Factor').getText().then(function(value) {
        if (value !== '30-JUN-2016') {
          expect(false).customError('The date range in "Risk Indices with selected Style Factor" tile did not set to ' +
            '"30-JUN-2016"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Factor" groupings are not present in the report', function() {
      PA3MainPage.getAllExpandCollapseButtonsFromCalculatedReport('Risk Indices with selected Style Factor', 'slick-pane ' +
        'slick-pane-bottom slick-pane-left').each(function(reference) {
        reference.isPresent().then(function(present) {
          if (present) {
            Utilities.scrollElementToVisibility(PA3MainPage.getAllExpandCollapseButtonsFromCalculatedReport('Risk Indices ' +
              'with selected Style Factor', 'slick-pane slick-pane-bottom slick-pane-left'));
            expect(false).customError('"Factor" groupings are present in the report');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var multiheader1 = ['% Factor Risk', '% Factor Risk Cov Isolated'];
    var multiheader2 = ['US Growth', 'US Size', 'US Dividend Yield',
      'US Book-to-Price', 'US Earnings Yield', 'US Beta', 'US Growth', 'US Size', 'US Dividend Yield', 'US Book-to-Price',
      'US Earnings Yield', 'US Beta', 'Covariance * 2',];

    multiheader1.forEach(function(column, index) {

      it('Verifying if the "' + column + '" header is present in the "Risk Indices with selected Style Factor" slick grid', function() {
        PA3MainPage.getAllMultiHeaderNamesOfSpecifiedLevel('Risk Indices with selected Style Factor', 1).then(function(names) {
          if (names.indexOf(column) < 0) {
            expect(false).customError('"' + column + '" is not displayed in first level of multi-header section');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Verifying if the "Risk Indices" header is present in the "Risk Indices with selected Style Factor" slick grid', function() {
        PA3MainPage.getAllMultiHeaderNamesOfSpecifiedLevel('Risk Indices with selected Style Factor', 2).then(function(array) {
          if (array[index] !== 'Risk Indices') {
            expect(false).customError('"Risk Indices" is not displayed in second level of multi-header ' +
              'section; Found: ' + array[index]);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    multiheader2.forEach(function(multiheader, index) {

      it('Verifying if the "' + multiheader + '" header is present in the "Risk Indices with selected Style Factor" slick grid', function() {
        PA3MainPage.getAllMultiHeaderNamesOfSpecifiedLevel('Risk Indices with selected Style Factor', 3).then(function(array) {
          if (array[index] !== multiheader) {
            expect(false).customError('"' + multiheader + '" is not displayed in second level of multi-header ' +
              'section; Found: ' + array[index]);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    var columnArray = ['', 'Port. Weight', 'Bench. Weight', 'Difference', '% Factor Contr. to Tot. Risk', '% Factor Contr. to Tot. Risk',
      '% Factor Contr. to Tot. Risk', '% Factor Contr. to Tot. Risk', '% Factor Contr. to Tot. Risk', '% Factor Contr. to Tot. Risk',
      '% Factor Contr. To Tot. Risk - Cov*2', '% Factor Contr. To Tot. Risk - Cov*2', '% Factor Contr. To Tot. Risk - Cov*2',
      '% Factor Contr. To Tot. Risk - Cov*2', '% Factor Contr. To Tot. Risk - Cov*2', '% Factor Contr. To Tot. Risk - Cov*2',
      '% Factor Contr. To Tot. Risk - Cov*2',];

    columnArray.forEach(function(column, index) {

      it('Verifying if the "' + column + '" column is present in the "Risk Indices with selected Style Factor" slick grid', function() {
        SlickGridFunctions.getColumnNames('Risk Indices with selected Style Factor').then(function(array) {
          if (array[index] !== column) {
            expect(false).customError('"' + column + '" column is not present in the "Risk Indices with selected Style ' +
              'Factor" slick grid' + array[index]);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    var values = ['1.16', '0.17', '1.87', '-0.13', '0.96', '1.31', '0.62', '0.04', '1.44', '0.14', '0.31', '1.41', '1.82'];

    values.forEach(function(val, index) {

      it('Verifying if the "' + multiheader2[index] + '|' + columnArray[index + 4] + '" column for "Total" row is set to "' + val + '"', function() {

        // Scrolling
        browser.driver.executeScript('return $( ".tf-slick-grid:eq(2)" ).data( "$tfSlickGridController" )' +
          '.grid.scrollCellIntoView( arguments[0], arguments[1] ) ', 0, index + 4);
        PA3MainPage.getCellValueForMultiHeaderColumn('Risk Indices with selected Style Factor', 'Total', index + 4, 'grid-canvas ' +
          'grid-canvas-top grid-canvas-left', 'grid-canvas grid-canvas-top grid-canvas-right').then(function(colValue) {
          if (colValue !== val) {
            expect(false).customError('"' + multiheader2[index] + '|' + columnArray[index + 4] + '" column for ' +
              '"Total" row is not set to "' + val + '"; Found: ' + colValue);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 677971', function() {

    it('Verifying if the "Risk Indices Only" tile is present in the bottom left corner of the report', function() {
      PA3MainPage.getMatrixTile(1, 1, 2).getText().then(function(val) {
        if (val !== 'Risk Indices Only') {
          expect(false).customError('"Risk Indices Only" is not present in the bottom left corner of the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Security Name" grouping is present in "Risk Indices Only" tile', function() {
      PA3MainPage.getGroupingsHyperLink('Risk Indices Only').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Security Name" grouping did not present in "Risk Indices Only" tile');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Risk Indices Only" tile is grouped by "Security Name"', function() {
      PA3MainPage.getGroupingsHyperLink('Risk Indices Only').getText().then(function(text) {
        if (text.indexOf('Security Name') < 0) {
          expect(false).customError('"Risk Indices Only" tile did not group by "Security Name"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the date range of "Risk Indices Only" tile is displayed', function() {
      PA3MainPage.getDateHyperLink('Risk Indices Only').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Risk Indices Only" tile did not display date range');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the date range of "Risk Indices Only" tile is displayed as "30-JUN-2016"', function() {
      PA3MainPage.getDateHyperLink('Risk Indices Only').getText().then(function(value) {
        if (value !== '30-JUN-2016') {
          expect(false).customError('The date range in "Risk Indices Only" tile did not set to ' +
            '"30-JUN-2016"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Factor" groupings are not present in the report', function() {
      PA3MainPage.getAllExpandCollapseButtonsFromCalculatedReport('Risk Indices Only', 'slick-pane slick-pane-bottom ' +
        'slick-pane-left').each(function(reference) {
        reference.isPresent().then(function(present) {
          if (present) {
            Utilities.scrollElementToVisibility(PA3MainPage.getAllExpandCollapseButtonsFromCalculatedReport('Risk Indices Only',
              'slick-pane slick-pane-bottom slick-pane-left'));
            expect(false).customError('"Factor" groupings are present in the report');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var multiheader1 = ['% Factor Risk', '% Factor Risk Cov Isolated'];
    var multiheader2 = ['Risk Indices', 'Risk Indices', 'Covariance * 2'];

    multiheader1.forEach(function(column) {

      it('Verifying if the "' + column + '" header is present in the "Risk Indices Only" slick grid', function() {
        PA3MainPage.getAllMultiHeaderNamesOfSpecifiedLevel('Risk Indices Only', 1).then(function(names) {
          if (names.indexOf(column) < 0) {
            expect(false).customError('"' + column + '" is not displayed in first level of multi-header section');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    multiheader2.forEach(function(multiheader, index) {

      it('Verifying if the "' + multiheader + '" header is present in the "Risk Indices Only" slick grid', function() {
        PA3MainPage.getAllMultiHeaderNamesOfSpecifiedLevel('Risk Indices Only', 2).then(function(array) {
          if (array[index] !== multiheader) {
            expect(false).customError('"' + multiheader + '" is not displayed in second level of multi-header ' +
              'section; Found: ' + array[index]);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    var colindex = 0;

    it('Verifying if the "% Factor Risk|Risk Indices" multiheader contain "% Factor Contr. to Tot. Risk"', function() {
      PA3MainPage.getColumnNumberRangeForMultiHeader('Risk Indices Only', '% Factor Risk|Risk Indices').then(function(range) {
        colindex = range[0];
        SlickGridFunctions.getColumnNames('Risk Indices Only').then(function(array) {
          if (array[range[0]] !== '% Factor Contr. to Tot. Risk') {
            expect(false).customError('"% Factor Risk|Risk Indices" multiheader does not contain "% Factor Contr. to Tot. Risk"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if the "% Factor Risk|Risk Indices|% Factor Contr. to Tot. Risk" column for "Total" row is set to ' +
      '"8.79"', function() {
      // Scrolling
      browser.driver.executeScript('return $( ".tf-slick-grid:eq(0)" ).data( "$tfSlickGridController" )' +
        '.grid.scrollCellIntoView( arguments[0], arguments[1] ) ', 0, 6);
      PA3MainPage.getCellValueForMultiHeaderColumn('Risk Indices Only', 'Total', colindex, 'grid-canvas grid-canvas-top ' +
        'grid-canvas-left', 'grid-canvas grid-canvas-top grid-canvas-right').then(function(colValue) {
        if (colValue !== '8.79') {
          expect(false).customError('"% Factor Risk|Risk Indices|% Factor Contr. to Tot. Risk" column for "Total" row is not ' +
            'set to "8.79"; Found: ' + colValue);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var multiheaderPath1 = ['% Factor Risk Cov Isolated|Risk Indices', '% Factor Risk Cov Isolated|Covariance * 2'];
    var values2 = ['7.98', '1.62'];

    multiheaderPath1.forEach(function(multiheader, index) {

      it('Verifying if the "' + multiheader + '" multiheader contain "% Factor Contr. To Tot. Risk - Cov*2"', function() {
        PA3MainPage.getColumnNumberRangeForMultiHeader('Risk Indices Only', multiheader).then(function(range) {
          colindex = range[0];
          SlickGridFunctions.getColumnNames('Risk Indices Only').then(function(array) {
            if (array[range[0]] !== '% Factor Contr. To Tot. Risk - Cov*2') {
              expect(false).customError('"' + multiheader + '" multiheader does not contain "% Factor Contr. To Tot. Risk - Cov*2"');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

      it('Verifying if the "' + multiheader + '|% Factor Contr. To Tot. Risk - Cov*2" column for "Total" row is ' +
        'set to "' + values2[index] + '"', function() {
        // Scrolling
        browser.driver.executeScript('return $( ".tf-slick-grid:eq(1)" ).data( "$tfSlickGridController" )' +
          '.grid.scrollCellIntoView( arguments[0], arguments[1] ) ', 0, colindex);
        PA3MainPage.getCellValueForMultiHeaderColumn('Risk Indices Only', 'Total', colindex, 'grid-canvas ' +
          'grid-canvas-top grid-canvas-left', 'grid-canvas grid-canvas-top grid-canvas-right').then(function(colValue) {
          if (colValue !== values2[index]) {
            expect(false).customError('' + multiheader + '|% Factor Contr. To Tot. Risk - Cov*2" column for "Total" row is not ' +
              'set to "' + values2[index] + '"; Found: ' + colValue);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

});
