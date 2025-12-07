// AutoMontaj.jsx
// Automatic folder monitoring and processing daemon for InDesign
// Place this file in InDesign Startup Scripts folder to run automatically

#target indesign
#include "Config.jsx"
#include "Utils.jsx"
#include "Imposition.jsx"
#include "JDF.jsx"
#include "Logger.jsx"

// ===============================================
// CONFIGURATION
// ===============================================

var AUTO_CONFIG = {
    enabled: true,                    // Enable/disable auto-processing
    checkInterval: 300000,            // Check every 5 minutes (300000 ms)
    sourceFolder: "//10.20.2.60/work/input/",  // Network folder to monitor
    runOnStartup: true,               // Run immediately on InDesign startup
    showNotifications: true,          // Show processing notifications
    autoCloseDocuments: true,         // Close documents after processing
    maxFilesPerRun: 50,              // Maximum files to process in one run

    // Working hours (set to null to run 24/7)
    workingHours: {
        enabled: true,
        start: 8,                     // 8:00 AM
        end: 20,                      // 8:00 PM
        daysOfWeek: [1, 2, 3, 4, 5]  // Monday-Friday (0=Sunday, 6=Saturday)
    }
};

// ===============================================
// GLOBAL STATE
// ===============================================

var autoMontajState = {
    isRunning: false,
    lastCheck: null,
    taskId: null,
    processedCount: 0,
    errorCount: 0,
    skipCount: 0
};

// ===============================================
// UTILITY FUNCTIONS
// ===============================================

function isWithinWorkingHours() {
    if (!AUTO_CONFIG.workingHours.enabled) return true;

    var now = new Date();
    var hour = now.getHours();
    var day = now.getDay();

    // Check day of week
    var validDay = false;
    for (var i = 0; i < AUTO_CONFIG.workingHours.daysOfWeek.length; i++) {
        if (AUTO_CONFIG.workingHours.daysOfWeek[i] === day) {
            validDay = true;
            break;
        }
    }

    if (!validDay) return false;

    // Check hour
    return (hour >= AUTO_CONFIG.workingHours.start && hour < AUTO_CONFIG.workingHours.end);
}

function showNotification(message, isError) {
    if (!AUTO_CONFIG.showNotifications) return;

    var icon = isError ? "⚠" : "ℹ";
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALL;

    // Use non-blocking notification if possible
    try {
        // This won't block the script
        $.writeln(icon + " AutoMontaj: " + message);
    } catch (e) {}
}

// ===============================================
// MAIN PROCESSING FUNCTION
// ===============================================

