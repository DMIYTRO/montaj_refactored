// Imposition.jsx
// Core imposition logic

function Impose(file, paperW, paperH, alternativePaperW, alternativePaperH) {
    //********************************************************
    //SETTINGS

    //alert(paperH)

    var bleed = 2;
    var notFit = false;
    if (filename.match(/\(90x50\)/gi) || filename.match(/\(50x90\)/gi) || filename.match(/\(55x85\)/gi) || filename.match(/\(85x55\)/gi) || filename.match(/\(100x70\)/gi) || filename.match(/\(70x100\)/gi) || filename.match(/\(100x90\)/gi) || filename.match(/\(154x60\)/gi) || filename.match(/\(159x120\)/gi) || filename.match(/\(183x106\)/gi) || filename.match(/\(70x70\)/gi) || filename.match(/\(200x60\)/gi) || filename.match(/\(280x90\)/gi) || filename.match(/\(180x85\)/gi) || filename.match(/\(90x120\)/gi) || filename.match(/\(150x120\)/gi) || filename.match(/\(90x90\)/gi) || filename.match(/\(180x120\)/gi) || filename.match(/\(120x180\)/gi) || filename.match(/\(80x60\)/gi) || filename.match(/\(105x105\)/gi) || filename.match(/\(150x70\)/gi) || filename.match(/\(180x120\)/gi) || filename.match(/\(90x315\)/gi) || filename.match(/\(160x160\)/gi) || filename.match(/\(210x50\)/gi) || filename.match(/\(50x210\)/gi) || filename.match(/\(110x105\)/gi) || filename.match(/\(165x77\)/gi) || filename.match(/\(160x50\)/gi) || filename.match(/\(160x160\)/gi) || filename.match(/\(50x380\)/gi) || filename.match(/\(120x190\)/gi) || filename.match(/\(154x109\)/gi) || filename.match(/\(120x70\)/gi) || filename.match(/\(120x90\)/gi) || filename.match(/\(90x160\)/gi) || filename.match(/\(110x100\)/gi) || filename.match(/\(167x75\)/gi) || filename.match(/\(160x160\)/gi) || filename.match(/\(111x386\)/gi) || filename.match(/\(220x150\)/gi) || filename.match(/\(220x150\)/gi) || filename.match(/\(62x62\)/gi) || file.name.match(/180x160/gi) || file.name.match(/380x210/gi) || file.name.match(/350x210/gi) || file.name.match(/310x170/gi) || file.name.match(/240x165/gi) || file.name.match(/200x110/gi) || file.name.match(/240x165/gi)/*|| file.name.match(/160x120/gi)*/) {
        notFit = true;
        bleed = 1;
        displacement = 1;
    }
    if (kash) {

        bleed = 3;
        displacement = 3;

    }
    if (file.name.match(/\(KONV\)/gi) && (file.name.match(/\(229x162\)/gi) || file.name.match(/\(220x110\)/gi) || file.name.match(/\(324x229\)/gi) || file.name.match(/\(162x114\)/gi))) {
        bleed = 0;
        displacement = 0;
        notFit = true;
    }
    if (file.name.match(/\(BAN\)/gi)) {
        bleed = 4;
        displacement = 4;
        paperW = 320;
        paperH = 690;
        alternativePaperW = 0;
        alternativePaperH = 0;

    }

    //ДИмон если захотят вернуть а6 по 1 снять /**/
    /*if(filename.match(/\(148x105\)/gi) || filename.match(/\(105x148\)/gi))
    {
    	
        bleed= 1;
        displacement = 1;
        if(filename.match(/Raf_/gi))
        {
            bleed= 2;
        displacement = 2;
        }
    	
    }*/
    if (((file.name.match(/\(VUS\)/gi) && file.name.match(/\(210x300\)/gi)) || file.name.match(/\(210x145\)/gi) || file.name.match(/\(192x59\)/gi) || filename.match(/\(154x60\)/gi) || file.name.match(/\(210x74\)/gi) || file.name.match(/\(208x148\)/gi) || file.name.match(/\(148x208\)/gi) || file.name.match(/\(52x190\)/gi) || file.name.match(/\(59x210\)/gi) || file.name.match(/\(190x52\)/gi) || file.name.match(/\(105x210\)/gi) || file.name.match(/\(210x105\)/gi) || file.name.match(/\(148x210\)/gi) || file.name.match(/\(210x148\)/gi) || file.name.match(/\(99x210\)/gi) || file.name.match(/\(210x99\)/gi) || file.name.match(/\(148x105\)/gi) || file.name.match(/\(105x148\)/gi) || (file.name.match(/\(VUS\)/gi) && (file.name.match(/\(90x200\)/gi) || file.name.match(/\(200x90\)/gi))) || file.name.match(/\(100x210\)/gi) || file.name.match(/\(210x100\)/gi) || file.name.match(/\(100x200\)/gi) || file.name.match(/\(200x100\)/gi) || file.name.match(/\(58x192\)/gi) || file.name.match(/\(192x58\)/gi) || file.name.match(/\(180x50\)/gi) || file.name.match(/\(50x180\)/gi) || file.name.match(/\(170x50\)/gi) || file.name.match(/\(200x70\)/gi) || file.name.match(/\(70x200\)/gi) || file.name.match(/\(170x50\)/gi) || file.name.match(/\(50x170\)/gi)) && !file.name.match(/Raf_offset/gi)) {
        paperW = 318;
        paperH = 440;
        alternativePaperW = 318;
        alternativePaperH = 440;
        nameL = false
        //ДИмон это про ламинацию на SRA3
        /*if(filename.match(/slam/gi))
                {
                    paperW = 318;
            paperH = 440;
            alternativePaperW= 318;
            alternativePaperH= 440;
                }*/
    }
    if ((file.name.match(/\(99x210\)/gi) || file.name.match(/\(210x99\)/gi) || file.name.match(/\(148x105\)/gi) || file.name.match(/\(105x148\)/gi)) && !filename.match(/GSK_EW/gi) && !filename.match(/Rit/gi) && !filename.match(/Munken_Pure/gi) && !filename.match(/Mondi/gi) && !filename.match(/Bohui/gi) && !filename.match(/raf/gi) && !filename.match(/SplendorGel_EW/gi) && !filename.match(/Uniboard_Cream/g) && !filename.match(/[0-9]*_ofset/g) && !filename.match(/80_mel_/g) && !filename.match(/SYNAPS/g) && !filename.match(/Mirror/g) && !filename.match(/savvibrite/g) && !filename.match(/whiteBack/gi) && !file.name.match(/250_kremBack/gi) && !file.name.match(/300_kremBack/gi)) {
        if (!notkub) {
            paperW = 324;
            paperH = 340;
            alternativePaperW = 324;
            alternativePaperH = 340;
        }
    }
    /*if(file.name.match(/130_mel_gl/gi))
            {
                paperW= 314;
                paperH= 440;
                alternativePaperW= 314;
                alternativePaperH= 440;
                i = mat_spec.length+1;
            }*/
    //********************************************************

    if (typeof alternativePaperW != 'number') {
        alternativePaperW = 0;
        alternativePaperH = 0;
    }
    if (!File(file).exists) {
        //Что делать, если файл не существует
        return false; //прекращаем раскладывать этот макет
    }
    var fileName = File(file).name;
    //~     var match = /_[41]-([410])_.*\((\d{2,3})x(\d{2,3})\).*T(\d{1,5})_/gi.exec(fileName);
    var match = /_[5421]-([54210])_/gi.exec(fileName);
    if (match == null) {
        //alert('color');
        //Что делать, если в названии файла не удалось выделить  цветность
        return false; //прекращаем раскладывать этот макет
    }
    var hasTwoSides = (match[1] != 0);
    match = /\((\d{2,3})x(\d{2,3})\)/gi.exec(fileName);
    if (match == null) {
        //alert('size');
        //Что делать, если в названии файла не удалось выделить размер
        return false; //прекращаем раскладывать этот макет
    }
    if (sra) {

        var objW = Math.max(match[1], match[2]);
        var objH = Math.min(match[1], match[2]);
    }
    else {
        var objW = Math.max(match[1], match[2]) + bleed * 2;
        var objH = Math.min(match[1], match[2]) + bleed * 2;
    }
    if (file.name.match(/\(VUS\)/gi) && (file.name.match(/\(90x200\)/gi) || file.name.match(/\(200x90\)/gi))) {
        displacement = 1;
        var objW = 101;
        var objH = 212;
    }
    if (file.name.match(/\(VUS\)/gi) && file.name.match(/\(210x300\)/gi)) {
        displacement = 1;
        var objW = 215;
        var objH = 305;
    }
    if (file.name.match(/\(VUS\)/gi) && file.name.match(/\(305x134\)/gi)) {
        displacement = 1;
        var objW = 140;
        var objH = 311;
    }
    if (file.name.match(/bezporezki/gi)) {
        var objW = 314;
        var objH = 680;
        bleed = 0;
        displacement = 0;

    }
    if (filename.match(/konlam11/gi)) {
        paperW = 300;
        paperH = 424;
        alternativePaperW = 300;
        alternativePaperH = 424;
        i = mat_spec.length + 1;

        if (file.name.match(/\(148x105\)/gi) || file.name.match(/\(105x148\)/gi)) {
            displacement = 1;
            var objW = 105;
            var objH = 148;
        }
        if (file.name.match(/\(99x210\)/gi) || file.name.match(/\(210x99\)/gi)) {
            displacement = 1;
            var objW = 100;
            var objH = 211;
        }
        if (file.name.match(/\(148x210\)/gi) || file.name.match(/\(210x148\)/gi)) {
            displacement = 1;
            var objW = 150;
            var objH = 212;
        }
        if (file.name.match(/\(297x210\)/gi) || file.name.match(/\(210x297\)/gi)) {
            displacement = 1;
            var objW = 299;
            var objH = 212;
        }
        if (file.name.match(/\(297x420\)/gi) || file.name.match(/\(420x297\)/gi)) {
            displacement = 1;
            var objW = 299;
            var objH = 422;
        }
    }
    match = /_T(\d{1,5})/gi.exec(fileName);
    if (match == null) {
        //alert('tiraj');
        //Что делать, если в названии файла не удалось выделить тираж
        return false; //прекращаем раскладывать этот макет
    }
    var printrun = match[1];
    var scheme = MakeLayoutScheme(paperW, paperH, objW, objH);
    if (scheme.effectiveArea < 85) {
        var alternativePaperScheme = MakeLayoutScheme(alternativePaperW, alternativePaperH, objW, objH);
        if ((scheme.scheme.length == 0) && (alternativePaperScheme.scheme.length == 0)) {
            //alert('size_mat');
            //Макеты не помещаются ни на одну из бумаг
            return false; //прекращаем раскладывать этот макет
        }
        if (alternativePaperScheme.effectiveArea > scheme.effectiveArea) {
            scheme = alternativePaperScheme;
            paperW = alternativePaperW;
            paperH = alternativePaperH;
        }
    }
    var bkp = app.marginPreferences.properties;
    app.marginPreferences.properties = { top: 0, left: 0, bottom: 0, right: 0, columnGutter: 0, columnCount: 1 };
    var doc = app.documents.add();
    with (doc.viewPreferences) {
        horizontalMeasurementUnits = MeasurementUnits.millimeters;
        verticalMeasurementUnits = MeasurementUnits.millimeters;
    }
    with (doc.documentPreferences) {
        pageHeight = paperH;
        pageWidth = paperW;
        pagesPerDocument = 2;
        facingPages = false;
    }
    app.marginPreferences.properties = bkp;
    app.pdfPlacePreferences.pdfCrop = 1131573328;
    app.pdfPlacePreferences.pageNumber = 1;
    var pdf = { side1: null, side2: null, side3: null, hasTwoSides: true, isHor: false };
    try {
        app.pdfPlacePreferences.pageNumber = 1;
        pdf.side1 = doc.pages[0].rectangles.add({ geometricBounds: [0, 0, 20, 20] });
        pdf.side1.place(new File(file), false);
        pdf.side1.strokeWeight = 0;
        pdf.side1.strokeColor = "None";
        pdf.side1.fillColor = "None";
        app.pdfPlacePreferences.pageNumber = 2;
        pdf.side2 = doc.pages[0].rectangles.add({ geometricBounds: [25, 0, 45, 20] });
        pdf.side2.place(new File(file), false);
        pdf.side2.strokeWeight = 0;
        pdf.side2.strokeColor = "None";
        pdf.side2.fillColor = "None";

        app.pdfPlacePreferences.pageNumber = 3;
        pdf.side3 = doc.pages[0].rectangles.add({ geometricBounds: [50, 0, 70, 20] });
        pdf.side3.place(new File(file), false);
        pdf.side3.strokeWeight = 0;
        pdf.side3.strokeColor = "None";
        pdf.side3.fillColor = "None";
    } catch (err) {
        //Что делать, если произошла ошибка во время прилинковывания ПДФки
        return false; //прекращаем раскладывать этот макет
    }
    try {
        if (pdf.side2.pdfs[0].pdfAttributes.pageNumber == 1) {
            pdf.hasTwoSides = false;
            pdf.side2.remove();
            doc.pages[1].remove();
        } else {
            pdf.side2.move(doc.pages[1]);
        }
    } catch (err) {
        //Что делать, если произошла ошибка во время прилинковывания ПДФки
        return false; //прекращаем раскладывать этот макет
    }
    if (hasTwoSides != pdf.hasTwoSides) {

        //Что делать, если количество страниц в PDF не соответствует цветности в названии файла
        return false; //прекращаем раскладывать этот макет
    }

    if (pdf.side3.pdfs[0].pdfAttributes.pageNumber > 2) {
        multiPDF = true;
        return false; //MULTIPAGE
    } else {
        pdf.side3.remove();
    }

    pdf.isHor = IsHor(pdf.side1.pdfs[0].geometricBounds);
    for (var i = 0; i < scheme.scheme.length; i++) {
        var currentObj = (i == 0) ? pdf.side1 : pdf.side1.duplicate();
        currentObj.rotationAngle = (IsHor(scheme.scheme[i].geometricBounds) != pdf.isHor) ? 90 : 0;
        currentObj.geometricBounds = scheme.scheme[i].geometricBounds;
        if (notFit) {
            var rb = currentObj.geometricBounds;
            var ib = new Array(rb[0], rb[1], rb[2] + 1, rb[3] + 1);
            currentObj.allGraphics[0].geometricBounds = ib;
            currentObj.fit(FitOptions.CENTER_CONTENT);
        }
        else {
            currentObj.fit(FitOptions.CONTENT_TO_FRAME);
        }
        if (hasTwoSides) {
            currentObj = (i == 0) ? pdf.side2 : pdf.side2.duplicate();
            currentObj.rotationAngle = (IsHor(scheme.scheme[i].geometricBounds) != pdf.isHor) ? -90 : 0;
            currentObj.geometricBounds = makeBackCoordinates(scheme.scheme[i].geometricBounds, paperW);
            if (notFit) {
                var rb = currentObj.geometricBounds;
                var ib = new Array(rb[0], rb[1], rb[2] + 1, rb[3] + 1);
                currentObj.allGraphics[0].geometricBounds = ib;
                currentObj.fit(FitOptions.CENTER_CONTENT);
            }
            else {
                currentObj.fit(FitOptions.CONTENT_TO_FRAME);
            }
        }
    }
    var avs = 97;
    var ahs = 103;
    if (sra) {
        avs = 99.9;
        ahs = 100.1;
    }

    myMontag = app.activeDocument.pages[0];

    if ((myMontag.rectangles[0].allGraphics[0].absoluteVerticalScale < avs) || (myMontag.rectangles[0].allGraphics[0].absoluteHorizontalScale < avs) || (myMontag.rectangles[0].allGraphics[0].absoluteVerticalScale > ahs) || (myMontag.rectangles[0].allGraphics[0].absoluteHorizontalScale > ahs)) {
        return false;

    }
    if (hasTwoSides) {
        myMontag = app.activeDocument.pages[1];
        if ((myMontag.rectangles[0].allGraphics[0].absoluteVerticalScale < avs) || (myMontag.rectangles[0].allGraphics[0].absoluteHorizontalScale < avs) || (myMontag.rectangles[0].allGraphics[0].absoluteVerticalScale > ahs) || (myMontag.rectangles[0].allGraphics[0].absoluteHorizontalScale > ahs)) {
            return false;
        }
    }
    myPaperH = paperH;
    return Math.ceil(printrun / scheme.scheme.length);
}

