import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"


const PrivateRoute = (props) => {

    const isAuthentic = useSelector((state) => state?.user?.isAuthecated)

    if (isAuthentic === false) {
        return <Navigate to='/login' />
    }

    return (
        <div>
            {props.children}
        </div>
    )
}

export default PrivateRoute