import React, { useState } from "react";
import { Link } from "react-router-dom";

const TestTable = () => {
  const [savedTests, setSavedTests] = useState(JSON.parse(localStorage.getItem("savedTests")) || []);

  const getRowColorClass = (testType) => {
    if (testType === "PHP") return "green";
    else if (testType === "NodeJs") return "yellow";
    else return "orange";
  };

  const TableRow = ({ index, data, handleDelete }) => {
    const backgroundColor = getRowColorClass(data.testType.label);

    return (
      <tr>
        <td style={{backgroundColor}}>{index + 1}</td>
        <td style={{backgroundColor}} >{data.testName}</td>
        <td style={{backgroundColor}}>{data.testType.label}</td>
        <td style={{backgroundColor}}>{data.testEmail}</td>
        <td style={{backgroundColor}}>{data.testMobile}</td>
        <td style={{backgroundColor}}>{data.testAltNo}</td>
        <td style={{backgroundColor}}>{data.creationDate}</td>
        <td style={{backgroundColor}}>{data.updationDate || "-"}</td>
        <td style={{backgroundColor}}>
          <Link to={`/edit-test`} state={{ index }}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='black'
              className='bi bi-pencil-square'
              viewBox='0 0 16 16'>
              <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
              <path
                fillRule='evenodd'
                d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'
              />
            </svg>
          </Link>
          <button
            onClick={() => {
              handleDelete(index);
            }}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='black'
              className='bi bi-trash'
              viewBox='0 0 16 16'>
              <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z' />
              <path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z' />
            </svg>{" "}
          </button>
        </td>
      </tr>
    );
  };
  const handleDelete = (testIndex) => {
    const updatedTests = [...savedTests];
    updatedTests.splice(testIndex, 1);
    localStorage.setItem("savedTests", JSON.stringify(updatedTests));
    setSavedTests(updatedTests);
  };

  return (
    <div className='container my-2'>
      <div className='row'>
        <div className='d-flex justify-content-between'>
          <h1>Php_test_mast</h1>
          <div>
            <Link to='/create-test'>Create test</Link>
          </div>
        </div>

        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>test_id</th>
              <th scope='col'>Test Name</th>
              <th scope='col'>Test type</th>
              <th scope='col'>Tester email</th>
              <th scope='col'>Tester mobile no.</th>
              <th scope='col'>Tester alt no.</th>
              <th scope='col'>Created at</th>
              <th scope='col'>Updated at</th>
              <th scope='col'></th>
            </tr>
          </thead>

          <tbody>
            {savedTests.map((el, index) => {
              return <TableRow key={index} index={index} data={el} handleDelete={handleDelete} />;
            })}
          </tbody>
        </table>
        {!savedTests.length && <p className='text-center color-secondary'>No Data Found</p>}
      </div>
    </div>
  );
};

export default TestTable;
