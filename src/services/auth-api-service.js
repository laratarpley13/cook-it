import TokenService from "./token-service";
import {API_BASE_URL} from "../config";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    postUser(user) {
        return fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then((res) => 
            !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
        );
    },
    signinUser(user) {
        return fetch(`${API_BASE_URL}/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then((res) => 
            !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
        );
    },
    getUser() {
        return fetch(`${API_BASE_URL}/users`, {
            method: 'GET',
            headers: {
                'authorization': `bearer ${TokenService.hasAuthToken}`
            },
        }).then((res) => 
            !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
        )
    }
};