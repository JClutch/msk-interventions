import axios from 'axios';
import { interventions } from '../urls';


export const interventionSearch = (params) => {
    const { name } = params;
    const cachedData = localStorage.getItem(name);
    if(cachedData !== null){
        try{
            const parsedData = JSON.parse(cachedData)
            return new Promise((resolve, reject) => {
                resolve(parsedData)
            });
        } catch(err){
            console.error('Issue parsing cached data: ', err)
            localStorage.removeItem(name)
            throw err;
        }
    }
    return axios.get(interventions, { params }).then((res) => {
        localStorage.setItem(name, JSON.stringify(res.data));
        return res.data;
    }).catch((err) => {
        console.error('Error in request: ', err)
        throw err
    })
}