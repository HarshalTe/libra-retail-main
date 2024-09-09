import React from "react";
import { Table, Col, Row, Button } from "reactstrap";

export default function ProjectTable() {
  return (
    <div>
      <Table
        className="table table-sm"
        style={{ fontSize: "12px", textAlign: "center" }}
      >
        <thead>
          <tr>
            <th scope="col">Apllication No</th>
            <th scope="col">Project/Property Name</th>
            <th scope="col">Type</th>
            <th scope="col">Banch Name</th>
            <th scope="col">Initiation Date</th>
            <th scope="col">Mobile</th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>LVPL2021102560978</td>
            <td>Windsor Machines Ltd</td>
            <td>property</td>
            <td>Anand rathi-Goregoan</td>
            <td>10-10-2021</td>
            <td>8693000733</td>

            <td>
              <Button size="sm" color="success">
                Add Data
              </Button>
            </td>
          </tr>
          <tr>
            <td>LVPL2021102560978</td>
            <td>Windsor Machines Ltd</td>
            <td>property</td>
            <td>Anand rathi-Goregoan</td>
            <td>10-10-2021</td>
            <td>8693000733</td>

            <td>
              <Button size="sm" color="success">
                Add Data
              </Button>
            </td>
          </tr>

          <tr>
            <td>LVPL2021102560978</td>
            <td>Windsor Machines Ltd</td>
            <td>property</td>
            <td>Anand rathi-Goregoan</td>

            <td>10-10-2021</td>
            <td>8693000733</td>

            <td>
              <Button size="sm" color="success">
                Add Data
              </Button>
            </td>
          </tr>

          <tr>
            <td>LVPL2021102560978</td>
            <td>Windsor Machines Ltd</td>
            <td>property</td>
            <td>Anand rathi-Goregoan</td>
            <td>10-10-2021</td>
            <td>8693000733</td>

            <td>
              <Button size="sm" color="success">
                Add Data
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
      <div className="float-right">
        <br />
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
