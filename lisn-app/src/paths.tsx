const url = 'http://localhost:5001'


const getUserRoles = async () => {
    try{
        var data = await fetch(`${url}/user_roles`)
        .then(response => response.json())
        return data
    }catch(error){
        console.log(error);
    }
}

export default getUserRoles