import React, { Component } from "react";
import { Form, Button, Col, Row, Spinner } from "react-bootstrap";
import API from "../../../services/api";

import "react-datepicker/dist/react-datepicker.css";
import "../../../scss/FormulaireAjouterActeur.scss";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiOutlinePhotograph} from 'react-icons/hi';
import { ImFilePdf } from 'react-icons/im';

import { storage } from "../../../config/firebase";

toast.configure();

class AjouterActeurStructure extends Component {
  state = {
    titre_ouvrage: "",
    description_ouvrage: "",
    image_ouvrage: "",
    lien_ouvrage: "",
    pays_ouvrage: "",
    prix_ouvrage: "",
    genre_ouvrage: "livre",
    prenom_auteur: "",
    nom_auteur: "",
    pays_auteur: "",
    image_auteur: "",
    categorie_ouvrage: "1",


    errortTitre_ouvrage: "",
    errorDescription_ouvrage: "",
    errorChangementImage_ouvrage: "",
    errorLien_ouvrage: "",
    errorPays_ouvrage: "",
    errorGenre_ouvrage: "",
    errorNom_auteur: "",
    errorPays_auteur:"",
    errorImage_auteur:"",
    errorPrix_ouvrage:"",
    errorImage_ouvrage:"",
    

    visibility: false,
  };

  changementTitre_ouvrage = (e) => {
    this.setState({ titre_ouvrage: e.target.value });
    this.setState({ errortTitre_ouvrage: "" });
  };

  changementDescription_ouvrage = (e) => {
    this.setState({ description_ouvrage: e.target.value });
    this.setState({ errorDescription_ouvrage: "" });
  };

  changementImage_ouvrage = (e) => {
    this.setState({ image_ouvrage: e.target.files[0] });
    this.setState({ errorImage_ouvrage: "" });
  };

  changementLien_ouvrage = (e) => {
    this.setState({ lien_ouvrage: e.target.files[0] });
    this.setState({ errorlien_ouvrage: "" });
  };

  changementImage_auteur = (e) => {
    this.setState({ image_auteur: e.target.files[0] });
    this.setState({ errorImage_auteur: "" });
  };

  changementPays_ouvrage = (e) => {
    this.setState({ pays_ouvrage: e.target.value });
    this.setState({ errorPays_ouvrage: "" });
  };

  changementPrix_ouvrage = (e) => {
    this.setState({ prix_ouvrage: e.target.value });
    this.setState({ errorPrix_ouvrage: "" });
  };

  changementGenre_ouvrage = (e) => {
    this.setState({ genre_ouvrage: e.target.value });
    this.setState({ errorGenre_ouvrage: "" });
  };

  changementCategorie_ouvrage = (e) => {
    this.setState({ categorie_ouvrage: e.target.value });
    // this.setState({ errorGenre_ouvrage: "" });
    console.log("data exemple"+this.state.categorie_ouvrage);
  };

  changementPrix_ouvrage = (e) => {
    this.setState({ prix_ouvrage: e.target.value });
    this.setState({ errorPrix_ouvrage: "" });
  };

  changementNom_auteur = (e) => {
    this.setState({ nom_auteur: e.target.value });
    this.setState({ errorNom_auteur: "" });
  };

  changementPays_auteur = (e) => {
    this.setState({ pays_auteur: e.target.value });
    this.setState({ errorPays_auteur: "" });
  };


  handleChange = (date) => {
    this.setState({
      startDate: date,
    });
  };

