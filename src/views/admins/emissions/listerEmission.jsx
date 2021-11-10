import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import API from "../../../services/api";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchVBG from "../../../containers/searchCassoumis";
import {Card,Row, ListGroup, ListGroupItem, img, Body} from 'react-bootstrap';
import '../../../scss/FormulaireAjouterActeur.scss';
 

toast.configure();
const donne =[1]
let element =0;

function ListerActeurStructure() {

    const [emissions, setEmissions] = useState([]);
  
    const [VBG, setVBG] = useState([]);
    const [FiltreVBG, setFiltreVBG] = useState([]);
    const donnees=[];
   
    

    useEffect(() => {
      console.log('USE EFFECT');
      API.get('ouvragesall').then((res) => {
        setEmissions(res.data.filter((e)=> e.genre_ouvrage === "livre"));
        console.log(emissions);
      }).catch((erreur)=> {
        console.log(erreur);
    });
      
    }, []);


    function recherche (e){
    
      const filtre= VBG.filter((res)=>{
        const type=res.type.toLowerCase();
       const value=(e.target.value).toLowerCase()
       return type.includes(value);
      })
      setFiltreVBG(filtre);
     }

    function handleClick(e) {
      
      API.get("emissions/"+e).then((res) => {
        console.log(res.data);
      element = res.data.nom;
      console.log(e);
      
      if(window.confirm("voulez-vous vraiment supprimer l' emission " + element)) {
        console.log(element);

        API.delete("emissions/"+e).then((res)=>{
          API.get('emissions').then((res) => {
            setEmissions(res.data);
          }).catch((erreur)=> {
            console.log(erreur);
        });
          toast.success("Suppresion effectuer avec succes", toast.POSITION.TOP_RIGHT)
       }).catch((erreur)=> {
        console.log(erreur);
        });
       }

    });;
    };



    const columns = [
        {
          name: 'Titre ouvrage',
          selector: 'titre_ouvrage',
          sortable: true,
          width : "250px"
        },
        {
          name: 'Auteur',
          selector: 'nom_auteur',
          sortable: true,
          width : "250px"
        },
        {
          name: 'Prix livre',
          selector: 'prix_ouvrage',
          sortable: true,
          width : "250px"
        },
        {
          name: 'Catégorie livre',
          selector: 'categorie_ouvrage',
          sortable: true,
          width : "250px"
        },

  
        {
          sortable: false,
          cell: row => 
          <div>
            <div><button type="button" class="btn btn-info"><Link to={ '/admin/modifieremission/'+ row.id} style={{textDecoration:"none" , color:"white"}} >Modifier</Link></button>{' '}
            <button type="button" class="btn btn-danger" onClick={()=> handleClick(row.id)}>Supprimer</button></div>
          </div>,
          width : "auto"
        }
      ];
      return (
        <div className>
          <DataTable
          title="Liste des Livres"
          columns={columns}
          data={emissions}
          pagination={true}
          defaultSortField="label"
          theme="boostrap"
          defaultSortField="type"
          button={true}
        />
        
        </div>
        
      )
  };

export default ListerActeurStructure