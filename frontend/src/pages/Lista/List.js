import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Database from '../../services/Database';
import Moment from 'moment';
import Bootbox from 'bootbox-react';





function List() {


    const [users, setUsers] = useState([]);
    const [showConfirmBox, setShowConfirmBox] = useState(false);
    const [idDel, setIdDel] = useState(null);

    async function loadUsers() {

        const response = await Database.index()
        setUsers(response.data.data)
    }
    useEffect(() => {
        loadUsers();
    }, [])


    function deluser(userID) {
        setShowConfirmBox(!showConfirmBox)
        setIdDel(userID)

    }

    function handleCancel() {
        setShowConfirmBox(!showConfirmBox)

    }

    function handleConfirm() {
        if (idDel != null) {
            Database.destroy(idDel)
                .then(function (response) {
                    setShowConfirmBox(!showConfirmBox)
                    setIdDel(null)
                    loadUsers();
                }).catch(function (err) {
                    alert('Não foi possivel deletar')
                })

        }

    }

    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-12">
                        <Link to="/create" className="btn btn-primary btn-sm">Novo Usuário</Link>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-12 d-flex justify-content-center">
                        <table className="table table-sm">
                            <thead>
                                <th>Nome</th>
                                <th>Data de Nascimento</th>
                                <th>Sexo</th>
                                <th>Data de Criação</th>
                                <th>#</th>
                            </thead>

                            <tbody>
                                {
                                    users.map(user => {
                                        return (

                                            <tr key={user.id}>
                                                <td>{user.nome}</td>
                                                <td>{Moment(user.dt_nascimento).format('DD/MM/YYYY')}</td>
                                                <td>{user.sexo == "M" ? "Masculino" : "Feminino"}</td>
                                                <td>{Moment(user.created_at).format('DD/MM/YYYY')}</td>
                                                <td>
                                                    <Link to={`edit/${user.id}`} className="btn btn-primary btn-sm mr-3">
                                                        Editar
                                                </Link>
                                                    <button className="btn btn-danger btn-sm" onClick={() => deluser(user.id)}>
                                                        Deletar
                                                </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>

                    </div>
                </div>

            </div>

            <Bootbox show={showConfirmBox}
                type={"confirm"}
                message={"Tem certeza que deseja deletar este usuário?"}
                cancelLabel="Cancelar"
                successLabel="Confirmar"
                onSuccess={() => handleConfirm()}
                onCancel={() => handleCancel()}
            />

        </>
    )
}

export default List;