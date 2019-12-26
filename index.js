$(document).ready(function () {
    $('#fullpages').fullpage({
        //配置每一屏的颜色
        //sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", ],
        scrollingSpeed: 1000, //滚动速度
        navigation: true, //是否显示项目导航
        anchors: ['home_uasdc', 'bit_unrg8', 'bit_fa4q9', 'bit_pl7t4', 'bit_ykkzt', 'bit_nq9tw'],
        afterLoad: function (anchorLink, index) {
            //index 是进入到第几屏的序号从1开始
            $('.content').eq(index).addClass('now');
            if (index == 6) {
                // 让按钮消失
                $('.go_bottom').css('display', 'none')
                // 回到顶部事件
                // $('.go_top').click(function (section, slide) {
                //     console.log(section)
                //     moveTo(section.watch, slide)
                // })
            } else {
                // 让按钮显示
                $('.go_bottom').css('display', 'block')
            }
        }
    });
    // 向下观看事件
    $('.go_bottom').click(function () {
        $.fn.fullpage.moveSectionDown()
    })
});
$(function () {
    // 提交邮件
    $('#button').click(function () {
        var email = $.trim($('#email').val())
        var text = $.trim($('#text').val())
        var name = $.trim($('#name').val())
        if (!name) {
            alert('请输入姓名')
            return;
        }
        if (!email.match(
                /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g)) {
            alert('请输入正确的格式')
            return;
        }
        if (!text) {
            alert('请输入内容')
            return;
        }
        $.post('http://127.0.0.1/resume/api/sendEmail.php', {
            'email': email,
            'text': text,
            'name': name
        }, function (data, s) {
            console.log(data)
            console.log(s)
            if (data == 3 && s == 'success') {
                alert('发送成功');
                $('#email').val('')
                $('#text').val('')
                $('#name').val('')
            } else {
                alert('发送失败')
            }
        })

    })
})