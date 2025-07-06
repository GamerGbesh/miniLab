"use server"

interface state{
    success:boolean
    message:string
}

export default async function addStudent(prev: state, formData: FormData){
    const name = formData.get("name");
    const email = formData.get("email");

    if (!name){
        return {success:false, message:"Please enter a name!"};
    }
    if (!email){
        return {success:false, message:"Please enter valid email!"};
    }


    try {
        const res = await fetch("http://localhost:8080/students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email })
        });

        const data = await res.json();

        if (!res.ok) {
            return { success: false, message: data.message || "Failed to add student" };
        }

        return { success: true, message: "Student added successfully"};

    } catch (error) {
        console.log(error)
        return { success: false, message: error.message || "Something went wrong" };
    }


}