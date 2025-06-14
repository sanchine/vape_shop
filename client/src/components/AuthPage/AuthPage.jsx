import axios from "axios";
import { useState } from "react";
import { BACKEND_IP } from "../../apiConfig";

export function AuthPage({ onAuth }) {
    const initialFormState = {
        username: "",
        password: ""
    }

    const [form, setForm] = useState(initialFormState);

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm(prev => (
            { ...prev, [name]: value }
        ))
    }

    const handleSubmit = () => {
        const login = async () => {
            try {
                const request = {
                    method: 'POST',
                    url: BACKEND_IP + "/auth/login",
                    headers: { 'Content-Type': 'application/json' },
                    data: JSON.stringify(form)
                }
                console.log(request)
                const response = await axios(request)
                if (!response) return new Error("Response is undefined")

                console.log(response)
                const { token } = response.data
                if (!token) return new Error("Token is undefined")
                onAuth(token)
            } catch (e) {
                return console.log('AUTH FAILED! Deatail: \n', e)
            }
        }

        login()
    }

    return (
        <div>
            <div name="form">
                <input
                    name="username"
                    type="text"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Логин"
                />

                <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Пароль"
                />

                <input
                    type="submit"
                    value="Вход"
                    onClick={handleSubmit}
                />
                
            </div>
        </div>
    )
}