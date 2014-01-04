// License: MIT.

var _ = _ || {};

_ = {
    new_get: 0,
    point: 0.5,
    cb_s: "GET_POINT",
    cb_i: "INFO",
    
    main: function() {
        localStorage["kusonemi"] == undefined ? localStorage["kusonemi"] = 0 : "";
        var d = new Date();
        var h = d.getHours();
        
        if( h < 6 ) {
            console.log("+0.5 | " + d);
            var opt = {type: "basic", title: "クソネミレベルが上がりました。", message: "このエリアをクリックすると、徹夜時間を確認できます。", iconUrl: "images/128.png"};
            _.new_get = _.point;
            chrome.notifications.create(_.cb_s, opt, _.created_get_panel);
        }else {
            console.log(". | " + d);
        }
    },
    
    created_get_panel: function(s) {
         // # s === "GET_POINT"
         console.log("created_get_panel_panel: "+ s);
         setTimeout(_.clear_get_panel, 1000*10);
         localStorage["kusonemi"] = parseFloat(localStorage["kusonemi"]) + _.new_get;
    },
    
    clear_get_panel: function() {
         chrome.notifications.clear(_.cb_s, _.cleared);
    },
    
    cleared: function() {
       console.log("The panel was deleted.");
    },
    
    info: function() {
        localStorage["kusonemi"] == undefined ? localStorage["kusonemi"] = 0 : "";
        var opt = {type: "basic", title: "クソネミレベル： " + localStorage["kusonemi"], message: "クソネミレベルは徹夜時間です。0時から早朝6時の間にchromeを起動していると、30分毎にクソネミレベルが0.5ポイント溜まります。 ", iconUrl: "images/128.png"};
        var d = new Date();
        chrome.notifications.create(_.cb_i, opt, _.created_info_panel);
    },
    
    created_info_panel: function(s) {
         // # s === "INFO"
         console.log("created_info_panel_panel: "+ s);
         setTimeout(_.clear_info_panel, 1000*10);
    },
    
    clear_info_panel: function() {
        chrome.notifications.clear(_.cb_i, _.cleared);
    }
    
};
/*
chrome.browserAction.onClicked.addListener(function(tab) {_.info();});
*/
chrome.notifications.onClicked.addListener(function(Id) {
  if(Id.search(_.cb_s) != -1) {
   _.clear_get_panel();
   _.info();
  }else {
  }
});


// _.main();
var d = new Date();

window.setInterval(_.main, 1000*60*30); // 30分間隔で実行

console.log(".Launched | " + d);
