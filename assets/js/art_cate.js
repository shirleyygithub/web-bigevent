$(function () {
  var layer = layui.layer
  var form = layui.form

  initArtCateList()
  // 1、获取文章分类的列表,渲染
  function initArtCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        // console.log(res);

        // 两个参数，一个是定义模板的id，一个是传递的数据
        // 接收模板数据渲染好的值
        var htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
      }
    })
  }
  // 2、为添加类别按钮绑定点击事件。渲染弹出层
  var indexAdd = null
  $('#btnAddCate').on('click', function () {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      // 获取标签内部的内容
      content: $('#dialog-add').html()
    })
  })

  // 3、通过代理的形式，为 form-add 表单绑定 submit 事件，因为是渲染出来的表单
  $('body').on('submit', '#form-add', function (e) {
    // 阻止表单的默认提交事件
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      // 拿到表单中的所有数据
      data: $(this).serialize(),
      // 成功的数据函数
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('新增分类失败！')
          // 测试报错{status: 1, message: "ER_DUP_ENTRY: Duplicate entry '2147483647' for key 'PRIMARY'"}
        }
        // 刷新表格
        initArtCateList()
        layer.msg('新增分类成功！')
        // 根据索引，关闭对应的弹出层
        layer.close(indexAdd)
      }

    })
  })
  //4、 通过代理的形式，为 btn-edit 按钮绑定点击事件
  var indexEdit = null
  $('tbody').on('click', '.btn-edit', function () {
    // 弹出一个修改文章分类信息的层
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#dialog-edit').html()
    })

    var id = $(this).attr('data-id')
    // 拿到点击的哪一个的序号👆，用序号渲染出该行的数据

    // 发起请求获取对应分类的数据
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + id,
      success: function (res) {
        form.val('form-edit', res.data)
      }
    })
  })

  // 5、通过代理的形式，为修改分类的表单绑定 submit 事件
  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新分类数据失败！')
        }
        layer.msg('更新分类数据成功！')
        // 通过索引关闭弹出层
        layer.close(indexEdit)
        // 刷新表格
        initArtCateList()
      }
    })
  })

  //6、 通过代理的形式，为删除按钮绑定点击事件
  $('tbody').on('click', '.btn-delete', function () {
    var id = $(this).attr('data-id')
    // 提示用户是否要删除
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg('删除分类失败！')
          }
          layer.msg('删除分类成功！')
          layer.close(index)
          initArtCateList()
        }
      })
    })
  })
})