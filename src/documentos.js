import {Fragment, useState} from 'react';

export default function Documentos() {

    const [resultado, setResultado] = useState({});
    const [cpf, setCPF] = useState();
    const [loading, setLoading] = useState(false);

    function carregar() {
        if (cpf) {
            setLoading(true);
            setResultado({});
            fetch(
                '/api/func',
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify({cpf}),
                }).then(async response => {

                setResultado(await response.json());

            }).catch(async error => {

                setResultado({})

            }).finally(() => {
                setLoading(false);
            });
        }
    }

    function handleCPF(e) {
        setCPF(e.target.value);
    }

    return (
        <Fragment>
            <div>

                <label>
                    CPF:
                    <input type='number' value={cpf} onChange={handleCPF}/>
                </label>

                <label>
                    <button disabled={loading}
                            onClick={() => carregar()}>{loading ? 'Carregando...' : 'Pesquisar'}</button>
                </label>

            </div>
            <div className='mx-auto p-2'/>

            <table className='table'>
                <thead>
                <tr>
                    <th scope='col'>Chave</th>
                    <th scope='col'>Valor</th>
                </tr>
                </thead>
                <tbody>

                {
                    (!resultado) ? '' :
                        <Fragment>
                            {
                                Object.keys(resultado).map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item}</td>
                                            <td>{resultado[item] instanceof Object ? JSON.stringify(resultado[item]) : resultado[item]}</td>
                                        </tr>
                                    );
                                })
                            }
                        </Fragment>
                }

                </tbody>
            </table>

        </Fragment>
    );

}
