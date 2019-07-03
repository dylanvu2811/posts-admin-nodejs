function Post(){
    function bindEvent(){
        $('.post_edit').click(function(e){
            const params = {
                id: $('.id').val(),
                title: $('.title').val(),
                author: $('.author').val(),
                content: $('content').val()
            };

            const base_url = location.protocol + '//' + document.domain + ":" + location.port;

            $.ajax({
                url: '/admin/post/edit/',
                type: 'PUT',
                data: params,
                dataType: 'json',
                success: (res) => {
                    if (res && res.status_code == 200) {
                        location.reload();
                    }
                }
            })
        });
    }
    bindEvent();
}

$(document).ready(function(){
    new Post();
});