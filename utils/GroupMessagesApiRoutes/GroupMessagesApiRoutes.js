// making the backend end point 
// here we are defining the host of the main api
// export const host = 'http://localhost:8080';



// export const host = 'https://backend-social-13bd.onrender.com';

import { host } from "../host/host";


// making a frontend end point for the adding the message in the database

export const addGroupMessageToDataBase = `${host}/addgroupmessagetodatabase`;


// making a frontend end point for the adding the message in the database

export const getGroupMessageToDataBase = `${host}/getgroupmessagetodatabase`;


// making a frontend end point for the adding the message in the database

export const editGroupMessageToDataBase = `${host}/editgroupmessagetodatabase`;


// making a frontend end point for the adding the message in the database

export const deleteGroupMessageToDataBase = `${host}/addgroupmessagetodatabase`;

