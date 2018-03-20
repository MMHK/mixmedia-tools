const assert = require('assert')

global.expect = function (result) {

    var resultHandle = {
        to: {

        }
    }

    var success = function () {
        console.log('预测与结果相符')
    }

    var warn = function () {
        console.log('预测与结果不相符')
    }

    resultHandle.to.equal = function (expect) {
        if (typeof expect === 'object' || typeof expect === 'array') {
            try {
                assert.equal(expect, result)
                warn()
            } catch (e) {
                success()
            }

        } else {
            if (result == expect) {
                success()
            } else {
                warn()
            }
        }
    }

    resultHandle.to.not = {
        equal: function (expect) {
            if (typeof expect === 'object' || typeof expect === 'array') {
                try {
                    assert.deepEqual(expect, result)
                    success()
                } catch (e) {
                    warn()
                }

            } else {
                if (result != expect) {
                    success()
                } else {
                    warn()
                }
            }
        }
    }
    console.log(result)
    return resultHandle
}

global.it = function (prediction, callback) {
    console.log(prediction)
    callback()
}

global.describe = function describe(describe, callback) {
    console.log('单元测试：' + describe + ' 开始')
    callback()
}