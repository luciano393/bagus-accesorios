'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function Register(){
    const router = useRouter()
    const token = localStorage.getItem("token")

    if(token) {
        router.push('/dashboard')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)
        data.roleId = "64ff585017f43c445f81a11e"
        await axios.post("http://localhost:9000/api/user/register", data)
            .then(res => {
                const {data, message} = res.data
                const token = data
                if(message === "User created successfully!") {
                    localStorage.setItem("token", token)
                    window.alert("Usuario creado")
                    router.push('/dashboard')
                } else {
                    window.alert("El correo electronico y/o la contraseña son incorrectas")
                }
            })
            .catch(err => {
                console.log("Ha ocurrido un error: ", err)
            })
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre</label>
                    <input type="text" name="first_name"/>
                </div>
                <div>
                    <label>Apellido</label>
                    <input type="text" name="last_name"/>
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" name="email"/>
                </div>
                <div>
                    <label>Contraseña</label>
                    <input type="text" name="password"/>
                </div>
                <button type="submit">Ingresar</button>
            </form>
        </div>
    )
}