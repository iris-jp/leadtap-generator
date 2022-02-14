var player;
var elementCount = 0;
var actionList;
var movieFilePath ='';
var obj = new Array();

(function() {
  var $, Plyr;
  $ = require('jquery');
  Plyr = require('./plyr.js');

  $(function() {

    $('.js-add_multiple').click(function(){
      var currentTime = Math.round(player.currentTime);
      var type = 'multiple';
      addEvent(currentTime, type);
    });

    $('.js-add_single').click(function(){
      var currentTime = Math.round(player.currentTime);
      var type = 'single';
      addEvent(currentTime, type);
    });

    $('.js-add_popup').click(function(){
      var currentTime = Math.round(player.currentTime);
      var type = 'popup';
      addEvent(currentTime, type);
    });

    $('.js-srccode').focus(function(){
      $(this).select();
    });

    $('.js-generate_code').click(function(){
      addCode();
    });

    $('.js-hide').click(function(){
      $('.player').hide();
      player.stop();
      player.increaseVolume(1);
      $('div.buttons').remove();
      eventFlag =  false;
    });

    $('.load').click(function(){
      movieFilePath = $('input.movie_assets').val();
      setUpMovie(movieFilePath);
      $('.set_moviepath').slideUp();
      setGrid();
    });

    $('.grid_button').on('click', function (evt) {
      var status = $(this).prop('checked');
      if(status){
        toggleGrid('on');
      }else{
        toggleGrid('off');
      }
    });

    function setUpMovie(assets){
      $('#js-player source').attr('src', assets).show();
      player = new Plyr(
      '#js-player',
      {
        //autoplay: true,
        displayDuration :false,
        duration:true,
        disableContextMenu :false,
        clickToPlay: false,
        tooltips:{ controls: true, seek: true },
        fullscreen: { enabled: false, fallback: true, iosNative: false },
      },false);

    }
    window.addEventListener('DOMContentLoaded', function(){

    });
  });

  function addEvent(_time, _type, _opt){
    var option = _opt || false; // _opt が渡されていなかったらデフォルト

    /*
    if(!option){
      //時間表記を変更する
      var time = chageTypeTime(_time);
    }else{
      var time = _time;
    }
    */
    //時間表記を変更する
    var time = chageTypeTime(_time);

    //押されたイベントのタイプによって処理を振り分ける
    switch(_type){
      case 'multiple':
        elementCount++;
        var html = $('div.template div.multiple_button.element').html();
        var s = '<div class="multiple_button element element' + elementCount +'">' + html + '</div>';
        $('.js-mv_element').append(s);
        var t = '<span class="js-time" data-time="' + _time + '">[' + time + ']</span> ';
        $('div.element' + elementCount + ' h3 a.bar').prepend(t);
        $('div.element' + elementCount + ' input[name="a"]').attr('name', 'a'+elementCount);
        $('div.element' + elementCount + ' input[name="b"]').attr('name', 'b'+elementCount);
        setToggleEvent(elementCount);
        break;
      case 'single':
        elementCount++;
        var html = $('div.template div.single_button.element').html();
        var s = '<div class="single_button element element' + elementCount +'">' + html + '</div>';
        $('.js-mv_element').append(s);
        var t = '<span class="js-time" data-time="' + _time + '">[' + time + ']</span> ';
        $('div.element' + elementCount + ' h3 a.bar').prepend(t);
        setToggleEvent(elementCount);
        break;
      case 'popup':
        elementCount++;
        var html = $('div.template div.popup.element').html();
        var s = '<div class="popup element element' + elementCount +'">' + html + '</div>';
        $('.js-mv_element').append(s);
        var t = '<span class="js-time" data-time="' + _time + '">[' + time + ']</span> ';
        $('div.element' + elementCount + ' h3 a.bar').prepend(t);
        $('div.element' + elementCount + ' input[name="a"]').attr('name', 'a'+elementCount);
        $('div.element' + elementCount + ' input[name="b"]').attr('name', 'b'+elementCount);
        setToggleEvent(elementCount);
        break;
    }
  }

  //イベントの開閉（slideToggle）を追加する
  function setToggleEvent(elementCount){
    $('div.element' + elementCount + ' h3.js-header a.bar').click(function(){
      $('div.element' + elementCount + ' div.element-inner').slideToggle();
    });

    $('div.element' + elementCount + ' a.js-delete').click(function(){
      //eventtimeArr[elementCount-1] = '-1';
      //delete obj[elementCount-1];
      delete obj[elementCount];
      $('div.element' + elementCount).remove();
    });
  }

  //時間を[00:00]形式に変換
  function chageTypeTime(_time){
    var t, m, s;
    if(_time >= 60){
      m = Math.floor(_time / 60);
      s = _time - m * 60;
    }else{
      m = 0;
      s = _time;
    }
    t = getdoubleDigestNumer(m) + ':' + getdoubleDigestNumer(s);
    return t;
  }

  function getdoubleDigestNumer(n) {
    return ("0" + n).slice(-2);
  }

  //設定されたイベントをコードに変換する
  function addCode(){

    //var assetsPath = $('input.assets_path').val();
    actionList = ''
    for(var j=1; j<=elementCount; j++){
      var type = '';

      if( $('div.element' + j).hasClass('multiple_button') ){
        type = 'multiple';
        var v0 = $('div.element' + j + ' .js-time').data('time');
        var v1 = $('div.element' + j + ' input.skip_time_a').val();
        var v2 = $('div.element' + j + ' input.skip_time_b').val();
        var v3 = $('div.element' + j + ' input.button-a_asset').val();
        var v4 = $('div.element' + j + ' input.button-b_asset').val();
        var v5 = $('div.element' + j + ' input.eventcode_a').val();
        var v6 = $('div.element' + j + ' input.eventcode_b').val();
        //id設定完了
        var v7 = $('div.element' + j + ' input.setid_a').val();
        var v8 = $('div.element' + j + ' input.setid_a').val();

        //var slash1 = v3.lastIndexOf( "\\");
        //var assetName1 = assetsPath + v3.substr(slash1+1);
        //var slash2 = v4.lastIndexOf( "\\");
        //var assetName2 = assetsPath + v4.substr(slash2+1);

        if(v1 == ''){
          v1 = v0;
        }
        if(v2 == ''){
          v2 = v0;
        }

        actionList += '{type:"' + type + '",que:"' + v0 + '",action_a:"' + v1 + '",action_b:"' + v2 + '",imagePath_a:"' + v3 + '",imagePath_b:"' + v4 + '",gtag_a:"' + v5 + '",gtag_b:"' + v6 + '",html_id_a:"' + v7 + '",html_id_b:"' + v8 + '"} ,';

        var v = {type:type, que:v0 ,action_a:v1,action_b:v2,imagePath_a:v3,imagePath_b:v4,gtag_a: v5,gtag_b: v6,html_id_a: v7,html_id_b: v8};
        obj.push(v);
      }

      if( $('div.element' + j).hasClass('single_button') ){
        type = 'single';
        var v0 = $('div.element' + j + ' .js-time').data('time');
        var v1 = $('div.element' + j + ' input.get_url').val();
        var v2 = $('div.element' + j + ' input.single_asset').val();
        var v3 = $('div.element' + j + ' input.layout_top').val() + '%';
        var v4 = $('div.element' + j + ' input.layout_left').val() + '%';
        var v5 = $('div.element' + j + ' input.eventcode').val();
        //id設定完了
        var v6 = $('div.element' + j + ' input.setid').val();
        if(v1 == ''){
          v1 = v0;
        }
        //var slash = v2.lastIndexOf( "\\");
        //var assetName = assetsPath + v2.substr(slash+1);
        actionList += '{type:"' + type + '",que:"' + v0 + '",action:"' + v1 + '",imagePath:"' + v2 + '",top:"' + v3 + '",left:"' + v4 + '",gtag:"' + v5 + '",html_id:"' + v6 + '"} ,';

        var v = {type:type, que:v0 ,action:v1, imagePath:v2,top:v3,left: v4,gtag: v5,html_id: v6};
        obj.push(v);
      }

      if( $('div.element' + j).hasClass('popup') ){
        type = 'popup';
        var v0 = $('div.element' + j + ' .js-time').data('time');
        var v1 = $('div.element' + j + ' input.popup_asset').val();
        var v2 = $('div.element' + j + ' input.skip_time').val();
        var code = $('div.element' + j + ' input.eventcode').val();
        //id設定完了
        var vhtml_id = $('div.element' + j + ' input.setid').val();

        if(v2 == ''){
          v2 = v0;
        }

        //var slash = v1.lastIndexOf( "\\");
        //var assetName = assetsPath + v1.substr(slash+1);

        //actionList += '["' + type + '","' + assetName + '","' + v2 +'","' + code + '"]';
        actionList += '{type:"' + type + '",que:"' + v0 + '",action:"' + v2 + '",imagePath:"' + v1 + '",gtag:"' + code + '",html_id:"' + vhtml_id + '"} ,';

        var v = {type:type, que:v0 ,action:v2, imagePath:v1,gtag: code};
        obj.push(v);
      }
    }

    generateCode();
  }

  //コードをタグに変換してテキストエリアに出力する
  function generateCode(){
    //id設定完了
    var code = '<nav><button class="show_mirumaker_player">動画を見る</button></nav>';
    code += '<script>var MirumakerEventData = [{ v:1 ,moviePath:"' + movieFilePath + '", gtag:';
    code += '"' + $('input.show_movie_eventcode').val() + '"},';
    code += actionList;
    code += '];</script><script src="./assets/mirumaker.js"></script>';
    $('textarea.js-srccode').text(code);
    $('textarea.js-srccode').removeClass('is-hide');
    actionList = undefined;
  

    //保存
    save();
  }

  function typeEquals(type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    return clas === type;
  }

  //保存
  function save(){
    if (localStorage) {
      //ローカルストレージを呼び出し
      var storage = localStorage;
      storage.movie_assets = movieFilePath;
      //storage.assetsPath = $('input.assets_path').val();
      storage.gtag = $('input.show_movie_eventcode').val();
      storage.removeItem('actionList');
      var data = [];
      data = obj;
      storage.setItem('actionList', JSON.stringify(data));
    }else{
      alert('ご利用のブラウザでは保存することができません。');
    }
  }

  //読み込み
  var saveDataGtag;
  var saveDataMovieAssets;
  //var saveDataAssetsPath;
  var saveData = new Object();
  window.addEventListener('DOMContentLoaded',
    function() {
      if (localStorage) {
        var storage = localStorage;
        saveDataMovieAssets = storage.getItem('movie_assets');
        //saveDataAssetsPath = storage.getItem('assetsPath');
        saveDataGtag = storage.getItem('gtag');
        var _data = localStorage.getItem('actionList');
        _data = JSON.parse(_data);
        setLoadData(_data);
      }
    }
  );

  function setLoadData(data){
    //$('input.assets_path').val(saveDataAssetsPath);
    $('input.show_movie_eventcode').val(saveDataGtag);

    if(data){
      //
      for (var i = 0; i < data.length; i++) {
        addEvent(data[i]['que'], data[i]['type'], true);

        //押されたイベントのタイプによって処理を振り分ける
        switch(data[i]['type']){
          case 'multiple':
            var trg = $('div.js-mv_element div.element'+(i+1)+'');

            //画像素材のURLを取得してファイル名抽出
            var asset_a = data[i]['imagePath_a'];
            var asset_b = data[i]['imagePath_b'];
            $(trg).find('input.button-a_asset').val(asset_a);
            $(trg).find('input.button-b_asset').val(asset_b);

            //遷移先URL、動画時間
            $(trg).find('input.skip_time_a').val(data[i]['action_a']);
            $(trg).find('input.skip_time_b').val(data[i]['action_b']);

            //トラッキングコード
            $(trg).find('input.eventcode_a').val(data[i]['gtag_a']);
            $(trg).find('input.eventcode_b').val(data[i]['gtag_b']);
            //id設定まだ
            $(trg).find('input.setid_a').val(data[i]['html_id_a']);
            $(trg).find('input.setid_b').val(data[i]['html_id_b']);
            break;

          case 'single':
            var trg = $('div.js-mv_element div.element'+(i+1)+'');

            //画像素材のURLを取得してファイル名抽出
            var asset = data[i]['imagePath'];
            $(trg).find('input.single_asset').val(asset);

            //遷移先URL、動画時間
            $(trg).find('input.get_url').val(data[i]['action']);
            //レイアウト　left%/top%
            var left = data[i]['left'];
            $(trg).find('input.layout_left').val(left.slice(0, -1));
            var top = data[i]['top'];
            $(trg).find('input.layout_top').val(top.slice(0, -1));
            //トラッキングコード
            $(trg).find('input.eventcode').val(data[i]['gtag']);
            //id設定まだ
            $(trg).find('input.setid').val(data[i]['html_id']);
            break;
          case 'popup':
            var trg = $('div.js-mv_element div.element'+(i+1)+'');

            //画像素材のURLを取得してファイル名抽出
            var asset = data[i]['imagePath'];
            $(trg).find('input.popup_asset').val(asset);

            //遷移先URL、動画時間
            $(trg).find('input.skip_time').val(data[i]['action']);
            //トラッキングコード
            $(trg).find('input.eventcode').val(data[i]['gtag']);
            //id設定まだ
            $(trg).find('input.setid').val(data[i]['html_id']);
            break;
        }
      }
    }
  }

  function setGrid(){
    var h = $('.src').height();
    $('.grid').css({'height':h});
    $('.grid').html(
        '<div class="vertical" style="height:'+h+'px;">' +
          '<div class="grid-0"></div>' +
          '<div class="grid-1"><p>10 <span>%</span></p></div>' +
          '<div class="grid-2"><p>20 <span>%</span></p></div>' +
          '<div class="grid-3"><p>30 <span>%</span></p></div>' +
          '<div class="grid-4"><p>40 <span>%</span></p></div>' +
          '<div class="grid-5"><p>50 <span>%</span></p></div>' +
          '<div class="grid-6"><p>60 <span>%</span></p></div>' +
          '<div class="grid-7"><p>70 <span>%</span></p></div>' +
          '<div class="grid-8"><p>80 <span>%</span></p></div>' +
          '<div class="grid-9"><p>90 <span>%</span></p></div>' +
        '</div>'+
        '<div class="horizontal" style="height:'+h+'px;">' +
          '<div class="grid-0"></div>' +
          '<div class="grid-1"><p>10 <span>%</span></p></div>' +
          '<div class="grid-2"><p>20 <span>%</span></p></div>' +
          '<div class="grid-3"><p>30 <span>%</span></p></div>' +
          '<div class="grid-4"><p>40 <span>%</span></p></div>' +
          '<div class="grid-5"><p>50 <span>%</span></p></div>' +
          '<div class="grid-6"><p>60 <span>%</span></p></div>' +
          '<div class="grid-7"><p>70 <span>%</span></p></div>' +
          '<div class="grid-8"><p>80 <span>%</span></p></div>' +
          '<div class="grid-9"><p>90 <span>%</span></p></div>' +
        '</div>'
    ).hide();
  }

  function toggleGrid(_toggle){
    var h = $('.src').height();
    $('.grid').css({'height':h});
    $('.vertical').css({'height':h});
    $('.horizontal').css({'height':h});
    if(_toggle == 'on'){
      $('.grid').fadeIn(300);
    }else{
      $('.grid').hide();
    }
  }

}).call(this);