function CalculateBlocks(paperW, paperH, objW, objH, level, maxlevel) {
    var emptyRes = { count: 0, levels: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }] };
    var res = { count: 0, levels: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }] };
    var xCount = Math.floor(Math.ceil(paperW / objW * 1000) / 1000);
    var yCount = Math.floor(Math.ceil(paperH / objH * 1000) / 1000);
    var xCountVert = Math.floor(Math.ceil(paperH / objW * 1000) / 1000);
    var yCountVert = Math.floor(Math.ceil(paperH / objW * 1000) / 1000);
    if (((xCount == 0) || (yCount == 0)) && ((xCountVert == 0) || (yCountVert == 0))) return emptyRes;
    for (var x = xCount; x >= 0; x--) {
        var _mLev = ((level == 0) && (x == 0)) ? maxlevel + 1 : maxlevel;
        var nextLevel = (level < maxlevel) ? CalculateBlocks(paperH, paperW - x * objW, objW, objH, level + 1, _mLev) : emptyRes;
        if ((res.count < x * yCount + nextLevel.count) || ((res.count == x * yCount + nextLevel.count) && (CompareLevels(nextLevel.levels, res.levels, level, x, yCount) < 0))) {
            res.levels = nextLevel.levels;
            res.count = x * yCount + nextLevel.count;
            res.levels[level].x = x;
            res.levels[level].y = yCount;
        }
    }
    return res;

}

