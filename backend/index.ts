import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { Client } from "pg";
import { Request, Response } from "express";

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

const app = express();

app.use(cors());

app.use(express.json());

interface Kid {
  first_name: string;
  last_name: string;
  adress: string;
  age: number;
  id: number;
  department: number;
}

// interface Parent {
//   id: number;
//   first_name: string;
//   last_name: string;
// }

interface Department {
  id: number;
  name: string;
}

/**----GET alla barn---- */
app.get("/", async (_req: Request, res: Response) => {
  try {
    const { rows: children } = await client.query("SELECT * FROM kids");
    const countResult = await client.query("SELECT COUNT(*) FROM kids");
    const count = parseInt(countResult.rows[0].count, 10);
    res.send({ children: children, count: count });
  } catch (err) {
    res.status(400).send("Kunde inte hämta alla barn" + err);
  }
});

/**----GET alla avdelningar---- */
app.get("/departments", async (req, res: Response<Department[] | string>) => {
  try {
    const { rows: departments } = await client.query(
      "SELECT * FROM departments"
    );
    res.send(departments);
  } catch (err) {
    res.status(400).send("Kunde inte hämta avdelningarna" + err);
  }
});

/**----GET en avdelning---- */
app.get(
  "/departments/:id",
  async (req: Request<{ id: string }>, res: Response<Department | string>) => {
    const idParam = req.params.id;

    if (!idParam) {
      return res.status(400).send("Id saknas") as any;
    }

    try {
      const result = await client.query(
        "SELECT * FROM departments WHERE id= $1",
        [idParam]
      );
      res.status(200).send(result.rows[0]);
    } catch (err) {
      console.error("Ett fel uppstod", err);
      res.status(400).send("Kunde inte hämta avdelning");
    }
  }
);

/**----GET alla barn på en avdelning---- */
app.get("/departments/:id/children", async (req: Request, res: Response) => {
  const departmentId = req.params.id;

  if (!departmentId) {
    return res.status(400).send("AvdelningsID saknas") as any;
  }

  try {
    const check = await client.query(
      "SELECT * FROM kids WHERE department = $1",
      [departmentId]
    );

    if (check.rowCount === 0) {
      return res.status(404).send("Avdelningen finns inte");
    }

    const result = await client.query(
      "SELECT * FROM kids WHERE department = $1",
      [departmentId]
    );
    res.send(result.rows);
  } catch (err) {
    res.status(400).send("Kunde inte hämta barnen" + err);
  }
});

/**----GET all data för att kunna söka---- */
app.get("/all-data", async (req, res: Response) => {
  try {
    const tables = await client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    );

    const allData: Record<string, any[]> = {};
    for (let row of tables.rows) {
      const tableName = row.table_name;
      const data = await client.query(`SELECT * FROM ${tableName}`);
      allData[tableName] = data.rows;
    }
    res.send(allData);
  } catch (err) {
    res.status(400).send("Kunde inte hämta data" + err);
  }
});

/*-----POST----*/
app.post("/", async (req: Request<{}, {}, Kid>, res: Response) => {
  const { first_name, last_name, age, adress, department } = req.body;

  try {
    await client.query(
      `INSERT INTO kids (first_name, last_name, age, adress, department)
    VALUES ($1, $2, $3, $4, $5)`,
      [first_name, last_name, age, adress, department]
    );

    const { rows } = await client.query("SELECT * FROM kids");

    res.send({ message: "Nytt barn har lagts till", count: rows.length });
  } catch (err) {
    res.status(400).send("Kunde inte lägga till barn" + err);
  }
});

/**----DELETE barn---- */
app.delete("/:id", async (req: Request, res: Response) => {
  const childId = req.params.id;

  if (!childId) {
    return res.status(400).send("Barnets ID saknas") as any;
  }

  // Måste da bort foreign key i den andra tabellen samtidigt. CASCADE! De nya barn jag lägger till går att ta bort för de har ingen foreignkey. DELETE ON CASCADE
  try {
    await client.query("DELETE FROM kids WHERE id = $1", [childId]);
    res.status(200).send();
  } catch (err) {
    res.status(400).send("Kunde inte ta bort barnet" + err);
  }
});

app.listen(3000, () => {
  console.log("Webbtjänsten kan nu ta emot anrop.");
});