  uploadImage = () => {
    toast.info("Veuillez patienter", toast.POSITION.TOP_RIGHT);
    this.setState({ visibility: true });
    const uploadTask = storage
      .ref(`images/${this.state.image_ouvrage.name}`)
      .put(this.state.image_ouvrage);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(this.state.image_ouvrage.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            this.setState({ image_ouvrage: url });

            const pdfs = storage
              .ref(`pdfs/${this.state.lien_ouvrage.name}`)
              .put(this.state.lien_ouvrage);
            pdfs.on(
              "state_changed",
              (snapshot) => {},
              (error) => {
                console.log(error);
              },
              () => {
                storage
                  .ref("pdfs")
                  .child(this.state.lien_ouvrage.name)
                  .getDownloadURL()
                  .then((url) => {
                    console.log(url);
                    this.setState({ lien_ouvrage: url });




                    const imageAuteur = storage.ref(`images/${this.state.image_auteur.name}`)
                    .put(this.state.image_auteur);
                    imageAuteur.on(
                      "state_changed",
                      (snapshot) => {},
                      (error) => {
                        console.log(error);
                      },
                      () => {
                        storage
                          .ref("images")
                          .child(this.state.image_auteur.name)
                          .getDownloadURL()
                          .then((url) => {
                            console.log(url);
                            this.setState({ image_auteur: url });
        
                            
                            
                            const newOuvrage = {
                              titre_ouvrage: this.state.titre_ouvrage,
                              description_ouvrage: this.state.description_ouvrage,
                              image_ouvrage: this.state.image_ouvrage,
                              lien_ouvrage: this.state.lien_ouvrage,
                              pays_ouvrage: this.state.pays_ouvrage,
                              prix_ouvrage: this.state.prix_ouvrage,
                              genre_ouvrage: this.state.genre_ouvrage,
                              prenom_auteur: "",
                              nom_auteur: this.state.nom_auteur,
                              prenom_auteur: "",
                              pays_auteur: this.state.pays_auteur,
                              image_auteur: this.state.image_auteur,
                            };

                            console.log(newOuvrage);                           
                            API.post(`themes/${this.state.categorie_ouvrage}/ouvrages`, newOuvrage)
                              .then((res) => {
                                console.log(res);
                                console.log(res.data);
                                toast.info(
                                  "Enregistrement effectuer",
                                  toast.POSITION.TOP_RIGHT
                                );
                                this.props.history.push("/");
                                window.location.reload();
                              })
                              .catch((erreur) => {
                                console.log(erreur);
        
                                this.setState({ errorMessage: erreur.message });
                              });
        
        
                          });
                      }
                    );















                  });
              }
            );
          });
      }
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let verificateur = true;

    if (
      this.state.titre_ouvrage == "" ||
      this.state.titre_ouvrage == undefined
    ) {
      this.setState({
        errortTitre_ouvrage: "veuillez saisir le titre du livre",
      });
      verificateur = false;
    }

    if (
      this.state.description_ouvrage == "" ||
      this.state.description_ouvrage == undefined
    ) {
      this.setState({
        errorDescription: "veuillez saisir la description de l'ouvrage",
      });
      verificateur = false;
    }


    if (
      this.state.image_ouvrage == "" ||
      this.state.image_ouvrage == undefined
    ) {
      this.setState({
        errorImage_ouvrage: "veuillez choisir l'image du livre",
      });
      verificateur = false;
    }

    if (this.state.lien_ouvrage == "" || this.state.lien_ouvrage == undefined) {
      this.setState({ errorLien_ouvrage: "veuillez choisir le pdf du livre" });
      verificateur = false;
    }

    if (this.state.pays_ouvrage == "" || this.state.pays_ouvrage == undefined) {
      this.setState({ errorPays_ouvrage: "veuillez choisir le pays" });
      verificateur = false;
    }

 

    if (this.state.pays_auteur == "" || this.state.pays_auteur == undefined) {
      this.setState({ errorPays_auteur: "veuillez saisir le pays " });
      verificateur = false;
    }

    // if (this.state.prix_ouvrage == "" || this.state.prix_ouvrage == undefined) {
    //   this.setState({ errorPrix_ouvrage: "veuillez saisir le prix de l'ouvrage" });
    //   verificateur = false;
    // }

    if (this.state.nom_auteur == "" || this.state.nom_auteur == undefined) {
      this.setState({ errorNom_auteur: "veuillez choisir le nom de l'auteur" });
      verificateur = false;
    }

    if (this.state.pays_auteur == "" || this.state.pays_auteur == undefined) {
      this.setState({ errorPays_auteur: "veuillez saisir le pays de l'auteur" });
      verificateur = false;
    }

    if (this.state.image_auteur == "" || this.state.image_auteur == undefined) {
      this.setState({ errorImage_auteur: "veuillez choisir la photo de l'auteur" });
      verificateur = false;
    }




    if (verificateur) {
      this.uploadImage();
    }
  };

  render() {
    return (
      <>
        <h1>Ajouter un ouvrage</h1>
        <div className="container_form">
          {this.state.visibility == false ? (
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col>
                  <Form.Label>Titre de l'ouvrage</Form.Label>
                  <Form.Control
                    placeholder="Ex: L'enfant noir"
                    type="text"
                    onChange={this.changementTitre_ouvrage}
                  />
                  <span>{this.state.errortTitre_ouvrage}</span>
                </Col>
                <Col>
                  <Form.Label>Pays de l'ouvrage </Form.Label>
                  <Form.Control
                    placeholder="Ex : RDC"
                    type="text"
                    onChange={this.changementPays_ouvrage}
                  />
                  <span>{this.state.errorPays_ouvrage}</span>
                </Col>
              </Row>
              <br/>
              <Row>
                      <Col>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Genre de l'ouvrage</Form.Label>
                                <Form.Control as="select" onChange={this.changementGenre_ouvrage} >
                                <option value="livre">livre</option>
                                <option value="BD">BD</option>

                                </Form.Control>
                                <span>{this.state.errorGenre_ouvrage}</span>
                              </Form.Group>
                        </Col>

                        <Col>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Categorie de l'ouvrage</Form.Label>
                                <Form.Control as="select" onChange={this.changementCategorie_ouvrage} >
                                {/* <option value="" selected disabled hidden>
                                  sélectionnez la catégorie de l'ouvrage
                                </option> */}
                                <option value="1">Enfant</option>
                                <option value="2">Adulte</option>

                                </Form.Control>
                                <span>{this.state.errorGenre_ouvrage}</span>
                              </Form.Group>
                        </Col>
                        <Col>
                        <Form.Label>Prix de l'ouvrage ($)</Form.Label>
                          <Form.Control placeholder="Ex : 30" type="number"onChange={this.changementPrix_ouvrage} />
                          {/* <span>{this.state.errorPrix_ouvrage}</span> */}
                        </Col>
              
                      </Row>

              <br />
              <Row>
                <Col>
                  <Form.Label>Nom Auteur </Form.Label>
                  <Form.Control
                    placeholder="Ex : Camara Laye"
                    type="text"
                    onChange={this.changementNom_auteur}
                  />
                  <span>{this.state.errorNom_auteur}</span>
                </Col>
                <Col>
                  <Form.Label>Pays de l'Auteur </Form.Label>
                  <Form.Control
                    placeholder="Ex : Senegal"
                    type="text"
                    onChange={this.changementPays_auteur}
                  />
                  <span>{this.state.errorPays_auteur}</span>
                </Col>
                
              </Row>


              <br />

              <Row>
                <Col>
                  <Form.Label className="labelFile" for="filePhotoLivre">
                   <HiOutlinePhotograph size="20"/> Choisir la photo du livre
                  </Form.Label>
                  <Form.Control
                    id="filePhotoLivre"
                    placeholder="First name"
                    className="file"
                    type="file"
                    onChange={this.changementImage_ouvrage}
                  />
                  <span>{this.state.errorImage_ouvrage}</span>
                </Col>
                <Col>
                  <Form.Label className="labelFile" for="filePhotoPdf">
                   <ImFilePdf/> Choisir l'ouvrage en PDF
                  </Form.Label>
                  <Form.Control
                    id="filePhotoPdf"
                    placeholder="First name"
                    className="file"
                    type="file"
                    onChange={this.changementLien_ouvrage}
                  />
                  <span>{this.state.errorLien_ouvrage}</span>
                </Col>

                <Col>
                  <Form.Label className="labelFile" for="filePhotoJournaliste">
                  <HiOutlinePhotograph size="20"/> Photo de l'auteur
                  </Form.Label>
                  <Form.Control
                    id="filePhotoJournaliste"
                    placeholder="First name"
                    className="file"
                    type="file"
                    onChange={this.changementImage_auteur}
                  />
                  <span>{this.state.errorImage_auteur}</span>
                </Col>
              </Row>

              <br />
              <Row>
                <Col>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Description du Livre</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="5"
                      onChange={this.changementDescription_ouvrage}
                    ></Form.Control>
                  </Form.Group>
                  <span>{this.state.errorDescription_ouvrage}</span>
                </Col>
              </Row>

              <Button
                type="submit"
                variant="primary"
                className="bouton_form"
                style={{ backgroundColor: "#303C50" }}
              >
                Enregistrer
              </Button>
            </Form>
          ) : (
            <div style={{ padding: "50px 0" }} className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          )}
        </div>
      </>
    );
  }
}
export default withRouter(AjouterActeurStructure);
