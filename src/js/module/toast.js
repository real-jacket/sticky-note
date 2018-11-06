require('less/toast.less')

function Toast(message, time) {
    this.message = message
    this.time = time || 1000
    this.creatToast()
    this.showToast()
}

Toast.prototype = {
    creatToast:function() {
        let template = '<div class="toast">' + this.message + '</div>'
        this.$toast = $(template)
        $('body').append(this.$toast)
    },
    showToast: function () {
        let self = this
        this.$toast.fadeIn(500, function () {
            setTimeout(function () {
                self.$toast.fadeOut(500, function () {
                    self.$toast.remove()
                })
            }, self.time)
        })
    }
}

function toast(message,time) {
    return new Toast(message,time)
}

module.exports.toast = toast