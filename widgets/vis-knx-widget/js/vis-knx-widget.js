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

        "name": {
         	"en": "Name",
         	"de": "Name",
        },
        "shutterStatus": {
            "en": "Shutter status",
            "de": "Jalousie status",
        },
        "bladeStatus": {
            "en": "Blade status",
            "de": "Lamelle status",
        },

    }
);

// this code can be placed directly in vis-knx-widget.html
vis.binds['vis-knx-shutter'] = {
    version: "0.0.2",
    showVersion: function () {
        if (vis.binds['vis-knx-shutter'].version) {
            console.log('Version vis-knx-widget: ' + vis.binds['vis-knx-shutter'].version);
            vis.binds['vis-knx-shutter'].version = null;
        }
    },
    createWidget: function (widgetID, view, data, style) {
        var $div = $('#' + widgetID);
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-knx-shutter'].createWidget(widgetID, view, data, style);
            }, 100);
        }

        const shutterStat = data.shutterStatus;
        const bladeStat = data.bladeStatus;
        const name = data.name ? data.name : "Shutter";

        //vis.bindsvis-knx-shu['vis-knx-shutter']tter.buildContainter($div.find('.container'), name, vis.states[shutterStat + '.val'], vis.states[bladeStat + '.val']);
        $('#' + widgetID).html("shutterStat " + shutterStat);

        function onChange(e, newVal, oldVal) {
            console.log("KNX shutterStatus onChange, value: " + newVal);
            //vis.bindsvis-knx-shu['vis-knx-shutter']tter.buildContainter($div.find('.container'), name, newVal, vis.states[bladeStat + '.val']);
        }

        let test = vis.states[data.shutterStatus + '.val']
        console.dir(test)

        if (data.shutterStatus) {
            console.log("Bind begin!")
            console.log(vis.states[data.shutterStatus + '.val'])
            
            vis.states.bind(data.shutterStatus + '.val', onChange);
            //$div.data('bound', [data.shutterStatus + '.val']);
            //$div.data('bindHandler', onChange);
            console.log("Bind end!")
        }

        //onChangeIst(null, vis.states[shutterStat + '.val'], 0);
    },
    buildContainter: function(target, name, statusShutter, statusBlade) {

        console.log('KNX shutter id: ' + statusShutter)

        if(!statusShutter){
            statusShutter = 50;
        }

        if(!statusBlade){
            statusBlade = 50;
        }
    
        target.empty();
        let newItem = target;

        let header = $('<div class="headerContainer"></div>');

        // Shutter icon
        $('<div class="shutter" style="background-image: url(\'' + this.getIcon(statusShutter, 1) +'\');"></div>').appendTo(header);

        // Name
        $('<div class="text"></div>').html(statusShutter).appendTo(header);

        // Blade icon
        if(statusBlade >= 0){
            $('<div class="blade" style="background-image: url(\'' + this.getIcon(statusBlade, 2) +'\');"></div>').appendTo(header)
        }
               
        header.appendTo(newItem);



        target.append(newItem);

        //var z = document.getElementsByClassName('headerContainer');
        //console.dir(z);


    },
    getIcon: function(status, name){

        if (name == 1){
            name = "shutter";
        } else if (name == 2){
            name = "blade_arc"
        } else {
            name = "shutter";
        }

        let path = "widgets/vis-knx-widget/img/fts_" + name + "_00.png";
        if (typeof(status) === 'number'){
            let value = Math.round(status / 10) * 10;
            value = value.toString();
    
            if (value.length < 2) value = "0" + value;
    
            path = "widgets/vis-knx-widget/img/fts_" + name + "_" + value + ".png";
        } 

        return path;

    }
};

vis.binds['vis-knx-shutter'].showVersion();