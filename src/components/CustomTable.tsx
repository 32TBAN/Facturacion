import React from "react";

const divideData = (data : any, pageNumber: number) => {
  const dividedData = [];
  let i = 0;
  while (i < data.length) {
    dividedData.push(data.slice(i, i + pageNumber));
    i += pageNumber;
  }
  return dividedData;
};

export const CustomTable = ({ colums = [], data = [], pageNumber = 8 }) => {
  const [activePage, setActivePage] = React.useState(0);

  const divideDataValue = React.useMemo(() => divideData(data, pageNumber), [data, pageNumber]);

  if (divideDataValue.length === 0) {
    return <div className="text-center p-3">⚠️ No existen datos disponibles</div>;
  }

  return (
    <div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {colums.map((colum: any) => (
              <th key={colum.id} scope="col">{colum.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {divideDataValue[activePage].map((element: any) => (
            <tr key={element.id || JSON.stringify(element)}>
              {colums.map((colum:any) => (
                <td key={`${element.id}-${colum.id}`}>{element[colum.id]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="w-100 d-flex justify-content-center">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li
              className={`page-item ${activePage === 0 ? "disabled" : ""}`}
              onClick={() => activePage > 0 && setActivePage(activePage - 1)}
            >
              <a className="page-link" href="#">Previous</a>
            </li>

            {divideDataValue.map((_, index) => (
              <li
                key={index}
                className={`page-item ${activePage === index ? "active" : ""}`}
                onClick={() => setActivePage(index)}
              >
                <a className="page-link" href="#">{index + 1}</a>
              </li>
            ))}

            <li
              className={`page-item ${activePage === divideDataValue.length - 1 ? "disabled" : ""}`}
              onClick={() =>
                activePage < divideDataValue.length - 1 && setActivePage(activePage + 1)
              }
            >
              <a className="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
