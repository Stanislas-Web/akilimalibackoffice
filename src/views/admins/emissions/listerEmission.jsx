import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Button, Modal } from 'react-bootstrap';
import api from "../../../services/api";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table } from 'react-bootstrap';
 
toast.configure();


function ListerActeurStructure() {
  
    const [data, setData] = useState([]);

    useEffect(() => {
      api.get("ouvragesall").then((res) => {
        setData(res.data.filter((e)=> e.genre_ouvrage === "BD"));
      });
  
    }, []);

    return (
      <div style={{}}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Titres</th>
            <th>description_ouvrage</th>
            <th>Descriptions</th>
            <th>Actions</th>
            <th>Voir plus</th>
          </tr>
        </thead>
        <tbody>
          {data.reverse().map((livre) => (
            <tr>
              <td>{livre.id_ouvrage}</td>
              <td>{livre.titre_ouvrage}</td>
              <td>{livre.description_ouvrage}</td>
              <td>
                <Button variant="outline-success">Approuver</Button>{" "}
                <Button variant="outline-danger">Rejeter</Button>{" "}
              </td>
              <td
                onClick={() => {
                  window.location.href = "#/secretariat/detailmission";
                  // localStorage.setItem("mission", JSON.stringify(mission));
                  // localStorage.setItem("firstName", mission.employees.map((employe) => (employe.firstName)));
                  // localStorage.setItem("lastName", mission.employees.map((employe) => (employe.lastName)));
                  // localStorage.setItem("profession", mission.employees.map((employe) => (employe.profession)));
                }}
                style={{ cursor: "pointer", textAlign: "center" }}
              >
                {/* <HiOutlineDotsHorizontal size={20} /> */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
      
    )
  };

export default ListerActeurStructure