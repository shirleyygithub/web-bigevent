$(function () {
  // 为注册和登录切换事件
  // 点击去注册，隐藏登录框，显示注册框
  $('#link-reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  // 点击去登录，切换
  $('#link-login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  // 从layui中获取form对象
  var form = layui.form
  var layer = layui.layer
  // 自定义校验规则
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    // 检验两次密码是否一致，失败则return错误提示
    rePwd: function (value) {
      // 拿到密码输入框的value值
      var pwd = $('.reg-box [name=password]').val()
      // 比较
      if (pwd !== value) {
        return '两次密码不一致'
      }
    }
  })
  // 监听注册表单的提交事件
  $('#form-reg').on('submit', function (e) {
    // 阻止默认提交事件，拿到传入的值，发起ajaxPost请求，并返回服务器数据

    e.preventDefault();
    var data = {
      username: $('#form-reg [name=username]').val(),
      password: $('#form-reg [name=password]').val()
    }
    $.post('/api/reguser',
      data, function (res) {
        if (res.status !== 0) {
          // return console.log(res.message);
          // 调用组件库的消息提示
          return layer.msg(res.message);
        }
        // console.log($('#form-reg[name=username]').val());

        // console.log('注册成功');
        layer.msg('注册成功，请登录');
        // 自动跳转回登陆页面，模拟点击事件
        $('#link-login').click()
      })
  })
  // 监听登录表单的提交事件
  $('#form-login').on('submit', function (e) {
    // 阻止默认提交事件，拿到传入的值，发起ajaxPost请求，并返回服务器数据

    e.preventDefault();

    $.ajax({
      // 最好是自动拼接根路径
      url: '/api/login',
      method: 'POST',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          // 调用组件库的消息提示
          return layer.msg('登陆失败');
        }
        // 44445 444555密码
        layer.msg('登录成功');
        // console.log(res.token);
        // 讲字符串保存到本地存储中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = '/codeTest/index1.html'

      }
    })
  })


})