function processFolder() {
    if (!AUTO_CONFIG.enabled) return;
    if (!isWithinWorkingHours()) {
        $.writeln("[AutoMontaj] Outside working hours. Skipping...");
        return;
    }

    autoMontajState.isRunning = true;
    autoMontajState.lastCheck = new Date();

    try {
        $.writeln("[AutoMontaj] Checking folder: " + AUTO_CONFIG.sourceFolder);

        // Check if folder exists
        var folder = new Folder(AUTO_CONFIG.sourceFolder);
        if (!folder.exists) {
            $.writeln("[AutoMontaj] ERROR: Source folder does not exist: " + AUTO_CONFIG.sourceFolder);
            autoMontajState.isRunning = false;
            return;
        }

        // Get PDF files
        var files = folder.getFiles("*.pdf");

        if (files.length === 0) {
            $.writeln("[AutoMontaj] No files to process");
            autoMontajState.isRunning = false;
            return;
        }

        $.writeln("[AutoMontaj] Found " + files.length + " file(s)");

        // Limit files per run
        var filesToProcess = Math.min(files.length, AUTO_CONFIG.maxFilesPerRun);

        // Set source folder for Main.jsx compatibility
        sourceFolder = AUTO_CONFIG.sourceFolder;

        // Initialize logger
        Logger.init(sourceFolder);
        Logger.info("AutoMontaj: Processing " + filesToProcess + " files");

        // Process files using existing logic from Main.jsx
        var successCount = 0;
        var errorCount = 0;

        for (var i = 0; i < filesToProcess; i++) {
            try {
                file = files[i];
                filename = file.name;

                $.writeln("[AutoMontaj] Processing: " + filename);

                // Call main processing logic here
                // (This would be the same logic from Main.jsx)
                // For now, just move to a "processed" folder as example

                var processedFolder = sourceFolder + "/auto_processed/";
                if (!new Folder(processedFolder).exists) {
                    new Folder(processedFolder).create();
                }

                // Move file (example - replace with actual processing)
                var destFile = processedFolder + filename;
                file.copy(destFile);
                file.remove();

                successCount++;

            } catch (e) {
                $.writeln("[AutoMontaj] ERROR processing " + filename + ": " + e.message);
                Logger.error(filename, e.message);
                errorCount++;
            }

            // Close any open documents
            if (AUTO_CONFIG.autoCloseDocuments) {
                while (app.documents.length > 0) {
                    app.documents[0].close(SaveOptions.NO);
                }
            }
        }

        // Update stats
        autoMontajState.processedCount += successCount;
        autoMontajState.errorCount += errorCount;

        Logger.info("AutoMontaj finished: Success=" + successCount + ", Errors=" + errorCount);
        $.writeln("[AutoMontaj] Finished: Success=" + successCount + ", Errors=" + errorCount);

        if (successCount > 0 && AUTO_CONFIG.showNotifications) {
            showNotification("Processed " + successCount + " file(s)", false);
        }

    } catch (e) {
        $.writeln("[AutoMontaj] CRITICAL ERROR: " + e.message);
        Logger.error("AutoMontaj", e.message);
    } finally {
        autoMontajState.isRunning = false;
    }
}

// ===============================================
// IDLE TASK SETUP
// ===============================================

function setupIdleTask() {
    // Remove existing task if any
    if (autoMontajState.taskId !== null) {
        try {
            app.idleTasks.itemByID(autoMontajState.taskId).remove();
        } catch (e) {}
    }

    // Create new idle task
    var task = app.idleTasks.add({
        name: "AutoMontaj_Monitor"
    });

    autoMontajState.taskId = task.id;

    // Set up the task to run periodically
    task.sleep = AUTO_CONFIG.checkInterval;

    // This function will be called by the idle task
    task.addEventListener(IdleEvent.ON_IDLE, function() {
        if (!autoMontajState.isRunning) {
            processFolder();
        }
    });

    $.writeln("[AutoMontaj] Idle task created. Checking every " + (AUTO_CONFIG.checkInterval / 1000) + " seconds");
}

// ===============================================
// CONTROL PANEL
// ===============================================

