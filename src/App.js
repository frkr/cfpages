import {Fragment} from 'react';
import Documentos from "./documentos";

export default function App() {
    return (
        <Fragment>
            <main>
                <div className='mx-5 py-4'>

                    <div className='p-4 row align-items-center rounded-3 border shadow-lg'>

                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="https://google.com.br/">Apps</a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Teste</li>
                            </ol>
                        </nav>

                        <div>
                            <Documentos/>
                        </div>

                    </div>
                </div>
            </main>
        </Fragment>
    );
}
