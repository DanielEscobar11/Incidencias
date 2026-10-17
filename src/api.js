import {API_URL, login_url, PAGINAR_INCIDENCIAS} from './config.js'
import {getToken} from './auth.js'

export async function login(email, password)
{
    let res;
    try {
        res = await fetch(`${API_URL}${login_url}`,
            {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password})
            }
        );
    }
    catch 
    {
        throw new Error("Error de conexión con el servidor");
    }


    if (!res.ok) return { error: await res.text() };

    const data = await res.json();
    return data.token;

}

export async function getIncidencias(skip,take)
{
    var token = getToken();
    // Todo: Sacarlo al login

    if(token == null){
        throw new Error("No hay un token disponible.");
    }

    let resultado;

    try {
        resultado = await fetch(`${API_URL}${PAGINAR_INCIDENCIAS}/${skip}/${take}`,
            {
                method: 'GET',
                headers: {"Authorization": `Bearer ${token}`}
            }
        );
    }
    catch(err)
    {
        // Todo: Mostrar error gráfico
        throw new Error("Error de conexión con el servidor");
    }

    if (!resultado.ok){
        // Todo: Mostrar error gráfico
        throw new Error(await resultado.text());
    }

    return await resultado.json()
}