$(function () {
  getUserInfo()
  $('#btnLogout').on('click', function () {
    // console.log('ok'
    // );
    // 提示用户确认退出登录
    var layer = layui.layer
    layer.confirm('确认退出登陆吗?', { icon: 3, title: '提示' }, function (index) {
      //do something
      console.log('退了');
      // 是登陆成功的反方向，删除本地存储的token，回到登陆首页面
      localStorage.removeItem('token')
      location.href = '/codeTest/login.html'
      // 关闭弹出层
      layer.close(index);
    });
  })
})

// 获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // 请求头配置对象
    // headers: {
    //   Authorization: localStorage.getItem('token') || ''
    // },
    success: function (res) {
      // console.log(res);
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败')
      }
      // 渲染用户头像
      renderAvatar(res.data)
    },
    // 禁止不登陆就进入页面

  })
}


// 渲染用户头像
function renderAvatar(user) {
  // 1\获取用户的名称
  var name = user.nickname || user.username
  // 2、设置欢迎的文本
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  if (user.user_pic !== null) {
    // 3.1 渲染图片头像
    $('.layui-nav-img')
      .attr('src', user.user_pic)
      .show()
    $('.text-avatar').hide()
  } else {
    // 3.2 渲染文本头像
    $('.layui-nav-img').hide()
    // 拿到第一个字符转化成为大写形式
    var first = name[0].toUpperCase()
    $('.text-avatar')
      .html(first)
      .show()
  }
}
