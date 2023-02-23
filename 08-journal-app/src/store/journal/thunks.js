// Despacha acciones asincronas
export const startNewNote = () => {
    return async (dispatch) => {
        // Para grabar en firebase se usa el uid del usuario
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        //! dispatch
        // dispatch(newNote)
        // dispatch(activarNote)
    }
}