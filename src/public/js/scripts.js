$('#btn-toggle-comment').click(function(e) {
    e.preventDefault();
    $('#post-comments').slideToggle();
});
$('#post-comments').hide();

$('#btn-like').click(function(e) {
    e.preventDefault;
    let imgId = $(this).data('id');
    console.log(imgId)
    
    $.post('/images/' + imgId + '/like')
        .done(data => {
            console.log(data);
            $('.likes-count').text(data.likes)
        })
});

$('#btn-delete').click(function(e) {
    e.preventDefault;
    let $this = $(this);
    if (confirm('Are you sure you want to delete this image?')) {
        let imgId = $this.data('id');
        $.ajax({
            url: '/images/' + imgId + '/delete',
            type: 'DELETE'
        }).done(function(result) {
            $this.removeClass('btn-danger').addClass('btn-success');
            $this.find('i').removeClass('fa-times').addClass('fa-check');
            $this.append('Deleted!');
        })
    }
})