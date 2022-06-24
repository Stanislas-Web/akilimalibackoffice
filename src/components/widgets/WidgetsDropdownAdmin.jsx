import React,{useState, useEffect} from "react";
import api from "../../services/api";
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ChartLineSimple from "../charts/ChartLineSimple";
import ChartBarSimple from "../charts/ChartBarSimple";

const WidgetsDropdownAdmin = () => {
  const [sumLivres, setSumLivres] = useState([]);
  const [sumBd, setSumBD] = useState([]);
  const [sumUsers, setSumUsers] = useState([]);
  let tabLivre = [];

  useEffect(() => {
    api.get("ouvragesall").then((res) => {
      setSumLivres(res.data.filter((e)=> e.genre_ouvrage === "livre"));
    });

    api.get("ouvragesall").then((res) => {
      setSumBD(res.data.filter((e)=> e.genre_ouvrage === "BD"));
    });

    api.get("users").then((res) => {
      setSumUsers(res.data);
    });
     sumLivres.map((livre, index)=>{
        tabLivre.push(index);
     })

     if(sumLivres.length < 5){
        tabLivre = [];
     }else{
      tabLivre = [sumLivres.length];
     }
  
  }, []);
  // render
  return (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-danger"
          header={sumLivres.length}
          text="Livres"
          footerSlot={
            <ChartBarSimple
            
            dataPoints={ sumLivres.length < 5? []:[sumLivres.length-5,sumLivres.length-4,sumLivres.length-3,sumLivres.length-2,sumLivres.length-1,sumLivres.length]}
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              backgroundColor="rgb(250, 152, 152)"
              label="Livres"
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle caret={false} color="transparent">
              <CIcon name="cil-ellipses" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Voir en detail</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header={sumBd.length}
          text="BD"
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{ height: "70px" }}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={ sumBd.length < 5? []:[sumBd.length-5,sumBd.length-4,sumBd.length-3,sumBd.length-2,sumBd.length-1,sumBd.length]}
              options={{ elements: { line: { borderWidth: 2.5 } } }}
              pointHoverBackgroundColor="warning"
              label="BD"
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle caret={false} color="transparent">
              <CIcon name="cil-ellipses" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Voir en detail</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-primary"
          header={sumUsers.length}
          text="Utilisateurs"
          footerSlot={
            <ChartLineSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{ height: "70px" }}
              dataPoints={ sumUsers.length < 5? []:[sumUsers.length-5,sumUsers.length-4,sumUsers.length-3,sumUsers.length-2,sumUsers.length-1,sumUsers.length]}
              pointHoverBackgroundColor="primary"
              label="Utilisateurs"
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle caret={false} color="transparent">
              <CIcon name="cil-ellipses" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Voir en detail</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header="1"
          text="Admin"
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              dataPoints={[]}
              pointHoverBackgroundColor="info"
              options={{ elements: { line: { tension: 0.00001 } } }}
              label="Admin"
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle caret={false} color="transparent">
              <CIcon name="cil-ellipses" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Voir en detail</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      
    </CRow>
  );
};

export default WidgetsDropdownAdmin;
