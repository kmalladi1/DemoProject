var fs = require('fs');
var path = require('path');
let confPath = __dirname;
var exec = require('child_process').exec;
require('@fds/qa-protractor-common');
CommonConfiguration.getBrowserParamsPath(confPath);

// Get bin directory path from "qa-protractor-common"
var binPath = path.join(CommonConfiguration.getCommonRootDirectoryPath(), "bin");
var nodeModulesPath;

// Check the location of "node_modules" folder
if (fs.existsSync(path.join(__dirname, "node_modules"))) {
  nodeModulesPath = path.join(__dirname, "node_modules/.bin/protractor")
} else {
  nodeModulesPath = path.join(__dirname, '../..', '.bin/protractor')
}

try {
  launchWorkstation();
}

catch (e) {
  console.log(e);
}

function launchWorkstation() {
  // Read values from "test-config.json"
  var _this = this;

  // Variables to collect value of Stage, HTML Reports, HTML Reports OS, CACCESS and Installer Needed
  var stage, htmlReports, htmlReportsOS, caccess, installerNeeded;
  var TestConfig = require(path.join(confPath, '/test-config.json'));
  
  // Variable to hold path where launching workstation logs should be saved
  var launchWSLog = path.join(confPath, "LaunchWSLog.txt");

  // Get values now
  stage = TestConfig.Stage;
  htmlReports = TestConfig.HTMLReports;
  htmlReportsOS = TestConfig.HTMLReportsOS;
  caccess = TestConfig.CaccessCode;
	installerNeeded = TestConfig.InstallerNeeded;
	
	// Check if Stage is "prebuild"
  if (stage.toLowerCase().toString() === "prebuild") {
    stage = stage.concat(":", TestConfig.PrebuildName.toString())
  }

  // Check if Installer Needed is set to "1" which means "true"
  if (installerNeeded.toString() === "1") {
		installerNeeded = true;
		// Run LanuchWorksation.exe
	  exec(path.join(binPath, "LaunchWorkstation.exe") + " --stage " +stage+ " --htmlReports " +htmlReports+ " --htmlReportsOS " +htmlReportsOS+ " --caccess " +caccess+ " --installerNeeded " +installerNeeded+ " --binDirectoryPath " +binPath+ " >" +launchWSLog+ " 2>&1", function(error, stdout, stderr) {
			if (error !== null) {
				fs.appendFile(__dirname + '/launchWorksationLog.txt', 'exec error while running LaunchWorkstation.exe:' + error + '\n', function(err) {
					if (err) {
							console.log('While copying error occured "LaunchWorkstation.exe" command execution' + err);
					}
				});
			}
			if (stderr !== null && stderr !== "") {
				fs.appendFile(__dirname + '/launchWorksationLog.txt', 'stderr while running "LaunchWorkstation.exe" command' + stderr + '\n', function(err) {
					if (err) {
						console.log('while copying stderr occured when executing "LaunchWorkstation.exe"' + err);
					}
				});
			}
			RunProtractor();
	  });
  } else {
		installerNeeded = false;
		RunProtractor();
	}
  
  // Print the values passed to "LaunchWorkstation.exe"
  console.log("Stage is: '" +stage+ "' HTML Reports is: '" +htmlReports+ "' HTML Reports OS is: '" +htmlReportsOS+ "' CaccesCode is: '" +caccess+ "' Installer Needed is: '" +installerNeeded+ "'");
}

function RunProtractor() {
  exec(nodeModulesPath +' '+ path.join(__dirname, 'conf.js') +' '+ process.argv.slice(2).join(' '), {maxBuffer: 10000 * 1024}, function(error, stdout, stderr) {
    if (error !== null) {
      fs.appendFile(__dirname + '/ScriptExecution.txt', 'exec error while running protractor conf.js:' + error + '\n', function(err) {
        if (err) {
          console.log('While copying error occured protractor conf.js command execution' + err);
        }
      });
    }
    if (stderr !== null && stderr !== "") {
      fs.appendFile(__dirname + '/ScriptExecution.txt', 'stderr while running protractor conf.js command' + stderr + '\n', function(err) {
        if (err) {
          console.log('while copying stderr occured when executing protractor conf.js' + err);
        }
      });
    }
  });
}