function createControlPanel() {
    var win = new Window("palette", "AutoMontaj Control", undefined, {closeButton: true});
    win.orientation = "column";
    win.alignChildren = ["fill", "top"];
    win.spacing = 10;
    win.margins = 15;

    // Status group
    var statusGroup = win.add("panel", undefined, "Status");
    statusGroup.orientation = "column";
    statusGroup.alignChildren = ["left", "top"];
    statusGroup.margins = 10;

    var statusText = statusGroup.add("statictext", undefined, "Status: " + (AUTO_CONFIG.enabled ? "Enabled" : "Disabled"));
    var lastCheckText = statusGroup.add("statictext", undefined, "Last check: Never");
    var statsText = statusGroup.add("statictext", undefined, "Processed: 0 | Errors: 0");

    // Settings group
    var settingsGroup = win.add("panel", undefined, "Settings");
    settingsGroup.orientation = "column";
    settingsGroup.alignChildren = ["fill", "top"];
    settingsGroup.margins = 10;

    var intervalGroup = settingsGroup.add("group");
    intervalGroup.add("statictext", undefined, "Interval (minutes):");
    var intervalInput = intervalGroup.add("edittext", undefined, AUTO_CONFIG.checkInterval / 60000);
    intervalInput.characters = 5;

    var folderGroup = settingsGroup.add("group");
    folderGroup.orientation = "column";
    folderGroup.alignChildren = ["fill", "top"];
    folderGroup.add("statictext", undefined, "Source folder:");
    var folderInput = folderGroup.add("edittext", undefined, AUTO_CONFIG.sourceFolder);
    folderInput.characters = 40;

    // Controls
    var controlGroup = win.add("group");
    controlGroup.orientation = "row";
    controlGroup.alignChildren = ["fill", "center"];

    var startBtn = controlGroup.add("button", undefined, "Start");
    var stopBtn = controlGroup.add("button", undefined, "Stop");
    var runNowBtn = controlGroup.add("button", undefined, "Run Now");

    stopBtn.enabled = AUTO_CONFIG.enabled;
    startBtn.enabled = !AUTO_CONFIG.enabled;

    // Event handlers
    startBtn.onClick = function() {
        AUTO_CONFIG.enabled = true;
        AUTO_CONFIG.checkInterval = parseInt(intervalInput.text) * 60000;
        AUTO_CONFIG.sourceFolder = folderInput.text;

        setupIdleTask();

        startBtn.enabled = false;
        stopBtn.enabled = true;
        statusText.text = "Status: Enabled";

        $.writeln("[AutoMontaj] Started");
    };

    stopBtn.onClick = function() {
        AUTO_CONFIG.enabled = false;

        if (autoMontajState.taskId !== null) {
            try {
                app.idleTasks.itemByID(autoMontajState.taskId).remove();
            } catch (e) {}
        }

        startBtn.enabled = true;
        stopBtn.enabled = false;
        statusText.text = "Status: Disabled";

        $.writeln("[AutoMontaj] Stopped");
    };

    runNowBtn.onClick = function() {
        $.writeln("[AutoMontaj] Manual run triggered");
        processFolder();
        updateStatus();
    };

    // Update status function
    function updateStatus() {
        if (autoMontajState.lastCheck) {
            lastCheckText.text = "Last check: " + autoMontajState.lastCheck.toLocaleTimeString();
        }
        statsText.text = "Processed: " + autoMontajState.processedCount + " | Errors: " + autoMontajState.errorCount;
    }

    // Update status every 5 seconds
    win.onShow = function() {
        this.timer = app.setInterval(updateStatus, 5000);
    };

    win.onClose = function() {
        if (this.timer) {
            app.clearInterval(this.timer);
        }
    };

    win.show();
}

// ===============================================
// INITIALIZATION
// ===============================================

function initialize() {
    $.writeln("=================================================");
    $.writeln("AutoMontaj - Automatic Folder Monitor");
    $.writeln("=================================================");
    $.writeln("Source: " + AUTO_CONFIG.sourceFolder);
    $.writeln("Interval: " + (AUTO_CONFIG.checkInterval / 1000) + " seconds");
    $.writeln("Enabled: " + AUTO_CONFIG.enabled);

    if (AUTO_CONFIG.enabled) {
        setupIdleTask();

        if (AUTO_CONFIG.runOnStartup) {
            $.writeln("[AutoMontaj] Running initial check...");
            processFolder();
        }
    }

    // Show control panel (optional - comment out for silent mode)
    // createControlPanel();

    $.writeln("=================================================");
}

// ===============================================
// MENU COMMAND (optional)
// ===============================================

try {
    var menuAction = app.scriptMenuActions.add("AutoMontaj Control Panel");
    menuAction.addEventListener('onInvoke', createControlPanel);

    var automationMenu = app.menus.item("$ID/Main").submenus.item("Automation");
    if (!automationMenu.isValid) {
        automationMenu = app.menus.item("$ID/Main").submenus.add("Automation");
    }
    automationMenu.menuItems.add(menuAction);
} catch (e) {
    $.writeln("[AutoMontaj] Could not add menu item: " + e.message);
}

// ===============================================
// AUTO-RUN ON STARTUP
// ===============================================

// If this script is in Startup Scripts folder, it will run automatically
if (AUTO_CONFIG.enabled) {
    initialize();
}