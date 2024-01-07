import React from "react";

const divideData = (data, pageNumber) => {
    const dividedData = [];
    let i = 0;
    while (i < data.length) {
        dividedData.push(data.slice(i, i + pageNumber));
        i += pageNumber;
    }

    return dividedData;
};

export const CustomTable = ({ colums = [], data = [], pageNumber=8}) => {
  const [activePage, setActivePage] = React.useState(0);
  const divideDataValue = divideData(data, pageNumber) || [];

  return (
    <div>
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            {colums.map((colum) => (
                <th scope="col">{colum.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {divideDataValue.length > 0 && divideDataValue[activePage].map((element) => (
            <tr key={element.id}>
                {colums.map((colum) => (
                    <td>{element[colum.id]}</td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-100 d-flex justify-content-center">
        {divideDataValue.length > 0 ? <nav aria-label="Page navigation example">
            <ul class={'pagination'}>
            <li
                class={`page-item ${activePage === 0 && 'disabled'}`}
                onClick={() => !(activePage === 0) && setActivePage(activePage - 1)}
            >
                <a class={'page-link'} href="#">
                Previous
                </a>
            </li>
            {
                divideData(data, pageNumber).map((page, index) => (
                    <li class={`page-item
                        ${activePage === index && 'active'}`}
                        onClick={() => setActivePage(index)}
                    >
                        <a class="page-link" href="#">
                            {index + 1}
                        </a>
                    </li>
                ))
            }
            <li
                class={`page-item  ${activePage === (divideDataValue.length - 1) && 'disabled'}`}
                onClick={() => !(activePage === (divideDataValue.length - 1)) && setActivePage(activePage + 1)}
            >
                <a class="page-link" href="#">
                Next
                </a>
            </li>
            </ul>
        </nav> : <div>No existen datos disponibles</div>}
      </div>
    </div> 
  );
};
