function wrap(iteratorFn) {
    const _context = {
        next: 0,
        done:false,
        sent: undefined,
        stop() {
            this.done = true;
        }
    }
    return {
        next(value) {
            _context.sent = value; // 先赋值再去调用方法
            let v = iteratorFn(_context); // 执行函数传递上下文 
            return {value:v,done:_context.done}
        },
    }
}
function gen() {
    var a, b, c;
    return wrap(function gen$(_context) {
        switch (_context.prev = _context.next) {
            case 0:
                _context.next = 2;
                return 1;
            case 2:
                a = _context.sent;
                console.log(a);
                _context.next = 6;
                return 2;
            case 6:
                b = _context.sent;
                console.log(b);
                _context.next = 10;
                return 3;
            case 10:
                c = _context.sent;
                console.log(c);
            case 12:
            case "end":
                return _context.stop();
        }
    });
}

let it = gen();
console.log(it.next())
console.log(it.next('abc'))
console.log(it.next('bcd'))
console.log(it.next('bcd'))

// 实现了一个简易的generator ，generator 的原理就是将一个函数分解成多个 switch case通过指针指向要执行的部分

// function* gen() {
//     let a = yield 1;
//     console.log(a)
//     let b = yield 2;
//     console.log(b)
//     let c = yield 3;
//     console.log(c)
// }

