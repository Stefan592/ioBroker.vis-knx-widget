/*
    ioBroker.vis vis-knx-widget Widget-Set

    version: "0.0.1"

    Copyright 2022 StefanPreuss stefan.preuss@mail.de
*/
"use strict";

// add translations for edit mode
$.extend(
    true,
    systemDictionary,
    {
        // Add your translations here, e.g.:
        // "size": {
        // 	"en": "Size",
        // 	"de": "Größe",
        // 	"ru": "Размер",
        // 	"pt": "Tamanho",
        // 	"nl": "Grootte",
        // 	"fr": "Taille",
        // 	"it": "Dimensione",
        // 	"es": "Talla",
        // 	"pl": "Rozmiar",
        // 	"zh-cn": "尺寸"
        // }
    }
);

// this code can be placed directly in vis-knx-widget.html
vis.binds["vis-knx-widget"] = {
    version: "0.0.1",
    showVersion: function () {
        if (vis.binds["vis-knx-widget"].version) {
            console.log('Version vis-knx-widget: ' + vis.binds["vis-knx-widget"].version);
            vis.binds["vis-knx-widget"].version = null;
        }
    },
    createWidget: function (widgetID, view, data, style) {
        var $div = $('#' + widgetID);
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds["vis-knx-widget"].createWidget(widgetID, view, data, style);
            }, 100);
        }

        const oid = data.oid ? data.oid : "lala";

        vis.binds["vis-knx-widget"].updateText($div.find('knx-shutter'), vis.states[oid + '.val']);

        // subscribe on updates of value
        if (oid) {
            vis.states.bind(oid + '.val', function (e, newVal, oldVal) {
                vis.binds["vis-knx-widget"].updateText($div.find('knx-shutter'), newVal);
            });
        }
    },
    updateText: function(target, newValue) {

        target.empty();

        console.log("update Text function")

        var text = '';
        text += 'OID: ' + newValue.oid + '</div><br>'

        target.append(text);
        rendered++;
    },


};

vis.binds["vis-knx-widget"].showVersion();