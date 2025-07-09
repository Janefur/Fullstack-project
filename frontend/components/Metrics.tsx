import { useState, useEffect } from "react";
import { CalendarDays, House, UserRound, ChartColumn } from "lucide-react";
import ProgressBar from "../components/ProgressBar";

interface MetricsProps {
  count: number;
}

function Metrics(props: MetricsProps) {
  const [count, setCount] = useState(props.count);
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();

  useEffect(() => {
    setCount(props.count);
  }, [props]);

  return (
    <main>
      <div className="metrics-box">
        <div className="metrics-date">
          <CalendarDays className="metrics-icon" />
          <h1>
            {day}/{month}
          </h1>
          <h3>{year}</h3>
        </div>
        <div className="metrics-total">
          <UserRound className="metrics-icon" />

          <h1>{count}</h1>
          <h3>BARN</h3>
        </div>
        <div className="metrics-checked">
          <House className="metrics-icon" />
          <h1>18</h1>
          <h3>INCHECKADE</h3>
        </div>
        <div className="metrics-progress">
          <ChartColumn className="metrics-icon" />
          <ProgressBar />
          <p>SOME TYPE OF PROGRESS</p>
        </div>
      </div>
    </main>
  );
}

export default Metrics;
