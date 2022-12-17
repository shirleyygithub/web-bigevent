// 入口函数
$(function () {
  var form = layui.form
  var layer = layui.layer

  // 自定义验证规则，required是必选项
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度必须在1-6个字符之间哟'
      }
    }
  })
  // 调用获取用户信息的函数
  initUserInfo()
  // 获取用户的基本信息 

  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败！')
        }
        // console.log(res);
        //给表单赋值
        form.val("formUserInfo", res.data)
      }
    })
  }

  //给表单赋值
  // form.val("formUserInfo", res.data
  //formUserInfo 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
  // {
  //  "username": "贤心"
  // "name": "value"
  // , "nickname": "女"
  // , "email": 3
  // }
  // );
  //获取表单区域所有值
  // var data1 = form.val("formUserInfo");
  // 重置表单的数据
  $('#btnReset').on('click', function (e) {
    // 阻止默认提交，重新渲染用户数据
    e.preventDefault();
    initUserInfo()
    // 用户名为啥恢复不了
  })

  // 监听表单提交时间-修改用户信息
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: "POST",
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新用户信息失败')
        }
        layer.msg('已成功修改')
        // 重新父页面渲染用户信息，左上角头像
        window.parent.getUserInfo()
      }
    })
  })
})