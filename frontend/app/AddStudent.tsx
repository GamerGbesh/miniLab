"use client";

import { useActionState } from "react";
import addStudent from "@/app/action"; // Make sure this is a server action

const initialState = { success: false, message: "" };

export default function AddStudent({onSuccessAction}: {onSuccessAction: () => void}) {
    const [state, formAction] = useActionState(addStudent, initialState);

    if (state.success) {
        onSuccessAction();
    }

    return (
        <form action={formAction} className="space-y-4 p-4 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
            {state.message.length > 0 && (
                <p
                    className={`text-sm ${
                        state.success ? "text-green-600" : "text-red-600"
                    }`}
                >
                    {state.message}
                </p>
            )}
            <input
                type="text"
                name="name"
                placeholder="Enter Student Name"
                required
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="email"
                name="email"
                placeholder="Enter Student Email"
                required
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
                Add
            </button>
        </form>
    );
}
