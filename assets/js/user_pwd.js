$(function () {
  var form = layui.form
  // 1\自定义校验规则
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    // 2\新密码和原密码不能一致
    samePwd: function (value) {
      if (value === $('[name=oldPwd]').val()) {
        return '新旧密码不能相同'
      }
    },

    // 2\检验两次密码是否一致，失败则return错误提示
    rePwd: function (value) {
      // 拿到密码输入框的value值
      // 比较
      if (value !== $('[name=newPwd]').val()) {
        return '两次密码不一致'
      }
    }
  })
  // 监听表单的提交时间
  $('.layui-form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      // 获取表单提交的所有数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg('更新密码失败')
        }
        layui.layer.msg('更新成功')
        // jq转化为dom元素的重置表单方法
        $('.layui-form')[0].reset()
      }
    })
  })
})