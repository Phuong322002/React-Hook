import React, { useState } from "react";

const AddUserComponent = (props) => {

    const [name, setName] = useState('')
    const [age, setAge] = useState()

    const handleInputName = (e) => {
        setName(e.target.value)
        // this.setState({
        //     name: e.target.value
        // })
    }

    const handleInputAge = (e) => {
        setAge(e.target.value)
        // this.setState({
        //     age: e.target.value
        // })
    }

    const handleAdd = () => {
        props.createUser({
            id: Math.floor(Math.random() * 1000),
            name: name,
            age: age
        })
        setName('')
        setAge('')
        // this.setState({
        //     name: '',
        //     age: ''
        // })
    }
    return (
        <div className="add-user">
            <input type="text" placeholder="Name" value={name} onChange={(e) => { handleInputName(e) }} />
            <input type="text" placeholder="Age" value={age} onChange={(e) => { handleInputAge(e) }} />
            <button onClick={() => { handleAdd() }}>Add</button>
        </div>
    )

}
// class AddUserComponent extends React.Component {

//     state = {
//         name: '',
//         age: ''
//     }

//     handleInputName = (e) => {
//         this.setState({
//             name: e.target.value
//         })
//     }

//     handleInputAge = (e) => {
//         this.setState({
//             age: e.target.value
//         })
//     }

//     handleAdd = () => {
//         const { name, age } = this.state
//         this.props.createUser({
//             name: name,
//             age: age
//         })
//         this.setState({
//             name: '',
//             age: ''
//         })
//     }


//     render() {
//         return (
//             <div className="add-user">
//                 <input type="text" placeholder="Name" value={this.state.name} onChange={(e) => { this.handleInputName(e) }} />
//                 <input type="text" placeholder="Age" value={this.state.age} onChange={(e) => { this.handleInputAge(e) }} />
//                 <button onClick={() => { this.handleAdd() }}>Add</button>
//             </div>
//         )
//     }
// }

export default AddUserComponent;