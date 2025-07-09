import { useState, useEffect } from "react";
import { Search, CircleX } from "lucide-react";

interface Department {
  id: number;
  name: string;
}

interface Parent {
  id: number;
  first_name: string;
  last_name: string;
}

interface Child {
  id: number;
  first_name: string;
  last_name: string;
}

interface allData {
  departments: Department[];
  kids: Child[];
  parents: Parent[];
}

type searchResult = Department | Parent | Child;

interface DatabaseInfo {
  name?: string;
  first_name?: string;
  last_name?: string;
  id: number;
  // departments: string;
}

interface SearchFieldProps {
  search: string;
  setSearch: (value: string) => void;
}

interface ListProps {
  search: string;
  filtered: DatabaseInfo[];
  onSelect: (value: number) => void;
}

//Lokal komponent för sökfältet
function SearchField({ search, setSearch }: SearchFieldProps) {
  return (
    <div className="search-box">
      <div className="search-icon">
        <Search size={20} color="black" />
      </div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        id="search"
      />
    </div>
  );
}

//Lokal komponent för resultatlistan.
function List({ filtered, search, onSelect }: ListProps) {
  if (!search) {
    return null;
  }

  if (filtered.length === 0) {
    return (
      <ul style={{ position: "absolute", zIndex: 999 }} className="result-list">
        <li>Inga resultat</li>
      </ul>
    );
  }

  return (
    <ul style={{ position: "absolute", zIndex: 999 }} className="result-list">
      {filtered &&
        filtered.map((item, index) => (
          <li key={index} onClick={() => onSelect(item.id)}>
            {item.name
              ? item.name
              : item.first_name
              ? item.first_name
              : item.last_name}{" "}
            {item.last_name ? item.last_name : ""}
          </li>
        ))}
    </ul>
  );
}

function Header() {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<searchResult[]>([]);
  const [allData, setAllData] = useState<allData>({
    departments: [],
    kids: [],
    parents: [],
  });
  const [childrenList, setChildrenList] = useState<Child[]>();
  const [showPopup, setShowPopup] = useState(false);

  //Hämta all data
  useEffect(() => {
    fetch("http://localhost:3000/all-data")
      .then((response) => response.json())
      .then((result) => {
        setAllData(result);
      });
  }, []);

  //Filtrera ut avdelningar, barn och föräldrar
  useEffect(() => {
    if (search.length !== 0) {
      const foundDepartments =
        allData &&
        allData.departments &&
        allData.departments.filter((item) => {
          return item.name.toLowerCase().includes(search.toLowerCase());
        });

      const foundKids =
        allData &&
        allData.kids &&
        allData.kids.filter((item) => {
          console.log(item.first_name, search);
          return (
            item.first_name.toLowerCase().includes(search.toLowerCase()) ||
            item.last_name.toLowerCase().includes(search.toLowerCase())
          );
        });

      const foundParents =
        allData &&
        allData.parents &&
        allData.parents.filter((item) => {
          console.log(item.first_name, search);
          return (
            item.first_name.toLowerCase().includes(search.toLowerCase()) ||
            item.last_name.toLowerCase().includes(search.toLowerCase())
          );
        });

      //En array med alla filtrerade items.
      setFiltered([
        ...(foundDepartments ? foundDepartments : []),
        ...(foundKids ? foundKids : []),
        ...(foundParents ? foundParents : []),
      ]);
    } else {
      setFiltered([]);
    }
  }, [search, allData /*, mergedData*/]);

  //Funktion när man klickar på en avdelning i söklistan för att få fram vilka barn som går på den avdelningen.
  const handleSelect = async (departmentId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/departments/${departmentId}/children`
      );
      const children = await response.json();
      setChildrenList(children);
      setShowPopup(true);
    } catch (error) {
      console.log("Felvid hämtning av barn", error);
    }
  };

  return (
    <>
      <div className="header-wrapper">
        <div className="header-title">
          <h1>Förskolan Savannen</h1>
        </div>
        <div className="user-info">
          <div className="search-bar-container">
            <SearchField search={search} setSearch={setSearch} />
            <List filtered={filtered} search={search} onSelect={handleSelect} />
            {/* De lokala komponenterna med props */}
          </div>
          <img src="../src/assets/person.jpg" alt="" />
        </div>
        {showPopup && childrenList && (
          <div className="popup-overlay">
            <div className="popup-content">
              <CircleX
                className="admin-icon"
                onClick={() => setShowPopup(false)}
              />
              <h3>Barn</h3>
              <ul>
                {childrenList.map((child) => (
                  <li key={child.id}>
                    {child.first_name} {child.last_name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
