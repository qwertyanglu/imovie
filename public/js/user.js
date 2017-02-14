$(function(){
	$(".add").click(function(){
		layer.open({
		  type: 2,
		  title:'新增电影',
		  skin: 'layui-layer-rim', //加上边框
		  area: ['600px', '500px'], //宽高
		  content: '/admin/movie'
		})
	})

	$('.add-submit').click(function(){
		var formData = $('.imovieForm').serializeArray();
		$.ajax({
			type:'post',
			url: '/admin/movie',
			data: formData
		})
		.done(function(data){
			if(data.success >= 1){
				var message = getAlertMessageByCode(data.success)
				parent.layer.alert(data.data.title+message, function(index){
					parent.layer.close(index)
					window.parent.location.reload()
				})
			}
		})

		var getAlertMessageByCode = function(code){
			switch(code){
				case 1:
					return "添加成功"
					break
				case 2:
					return "更新成功"
					break
				default:
					break
			}
		}
			
		return false
	})

	$('.add-cancle').click(function(){
		parent.layer.closeAll()
	})

	$(".del").click(function(){
		var _this = this;
		layer.confirm('是否确认删除',function(){
			delFun()
		},function(index){
			layer.close(index)
		})
		var delFun = function(){
			var targetId = $(_this).attr('data-id')
			var targetTitle = $(_this).closest("tr").find("td").eq(1).text()
			$.ajax({
				type:'delete',
				url:'/admin/user',
				data:{id:targetId}
			})
			.done(function(data){
				if(data.success == 1){
					console.log(data)
					layer.alert(targetTitle+"删除成功", function(index){
						layer.close(index)
						window.location.reload()
					})
					$(_this).closest('tr').remove()
				}
			})
		}
	})
})

function updateMovie(movieid){
	layer.open({
	  type: 2,
	  title:'更新电影',
	  skin: 'layui-layer-rim', //加上边框
	  area: ['600px', '500px'], //宽高
	  content: '/admin/movie/update/'+movieid
	})
}