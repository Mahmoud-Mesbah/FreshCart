import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {

    let navigate = useNavigate()

    async function handleReset(values) {

        try {

            let { data } = await axios.put(
                "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
                values
            )

            toast.success("Password changed")

            localStorage.setItem("token", data.token)

            navigate("/login")

        } catch (error) {

            toast.error(error.response?.data?.message)

        }

    }

    let formik = useFormik({
        initialValues: {
            email: "",
            newPassword: ""
        },
        onSubmit: handleReset
    })

    return (

        <div className="min-h-screen flex justify-center items-center">

            <form
                onSubmit={formik.handleSubmit}
                className="w-[400px] border border-gray-300 shadow-lg p-5 rounded-xl space-y-4"
            >

                <h2 className="text-2xl font-bold">
                    Reset Password
                </h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className="w-full border  border-gray-300 focus:border-green-400 focus:outline-none p-3 rounded-lg"
                />

                <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    className="w-full border  border-gray-300 focus:border-green-400 focus:outline-none p-3 rounded-lg"
                />

                <button className="w-full bg-green-500 text-white py-3 rounded-lg">
                    Change Password
                </button>

            </form>

        </div>

    )
}