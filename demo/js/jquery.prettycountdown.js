(function ($) {
    'use strict'
    $.fn.countdown = function (options) {
        //clear wrapping div and assign to var
        this.empty()
        var $target = this
        //DOM structure for countdown
        var $countdown = $('<div>')
            .attr('id', 'jm_pc_wrap')
            .append(
                $('<span>')
                .addClass('jm_pc_cd_message')
                .text('Countdown ends in:')
            ).append(
                $('<div>')
                .attr('id', 'jm_pc_numbers')
            )
        var $number = $('<div>')
        $target.append($countdown)
        var info = [
            {
                label : 'Days',
                short : 'D',                
            },
            {
                label : 'Hours',
                short : 'h',                
            },
            {
                label : 'Minutes',
                short : 'm',                
            },
            {
                label : 'Seconds',
                short : 's',                
            },
            
        ]
        //get date string, parse to date object and get miliseconds
        var endDate = new Date(options.date).getTime()
        //add leading zero to single-digit numbers and return as string
        function dDigit(i) {
            var n = i.toString()
            if (n.length < 2) {
                return '0' + n
            } else {
                return n
            }
        }
        //Counter constructor
        var Counter = function () {
            var scope = this
            //get distance between now and end date
            this.dis = function () {
                return endDate - new Date().getTime()
            }
            //get # of whole days
            this.D = function () {
                var d = Math.floor(this.dis() / (86400000))
                return dDigit(d)
            }
            //get # of whole hours
            this.H = function () {
                var h = Math.floor((this.dis() % (86400000)) / (3600000))
                return dDigit(h)
            }
            //get # of whole minutes
            this.M = function () {
                var m = Math.floor((this.dis() % (3600000)) / (60000))
                return dDigit(m)
            }
            //get # of seconds
            this.S = function () {
                var s = Math.floor((this.dis() % (60000)) / 1000)
                return dDigit(s)
            }
            this.p = function () {
                if (this.dis() <= 0) {
                    return $target.find('#jm_pc_numbers').html('BOOM! Countdown Ended!')
                } else {
                    printNumbers(
                        this.D(),
                        this.H(),
                        this.M(),
                        this.S()
                    )
                }
            }
            //update distance every 1000ms
            this.i = setInterval(function () {
                scope.p()
            }, 1000)
        }
        //initiate counter
        var countdown = new Counter()
        //print imideiatelly - fixes one second delay
        countdown.p()

        function printNumbers(d, h, m, s) {
            //empty numbers wrapper
            $('#jm_pc_numbers').empty()
            //get arguments passed to function
            var a = arguments
            //loop through arguments
            for (var i = 0; i < a.length; i++) {
                //append digits
                    $('#jm_pc_numbers')
                        .append(
                            $number
                            .clone()
                            .text(a[i])
                            .addClass('jm_pc_numbers_' + i)
                            .append(
                                $('<span>')
                                .addClass('jm_pc_label')
                                .text(info[i].label)
                                    ))
               
                //if it is not last argument append separator
                /*if (a.length - 1 !== i) {
                    $('#jm_pc_numbers').append(
                        $number
                        .clone()
                        .text('|'))
                }*/
            }



        }
    }
}(jQuery))