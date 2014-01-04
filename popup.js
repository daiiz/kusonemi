function mssg(u) {
   var k = localStorage["kusonemi"];
   if(u.length != 0) {
      u = u + "の";
   }
   if(k != undefined) {
      var s = "徹夜時間は約 " + k + " 時間です。";
      var a = "http://goo.gl/akI0vj";
      var t = "";
      document.getElementById("tbox").innerHTML = u + s + "\n" + a + t;
   }
}

function unameChanged(e) {
   var uname = document.getElementById("uname").value;
   if(uname != "") {
      mssg(uname);
      localStorage.uname = uname;
   }else {
   }
}
var un = localStorage.uname || "";
document.getElementById("uname").value = un;
document.getElementById("uname").addEventListener("change", unameChanged, false);
mssg(un);