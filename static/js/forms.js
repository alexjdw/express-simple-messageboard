function makePost(post_info) {
    output = ''
      + '<div class="post">'
      + 'Post by ' + post_info.name + ' at ' + post_info.posted_on
      + '<p>'
      + post_info.content
      + '</p>';
    
    for (var c=0; c<post_info.comments.length; c++) {
      output += '<div>'
        + 'Comment by ' + post_info.comments[c].name
        + ' at ' + post_info.comments[c].posted_on
        + '<p>'
        + post_info.comments[c].content
        + '</p>'
        + '</div>';
        }
    output += '<div>'
        + '<form action="/comment" method="post" pid="' + post_info._id + '">'
        + '<textarea name="comment"></textarea>'
        + '<button type="submit">Submit New Comment</button>'
        + '</form>'
        + '</div>'
        + '</div>';
    return output;
}

function makeComment(post_info) {
    output = ''
      + '<div class="comment">'
      + 'Comment by ' + post_info.name + ' at ' + post_info.posted_on
      + '<p>'
      + post_info.content
      + '</p>'
      + '</div>';
    return output;
}

function addHandlers() {
    
}

$(document).ready(() => {
    $('#setname').click(() => {
        var name = $('#name').val();
        if (name.length > 0) {
            $('#namediv').fadeOut(200);
            $('#msgboard').delay(200).fadeIn(200);
            $('#myname').text(name);
        }
    });

    $(document).on('submit', 'form', function(e) {
        e.preventDefault();
        var data = $(this).serialize() + '&name=' + $('#name').val();
        if ($(this).attr('pid')) {
            data += '&id=' + $(this).attr('pid');
        }
        $.ajax({
                url: $(this).attr('action'),
                data: data,
                method: 'POST',
                context: this
            })
            .done((response) => {
                if ($(this).attr('action') === '/post') {
                    $(this).after(makePost(response));
                } else {
                    $(this).parent().before(makeComment(response));
                }
            })
            .fail((response) => {
                alert("Submission encountered an error and wasn't posted.");
            });
    });
});