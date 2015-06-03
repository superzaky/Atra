$(window).load(function ()
{
    $background = $('#background');
    $image1 = $('#background').find('.parallax-bg');
    $image2 = $image1.clone();

    width = parseInt($image1.css('width'));
    x1 = 0;
    x2 = -width + 1;

    $image2.css('left', x2);
    $background.append($image2);

    setInterval(parallax, 0);
});

$(window).resize(function()
{
    width = parseInt($image1.css('width'));
    x2 = x1 - width + 1;
});

function parallax ()
{
    if (x1 >= width) {
        x1 = 0;
        x2 = -width + 1;
    }

    $image1.css('left', x1+=0.25);
    $image2.css('left', x2+=0.25);
}