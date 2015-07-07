// create directive out of this

function Parralax($container, $image) {
    this.$container = $container;
    this.$image1 = $image;
    this.$image2 = $image.clone();

    this.width = parseInt(this.$image1.css('width'));
    this.x1 = 0;
    this.x2 = -this.width + 1;

    this.$image2.css('left', this.x2);
    this.$container.append(this.$image2);

    $(window).resize(function()
    {
        width = parseInt(this.$image1.css('width'));
        this.x2 = this.x1 - this.width + 1;
    });

    this.scroll = function () {
        if (this.x1 >= this.width) {
            this.x1 = 0;
            this.x2 = -this.width + 1;
        }

        this.$image1.css('left', this.x1 += 0.25);
        this.$image2.css('left', this.x2 += 0.25);
    }

    this.run = function () {
        setInterval(this.scroll, 1000);
    }
}
