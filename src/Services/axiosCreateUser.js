import instance from "../utils/AxiosCustomize";

const AxiosCreateUser = (email, password, username, role, avatar) => {
    //truyền nhũng trường data xuất hiện bên phía server
    // Khi viết file để gọi API trong thư mục services thì ta sẽ gọi method ở phía và ta truyền những data xuất hiện ở phía server vào biến data để truyền lên server
    // đây là những data để chuẩn bị cho API
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', avatar);
    
    // return ra cục data và phía FE sẽ nhận được cục data này thông qua await hàm này
    return instance.post('api/v1/participant', data);
}

//gọi API
const getUser = () => {
    return instance.get('api/v1/participant/all')
}

const PutUpdateUser = (id, username, role, avatar) => {
    //truyền nhũng trường data xuất hiện bên phía server
    // Khi viết file để gọi API trong thư mục services thì ta sẽ gọi method ở phía và ta truyền những data xuất hiện ở phía server vào biến data để truyền lên server
    // đây là những data để chuẩn bị cho API
    const data = new FormData();
    data.append('id', id)
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', avatar);
    
    // return ra cục data và phía FE sẽ nhận được cục data này thông qua await hàm này
    return instance.put('api/v1/participant', data);
}

export {
    AxiosCreateUser,
    getUser,
    PutUpdateUser
}