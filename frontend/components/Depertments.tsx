import { useState, useEffect } from "react";
import { SquareArrowUpRight, CircleX } from "lucide-react";

interface Department {
  name: string;
  id: number;
  phone_nr: number;
  adress: string;
}

function Departments() {
  const [allDepartments, setAllDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<Department>();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isVisable, setIsVisable] = useState<number | null>(null);

  //Hämtar alla avdelningar direkt när man kommer in på sidan.
  useEffect(() => {
    fetch("http://localhost:3000/departments")
      .then((response) => response.json())
      .then((result: Department[]) => {
        setAllDepartments(result);
      });
  }, []);

  //funktion för att hantera klick på pilen(knappen) vid varje avdelning
  function handleClick(id: number) {
    fetch("http://localhost:3000/departments/" + id)
      .then((response) => response.json())
      .then((result: Department) => {
        setSelectedDepartment(result);
        setSelectedId(id);
        setIsVisable((prevID) => (prevID === id ? null : id));
      });
  }

  return (
    <>
      {allDepartments.map((dep) => (
        <div>
          <div className="deparment-container">
            <div className="department-info">
              <h3>{dep.name}</h3>
            </div>{" "}
            {isVisable === dep.id ? (
              <CircleX
                className="admin-icon close"
                onClick={() => setIsVisable(null)}
              />
            ) : (
              <SquareArrowUpRight
                className="admin-icon arrow"
                onClick={() => handleClick(dep.id)}
              />
            )}
          </div>

          {isVisable === dep.id &&
            selectedId === dep.id &&
            selectedDepartment && (
              <div>
                <p>{dep.name}</p>
                <p>Telefonnummer: {dep.phone_nr}</p>
                <p>Address: {dep.adress}</p>
              </div>
            )}
        </div>
      ))}
    </>
  );
}

export default Departments;
