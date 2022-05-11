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
        setData(res.data.filter((e)=> e.genre_ouvrage === "livre"));
      });
  
    }, []);

    return (
      <div style={{}}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Titres</th>
            <th>Descriptions</th>
            <th>Catégories</th>
            <th>Prix</th>
            <th>Images</th>
            <th>PDF</th>
          </tr>
        </thead>
        <tbody>
          {data.reverse().map((livre) => (
            <tr >
              <td>{livre.id_ouvrage}</td>
              <td>{livre.titre_ouvrage}</td>
              <td>{livre.description_ouvrage}</td>
              <td>{livre.categorie_ouvrage}</td>
              {
                livre.prix_ouvrage === "" ? <td>Gratuit</td> : <td>{livre.prix_ouvrage} $</td>
              }
              <td><img src={livre.image_ouvrage}style={{objectFit:"cover"}} width={50} height={50}  className="rounded" alt="" /></td>
              <td><a target="_blank" href={livre.lien_ouvrage}>Lire</a> </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
      
    )
  };

export default ListerActeurStructure