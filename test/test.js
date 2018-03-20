const assert = require('assert')

global.expect = function (result) {

    var resultHandle = {
        to: {

        }
    }

    var resultConsole = function (flag) {
        if (flag) {
            console.log('预测与结果相符')
        } else {
            //失败就停止进程，并抛出错误
            throw new Error('预测与结果不相符')
        }
    } 

    var baseJudge = function (result, expect) {
        if (result == expect) {
            return true
        } else {
            return false
        }
    }


    var literallyJudge = function (result, expect) {
        if (typeof expect == 'object' || typeof expect == 'array') {
            var expectKeys = Object.keys(expect)
            var keysLen = expectKeys.length

            if (keysLen != Object.keys(result).length) return false
          
            while (keysLen--) {
                if (result[expectKeys[keysLen]] === undefined || result[expectKeys[keysLen]] !== expect[expectKeys[keysLen]]) {
                    return false
                }
            }

            return true
        }

        throw new Error('the argument must be an objcet')
    }


    //equal 只用于基本类型的判断
    resultHandle.to.equal = function (expect) {
        resultConsole(baseJudge(result, expect))
    }


    //literallyEqual 用于对象、数组字面上判断
    resultHandle.to.literallyEqual = function (expect) {
        resultConsole(literallyJudge(result, expect))
    }


    resultHandle.to.not = {
        equal: function (expect) {
            resultConsole(!baseJudge(result, expect))
        },
        literallyEqual: function (expect) {
            resultConsole(!literallyJudge(result, expect))
        }
    }


    console.log(result)
    return resultHandle
}

global.it = function (prediction, callback) {
    console.log(prediction)
    callback()
}

global.describe = function describe(description, callback) {
    console.log('单元测试：' + description + ' 开始')
    callback()
}