import { useState } from 'react';
import { AddCategory } from './components/AddCategory';
import { GifGrid } from './components/GifGrid';

const GifExpertApp = () => {

    const [categorias, setCategorias] = useState(['One Punch']);

    // const handleAdd = () => {
    //     // setCategorias( [...categorias, 'HunterXHunter'] );
    //     setCategorias( cats => [ ...cats, 'HunterXHunter' ] );
    // }

    return (
        <>
            <h2>GifExpertAPP</h2>

            <AddCategory setCategorias = { setCategorias } />

            <hr/>

            <ol>
                {
                    categorias.map( category => (
                        <GifGrid 
                            key={ category }
                            category={ category } 
                        />
                    ))
                }
            </ol>
        </>
    );

}; 

export default GifExpertApp;