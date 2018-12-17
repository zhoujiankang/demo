$(function(){
    let APIUrl="";
    if(window.location.host.match("static.xiaotucc.com")!=null){
        APIUrl="https://web.xiaotucc.com"
    }else if(window.location.host.match("statictest.xiaotucc.com")!=null){
        APIUrl="https://webtest.xiaotucc.com"
    }else if(window.location.host.match("127.0.0.1")!=null||window.location.host.match("192.168.1.110")!=null){
        APIUrl="https://weiqin.wcsmalllife.com"
    };
    /***
        微信配置
    ***/ 
    let $path= location.href.split('#')[0];
    $.ajax({
        type: 'POST',
        url: APIUrl + '/recruit/getPackage',
        // url: 'https://weiqin.wcsmalllife.com/recruit/getPackage',
        data: {url:$path},
        success: function(data){
            if(data.status = 200){
                console.log(data);
                // 微信配置信息
                wx.config({ 

                    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。

                    appId: data.data.appId, // 必填，公众号的唯一标识

                    timestamp: data.data.timestamp, // 必填，生成签名的时间戳

                    nonceStr: data.data.nonceStr, // 必填，生成签名的随机串

                    signature: data.data.signature,// 必填，签名

                    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','hideMenuItems'] // 必填，需要使用的JS接口列表

                });
                wx.ready(function(){
                    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                    wx.hideMenuItems({
                        menuList: [
                            "menuItem:share:facebook",   //分享到FB
                            "menuItem:share:QZone",         //分享到 QQ 空间
                            "menuItem:share:qq",             //分享到 QQ
                            "menuItem:share:weiboApp"       //分享到Weibo
                        ] 
                    });
                    // 分享朋友圈
                    wx.onMenuShareTimeline({
                            title: '【站长招募令】你的"站”，你做"主"', // 分享标题
                            link: $path, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: '../img/shareIcon.png', // 分享图标
                            success: function () {
                                // 用户点击了分享后执行的回调函数
                                location.reload();
                            },
                    });
                    // 分享到朋友
                    wx.onMenuShareAppMessage({
                        title: '【站长招募令】你的"站”，你做"主"', // 分享标题
                        desc: '充电站“站长”紧急招募中，0风险创业躺着赚钱', // 分享描述
                        link: $path, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: '../img/shareIcon.png', // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            // 用户点击了分享后执行的回调函数
                            location.reload();
                        }
                    });
                });
            }else{
                layer.open({
                    content: data.msg,
                    skin: 'msg',
                    time: 2          //2秒后自动关闭
                });
            };
        },
        error: function(xhr, type){
            layer.open({
                content: '请求错误，请重试！',
                skin: 'msg',
                time: 2          //2秒后自动关闭
            });
        }
    });


    /**
     * 设置动画
     * **/
    setInterval(function(){
        if($('.animated').hasClass('shake')){
            $('.animated').removeClass('shake')
        }else{
            $('.animated').addClass('shake')
        }
    },1000);
    /**
     * 选择框封装函数
     * **/
    function selectHandle (nowValue,dataArr){
        new Picker({
            "title": '请选择',//标题(可选)
            "defaultValue": nowValue.value,//默认值-多个以空格分开（可选）
            // "type": 1,//需要联动级数[1、2、3]（可选）
            "data":dataArr,//数据(必传)
            "keys": {
                "id": "Code",
                "value": "Name",
                "childData": "level"//最多3级联动
            },//数组内的键名称(必传，id、text、data)
            "callBack": function (val) {
                //回调函数（val为选择的值）
                nowValue.value = val;
            }
        });
    };
    /**
     * 选择性别
     * **/
     $('body').on('touchend','#sex',function(){
        document.activeElement.blur();
        let nowValue = document.getElementById('sex');
        let dataArr = [
                {
                    "Code": "940000",
                    "Name": "男",
                },
                {
                    "Code": "940000",
                    "Name": "女",
                }
            ];
        selectHandle(nowValue,dataArr);
    });
    /**
     * 选择档位
     * **/
    $('body').on('touchend','#level',function(){
        document.activeElement.blur();
        let nowValue = document.getElementById('level');
        let levelData = [
                {
                    "Code": "940000",
                    "Name": "认领1台",
                },
                {
                    "Code": "940001",
                    "Name": "认领5台",
                },
                {
                    "Code": "940002",
                    "Name": "认领30台",
                }
            ];
        selectHandle(nowValue,levelData);
    });

    /**
     * 选择城市
     * **/
    $('body').on('touchend','#city',function(){
        document.activeElement.blur();
        let nowValue = document.getElementById('city');
        selectHandle(nowValue,cityData)
    });
    /**
     * 选择城市
     * **/
     $('.activityCon').on('click','.submit',function(){
        let content =  '<div class="popCon">'+
                                '<i class="close"></i>'+
                                '<div class="success"></div>'+
                                '<div class="subSucess">提交成功</div>'+
                                '<button class="submit ripple share">分享给好友</button>'+
                        '</div>';
        let $name = $('#name').val(),
            $sex = $('#sex').val(),
            $tel = $('#tel').val(),
            $level = $('#level').val(),
            $city = $('#city').val();
        if(!$name||!$tel||!$level||!$city){
            layer.open({
                content: '请您填写完整信息',
                skin: 'msg',
                time: 2          //2秒后自动关闭
            });
            return false;
        };
        // 验证手机号码
        if(!(/^1[3|4|5|8|7][0-9]\d{4,8}$/.test($tel))){
            layer.open({
                content: '请输入正确的手机号码',
                skin: 'msg',
                time: 2          //2秒后自动关闭
            });
            return false;
        };
        let param = {
            name:$name,
            gender:$sex,
            phone:$tel,
            grade:$level,
            address:$city
        };
        // 加载框
        let loadIndex = layer.open({
            type:2,
            shadeClose:false,
            content: '正在提交...'
        });
        $.ajax({
            type: 'POST',
            url: APIUrl+'/recruit/new',
            data: param,
            success: function(data){
                if(data.status = 200){
                    layer.close(loadIndex);
                    layer.open({
                        shadeClose:false,
                        content: content
                    });
                    // 清空
                    $('input').val('');
                    $('#sex').val('男');
                }else{
                    layer.open({
                        content: data.msg,
                        skin: 'msg',
                        time: 2          //2秒后自动关闭
                    });
                }
            },
            error: function(xhr, type){
                layer.open({
                    content: '请求错误，请重试！',
                    skin: 'msg',
                    time: 2          //2秒后自动关闭
                });
            }
        });
    });
    /**
     * 监听滚动事件
     * 
     * **/

     $('.activityCon').scroll(function(){   //页面加载时，获取滚动条初始高度
        let distance = $(this).scrollTop();  //获取滚动条初始高度的值 ：0
        let limitHeight = $('.activityImg_1').height() + $('.activityImg_2').height();
        let winHeight = limitHeight + $('.activityImg_4').height() + $('.activityImg_3').height();
    　　if(distance < limitHeight-75||distance > winHeight-75) {  //当滚动条高度为0时
        　　$('.joinUs').removeClass('showJoin'); //移除某某css
    　　} else if(distance >= limitHeight-75) {
        　　$('.joinUs').addClass('showJoin');
    　　}
    });
    /**
        关闭弹出层
    **/
    $('body').on('touchend','.close',function(e){
        e.stopPropagation();
        // 关闭
        layer.closeAll();
        return false;
    });
    /**
        分享
    **/
    $('body').on('touchend','.share',function(e){
        e.stopPropagation();
        // 关闭
        layer.closeAll();
        $('.shareTip').show();
    });
})