function CompareLevels(newLevels, oldLevels, level, x, y) {
    var res = 0;
    for (var i = 3; i > level; i--) {
        res += ((newLevels[i].x * newLevels[i].y) != 0) * 1;
        res -= ((oldLevels[i].x * oldLevels[i].y) != 0) * 1;
    }
    res += ((x * y) != 0) * 1;
    res -= ((oldLevels[level].x * oldLevels[level].y) != 0) * 1;
    return res;
}

function MakeLayoutScheme(pageW, pageH, width, height) {
    var objW = Math.max(width, height);
    var objH = Math.min(width, height);
    var res = { effectiveArea: 0, scheme: [] };
    if (kash) {
        var blockCalculation = CalculateBlocks(pageW, pageH, objW, objH, 0, 0);
    }
    else {
        var blockCalculation = CalculateBlocks(pageW, pageH, objW, objH, 0, 2);
    }
    var layout = { count: 0, w: 0, h: 0, mainCol: 0, mainRow: 0, mainFullRow: 0, mainShortRowLenght: 0, addCol: 0, addRow: 0, xAddStart: 0, yAddStart: 0, xOffset: 0, yOffset: 0 };
    with (layout) {
        count = blockCalculation.count;
        if (blockCalculation.levels[0].x * blockCalculation.levels[0].y != 0) {
            w = Math.round(objW);
            h = Math.round(objH);
            mainCol = blockCalculation.levels[0].x + blockCalculation.levels[2].x;
            mainShortRowLenght = blockCalculation.levels[0].x;
            mainRow = blockCalculation.levels[0].y;
            mainFullRow = blockCalculation.levels[2].y;
            addCol = blockCalculation.levels[1].y;
            addRow = blockCalculation.levels[1].x;
            xAddStart = w * blockCalculation.levels[0].x;
            yAddStart = h * blockCalculation.levels[2].y;
        } else {
            w = Math.round(objH);
            h = Math.round(objW);
            mainCol = blockCalculation.levels[1].y;
            mainShortRowLenght = blockCalculation.levels[3].y;
            mainRow = blockCalculation.levels[1].x + blockCalculation.levels[3].x;
            mainFullRow = blockCalculation.levels[1].x;
            addCol = blockCalculation.levels[2].x;
            addRow = blockCalculation.levels[2].y;
            xAddStart = w * blockCalculation.levels[3].y;
            yAddStart = h * blockCalculation.levels[1].x;
        }
        xOffset = (pageW - Math.max(mainCol * w, mainShortRowLenght * w + addCol * h)) / 2;
        yOffset = (pageH - Math.max(mainRow * h, mainFullRow * h + addRow * w)) / 2;
        res.effectiveArea = count * w * h / (pageW * pageH / 100);
        for (var y = 0; y < mainRow; y++) {
            var colInRow = (y < mainFullRow) ? mainCol : mainShortRowLenght;
            for (var x = 0; x < colInRow; x++)
                res.scheme.push({ geometricBounds: [yOffset + h * y, xOffset + w * x, yOffset + h * (y + 1), xOffset + w * (x + 1)] });
        }
        for (var y = 0; y < layout.addRow; y++)
            for (var x = 0; x < layout.addCol; x++)
                res.scheme.push({ geometricBounds: [yOffset + yAddStart + w * y, xOffset + xAddStart + h * x, yOffset + yAddStart + w * (y + 1), xOffset + xAddStart + h * (x + 1)] });
    }
    return res;
}
