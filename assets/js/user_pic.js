$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  // 2、点击上传文件事件
  $('#btnChooseImage').on('click', function () {
    // 点击了上传文件按钮，模拟点击了隐藏的文件上传
    $('#file').click()

  })

  //3、 为文件选择框绑定一个图片切换事件
  $('#file').on('change', function (e) {
    // 获取用户选择的文件
    var filelist = e.target.files
    // 如果没有拿到文件，则返回报错信息
    if (filelist.length === 0) {
      return layer.msg('请选择照片！')
    }

    // 1. 拿到用户选择的文件
    var file = e.target.files[0]
    // 2. 将用户上传的文件，转化为路径，赋值给我们要渲染的路径
    var imgURL = URL.createObjectURL(file)
    // 3. 重新初始化裁剪区域
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', imgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })

  //4、 为点击确定按钮，绑定点击事件
  $('#btnUpload').on('click', function () {
    // 1. 要拿到用户裁剪之后的头像
    var dataURL = $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串，减少一些不必要的图片请求，体积更大+30%，小图片可以，大图片不适用

    // 2. 调用接口，把头像上传到服务器，刷新也在
    $.ajax({
      method: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更换头像失败！')
        }
        layer.msg('更换头像成功！')
        // 掉父页面的函数
        window.parent.getUserInfo()
      }
    })
  })
})
