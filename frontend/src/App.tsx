import { useState, useEffect } from "react";
import Header from "../components/Header";
import Metrics from "../components/Metrics";
import Sidemenu from "../components/Sidemenu";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import Departments from "../components/Depertments";
import { ToastContainer, toast, Bounce } from "react-toastify";

import { Trash2, Pencil } from "lucide-react";

interface Kid {
  first_name: string;
  last_name: string;
  address: string;
  age: number;
  id: number;
}

interface Department {
  name: string;
  id: number;
  phone_number: number;
  adress: string;
}

function App() {
  const [allChildren, setAllChildren] = useState<Kid[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [adress, setAdress] = useState("");
  const [department, setDepartment] = useState("");
  // const [deleteMessage, setDeleteMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedChild, setSelectedChild] = useState<Kid>();
  const [count, setCount] = useState(0);
  const [allDepartments, setAllDepartments] = useState<Department[]>([]);

  // Funktion för att hämta avdelnignarna som används i input select i form. och för att hämta antalet barn som visas i metrics högst upp
  useEffect(() => {
    fetch("http://localhost:3000/departments")
      .then((response) => response.json())
      .then((result: Department[]) => {
        setAllDepartments(result);
      });
    getAllChildren();
    fetchCount();
  }, []);

  //Hämta antalet(siffran) barn från barntabellen
  function fetchCount() {
    fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((result) => {
        setCount(result.count);
      });
  }

  //Hämta alla barn
  function getAllChildren() {
    fetch("http://localhost:3000/")
      .then((response) => {
        if (response.ok) {
          console.log("Promise successfull");
        } else {
          if (response.status === 404) throw new Error("404, Not found");
          if (response.status === 500)
            throw new Error("500, Internal server error");
        }
        return response.json();
      })
      .then((result) => {
        setAllChildren(result.children);
      })
      .catch((err) => {
        console.error("Failed to fetch", err);
      });
  }

  //Funktion för att ta bort ett barn, går bara att ta bort de barn jag lägger till i formuläret. De andra behöver ha CASCADE
  function deleteChild(id: number) {
    fetch("http://localhost:3000/" + id, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        toast.success("Barnet har tagits bort");
      } else {
        toast.error("Något gick fel vid borttagning");
      }
      getAllChildren();
      fetchCount();
    });
  }

  //Funktion för att hantera onChange i inputfältet för ålder. För att säkerställa att det är en siffra som skrivs in.
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value;

    if (inputValue === "" || /^-?\d+(\.\d+)?$/.test(inputValue)) {
      setAge(inputValue);
    }
  }

  //Funktion för att hantera skapandet av ett nytt barn.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !age ||
      !adress.trim() ||
      !department
    ) {
      toast.error("Alla fält måste vara ifyllda");
      return;
    }

    fetch("http://localhost:3000/", {
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        age: age,
        adress: adress,
        department: department,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Barnet har lagts till");
          return response.json();
        } else {
          toast.error("Kunde inte lägga till barnet.");
          throw new Error("Serverfel vid POST");
        }
      })
      .then((result) => {
        setCount(result.count);
        setFirstName("");
        setLastName("");
        setAge("");
        setAdress("");
        setDepartment("");
        getAllChildren();
      });
  }

  // useEffect(() => {
  //   getAllChildren();
  // }, []);

  return (
    <>
      <div className="app-content">
        <Sidemenu />
        <div className="main-content">
          <Header />
          <Metrics count={count} />
          <div className="children-department-content">
            <div className="cildren-box">
              <h2>Barn</h2>
              <div className="children">
                {allChildren.map((child) => (
                  <div key={child.id}>
                    <div className="wrapper">
                      <div className="info">
                        <p>
                          {child.first_name} {child.last_name}
                        </p>
                        <div className="info-icons">
                          <Pencil className="admin-icon change" />
                          <Trash2
                            className="admin-icon delete"
                            onClick={() => {
                              setSelectedChild(child);
                              setShowModal(true);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="department-box">
              <h2>Avdelningar</h2>
              <div className="department-wrapper">
                <Departments />
              </div>
            </div>
          </div>
          {/* {deleteMessage} */}
          {/* ---Form--- */}
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Lägg till ett barn</legend>
              <section className="fullName">
                <div className="input-group">
                  <label htmlFor="firstName">Namn</label>
                  <input
                    className="form-text"
                    id="firstName"
                    onChange={(event) => setFirstName(event.target.value)}
                    type="text"
                    value={firstName}
                    placeholder="Förnamn"
                    name="Name"
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="lastName">Efternamn</label>
                  <input
                    className="form-text"
                    id="lastName"
                    onChange={(event) => setLastName(event.target.value)}
                    type="text"
                    value={lastName}
                    placeholder="Efternamn"
                  />
                </div>
              </section>
              <section className="ageAdress">
                <div className="input-group">
                  <label htmlFor="age">Ålder</label>
                  <input
                    className="form-text"
                    id="age"
                    onChange={handleChange}
                    // onChange={(event) => setAge(event.target.value)}
                    type="number"
                    value={age}
                    placeholder="Ålder"
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="adress">Address</label>
                  <input
                    className="form-text"
                    id="adress"
                    onChange={(event) => setAdress(event.target.value)}
                    type="text"
                    value={adress}
                    placeholder="Adress"
                  />
                </div>
              </section>
              <section className="department">
                <div className="input-group">
                  <label htmlFor="department">Avdelning</label>

                  <select
                    id="department"
                    onChange={(event) => setDepartment(event.target.value)}
                    value={department}
                  >
                    <option value="">Välj avdelning</option>
                    {allDepartments.map((dep) => (
                      <option key={dep.id} value={dep.id}>
                        {dep.name}
                      </option>
                    ))}
                  </select>
                </div>
              </section>
              <input
                type="submit"
                name=""
                id="submitButton"
                value="Lägg till"
              />
            </fieldset>
          </form>
          {selectedChild && showModal && (
            <ConfirmDeleteModal
              kid={selectedChild}
              onConfirm={() => {
                if (selectedChild) {
                  deleteChild(selectedChild.id);
                  setShowModal(false);
                }
              }}
              onCancel={() => setShowModal(false)}
            />
          )}
        </div>
        {/* Den lilla rutan som kommer upp i högra hörnet */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </div>
    </>
  );
}

export default App;
