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

        vis.binds["vis-knx-widget"].updateText(data)

        // subscribe on updates of value
        function onChange(e, newVal, oldVal) {
            $div.find('.template-value').html(newVal);

            vis.binds["vis-knx-widget"].updateText(newVal)
        }
        if (data.oid) {
            vis.states.bind(data.oid + '.val', onChange);
            //remember bound state that vis can release if didnt needed
            $div.data('bound', [data.oid + '.val']);
            //remember onchange handler to release bound states
            $div.data('bindHandler', onChange);
        }
    },
    updateText: function(newValue) {

        var text = '';
        text += 'OID: ' + newValue.oid + '</div><br>';
        text += 'OID value: <span class="vis-knx-widget-value">' + vis.states[newValue.oid + '.val'] + '</span><br>';
        text += 'Color: <span style="color: ' + newValue.myColor + '">' + newValue.myColor + '</span><br>';
        text += 'extraAttr: ' + newValue.extraAttr + '<br>';
        text += 'Browser instance: ' + vis.instance + '<br>';
        text += 'htmlText: <textarea readonly style="width:100%">' + (newValue.htmlText || '') + '</textarea><br>';

        $('#' + widgetID).html(text);
    },


};

vis.binds["vis-knx-widget"].showVersion();