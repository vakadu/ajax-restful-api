$(function () {
    // GET/READ
    $('#get-button').on('click', function () {
        //console.log("Log");
        $.ajax({
            url: "/products",
            contentType: 'application/json',
            success: function (response) {
                //console.log(response);
                var data = $('.data');
                data.html('');

                response.products.forEach(function (product) {
                    data.append('\
                    <tr>\
                    <td class="id" >' + product.id + '</td>\
                    <td><input type="text" class="name" value="'+product.name+'"></td>\
                    <td><button class="update-button">UPDATE/PUT</button> \
                    <button class="delete-button">DELETE</button>\
                    </td>\
                    </tr>\
                    ');
                });
            }
        });
    });

    // Create/Post
    $('#create-form').on('submit', function (e) {
        e.preventDefault();

        var createInput = $('#create-input');

        $.ajax({
            url: '/products',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name: createInput.val() }),
            success: function (response) {
                console.log(response);
                createInput.val('');
                $('#get-button').click();
            }
        });
    });

    //Update/Put
    $('table').on('click', '.update-button', function () {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        var newName = rowEl.find('.name').val();

        $.ajax({
            url: '/products/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ newName: newName }),
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });

    // DELETE
    $('table').on('click', '.delete-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();

        $.ajax({
            url: '/products/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });
});
