import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function VerifyCode() {

    let navigate = useNavigate()

    async function handleVerify(values) {

        try {

            let { data } = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
                values
            )

            toast.success(data.status)

            navigate("/reset-password")

        } catch (error) {

            toast.error(error.response?.data?.message)

        }

    }

    let formik = useFormik({
        initialValues: {
            resetCode: ""
        },
        onSubmit: handleVerify
    })

    return (

        <div className="min-h-screen flex justify-center items-center">

            <form
                onSubmit={formik.handleSubmit}
                className="w-[400px] border border-gray-300 shadow-lg p-5 rounded-xl space-y-4"
            >

                <h2 className="text-2xl font-bold">
                    Verify Code
                </h2>

                <input
                    type="text"
                    name="resetCode"
                    placeholder="Enter Code"
                    value={formik.values.resetCode}
                    onChange={formik.handleChange}
                    className="w-full border focus:border-green-400 focus:outline-none p-3 rounded-lg"
                />

                <button className="w-full bg-green-500 text-white py-3 rounded-lg">
                    Verify
                </button>

            </form>

        </div>

    )
}