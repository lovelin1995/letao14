$(function () {
    //初始化mui的区域滚懂 传入父容器的选择器
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        deceleration: 0.001, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹
    });
    //调用左侧分类的菜单数据
    getCategoryLeftData();
    categoryLeftClick();
    getCategoryRightData(1);
    
})

//获取左侧分类的菜单数据
function getCategoryLeftData() {
    /*	1.1 使用$.ajax请求左侧分类的API  http://localhost:3000/category/queryTopCategory
    	1.2 定义一个左侧分类的模板
    	1.3 调用template('模板id',数据)
        1.4 把生成的模板html放到左侧分类页面*/
    $.ajax({
        url: '/category/queryTopCategory',
        success: function (data) {
            // console.log(data);
            //调用template('模拟ID',数据)
            var html = template('categoryLeftTmp', data);
            //吧生成的模板html放在左侧 生成的li放在ul里
            $('.category-left ul').html(html);
            //添加active类名
            $('.category-left ul li:eq(0)').addClass('active');
        }
    });
}
//定义右侧的商品函数
function categoryLeftClick(){
    $('.category-left').on('click','ul li a', function(e){
        //清空li的active给当前点击的A的元素添加一个active
        $('.category-left ul li').removeClass('active');
        $(e.target.parentNode).addClass('active');
        var id =$(e.target).data('id');
        console.log(id);
        getCategoryRightData(id);
    });
    // console.log(12321312321);
    // $('.category-left ul li a').on('click', function(e) {
        // 清空所有li的active在给当前点击的a的父元素li添加一个active
        // $('.category-left ul li').removeClass('active');
        // $(e.target.parentNode).addClass('active');
        // var id = $(e.target).data('id');
        // // getCategoryRightData(id);
    //     console.log(123);
    // });
}

function getCategoryRightData(id){
    $.ajax({
        url:'/category/querySecondCategory',
        data:{'id':id},
        success: function(data){
            console.log(data);
            var html=template('categoryRightTmp',data);
            if(data.rows.length){
                $('.category-right .mui-scroll').html(html);
            }else{
                $('.category-right .mui-scroll').html('<p>没有数据</p>')
            }
        }
    });
}