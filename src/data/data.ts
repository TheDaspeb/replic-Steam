// Datos que usaremos para la creación de proyecto

import type { Game } from "../models/interfaces.js";

export let Games:Game[] =[
    {id:1, name:"God of War", genre:"Action", launch:"2018-04-18", multi:false, format:"pay"},
    {id:2, name:"Call of duty", genre:"Shooter", launch:"2025-11-14", multi:false, format:"pay"},
    {id:3, name:"Horizont Zero Dawn", genre:"Adventure", launch:"2017-02-28", multi:false, format:"pay"},
    {id:4, name:"R.E.P.O", genre:"Horror", launch:"2025-02-26", multi:true, format:"pay"},
    {id:5, name:"PUBG", genre:"Action", launch:"2017-12-20", multi:true, format:"free-to-play"},
]