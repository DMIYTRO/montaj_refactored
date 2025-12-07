// SimpleWatcher.jsx
// Simple infinite loop folder watcher
// Run once and leave InDesign open - it will check folder every 60 seconds

#target indesign

// ===============================================
// CONFIGURATION
// ===============================================

var CONFIG = {
    sourceFolder: "C:/temp/montaj_input/",
    checkInterval: 300000,  // 300 seconds (5 minutes) - change as needed
    maxFilesPerRun: 50,
    showStatusWindow: true  // Show small status window
};

var stats = {
    totalProcessed: 0,
    totalErrors: 0,
    iteration: 0,
    startTime: new Date()
};

var statusWindow = null;

// ===============================================
// STATUS FILE
// ===============================================

function updateStatusFile() {
    try {
        var statusFile = new File(CONFIG.sourceFolder + "watcher_status.txt");
        statusFile.encoding = "UTF-8";
        statusFile.open("w");

        var uptime = Math.floor((new Date() - stats.startTime) / 1000 / 60); // minutes

        statusFile.writeln("=== SimpleWatcher Status ===");
        statusFile.writeln("Last check: " + new Date().toString());
        statusFile.writeln("Iteration: #" + stats.iteration);
        statusFile.writeln("Total processed: " + stats.totalProcessed);
        statusFile.writeln("Total errors: " + stats.totalErrors);
        statusFile.writeln("Uptime: " + uptime + " minutes");
        statusFile.writeln("Next check: " + new Date(new Date().getTime() + CONFIG.checkInterval).toLocaleTimeString());
        statusFile.writeln("Status: RUNNING");

        statusFile.close();
    } catch (e) {
        $.writeln("  [Warning] Could not update status file: " + e.message);
    }
}

function updateStatusWindow() {
    if (!statusWindow || !CONFIG.showStatusWindow) return;

    try {
        statusWindow.statusText.text = "Running | Check #" + stats.iteration;
        statusWindow.lastCheckText.text = "Last: " + new Date().toLocaleTimeString();
        statusWindow.statsText.text = "Files: " + stats.totalProcessed + " | Errors: " + stats.totalErrors;
        statusWindow.update();
    } catch (e) {
        // Window might be closed
        statusWindow = null;
    }
}

function createStatusWindow() {
    if (!CONFIG.showStatusWindow) return;

    var win = new Window("palette", "Watcher", undefined, {closeButton: false});
    win.orientation = "column";
    win.alignChildren = ["fill", "top"];
    win.spacing = 5;
    win.margins = 10;

    win.statusText = win.add("statictext", undefined, "Starting...");
    win.statusText.characters = 30;

    win.lastCheckText = win.add("statictext", undefined, "Last: --");
    win.lastCheckText.characters = 30;

    win.statsText = win.add("statictext", undefined, "Files: 0 | Errors: 0");
    win.statsText.characters = 30;

    var stopBtn = win.add("button", undefined, "Stop");
    stopBtn.onClick = function() {
        if (confirm("Stop watcher?")) {
            win.close();
            $.writeln("\n[STOPPED BY USER]");
            $.exit();
        }
    };

    win.show();
    return win;
}

// ===============================================
// PROCESSING
// ===============================================

function processFolder() {
    try {
        var folder = new Folder(CONFIG.sourceFolder);

        if (!folder.exists) {
            $.writeln("[" + new Date().toLocaleTimeString() + "] ERROR: Folder not found");
            return;
        }

        var files = folder.getFiles("*.pdf");

        if (files.length === 0) {
            $.writeln("[" + new Date().toLocaleTimeString() + "] No files");
            return;
        }

        $.writeln("[" + new Date().toLocaleTimeString() + "] Found " + files.length + " files");

        var successCount = 0;
        var errorCount = 0;

        for (var i = 0; i < Math.min(files.length, CONFIG.maxFilesPerRun); i++) {
            try {
                var file = files[i];
                $.writeln("  Processing: " + file.name);

                var processedFolder = CONFIG.sourceFolder + "auto_processed/";
                if (!new Folder(processedFolder).exists) {
                    new Folder(processedFolder).create();
                }

                file.copy(processedFolder + file.name);
                file.remove();
                successCount++;

            } catch (e) {
                $.writeln("  ERROR: " + e.message);
                errorCount++;
            }

            // Close documents
            while (app.documents.length > 0) {
                app.documents[0].close(SaveOptions.NO);
            }
        }

        stats.totalProcessed += successCount;
        stats.totalErrors += errorCount;

        $.writeln("  ✓ Success: " + successCount + " | Errors: " + errorCount);

        // Write to log file
        var logFile = new File(CONFIG.sourceFolder + "watcher.log");
        logFile.encoding = "UTF-8";
        logFile.open("a");
        logFile.writeln("[" + new Date().toString() + "] Check #" + stats.iteration +
                       " | Found: " + files.length + " | Processed: " + successCount +
                       " | Errors: " + errorCount);
        logFile.close();

    } catch (e) {
        $.writeln("[ERROR] " + e.message);
    }
}

// ===============================================
// MAIN LOOP
// ===============================================

$.writeln("=================================================");
$.writeln("Simple Folder Watcher");
$.writeln("=================================================");
$.writeln("Folder: " + CONFIG.sourceFolder);
$.writeln("Interval: " + (CONFIG.checkInterval / 1000) + " seconds");
$.writeln("");
$.writeln("Status file: " + CONFIG.sourceFolder + "watcher_status.txt");
$.writeln("Log file: " + CONFIG.sourceFolder + "watcher.log");
$.writeln("");
$.writeln("Press ESC in InDesign or click Stop button");
$.writeln("=================================================");
$.writeln("");

// Create status window
statusWindow = createStatusWindow();

// Run forever
while (true) {
    stats.iteration++;

    $.writeln("--- Check #" + stats.iteration + " ---");

    processFolder();
    updateStatusFile();
    updateStatusWindow();

    $.writeln("Total: Processed=" + stats.totalProcessed + ", Errors=" + stats.totalErrors);
    $.writeln("Next check in " + (CONFIG.checkInterval / 1000) + " seconds...");
    $.writeln("");

    // Sleep for interval
    $.sleep(CONFIG.checkInterval);
}