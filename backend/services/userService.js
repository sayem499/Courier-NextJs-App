import { pool } from '../config/db.js';

const create = (data, callBack) => {
    pool.query(`insert into users(
        user_id, user_firstname, user_lastname, user_email, user_password, user_phonenumber)
        values(?,?,?,?,?,?)`,
        [
            data.user_id,
            data.user_firstname,
            data.user_lastname,
            data.user_email,
            data.user_password,
            data.user_phonenumber
        ],
        (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        }
    );


}




export { create };