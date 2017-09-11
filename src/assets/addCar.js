

//      檢測url是否包含openid
//        包含：
//          存在本地
//
//    頁面加載判斷本地是否存在openid
//     存在：
//       繼續下面的業務
//     不存在
//       跳轉後臺進行授權


// 檢測url是否包含openid
var openId = GetQueryString("openid");
console.log(openId)
// 包含openid
if(openId !== null) {
  localStorage.setItem("openid",openId);
}
// 檢查本地是否包含openid
var cache = localStorage.getItem("openid");
// 如果本地不包含openid，則説明沒有進行授權
console.log(cache)
if(cache==null){//微信授权
  var SERVER = "http://api.basecn.cn/cloud/api/wechat/oauth/login?oauthUrl=" + window.location.href;
 window.location.href = SERVER;
}else{
  // window.location.href = 'http://1640kj1514.iok.la' + '/monthRent';
}

// 获取浏览器参数
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r != null) {
    return unescape(r[2]);
  }
  return null;
}

