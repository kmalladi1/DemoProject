'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: japanese-tile-names', function() {

  var arrLHPReports = ['エクスポージャー', '上位ポジション', '時系列ウェイトチャート', 'アクティブポジション'];
  var arrChecklistGroup = ['エクスポージャー', '上位ポジション', '時系列ウェイトチャート', 'Active Share'];

  describe('Test Step ID: 740131', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:;pa3;Backend%20Translations" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('backend-translations');
    });

    it('Verifying if 2 tiles displayed and are translated to Japanese', function() {
      var allTiles = PA3MainPage.getAllTilesFromReport();
      allTiles.count().then(function(count) {
        if (count !== 2) {
          expect(false).customError('Count of the tiles displayed in the report is not 2. Found ' + count);
          CommonFunctions.takeScreenShot();
        }
      });

      PA3MainPage.getAllTilesFromReport().each(function(tileName) {
        tileName.getText().then(function(text) {
          Japanese.isJapanese(text);
          Japanese.checkUnicode(text);
        });
      });
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('ウェイト');

    it('Verify that "ウェイト差" chart appeared.', function() {
      PA3MainPage.isInChartFormat('ウェイト差').then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"ウェイト差" chart view is not appeared');
        }
      });
    });

    it('Verifying if first 4 reports in the LHP are translated into Japanese', function() {
      PA3MainPage.getAllReportsFromGivenGroup('REPORTS', 'Weights').then(function(reports) {
        reports.forEach(function(report, index) {
          Japanese.isJapanese(report);
          Japanese.checkUnicode(report);
          if (report !== arrLHPReports[index]) {
            expect(false).customError(index + ' report is not translated to Japanese.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if the groupings hyperlink of two reports are translated to Japanese and found "セクター"', function() {
      PA3MainPage.getAllTilesFromReport().each(function(tileName) {
        tileName.getText().then(function(text) {
          PA3MainPage.getGroupingsHyperLink(text).getText().then(function(text) {
            Japanese.isJapanese(text);
            Japanese.checkUnicode(text);
            if (text !== 'セクター') {
              expect(false).customError('Grouping hyperlink did not contain "セクター"; Found: ' + text);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 754394', function() {

    it('Should expand "Commercial Services|Advertising/Marketing Services" in "Weights" report', function() {
      PA3MainPage.expandTreeInCalculatedReport('ウェイト', 'Commercial Services|Advertising/Marketing Services');

      // Verifying that "Commercial Services|Advertising/Marketing Services" is expanded
      PA3MainPage.isTreeExpanded('ウェイト', 'Commercial Services|Advertising/Marketing Services').then(function(expanded) {
        if (expanded) {
          var reference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('ウェイト', 3, 'Interpublic Group of Companies, Inc.');
          PA3MainPage.rightClickOnGivenElement(reference).then(function(bool) {
            if (!bool) {
              expect(false).customError('Right click menu is not appeared');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('Tree is not expanded in calculated report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrListItems = ['ブロードキャストID', '銘柄コードをコピー', '株価サマリー', '予想サマリー', '除外', 'グルーピングの割当'];
    var flag = 0;
    arrListItems.forEach(function(element, index) {
      it('Should verify that the "' + element + '" item exists in right click menu', function() {
        PA3MainPage.getAllOptionsAfterRightClickOnReport('menu').getText().then(function(items) {
          //Japanese.isJapanese(items[index]);
          Japanese.checkUnicode(items[index]);
          if (element !== items[index]) {
            flag = flag + 1;
            expect(false).customError(element + 'item does not exists in the menu');
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    var arrSubListItems = ['選択行を除外', '選択行を非表示', '除外設定の編集…'];
    var screenShot = 0;
    it('Should hover on "除外" and verify if "' + arrSubListItems + '" are present', function() {
      browser.actions().mouseMove(PA3MainPage.getOptionAfterRightClickOnReport('除外')).perform();

      // Wait 3 seconds till the sub menu appear
      browser.wait(function() {
        return element(by.xpath('//*[contains(@class,"tf-state")]//li[1]')).isDisplayed().then(function(found) {
          return found;
        }, function() {

          return false;
        });
      }, 30000, 'SubMenu did not appear even after 3 seconds');

      PA3MainPage.getAllOptionsAfterRightClickOnReport('Submenu').then(function(option) {
        option.forEach(function(rawtext, index) {
          rawtext.getText().then(function(text) {
            //Japanese.isJapanese(items[index]);
            Japanese.checkUnicode(text);
            if (arrSubListItems[index] !== text) {
              screenShot = screenShot + 1;
              expect(false).customError(arrSubListItems[index] + 'item does not exists in the submenu. Found ' + text);
              if (screenShot === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

  });

  describe('Test Step ID: 740132', function() {

    it('Should right click on "Commercial Services" from calculated report', function() {
      var reference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('ウェイト', 1, 'Commercial Services',
        'grid-canvas grid-canvas-bottom grid-canvas-left');
      Utilities.scrollElementToVisibility(reference);
      PA3MainPage.rightClickOnGivenElement(reference).then(function() {
      }, function(value) {

        if (!value) {
          expect(value).customError('Menu list did not appear after performing right click on "Commercial Services".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    /*var arrListItems = ['グルーピングヘルプ...', '展開', '折畳む', '全グループ表示', '除外', 'グルーピング'];
     var flag = 0;
     arrListItems.forEach(function(element, index) {
     it('Should verify that the "' + element + '" item exists in right click menu', function() {
     PA3MainPage.getAllOptionsAfterRightClickOnReport('menu').getText().then(function(items) {
     //Japanese.isJapanese(items[index]);
     Japanese.checkUnicode(items[index]);
     if (element !== items[index]) {
     flag = flag + 1;
     expect(false).customError(element + 'item does not exists in the menu');
     if (flag === 1) {
     CommonFunctions.takeScreenShot();
     }
     }
     });
     });
     });*/

    // arrSubMenu contains Level1 and Level2
    /*var arrSubMenu = ['レベル1', 'レベル2'];
     var screenShot = 0;
     it('Should hover on "除外" and verify if "' + arrSubMenu + '" are present', function() {
     browser.actions().mouseMove(PA3MainPage.getOptionAfterRightClickOnReport(arrListItems[2])).perform();

     // Wait 3 seconds till the sub menu appear
     browser.wait(function() {
     return element(by.xpath('//*[contains(@class,"tf-state")]//li[1]')).isDisplayed().then(function(found) {
     return found;
     }, function() {

     return false;
     });
     }, 30000, 'SubMenu did not appear even after 3 seconds');

     PA3MainPage.getAllOptionsAfterRightClickOnReport('Submenu').then(function(option) {
     arrSubMenu.forEach(function(rawtext, index) {
     option[index].getText().then(function(text) {
     //Japanese.isJapanese(items[index]);
     Japanese.checkUnicode(text);
     if (rawtext !== text) {
     screenShot = screenShot + 1;
     expect(false).customError(arrSubMenu[index] + 'item does not exists in the submenu. Found ' + text);
     if (screenShot === 1) {
     CommonFunctions.takeScreenShot();
     }
     }
     });
     });
     }, function(error) {

     expect(false).customError(error);
     CommonFunctions.takeScreenShot();
     });
     });*/

    it('Right click on the "Commercial Services" and select "Collapse|Level 1" from the menu in "ウェイト" report', function() {
      var elementReference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('ウェイト', 1, 'Commercial Services');

      // Right click on "Commercial Services" and select "Collapse|Level 1" from the menu
      PA3MainPage.rightClickAndSelectOption(elementReference, 'Collapse|Level 1');

      // Wait for securities to load in report
      browser.sleep(2000);
    });

    it('Verifying if "Level 1" groupings are collapsed in the report', function() {
      SlickGridFunctions.getAllRowsFromReport('ウェイト').then(function(dataView) {
        dataView.forEach(function(eleRef, rowIndex) {
          if (eleRef.metadata.type === 'group' && eleRef.level === 1) {
            if (eleRef.expanded !== false) {
              SlickGridFunctions.scrollRowToTop('ウェイト', rowIndex - 1);
              CommonFunctions.takeScreenShot();
              expect(false).customError(eleRef[0] + ' grouping in "Level 1" is not collapsed which is at index(row) ' + rowIndex);
            }
          }
        });
      });
    });

    // Click on report wrench icon and select "Options" from the menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('ウェイト', 'Options');

    it('Verifying if view changed to "Tile Options  - ウェイト" view', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        // value.split('-').forEach((text) => {
        //   Japanese.isJapanese(text[1].trim());
        //   Japanese.checkUnicode(text[1].trim());
        // });
        if (value !== 'Tile Options - ウェイト') {
          expect(false).customError('"Tile Options - ウェイト" view has not appeared. Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Groupings" tab on the LHP of tile options', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Groupings').select();

      // Verifying if "グルーピング" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Groupings').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Groupings" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrOfGroupings = [];
    it('Verify if elements in the "Selected" section are partially translated', function() {
      var children = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          arrOfGroupings.push(childArr[i].text);
        }
      }).then(function() {
        arrOfGroupings.forEach(function(text) {
          var partialText = text.split('-');
          Japanese.isJapanese(partialText[0].trim());
          Japanese.checkUnicode(partialText[0].trim());
        });
      });
    });

    it('Verify if elements under "FactSet" in the "Available" section are partially translated', function() {
      var group = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfAvailableContainer).getGroupByText('FactSet');
      group.getChildrenText().then(function(childArray) {
        for (var k = 0; k < 7; k++) {
          Japanese.isJapanese(childArray[k].text);
          Japanese.checkUnicode(childArray[k].text);
        }
      });
    });

    it('Should select 2nd entry in the "Selected" section and remove it by clicking on "X" icon', function() {
      var item = ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfSelectedContainer, arrOfGroupings[1], undefined);
      item.select();

      // Verifying if item text is 業種
      item.getText().then((text) => {
        Japanese.isJapanese(text.split('-')[0].trim());
        Japanese.checkUnicode(text.split('-')[0].trim());
      });

      // Verifying if item is selected in selected section and remove it
      item.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('2nd item is not selected in the Selected section. ' + 'Second entry is ' + arrOfGroupings[1]);
          CommonFunctions.takeScreenShot();
        } else {
          item.getActions().then(function(actions) {
            return actions.triggerAction('remove');
          });
        }
      });
    });

    it('Verifying if second entry is removed from selected section', function() {
      var children = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        if (childArr.length !== arrOfGroupings.length - 1) {
          expect(false).customError('Second entry was not deleted even after clicking on "X" icon. ' + 'Number of entries before delete was:' + arrOfGroupings.length + ',Number of entries after delete was:' + childArr.length);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Apply To ウェイト" blasting menu', function() {
      ThiefHelpers.getButtonClassReference('Apply To ウェイト').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Apply To ウェイト" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Blasting" widget is opened', function() {
      ThiefHelpers.isPresent(undefined, undefined, TileOptions.xpathBlastingPannel).then(function(blastWindow) {
        if (!blastWindow) {
          expect(false).customError('"Blasting" widget is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrGroups = [];

    // Known Issue: Forth Option is not translated (http://is.factset.com/rpd/summary.aspx?messageId=36000784&commentId=36990722)
    it('Verify if first three groups are translated to Japanese', function() {
      element.all(by.xpath(TileOptions.xpathAllChecklistGroup)).then(function(array) {
        array.forEach(function(element, index) {
          element.element(by.xpath('.//tf-checklist-group-label')).getText().then(function(text) {
            arrGroups.push(text);
          });
        });
      }).then(function() {
        arrGroups = arrGroups.slice(0, 3);
        arrGroups.forEach(function(text, index) {
          if (text !== arrChecklistGroup[index]) {
            if (index !== 3) {
              expect(false).customError('Checklist group is not same as in given screen shot. ' + 'Expected' + arrChecklistGroup[index] + ', found ' + text);
              CommonFunctions.takeScreenShot();
            }
          } else {
            if (index === 3) {
              // Verifying if element after four groups is translated to Japanese
              ThiefHelpers.getChecklistClassRef().getItemByText('アクティブポジション').getText().then(function(text) {
                if (text !== arrChecklistGroup[3]) {
                  expect(false).customError('4th option "アクティブポジション" is not present in the Blasting window.');
                  CommonFunctions.takeScreenShot();
                }
              });
            }
          }
        });
      });
    });

    it('Should click on "+" button to expand first three groups in the Blasting menu', function() {
      for (var i = 1; i < 3; i++) {
        ThiefHelpers.getChecklistClassRef().getGroupByText(arrChecklistGroup[i]).toggleExpandedState();
      }
    });

    var count = 0;
    it('Verifying if first three checklist groups are expanded', function() {
      arrChecklistGroup.forEach(function(groupName, index) {
        if (index !== 3) {
          ThiefHelpers.getChecklistClassRef().getGroupByText(groupName).isExpanded().then(function(expanded) {
            if (!expanded) {
              expect(false).customError('"' + groupName + '" is collapsed');
              count++;
              if (count === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        }
      });
    });

    var arrGroup1 = ['ウェイト', 'ウェイト差'];

    it('Verifying if "' + arrGroup1 + '" are present under first Group', function() {
      TileOptionsGroupings.getAllchildrenFromChecklistGroup(arrChecklistGroup[0]).then(function(checkListItems) {
        checkListItems.forEach(function(checkBox, index) {
          checkBox.getText().then(function(text) {
            Japanese.isJapanese(text);
            Japanese.checkUnicode(text);
            if (text !== arrGroup1[index]) {
              expect(false).customError('"' + arrGroup1[index] + '" is not present under first group.');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    var arrGroup2 = ['上位5ポジション', 'ポジションの集中', '上位/下位相対ポジション'];

    // Here we are not verifying if the text is in Japanese because isJapanese function would only verify
    // the text irrespective of symbols and numbers
    it('Verifying if "' + arrGroup2 + '" are present under second Group', function() {
      TileOptionsGroupings.getAllchildrenFromChecklistGroup(arrChecklistGroup[1]).then(function(checkListItems) {
        checkListItems.forEach(function(checkBox, index) {
          checkBox.getText().then(function(text) {
            //Japanese.isJapanese(text);
            Japanese.checkUnicode(text);
            if (text !== arrGroup2[index]) {
              expect(false).customError('"' + arrGroup2[index] + '" is not present under second group.');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    var arrGroup3 = ['ポートフォリオウェイト', 'ベンチマークウェイト', '時系列ウェイト'];

    it('Verifying if "' + arrGroup3 + '" are present under third Group', function() {
      TileOptionsGroupings.getAllchildrenFromChecklistGroup(arrChecklistGroup[2]).then(function(checkListItems) {
        checkListItems.forEach(function(checkBox, index) {
          checkBox.getText().then(function(text) {
            Japanese.isJapanese(text);
            Japanese.checkUnicode(text);
            if (text !== arrGroup3[index]) {
              expect(false).customError('"' + arrGroup3[index] + '" is not present under third group.');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 740133', function() {

    it('Should check second expandable option in checklist group', function() {
      ThiefHelpers.getChecklistClassRef().getGroupByText('上位ポジション').toggle();

      // Verifying if second expandable option is checked
      ThiefHelpers.getChecklistClassRef().getGroupByText('上位ポジション').isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"上位ポジション" check box is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in "Blasting Menu"', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsGroupings.getOkOrCancelButtonFromBlastedWindow('OK')).press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button in "Blasting Menu"');
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - ウェイト');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('ウェイト');

    it('Should click on 2nd LHP option to select', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Weights', arrLHPReports[1]).then(function(eleRef) {
        eleRef.click().then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Verifying if option is selected in the LHP', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Weights', arrLHPReports[1]).then(function(eleRef) {
        eleRef.getAttribute('class').then(function(elementStatus) {
          if (elementStatus.indexOf('selected') === -1) {
            expect(false).customError('"' + arrLHPReports[1] + '" is not selected from LHP.');
            CommonFunctions.takeScreenShot();
          }
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    // Here we are not verifying if the text is in Japanese because isJapanese function would only verify
    // the text irrespective of symbols and numbers
    it('Verifying if 3 tiles displayed and are translated to Japanese', function() {
      var allTiles = PA3MainPage.getAllTilesFromReport();
      allTiles.count().then(function(count) {
        if (count !== 3) {
          expect(false).customError('Count of the tiles displayed in the report is not 3. Found ' + count);
          CommonFunctions.takeScreenShot();
        }
      });

      PA3MainPage.getAllTilesFromReport().each(function(tileName) {
        tileName.getText().then(function(text) {
          //Japanese.isJapanese(text);
          Japanese.checkUnicode(text);
        });
      });
    });

    var arrTiles = ['上位5ポジション', '上位/下位相対ポジション'];

    arrTiles.forEach(function(tileName) {
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(tileName);
    });

    it('Verify that "ポジションの集中" chart appeared.', function() {
      PA3MainPage.isInChartFormat('ポジションの集中').then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"ポジションの集中" chart view is not appeared');
        }
      });
    });
  });

  describe('Test Step ID: 740134', function() {

    // Click on report wrench icon and select "Options" from the menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('上位5ポジション', 'Options');

    it('Should click on the "Groupings" tab on the LHP of tile options', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Groupings').select();

      // Verifying if "Groupings" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Groupings').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Groupings" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if only one item is present in selected section', function() {
      var children = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        if (childArr.length !== 1) {
          expect(false).customError('Count of number elements in selected section is not 1. Found' + childArr.length);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 789135', function() {

    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options - 上位5ポジション');

    it('Should hover on "+/-" icon in the LHP and verify "Go to the Library to add and remove reports"', function() {
      browser.actions().mouseMove(PA3MainPage.getLHPEditIcon()).perform();

      browser.sleep(3000);

      ThiefHelpers.getToolTipClassReference().getContent().getText().then(function(text) {
        //Japanese.isJapanese(text);
        //Japanese.checkUnicode(text);
        if (text !== 'Go to the Library to add and remove reports') {
          expect(false).customError('"Go to the Library to add and remove reports" is not appeared in tooltip.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should hover on folder icon in the LHP and verify "Add Section"', function() {
      browser.actions().mouseMove(PA3MainPage.getFolderIcon()).perform();

      browser.sleep(3000);

      ThiefHelpers.getToolTipClassReference().getContent().getText().then(function(text) {
        //Japanese.isJapanese(text);
        //Japanese.checkUnicode(text);
        if (text !== 'Add Section') {
          expect(false).customError('"Add Section" is not appeared in tooltip.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 806999', function() {

    it('Should open "Client:/PA3/Localization/Localization_Japanese" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('localization-japanese');
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Characteristics');

    var arrValues = [{name: 'Portfolio', val: 'BENCH:939200', xpath: PA3MainPage.xpathPortfolioWidget},
      {name: 'Benchmark', val: 'BENCH:180460', xpath: PA3MainPage.xpathBenchmarkWidget},];

    arrValues.forEach(function(values) {
      CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(values.name, values.xpath, values.val);
    });

    it('Should verify if 特性値 group (i.e Characteristic value) is displayed in report', function() {
      Japanese.isJapanese('特性値');
      Japanese.checkUnicode('特性値');
      ThiefHelpers.getNavepaneClassReference().getSectionByText('REPORTS').getGroupByText('特性値').then(null, function() {
        expect(false).customError('"特性値" section is not appeared in the lhp.');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify if first level grouping is displayed in japanese', function() {
      SlickGridFunctions.getAllRowsFromReport('Characteristics').then(function(dataView) {
        dataView.forEach(function(eleRef) {
          if (eleRef.metadata.type === 'group' && eleRef.level === 1) {
            Japanese.isJapanese(eleRef[0]);
            Japanese.checkUnicode(eleRef[0]);
            if (eleRef[0] !== '時価総額') {
              expect(false).customError('"特性値" is not displayed as first level grouping in the report');
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    it('Should verify if that Currency drop down is selected with "日本円"(i.e Japanese Yen)', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, PA3MainPage.xpathCurrencyDropdown).getSelectedText().then(function(text) {
        Japanese.isJapanese(text);
        Japanese.checkUnicode(text);
        if (text !== '日本円') {
          expect(false).customError('Currency drop down is not set to "日本円"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 807000', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Characteristics', 'Columns');

    it('Verifying if Selected section is displayed with "時価総額"', function() {
      ThiefHelpers.getVirtualListboxClassReference(TileOptionsColumns.xpathSelectedContainer).getChildrenText().then(function(children) {
        Japanese.isJapanese(children[0].text);
        Japanese.checkUnicode(children[0].text);
        if (children[0].text !== '時価総額') {
          expect(false).customError('"時価総額" is not present in selected section, Found:' + children[0].text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if the "Header" box is displayed with "時価総額" in japanese', function() {
      TileOptionsColumns.getFormatHeader().getAttribute('value').then(function(value) {
        Japanese.isJapanese(value);
        Japanese.checkUnicode(value);
        if (value !== '時価総額') {
          expect(false).customError('"Header" box is not displayed with "時価総額", Found:' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });
});
