$(document).ready(function ()
{
    // misc
    keys = {};

    // me
    $me = $('.character.me');
    x = parseInt($me.data('x'));
    y = parseInt($me.data('y'));;
    currentY = parseInt($me.data('y'));;
    myWidth = parseInt($me.data('width'));
    myHeight = parseInt($me.data('height'));
    velocity = 0;
    maxVelocity = 4;
    acceleration = 1;
    jumpSpeed = 0;
    maxJumpHeight = 160;
    jumpAcceleration = 14;
    gravity = 10;

    // map
    $map = $('.map');
    mapWidth = parseInt($map.data('width'));
    mapHeight = parseInt($map.data('height'));

    // flags
    hasLanded = false;
    hasCollided = false;

    // routine
    init();
    setInterval(mainLoop, 0);
});

function mainLoop ()
{
    // collision
    if (x + myWidth + velocity < mapWidth && x + velocity > 0) {
        hasCollided = false;
    } else {
        hasCollided = true;
    }

    // gravity
    if (y + myHeight + gravity < mapHeight) {
        $me.data('y', y += gravity);
    }

    // jumping
    if (y < 0.5) {
        currentY = $me.data('y');
        jumpSpeed = 0;
    } else {
        $me.data('y', y -= jumpSpeed);
        if (jumpSpeed > 0) jumpSpeed -= 0.05;
    }

    // moving
    if ((velocity > -0.5 && velocity < 0.5) || hasCollided) {
        velocity = 0;
    } else {
        $me.data('x', x += velocity);
        if (velocity > 0) velocity -= 0.02;
        if (velocity < 0) velocity += 0.02;
    }

    // drawing
    $me.css('top', $me.data('y'));
    $me.css('left', $me.data('x'));
}

function handleKeys ()
{
    // right
    if (keys.hasOwnProperty('39')) {
        if (velocity < maxVelocity) {
            velocity += acceleration;
        }
    }

    // left
    if (keys.hasOwnProperty('37')) {
        if (velocity > -maxVelocity) {
            velocity -= acceleration;
        }
    }

    // space
    if (keys.hasOwnProperty('32')) {
        if (y > currentY - maxJumpHeight && y > mapHeight - myHeight * 2) {
            jumpSpeed += jumpAcceleration;
        }
    }
}

function init ()
{
    // init map
    $map.css({
        'width' : mapWidth,
        'height' : mapHeight
    });

    // init me
    $me.css({
        'width' : myWidth,
        'height' : myHeight,
        'left' : x,
        'top' : y
    });
}

$(document).on('keydown', function (e)
{
    keys[e.which] = true;
    handleKeys();
});

$(document).on('keyup', function (e)
{
    delete keys[e.which];
});
