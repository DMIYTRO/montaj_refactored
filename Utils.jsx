// Utils.jsx
// Helper functions

function checkChb() {
    getplot = parseInt(filename.match(/[0-9]*_[a-z0-9]*_\(/gi));
    if (isNaN(getplot)) {
        getplot = parseInt(filename.match(/[0-9]*_[a-z]*_[a-z]*/gi)[1]);
    }

    if ((filename.match(/2-([20])_/gi) || filename.match(/1-([10])_/gi)) && getplot < 166) {
        chb = true;
    }
}

function checkPlot() {

    if (file.name.match(/\(198x210\)/gi) || file.name.match(/\(210x198\)/gi) || file.name.match(/\(200x200\)/gi) || file.name.match(/\(210x200\)/gi) || file.name.match(/\(200x210\)/gi)) {
        filename = "SPEC_" + filename;
    }
    if (file.name.match(/\(420x210\)/gi) || file.name.match(/\(210x420\)/gi)) {
        filename = "SPEC+_" + filename;
    }
}

function checkWhite() {
    for (i = 0; i < mat_black.length; i++) {
        if (file.name.match(mat_black[i])) {
            var avWhite = false;
            for (var i = 0; i < app.activeDocument.inks.length; i++) {
                var color = app.activeDocument.inks[i];

                if (color.name == "White") {
                    avWhite = true;
                }
            }

            if (!avWhite) {
                var myColor = app.activeDocument.colors.add();
                myColor.model = ColorModel.SPOT;
                myColor.space = ColorSpace.CMYK;
                myColor.colorValue = [50, 0, 0, 0];
                myColor.name = "White";
            }
            i = mat_black.length + 1;
            white = true;
        }
    }
}

function getFolder() {
    if (paperSelect == 'Kub' || paperSelect == 'Kub450' || paperSelect == '328x389') {
        jdfFolder = folderKub;
        exportFolderPS = exportFolderPSkub;

    }

    if (paperSelect == 'SRA3' || paperSelect == 'SRA33' || paperSelect == '318x487' || paperSelect == '318x478') {
        exportFolderPS = exportFolderPSsra;
        jdfFolder = folderSRA;
        if (filename.match(/Raf_/gi) || filename.match(/raflatak/gi)) {
            exportFolderPS = exportFolderPSkub;
            jdfFolder = folderKub;
        }
    }

    if (filename.match(/450_mel_/gi) || filename.match(/350_mel_/gi)) {
        exportFolder = exportFolder9200_5;
        exportFolderPS = exportFolderPS9200_5;
        jdfFolder = folder9200_5;

    }
    if (p92 || sra) {
        exportFolder = exportFolder9200;
        exportFolderPS = exportFolderPS9200;
        jdfFolder = folder9200;

    }

    getplot = parseInt(filename.match(/[0-9]*_[a-z]*_\(/gi));
    if (isNaN(getplot)) {
        if (filename.match(/craft275/gi)) {
            getplot = 300
        }
        else {
            getplot = parseInt(filename.match(/[0-9]*_[a-z]*_[a-z]*/gi)[1]);
        }
    }

    if ((filename.match(/2-([20])_/gi) || filename.match(/1-([10])_/gi)) && getplot < 166) {

        exportFolder = exportFolder8200;
        exportFolderPS = exportFolderPS8200;
        jdfFolder = folder8200;

        //jdfFolder = folder9200; 
        exportFolderPS = exportFolderCRASH;


    }
    if (presetName.match(/_2-2/g)) {
        csh = "_1-1";
        presetName = presetName.replace(filename.match(/_2-2/g), csh);
    }
    else {
        csh = "_1-0";
        presetName = presetName.replace(filename.match(/_2-0/g), csh);
    }


    if (diz || filename.match(/Belak/gi) || filename.match(/\(BAN\)/gi)) {
        exportFolder = exportFolder7700;
        exportFolderPS = exportFolderPS7700;
        jdfFolder = folder7700;
    }

    if (filename.match(/KONV/gi)) {

        jdfFolder = folderSRA91;
        exportFolderPS = exportFolderCRASH;



    }
}

function getPresetName() {
    colorShem = filename.match(/_[5421]-([54210])_/gi).toString().substr(1, 3);
    if (filename.match(/[0-9]*_mel_(?!gl)/gi)) {
        presetName = "mat_" + parseInt(filename.match(/[0-9]*_mel/gi)) + "_" + paperSelect + "_" + colorShem;
    }
    if (filename.match(/[0-9]*_mel_gl/gi)) {
        presetName = "gloss_" + parseInt(filename.match(/[0-9]*_mel/gi)) + "_" + paperSelect + "_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3)

    }
    if (file.name.match(/\(KONV\)/gi) && file.name.match(/\(162x114\)/gi)) {
        presetName = "KONV_162x114";

    }
    if (file.name.match(/\(KONV\)/gi) && file.name.match(/\(229x162\)/gi)) {
        presetName = "KONV_229x162";

    }
    if (file.name.match(/\(KONV\)/gi) && file.name.match(/\(220x110\)/gi)) {
        presetName = "KONV_220x110";

    }
    if (file.name.match(/\(KONV\)/gi) && file.name.match(/\(324x229\)/gi)) {
        presetName = "KONV_324x229";

    }
    if (file.name.match(/\(KONV\)/gi) && file.name.match(/\(kraft\)/gi)) {
        presetName = presetName + "_craft";

    }
    if (filename.match(/[0-9]*_ofset/gi)) {
        presetName = "ofs_" + parseInt(filename.match(/[0-9]*_ofset/gi)) + "_" + paperSelect + "_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3)

    }
    if (filename.match(/[0-9]*_mondi/gi)) {
        presetName = "mondi_" + parseInt(filename.match(/[0-9]*_mondi/gi)) + "_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3)
        p92 = true;
    }
    if (filename.match(/[0-9]*_Munken_Pure/gi)) {
        presetName = "mondi_" + parseInt(filename.match(/[0-9]*_mondi/gi)) + "_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3)
        p92 = true;
    }
    if (filename.match(/craft300/gi) || filename.match(/craft275/gi)) {
        presetName = "Kraft_" + paperSelect + "_" + filename.match(/_[5421]-([54210])_/gi).toString().substr(1, 3)
        p92 = true;
    }
    if (filename.match(/80_craft/gi)) {
        presetName = "Kraft_80_SRA3_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3);
        p92 = true;
    }
    if (filename.match(/Raf_/gi)) {
        presetName = "Raf_" + paperSelect + "_" + filename.match(/_[5421]-([4210])_/gi).toString().substr(1, 3);
        p92 = true;
    }

    if (filename.match(/Raf_offset/gi) || filename.match(/raflatak_ofs/gi)) {
        presetName = "Raf_offset_" + paperSelect + "_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3);
        p92 = true;
    }
    if (filename.match(/Laid_Ivory_/gi) || filename.match(/Semigloss_Cover_/gi) || filename.match(/Constellation_Jade_/gi) || filename.match(/Embossed_Coated_/gi) || filename.match(/Tintoretto_Angora_WS/gi) || filename.match(/Black_Pepper/gi) || filename.match(/Waterproof_White/gi) || filename.match(/Woodstock_Betulla/gi)) {
        presetName = "Raf_" + paperSelect + "_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3);
        p92 = true;
    }
    if (filename.match(/mirror/gi)) {
        presetName = "mirror";
        diz = true;
    }
    if (filename.match(/barh/gi)) {
        presetName = "barh";
        diz = true;
    }
    if (filename.match(/SYNAPS/gi)) {
        presetName = "SYNAPS";
        //p92 = true;
    }

    if (filename.match(/bohui/gi) || filename.match(/Uniboard_Cream/gi) || filename.match(/Zenith_C/gi)) {
        presetName = "Bahui_SRA3_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3)
        p92 = true;
        if (paperSelect == "Kub") {
            presetName = "Bahui_Kub_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3)

        }
    }
    if (filename.match(/dali/gi)) {
        presetName = "Dali_SRA3_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3)
        p92 = true;
    }
    if (filename.match(/dali_c/gi) || filename.match(/dali_b/gi)) {
        presetName = "Dali_SRA3_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3)
        p92 = true;
        if (paperSelect == "Kub") {
            presetName = "Dali_Kub_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3)

        }

    }
    if (file.name.match(/_Rit_white_gl_/gi)) {
        presetName = "Ritrama_Gloss_" + paperSelect + "_" + colorShem;

        diz = true;
    }
    if (file.name.match(/_Ritr_white_mat_/gi)) {
        presetName = "Ritrama_Mat_" + paperSelect + "_" + colorShem;

        diz = true;
    }
    if (file.name.match(/_Rit_transp_/gi)) {
        presetName = "Ritrama_Clear_" + paperSelect + "_" + colorShem;

        diz = true;
    }
    if (file.name.match(/_500_oracal_transp_mat_/gi)) {
        presetName = "oracal_clrmat_" + paperSelect + "_" + colorShem;

        diz = true;
    }
    if (file.name.match(/T_crema/gi) || file.name.match(/T_gesso/gi)) {
        presetName = "Tintoretto_SRA3_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3)
        p92 = true;
        if (paperSelect == "Kub") {
            presetName = "Tintoretto_Kub_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3)

        }

    }
    if (filename.match(/285_SD_/gi) || filename.match(/240_Stardream/gi)) {
        presetName = "Stardream_SRA3_" + filename.match(/_[5421]-([54210])_/gi).toString().substr(1, 3)
        p92 = true;


        if (paperSelect == "Kub") {
            presetName = "Stardream_Kub_" + filename.match(/_[5421]-([54210])_/gi).toString().substr(1, 3)

        }

    }
    if (filename.match(/120_SD_/gi)) {
        presetName = "Stardream_120_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3)
        p92 = true;

    }
    if (file.name.match(/Wild_black/gi)) {
        presetName = "Wild-Black_SRA3_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3)
        p92 = true;
    }
    if (file.name.match(/350_Flora/gi)) {
        presetName = "Flora_SRA3_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3)
        p92 = true;
        if (paperSelect == "Kub") {
            presetName = "Flora_Kub_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3)
            p92 = true;
        }
    }

    if (file.name.match(/100_Flora/gi)) {
        presetName = "Flora_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3)
        p92 = true;
    }
    if (file.name.match(/Sirio/gi)) {
        presetName = "Sirio-color_SRA3_" + filename.match(/_[5421]-([54210])_/gi).toString().substr(1, 3)
        p92 = true;

        if (paperSelect == "Kub") {
            presetName = "Sirio_Kub_" + filename.match(/_[5421]-([54210])_/gi).toString().substr(1, 3)

        }

    }
    if (filename.match(/Plike/gi)) {
        presetName = "Plike-color_SRA3_" + filename.match(/_[5421]-([54210])_/gi).toString().substr(1, 3)
        p92 = true;
        if (paperSelect == "Kub") {
            presetName = "Plike-color_Kub_" + filename.match(/_[5421]-([54210])_/gi).toString().substr(1, 3)

        }

    }
    if (file.name.match(/330_Plike_330/gi)) {
        presetName = "Plike-white_SRA3_" + filename.match(/_[5421]-([54210])_/gi).toString().substr(1, 3)
        p92 = true;
        if (paperSelect == "Kub") {
            presetName = "Plike-white_Kub_" + filename.match(/_[5421]-([54210])_/gi).toString().substr(1, 3)


        }

    }
    if (file.name.match(/Splendorlux/gi)) {
        presetName = "Splendorlux-metal_SRA3_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3)
        p92 = true;
        if (paperSelect == "Kub") {
            presetName = "Splendorlux-metal_Kub_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3)


        }

    }
    if (file.name.match(/Notturno/gi)) {
        presetName = "Notturno_SRA3_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3)
        p92 = true;
    }
    if (file.name.match(/Majes/gi)) {
        presetName = "Majestic_SRA3_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3)
        p92 = true;
        if (paperSelect == "Kub") {
            presetName = "Majestic_Kub_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3)
            p92 = true;

        }

    }
    if (filename.match(/Belak/gi) || filename.match(/add_lack/gi) || filename.match(/\)_cl_/gi)) {
        presetName = "Lak_SRA3_4-0";
        if (paperSelect == "Kub") {
            presetName = "Lak_Kub_4-0";

        }
        diz = true;
    }
    if (file.name.match(/Marina/gi)) {
        presetName = "Marina-Sabbia_SRA3_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3)
        p92 = true;
    }
    if (file.name.match(/monnalisa/gi)) {
        presetName = "Monna-Lisa_SRA3_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3)
        p92 = true;
    }
    if (file.name.match(/monnalisa/gi) && paperSelect == "Kub") {
        presetName = "Monna-Lisa_Kub_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3)
        p92 = true;
    }
    if (file.name.match(/300_SG/gi) || file.name.match(/SplendorGel_EW/gi)) {
        presetName = "Splendorgel_SRA3_" + filename.match(/_[5421]-([54210])_/gi).toString().substr(1, 3)
        p92 = true;
        if (paperSelect == "Kub") {
            presetName = "Splendorgel_Kub_" + filename.match(/_[5421]-([54210])_/gi).toString().substr(1, 3)
            p92 = true;
        }


    }
    if (file.name.match(/Iceblink_b/gi)) {
        presetName = "Iceblink_SRA3_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3)
        p92 = true;
        if (paperSelect == "Kub") {
            presetName = "Iceblink_Kub_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3)
            p92 = true;
        }


    }
    if (file.name.match(/300_IL_2s_toile/gi)) {

        presetName = "Icelite_SRA3";
        if (paperSelect == "Kub") {

            presetName = "Icelite_Kub";
        }
        colorShem = filename.match(/_[41]-([410])_/gi).toString().substr(1, 3);
        presetName = presetName + "_" + colorShem;
        p92 = true;
    }
    if (file.name.match(/120_Len/gi)) {
        presetName = "Icelite_120_" + colorShem;


        p92 = true;
    }
    if (file.name.match(/Ispira_fascino/gi) || file.name.match(/Ispira_saggezza/gi)) {
        presetName = "Ispira_SRA3_" + filename.match(/_[5421]-([54210])_/gi).toString().substr(1, 3)
        p92 = true;
    }
    if (file.name.match(/GSK_EW/gi)) {
        presetName = "Kalka_SRA3_" + filename.match(/_[5421]-([54210])_/gi).toString().substr(1, 3)
        p92 = true;
    }
    if (filename.match(/260_sinarvanda/gi) || filename.match(/kremBack/gi)) {
        presetName = "Sinarvanda_" + paperSelect + "_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3);
        p92 = true;
        if (paperSelect == "Kub") {

            presetName = "Sinarvanda_Kub_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3)
            p92 = true;
        }

    }
    if (filename.match(/260_savvibrite/gi) || filename.match(/whiteBack/gi)) {
        presetName = "SavviBrite_" + paperSelect + "_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3);
        p92 = true;
        if (paperSelect == "Kub") {

            presetName = "SavviBrite_330x348_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3)
            p92 = true;
        }

    }
    if (file.name.match(/\(BAN\)/gi)) {
        presetName = "BAN_" + filename.match(/_[5421]-([54210])_/gi).toString().substr(1, 3)

    }
    if (filename.match(/Arena_ivory/gi)) {
        presetName = "Arena_SRA3_" + filename.match(/_[421]-([4210])_/gi).toString().substr(1, 3)
        p92 = true;
    }
}

function checkImposePaper() {
    switch (myPaperH) {
        case 375: paperSelect = "328x389"; paperName = "328x389"; break;
        case 369: paperSelect = "328x389"; paperName = "328x389"; break;
        case 333: paperSelect = "Kub"; paperName = "330x348"; break;
        case 330: paperSelect = "Kub"; paperName = "330x348"; break;
        case 340: paperSelect = "Kub"; paperName = "330x348"; break;
        case 424: paperSelect = "SRA3"; paperName = "318x448"; break;
        case 440: paperSelect = "SRA3"; paperName = "318x448"; break;
        case 473: paperSelect = "SRA33"; paperName = "330x487"; break;
        case 477: paperSelect = "318x487"; paperName = "330x487"; break;
        case 455: paperSelect = "318x478"; paperName = "330x487"; break;
        case 465: paperSelect = "318x487"; paperName = "330x487"; break;
        case 690: paperSelect = "BAN"; paperName = "330x700"; break;
    }
}

function tiraj(sheetPrintrun) {
    result = filename.match(/_T[0-9]*?_/g).toString();
    result = result.substr(2, result.length - 3);
    list = "_L" + sheetPrintrun + "_";
    listEnd = "_L" + sheetPrintrun;
    filename = filename.replace(filename.match(/_L[0-9]*?_/g), list);
}

function clearFace() {
    if (filename.match(/%20/gi)) {
        mass_space = filename.match(/%20/gi).length;
        for (i = 0; i < mass_space; i++) {
            filename = filename.replace("%20", "");
        }
    }
    if (filename.match(/-face/g)) {
        filename = filename.replace(filename.match(/-face/g), "");
    }

}

function checkSRA() {
    if (file.name.match(/\(SRA3\)/gi) || file.name.match(/\(SRA3P\)/gi) || file.name.match(/bezporezki/gi)) {
        sra = true;

    }
}

function getPaper() {
    if (file.name.match(/_LS/gi) || file.name.match(/_LK/gi)) {
        mat_spec = mat_spec_lviv
    }
    else {
        mat_spec = mat_spec_kyiv
    }

    for (i = 0; i < mat_spec.length; i++) {
        if (!file.name.match(mat_spec[i])) {
            paperW = 314;
            paperH = 440;
            alternativePaperW = 314;
            alternativePaperH = 440;
            notkub = true
        }
        else {
            paperW = 324;
            paperH = 330;
            alternativePaperW = 314;
            alternativePaperH = 440;
            i = mat_spec.length + 1;
            if (file.name.match(/Raf_offset/gi) && !file.name.match(/420x297/gi) && !file.name.match(/297x420/gi) && !file.name.match(/210x297/gi) && !file.name.match(/297x210/gi) && !file.name.match(/210x148/gi) && !file.name.match(/148x210/gi) && !file.name.match(/148x105/gi) && !file.name.match(/105x148/gi) && !file.name.match(/99x210/gi) && !file.name.match(/210x99/gi)) {
                alternativePaperW = 324;
                alternativePaperH = 340;
            }
        }
        if ( /*filename.match(/350_mel_(?!gl)/gi) ||*/ (filename.match(/300_mel_(?!gl)/gi) && (!filename.match(/_LS/gi) && !filename.match(/_LK/gi))) || filename.match(/250_mel_(?!gl)/gi) || filename.match(/Raf_spro/gi) || filename.match(/Raf_mel_spro/gi) || filename.match(/350_barh/gi) || filename.match(/300_barh/gi) || filename.match(/250_barh/gi)) {
            paperW = 321;
            paperH = 375;
            alternativePaperW = 314;
            alternativePaperH = 440;
            i = mat_spec.length + 1;

            if (kubBrack) {
                paperW = 321;
                paperH = 369;
            }

        }

        if (filename.match(/Flora_anice_100/gi) || filename.match(/Flora_tabacco_100/gi) || filename.match(/Flora_noce_100/gi) || filename.match(/Flora_avorio_100/gi)) {
            paperW = 324
            paperH = 473
            alternativePaperW = 324;
            alternativePaperH = 473;
            i = mat_spec.length + 1;
        }

        if (filename.match(/350_flora/gi)) {
            paperW = 324;
            paperH = 330;
            alternativePaperW = 314;
            alternativePaperH = 440;
            i = mat_spec.length + 1;

        }
        if (filename.match(/450_mel/gi) || file.name.match(/add_lack/gi)) {
            paperW = 324;
            paperH = 330;
            alternativePaperW = 314;
            alternativePaperH = 440;
            i = mat_spec.length + 1;

        }
        if (filename.match(/300_mel_(?!gl)/gi) && (filename.match(/_LS/gi) || filename.match(/_LK/gi))) {
            paperW = 324;
            paperH = 330;
            alternativePaperW = 314;
            alternativePaperH = 440;
            i = mat_spec.length + 1;

        }
        if (filename.match(/Raf_spro/gi) && (filename.match(/_LS/gi) || filename.match(/_LK/gi))) {
            paperW = 314
            paperH = 440
            alternativePaperW = 314;
            alternativePaperH = 440;
            i = mat_spec.length + 1;
        }
        if (filename.match(/barh/gi) || filename.match(/250_kremBack_250/gi) || filename.match(/300_whiteBack_300/gi)) {
            paperW = 314;
            paperH = 440;
            alternativePaperW = 314;
            alternativePaperH = 440;
            i = mat_spec.length + 1;

        }


        if (/*file.name.match(/130_mel_gl/gi) ||*/file.name.match(/350_mel_gl/gi) || file.name.match(/250_mel_gl/gi) || file.name.match(/200_mel_gl/gi) || file.name.match(/80_mel_/gi) || filename.match(/250_ofset/gi) || filename.match(/200_whiteBack_200/gi) || filename.match(/300_whiteBack_300_/gi) || filename.match(/Mondi/gi)) {
            paperW = 314;
            paperH = 440;
            alternativePaperW = 314;
            alternativePaperH = 440;
            i = mat_spec.length + 1;
        }

        if (file.name.match(/KASH/gi)) {
            paperW = 324;
            paperH = 330;
            alternativePaperW = 324;
            alternativePaperH = 330;
            i = mat_spec.length + 1;
            kash = true;
            diz = true;
            if (filename.match(/Munken_Pure/gi) || filename.match(/Mondi/gi) || filename.match(/Bohui/gi) || filename.match(/SplendorGel_EW/gi) || filename.match(/Uniboard_Cream/g) || filename.match(/420x297/gi)) {
                paperW = 314;
                paperH = 440;
                alternativePaperW = 314;
                alternativePaperH = 440;
            }
        }
        if (file.name.match(/Rit_/gi) || filename.match(/Ritr_/gi) || filename.match(/oracal/gi)) {
            paperW = 324;
            paperH = 440; //435
            alternativePaperW = 324;
            alternativePaperH = 440;
            i = mat_spec.length + 1;
        }
        if (file.name.match(/\(KONV\)/gi) && file.name.match(/\(162x114\)/gi)) {

            paperW = 162;
            paperH = 114;
            alternativePaperW = 162;
            alternativePaperH = 114;
            i = mat_spec.length + 1;
        }
        if (file.name.match(/\(KONV\)/gi) && file.name.match(/\(229x162\)/gi)) {

            paperW = 229;
            paperH = 162;
            alternativePaperW = 229;
            alternativePaperH = 162;
            i = mat_spec.length + 1;
        }
        if (file.name.match(/\(KONV\)/gi) && file.name.match(/\(220x110\)/gi)) {

            paperW = 220;
            paperH = 110;
            alternativePaperW = 220;
            alternativePaperH = 110;
            i = mat_spec.length + 1;
        }
        if (file.name.match(/\(KONV\)/gi) && file.name.match(/\(324x229\)/gi)) {

            paperW = 324;
            paperH = 229;
            alternativePaperW = 324;
            alternativePaperH = 229;
            i = mat_spec.length + 1;
        }
        if (file.name.match(/\(KONV\)/gi) && file.name.match(/\(162x114\)/gi)) {

            paperW = 162;
            paperH = 114;
            alternativePaperW = 324;
            alternativePaperH = 229;
            i = mat_spec.length + 1;
        }
        if (file.name.match(/SRA3P/gi) || filename.match(/Laid_Ivory_/gi) || filename.match(/Semigloss_Cover_/gi) || filename.match(/Constellation_Jade_/gi) || filename.match(/Embossed_Coated_/gi) || filename.match(/Tintoretto_Angora_WS/gi) || filename.match(/Black_Pepper/gi) || filename.match(/Waterproof_White/gi) || filename.match(/Woodstock_Betulla/gi)) {
            paperW = 324;
            paperH = 473;
            alternativePaperW = 324;
            alternativePaperH = 473;
            i = mat_spec.length + 1;
        }
        if (filename.match(/SPEC_/gi)) {
            paperW = 213;
            paperH = 440;
            alternativePaperW = 213;
            alternativePaperH = 440;
            i = mat_spec.length + 1;
        }
        if (filename.match(/SPEC\+/gi)) {
            paperW = 230;
            paperH = 473;
            alternativePaperW = 230;
            alternativePaperH = 473;
            i = mat_spec.length + 1;
        }
    }

}

function makeBackCoordinates(bounds, pageW) {
    return [bounds[0], pageW - bounds[3], bounds[2], pageW - bounds[1]];
}

function IsHor(bounds) {
    return (bounds[3] - bounds[1]) > (bounds[2] - bounds[0]);
}

function addMarks() {
    if (!sra) {
        var activeDocument = app.activeDocument;
        with (activeDocument.viewPreferences) {
            horizontalMeasurementUnits = MeasurementUnits.millimeters;
            verticalMeasurementUnits = MeasurementUnits.millimeters;
        }

        for (i = 0; i < app.activeDocument.pages.count(); i++) {

            app.activeDocument.layoutWindows[0].activePage = app.activeDocument.pages[i];
            var activePage = app.activeWindow.activePage;
            var layerForMarks;
            try {
                layerForMarks = activeDocument.layers.item("Marks");
                layerForMarks.name;    //если нет такого слоя, сгенерируется ошибка
            }
            catch (myError) {
                var idoc = app.activeDocument;
                var ilayer = idoc.layers.add();
                ilayer.name = "Marks";
                layerForMarks = activeDocument.layers.item("Marks");
            }
            var lengthMark = 5;
            var weightMark = 0.25;

            var directionDisplacement = [1, -1];
            var directionMark = [-1, 1];
            var newMark = [0, 0, 0, 0];
            var listMarks = [];
            var wProgressBar = new Window('palette', 'Расстановка меток реза');

            for (var rectangle = 0; rectangle < activePage.rectangles.count(); rectangle++)
                for (var cornerX = 0; cornerX < 2; cornerX++)
                    for (var cornerY = 0; cornerY < 2; cornerY++) {
                        // верхние и нижние метки
                        newMark[0] = activePage.rectangles[rectangle].geometricBounds[cornerY * 2] + (displacement * directionDisplacement[cornerY]);
                        newMark[1] = activePage.rectangles[rectangle].geometricBounds[1 + cornerX * 2];
                        newMark[2] = newMark[0];
                        newMark[3] = newMark[1] + lengthMark * directionMark[cornerX];
                        checkNewMark(newMark);
                        // левые и правые метки
                        newMark[0] = activePage.rectangles[rectangle].geometricBounds[cornerY * 2];
                        newMark[1] = activePage.rectangles[rectangle].geometricBounds[1 + cornerX * 2] + (displacement * directionDisplacement[cornerX]);
                        newMark[2] = newMark[0] + lengthMark * directionMark[cornerY];
                        newMark[3] = newMark[1];
                        checkNewMark(newMark);
                    }
            if (listMarks.length > 0) {
                wProgressBar.control = wProgressBar.add('progressbar', undefined, 0, listMarks.length);
                wProgressBar.control.preferredSize.width = 300;
                // wProgressBar.show();
                makeMarks();
            }


            function checkNewMark(newMark) {
                for (var rectangleNumber = 0; rectangleNumber < activePage.rectangles.count(); rectangleNumber++) {
                    rectangleBounds = activePage.rectangles[rectangleNumber].geometricBounds;
                    if ((newMark[2] >= rectangleBounds[0]) && (newMark[2] <= rectangleBounds[2]) && (newMark[3] >= rectangleBounds[1]) && (newMark[3] <= rectangleBounds[3])) {
                        return false;
                    }
                }
                listMarks[listMarks.length] = [newMark[0], newMark[1], newMark[2], newMark[3]];
            }

            // ===== НОВАЯ ФУНКЦИЯ: ПОЛУЧЕНИЕ ИЛИ СОЗДАНИЕ СПЛОШНОГО СТИЛЯ =====
            function getSolidStrokeStyle() {
                var solidStyle = null;

                // Массив возможных имен сплошного стиля
                var solidNames = ["Solid", "Сплошная", "$ID/Solid", "BasicSolid"];

                // 1. Попытка найти существующий стиль в документе
                for (var n = 0; n < solidNames.length; n++) {
                    try {
                        solidStyle = activeDocument.strokeStyles.item(solidNames[n]);
                        if (solidStyle.isValid && solidStyle.strokeStyleType == "Solid") {
                            return solidStyle;
                        }
                    } catch (e) {
                        // Продолжаем поиск
                    }
                }

                // 2. Попытка найти в глобальных стилях приложения
                for (var n = 0; n < solidNames.length; n++) {
                    try {
                        solidStyle = app.strokeStyles.item(solidNames[n]);
                        if (solidStyle.isValid && solidStyle.strokeStyleType == "Solid") {
                            return solidStyle;
                        }
                    } catch (e) {
                        // Продолжаем поиск
                    }
                }

                // 3. Поиск любого сплошного стиля в документе
                try {
                    for (var s = 0; s < activeDocument.strokeStyles.length; s++) {
                        if (activeDocument.strokeStyles[s].strokeStyleType == "Solid") {
                            return activeDocument.strokeStyles[s];
                        }
                    }
                } catch (e) {
                    // Продолжаем
                }

                // 4. Поиск любого сплошного стиля в приложении
                try {
                    for (var s = 0; s < app.strokeStyles.length; s++) {
                        if (app.strokeStyles[s].strokeStyleType == "Solid") {
                            return app.strokeStyles[s];
                        }
                    }
                } catch (e) {
                    // Продолжаем
                }

                // 5. СОЗДАНИЕ нового сплошного стиля, если ничего не найдено
                try {
                    solidStyle = activeDocument.strokeStyles.add({
                        name: "CutMark_Solid_" + new Date().getTime(), // уникальное имя
                        strokeStyleType: "Solid"
                    });
                    return solidStyle;
                } catch (e) {
                    // alert("ОШИБКА: Не удалось создать стиль обводки!\n" + e.message);
                }

                // 6. Последний вариант - вернуть null и не применять стиль
                return null;
            }

            function makeMarks() {
                // Получаем или создаем сплошной стиль ДО цикла
                var solidStyle = getSolidStrokeStyle();

                if (!solidStyle) {
                    // alert("ВНИМАНИЕ: Не удалось найти или создать сплошной стиль обводки.\nМетки будут созданы без стиля обводки.");
                }

                for (var nextMark = 0; nextMark < listMarks.length; nextMark++) {
                    var lineMark = app.activeWindow.activeSpread.graphicLines.add(layerForMarks);
                    lineMark.geometricBounds = listMarks[nextMark];    //координаты линии
                    lineMark.strokeWeight = weightMark + "pt";    //толщина линии
                    lineMark.strokeAlignment = 1936998723;    // ставим обводку по центру
                    lineMark.rightLineEnd = 1852796517;    // снимаем окончания линий
                    lineMark.leftLineEnd = 1852796517;    // снимаем окончания линий
                    lineMark.endCap = 1650680176;    // снимаем окончания линий
                    lineMark.endJoin = 1835691886;    // снимаем окончания линий

                    if (white) {
                        lineMark.strokeColor = activeDocument.swatches.item("White");
                    }
                    else {
                        lineMark.strokeColor = activeDocument.swatches.item("Registration");    // присваиваем обводку
                    }

                    lineMark.overprintStroke = true;    // ставим оверпринт
                    lineMark.nonprinting = false;    // снимаем нонпринтинг

                    // Применяем стиль обводки только если он найден/создан
                    if (solidStyle) {
                        try {
                            lineMark.strokeType = solidStyle;
                        } catch (e) {
                            // Если не удалось применить, линия останется с дефолтным стилем
                        }
                    }

                    wProgressBar.control.value++;
                }
                wProgressBar.close();
            }
        }
    }
}

function addListName() {
    for (var i = 0; i < app.activeDocument.pages.count(); i++) {
        var listName = filename.substr(0, filename.length - 4) + listEnd;
        if (i == 0) {
            listName = listName + "--FACE_" + paperName;
        }


        app.activeDocument.layoutWindows[0].activePage = app.activeDocument.pages[i];
        var activePage = app.activeWindow.activePage;

        if (paperSelect == "318x487") {

            myGeometricBounds = [-1, 45, 3, 312]
        }
        else {
            myGeometricBounds = [-2.6, 45, 1, 312]
        }
        if (!kubBrack && paperSelect == "328x389") {

            myGeometricBounds = [-3.6, 45, 0, 312]
        }
        var SborkaTextFrame = activePage.textFrames.add(
            {
                geometricBounds: myGeometricBounds,

                appliedObjectStyle: "None",
                contents: listName,

            });

        barcodeGeometricBounds = [-3.6, 15, 2, 42]
        var BarcodeTextFrame = activePage.textFrames.add(
            {
                geometricBounds: barcodeGeometricBounds,

                appliedObjectStyle: "None",
                contents: numberOrder,

            });
        var myBarcode = BarcodeTextFrame.parentStory.paragraphs.item(0);

        myBarcode.pointSize = "10pt";
        myBarcode.appliedFont = app.fonts.item("Codabar 123 LE");
        if (chb && paperSelect == "SRA3") {
            if (!nameL) {
                SborkaTextFrame.rotationAngle = -90;
                SborkaTextFrame.geometricBounds = [32, -6, 400, 3]

                BarcodeTextFrame.rotationAngle = -90;
                BarcodeTextFrame.geometricBounds = [4, -6, 40, 3]
            }
            else {
                SborkaTextFrame.rotationAngle = -90;
                SborkaTextFrame.geometricBounds = [32, -8, 400, 1]

                BarcodeTextFrame.rotationAngle = -90;
                BarcodeTextFrame.geometricBounds = [4, -8, 40, 1]
            }
        }

        var myText = SborkaTextFrame.parentStory.paragraphs.item(0);

        myText.pointSize = "10pt";
        myText.appliedFont = app.fonts.item("Calibri");
        if (white) {
            myText.fillColor = app.activeDocument.swatches.item("White");
        }
        if (file.name.match(/speczakaz/gi)) {
            var avOrange = false;
            for (var i = 0; i < app.activeDocument.inks.length; i++) {
                var color = app.activeDocument.inks[i];

                if (color.name == "myOrange") {
                    avOrange = true;
                    myText.fillColor = app.activeDocument.swatches.item("myOrange");
                }
            }

            if (!avOrange) {
                var myOrange = app.activeDocument.colors.add();
                myOrange.model = ColorModel.PROCESS;
                myOrange.space = ColorSpace.CMYK;
                myOrange.colorValue = [0, 70, 100, 0];
                myOrange.name = "myOrange";
                myText.fillColor = app.activeDocument.swatches.item("myOrange");
            }
        }
        if (sra) {
            myText.pointSize = "6pt";
        }
    }
}
