// SimpleWatcher.jsx
// Simple infinite loop folder watcher
// Run once and leave InDesign open - it will check folder every 60 seconds

#target indesign

// ===============================================
// CONFIGURATION
// ===============================================

var CONFIG = {
    sourceFolder: "C:/temp/montaj_input/",
    checkInterval: 60000,  // 60 seconds in milliseconds
    maxFilesPerRun: 50
};

var stats = {
    totalProcessed: 0,
    totalErrors: 0,
    iteration: 0
};

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
$.writeln("Press ESC in InDesign to stop");
$.writeln("=================================================");
$.writeln("");

// Run forever
while (true) {
    stats.iteration++;

    $.writeln("--- Check #" + stats.iteration + " ---");

    processFolder();

    $.writeln("Total: Processed=" + stats.totalProcessed + ", Errors=" + stats.totalErrors);
    $.writeln("Next check in " + (CONFIG.checkInterval / 1000) + " seconds...");
    $.writeln("");

    // Sleep for interval
    $.sleep(CONFIG.checkInterval);
}