let WaterFall = (function () {
    let $ct;
    let $items;

    function render($c) {
        $ct = $c;
        $items = $ct.children();

        let nodeWidth = $items.outerWidth(true),
            colNum = parseInt($(window).width() / nodeWidth),
            colSumHeight = [];

        for (let i = 0; i < colNum; i++) {
            colSumHeight.push(0);
        }

        $items.each(function () {
            let $cur = $(this);

            //colSumHeight = [100, 250, 80, 200]

            let idx = 0,
                minSumHeight = colSumHeight[0];

            for (let i = 0; i < colSumHeight.length; i++) {
                if (colSumHeight[i] < minSumHeight) {
                    idx = i;
                    minSumHeight = colSumHeight[i];
                }
            }

            $cur.css({
                left: nodeWidth * idx,
                top: minSumHeight
            });
            colSumHeight[idx] = $cur.outerHeight(true) + colSumHeight[idx];
        });
    }


    $(window).on('resize', function () {
        render($ct);
    })


    return {
        init: render
    }
})();

module.exports = WaterFall