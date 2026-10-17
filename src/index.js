import {getIncidencias} from './api.js';

const tbody = document.querySelector("#incidencias-body");
const alertbox = document.querySelector("#alert");
const nextButton = document.querySelector("#next");
const previousButton = document.querySelector("#previous");
const pageSpan = document.querySelector("#page");

const take= 10
let skip= 0;
let currentPage= 1;

async function cargarIncidencias()
{
    tbody.innerHTML = `
        <tr>
            <td colspan="5">Cargando</td>
        </tr>
    `


    alertbox.hidden = true;

    try
    {
        const incidencias = await getIncidencias(skip,take)
        tbody.innerHTML = ""

        if(incidencias.result && incidencias.result.length == 0)
        {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5">No hay incidencias.</td>
                </tr>
            `

            return;
        }

        incidencias.result.forEach(incidencia => {
            const row = document.createElement("tr")
            row.innerHTML = `
                <td>${incidencia.id}</td>
                <td>${incidencia.titulo}</td>
                <td>${incidencia.descripcion}</td>
                <td>${incidencia.estado}</td>
                <td>${incidencia.prioridad}</td>
            `
            tbody.appendChild(row)
        });

        pageSpan.textContent = `Página ${currentPage}`
        previousButton.disabled = skip == 0;
        nextButton.disabled = incidencias.result.length < take;

    } catch (error) {
        tbody.innerHTML = ""
    }

}

nextButton.addEventListener("click", async ()=>{
    skip += take;
    currentPage++;

    await cargarIncidencias();
})

previousButton.addEventListener("click", async ()=>{

    if(skip == 0) {
        return;
    }
    skip -= take;
    currentPage--;

    await cargarIncidencias();
})

cargarIncidencias();