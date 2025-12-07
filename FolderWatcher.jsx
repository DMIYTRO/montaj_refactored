// FolderWatcher.jsx
// Automatic folder monitoring using ScriptUI Palette
// Run this script once - it will stay open and check folder periodically

#target indesign

// ===============================================
// CONFIGURATION
// ===============================================

var WATCH_CONFIG = {
    sourceFolder: "C:/temp/montaj_input/",
    checkInterval: 60,                    // Check every 60 seconds
    enabled: true,
    maxFilesPerRun: 50
};

// ===============================================
// GLOBAL STATE
// ===============================================

var watcherState = {
    lastCheck: null,
    filesProcessed: 0,
    errorsCount: 0,
    nextCheckTime: null,
    intervalHandle: null
};

// ===============================================
// PROCESSING FUNCTION
// ===============================================

function checkAndProcessFolder() {
    try {
        watcherState.lastCheck = new Date();

        $.writeln("--- Checking folder at " + watcherState.lastCheck.toLocaleTimeString() + " ---");

        var folder = new Folder(WATCH_CONFIG.sourceFolder);

        if (!folder.exists) {
            $.writeln("ERROR: Folder not found: " + WATCH_CONFIG.sourceFolder);
            return;
        }

        var files = folder.getFiles("*.pdf");

        if (files.length === 0) {
            $.writeln("No files to process");
            return;
        }

        $.writeln("Found " + files.length + " file(s)");

        var filesToProcess = Math.min(files.length, WATCH_CONFIG.maxFilesPerRun);
        var successCount = 0;
        var errorCount = 0;

        for (var i = 0; i < filesToProcess; i++) {
            try {
                var file = files[i];
                var filename = file.name;

                $.writeln("Processing: " + filename);

                // Simple processing - move to auto_processed folder
                var processedFolder = WATCH_CONFIG.sourceFolder + "auto_processed/";
                if (!new Folder(processedFolder).exists) {
                    new Folder(processedFolder).create();
                }

                var destFile = processedFolder + filename;
                file.copy(destFile);
                file.remove();

                successCount++;

            } catch (e) {
                $.writeln("ERROR: " + e.message);
                errorCount++;
            }

            // Close any open documents
            while (app.documents.length > 0) {
                app.documents[0].close(SaveOptions.NO);
            }
        }

        watcherState.filesProcessed += successCount;
        watcherState.errorsCount += errorCount;

        $.writeln("Finished: Success=" + successCount + ", Errors=" + errorCount);

    } catch (e) {
        $.writeln("CRITICAL ERROR: " + e.message);
    }
}

// ===============================================
// UI WINDOW
// ===============================================

function createWatcherWindow() {
    var win = new Window("palette", "Folder Watcher", undefined, {closeButton: false});
    win.orientation = "column";
    win.alignChildren = ["fill", "top"];
    win.spacing = 10;
    win.margins = 15;

    // Status
    var statusGroup = win.add("panel", undefined, "Status");
    statusGroup.orientation = "column";
    statusGroup.alignChildren = ["left", "top"];
    statusGroup.margins = 10;

    var folderText = statusGroup.add("statictext", undefined, "Folder: " + WATCH_CONFIG.sourceFolder);
    folderText.characters = 50;

    var statusText = statusGroup.add("statictext", undefined, "Status: Running");
    statusText.characters = 50;

    var lastCheckText = statusGroup.add("statictext", undefined, "Last check: Never");
    lastCheckText.characters = 50;

    var nextCheckText = statusGroup.add("statictext", undefined, "Next check: --");
    nextCheckText.characters = 50;

    var statsText = statusGroup.add("statictext", undefined, "Processed: 0 | Errors: 0");
    statsText.characters = 50;

    // Progress bar
    var progressBar = statusGroup.add("progressbar", undefined, 0, WATCH_CONFIG.checkInterval);
    progressBar.preferredSize = [300, 10];

    // Controls
    var controlGroup = win.add("group");
    controlGroup.orientation = "row";

    var checkNowBtn = controlGroup.add("button", undefined, "Check Now");
    var pauseBtn = controlGroup.add("button", undefined, "Pause");
    var closeBtn = controlGroup.add("button", undefined, "Close");

    // Timer counter
    var secondsElapsed = 0;

    // Update UI function
    function updateUI() {
        if (watcherState.lastCheck) {
            lastCheckText.text = "Last check: " + watcherState.lastCheck.toLocaleTimeString();
        }

        statsText.text = "Processed: " + watcherState.filesProcessed + " | Errors: " + watcherState.errorsCount;

        // Update progress bar
        secondsElapsed++;
        progressBar.value = secondsElapsed;

        // Calculate next check time
        var remaining = WATCH_CONFIG.checkInterval - secondsElapsed;
        nextCheckText.text = "Next check in: " + remaining + " seconds";

        // Check if time to process
        if (secondsElapsed >= WATCH_CONFIG.checkInterval) {
            if (WATCH_CONFIG.enabled) {
                checkAndProcessFolder();
            }
            secondsElapsed = 0;
            progressBar.value = 0;
        }

        win.update();
    }

    // Timer - update every second
    var timer = null;

    function startTimer() {
        if (timer) return;

        timer = win.addEventListener("idle", function() {
            // This runs continuously when window is idle
            // We use it to update UI every ~1 second
            updateUI();
        });

        statusText.text = "Status: Running";
        pauseBtn.text = "Pause";
    }

    function stopTimer() {
        if (timer) {
            win.removeEventListener("idle", timer);
            timer = null;
        }
        statusText.text = "Status: Paused";
        pauseBtn.text = "Resume";
    }

    // Button handlers
    checkNowBtn.onClick = function() {
        $.writeln("[Manual check triggered]");
        checkAndProcessFolder();
        secondsElapsed = 0;
        progressBar.value = 0;
        updateUI();
    };

    pauseBtn.onClick = function() {
        if (WATCH_CONFIG.enabled) {
            WATCH_CONFIG.enabled = false;
            stopTimer();
        } else {
            WATCH_CONFIG.enabled = true;
            startTimer();
        }
    };

    closeBtn.onClick = function() {
        if (confirm("Stop folder monitoring?")) {
            stopTimer();
            win.close();
        }
    };

    // Start immediately
    startTimer();
    checkAndProcessFolder(); // Initial check

    win.show();

    $.writeln("=================================================");
    $.writeln("Folder Watcher Started");
    $.writeln("Source: " + WATCH_CONFIG.sourceFolder);
    $.writeln("Interval: " + WATCH_CONFIG.checkInterval + " seconds");
    $.writeln("=================================================");
}

// ===============================================
// START
// ===============================================

createWatcherWindow();