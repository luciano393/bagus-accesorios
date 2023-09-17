'use client'
import axios from "axios"
import { useRouter } from 'next/navigation'

export default function Login(){
    const router = useRouter()
    const token = localStorage.getItem("token")

    if(token) {
        router.push('/dashboard')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)
        await axios.post("http://localhost:9000/api/user/authenticate", data)
            .then(res => {
                console.log(res.data)
                const {data, message} = res.data
                const token = data
                if(message === "Login Successful.") {
                    localStorage.setItem("token", token)
                    window.alert("Ingresado correctamente")
                    router.push("/dashboard")
                }
            })
            .catch(err => {
                if (err.response.status === 401) {
                    console.log("Oops!", "El correo electronico y/o la contraseña son incorrectas", "error")
                  } else {
                    console.log("Oops!", "Hubo un error desconocido.")
                  }
            })
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
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