"use client";

import TableSection from "@/app/TableSection";
import AddStudent from "@/app/AddStudent";
import {useState, useEffect} from "react";

export interface studentData {
  id: string;
  name: string;
  email: string;
}

interface responseType{
  message: string;
  data: studentData[];
}


export default function Home() {
    const [students, setStudents] = useState<studentData[]>([]);

    async function getStudents() {
        try {
            const res = await fetch("http://localhost:8080/students", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) throw new Error("Failed to fetch students");

            const data: responseType = await res.json();
            setStudents(data.data);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    useEffect(() => {

        getStudents();
    }, []);


    const headers = ["Name", "Email"];
  return (
      <div>
          <TableSection headers={headers} row={students.map((d) => [d.name, d.email])} title={"Students"} />
          <AddStudent onSuccessAction={getStudents}/>
      </div>
  );
}
