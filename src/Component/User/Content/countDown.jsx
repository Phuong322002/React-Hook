import { useEffect, useState } from "react"



const CountDown = (props) => {
    const [count, setCount] = useState(300)
    const { TimesUp } = props

    useEffect(() => {
        // muốn giảm count xuống ra sử dụng 1 vòng lặp vô hạn là setinterval

        if (count === 0) {
            TimesUp()
            return
        }
        const timer = setInterval(() => {
            setCount(count - 1)
        }, 1000); // cứ 1 giây thì biến count sẽ bị giảm đi giống với bộ đếm ngược thời gian

        return () => {
            clearInterval(timer)
        }

    }, [count])

    const toHHMMSS = (seconds) => {
        var h, m, s, result = '';
        // HOURs
        h = Math.floor(seconds / 3600);
        seconds -= h * 3600;
        if (h) {
            result = h < 10 ? '0' + h + ':' : h + ':';
        }
        // MINUTEs
        m = Math.floor(seconds / 60);
        seconds -= m * 60;
        result += m < 10 ? '0' + m + ':' : m + ':';
        // SECONDs
        s = seconds % 60;
        result += s < 10 ? '0' + s : s;
        return result;
    }

    return (
        <>
            {toHHMMSS(count)}
        </>
    )
}

export default CountDown