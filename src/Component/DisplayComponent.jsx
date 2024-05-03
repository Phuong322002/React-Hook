import React, { useState } from "react";


const DisplayComponent = (props) => {

    const [status, setStatus] = useState(false)

    let { listUser } = props
    console.log('listUser', listUser)

    const deleteUser = (user) => {
        props.hanldelete(user)
    }

    const handleShowHide = () => {
        setStatus(!status)

    }
    console.log('status', status)
    return (
        <div>
            <button onClick={() => { handleShowHide() }}>{status === false ? 'Show' : 'Hide'}</button>
            {status === true && <div className="content">
                {listUser && listUser.length > 0 && listUser.map((item) => {
                    return (
                        <div key={item.id}>
                            {item.age >= 18
                                ?
                                <div className="child" style={{ color: 'red' }}>{item.name} - {item.age}</div>
                                :
                                <div className="child" style={{ color: 'green' }}>{item.name} - {item.age}</div>}
                            <button onClick={() => { deleteUser(item) }}>Delete</button>

                        </div>
                    )
                })}
            </div>}

        </div>
    )
}
// class DisplayComponent extends React.Component {
//     state = {
//         status: false

//     }

//     handleShowHide = () => {
//         this.setState({
//             status: !this.state.status
//         })
//     }

//     deleteUser = (user) => {
//         this.props.hanldelete(user)
//     }

//     render() {
//         const { listUser } = this.props;
//         const { status } = this.state;
//         let i = Math.floor(Math.random() * 1000)
//         return (
//             <div>
//                 {status === false
//                     ?
//                     <button onClick={() => { this.handleShowHide() }}>SHow</button>
//                     :
//                     <div className="content">
//                         {listUser && listUser.length > 0 && listUser.map((item) => {
//                             return (
//                                 <div key={item.id}>
//                                     {item.age >= 18
//                                         ?
//                                         <div className="child" style={{ color: 'red' }}>{item.name} - {item.age}</div>
//                                         :
//                                         <div className="child" style={{ color: 'green' }}>{item.name} - {item.age}</div>}
//                                     <button onClick={() => { this.deleteUser(item) }}>Delete</button>

//                                 </div>
//                             )
//                         })}
//                         <div><button onClick={() => { this.handleShowHide() }}>Hide</button></div>

//                     </div>}
//             </div>
//         );
//     }
// }

export default DisplayComponent;
