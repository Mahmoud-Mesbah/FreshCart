import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {

    let navigate = useNavigate()

    async function handleForgot(values) {

        try {

            let { data } = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
                values
            )

            toast.success(data.message)

            navigate("/verify-code")

        } catch (error) {

            toast.error(error.response?.data?.message)

        }

    }

    let validationSchema = yup.object({
        email: yup.string().email().required()
    })

    let formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema,
        onSubmit: handleForgot
    })

    return (

        <div className="min-h-screen flex justify-center items-center">

            <form
                onSubmit={formik.handleSubmit}
                className="w-[400px] border border-gray-300 shadow-lg p-5 rounded-xl space-y-4"
            >

                <h2 className="text-2xl font-bold">
                    Forgot Password
                </h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className="w-full border border-gray-300 focus:border-green-400 focus:outline-none  border-gray-300 p-3 rounded-lg"
                />

                <button className="w-full bg-green-500 text-white py-3 rounded-lg">
                    Send Code
                </button>

            </form>

        </div>

    )
}