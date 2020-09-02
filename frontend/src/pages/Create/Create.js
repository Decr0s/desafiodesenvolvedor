import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import Database from '../../services/Database';
import Bootbox from 'bootbox-react';




function Create() {

    const { id } = useParams();
    const history = useHistory();

    const [showAlert, setShowAlert] = useState(false)
    const [showMessage, SetshowMessage] = useState('')

    const handleClose = () => {
        setShowAlert(false);
        history.push("/")
    }

    const initialForm = { nome: '', dt_nascimento: '', sexo: '' }
    const [user, setUser] = useState(initialForm)

    const handleInputChange = (event) => {
        const { name, value } = event.target

        setUser({ ...user, [name]: value })
    }


    async function addUser(event) {
        event.preventDefault();

        Database.store(user).then(function (response) {
            setUser(initialForm)
            SetshowMessage('Salvo com sucesso!')
            setShowAlert(true)


        }).catch(function (errr) {
            SetshowMessage('Não foi possivel salvar!')
            setShowAlert(true)
        });
    }

    useEffect(() => {

        if (id) {
            Database.show(id)
                .then(function (response) {
                    setUser(response.data.data)
                }).catch(function (errr) {

                });
        }


    }, []);


    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-12 text-center">
                        <h2>{id ? 'Usuário' : 'Novo Usuário'}</h2>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-md-12 d-flex justify-content-center">
                        <form
                            onSubmit={addUser}
                        >
                            <div className="form-group">
                                <label>Nome</label>
                                <input type="text" className="form-control" name="nome" placeholder="Jose Neto" value={user.nome} onChange={handleInputChange} required/>
                            </div>
                            <div className="form-group">
                                <label>Data de Nascimento</label>
                                <input type="date" name="dt_nascimento" className="form-control" value={user.dt_nascimento} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Sexo</label>
                                <div className="form-check">
                                    <input type="radio" name="sexo" className="form-check-input" value="M" onChange={handleInputChange} required checked={user.sexo == "M"} />
                                    <label className="form-check-label">Masculino</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" name="sexo" className="form-check-input" value="F" onChange={handleInputChange} required checked={user.sexo == "F"} />
                                    <label className="form-check-label">Feminino</label>
                                </div>
                            </div>

                            <div className="form-group d-flex justify-content-around">
                                <Link className="btn btn-danger btn-sm" to="/">Cancelar</Link>
                                <button className="btn btn-primary btn-sm " type="submit">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Bootbox show={showAlert}
                type={"alert"}
                message={showMessage}
                onClose={handleClose}
            />
        </>
    )

}

export default Create;