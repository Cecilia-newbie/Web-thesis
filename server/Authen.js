//import { validateRegisterInput } from './register';

const mysql = require('mysql');
const bcrypt = require('bcrypt');
const Validator = require("validator");
const isEmpty = require("is-empty");
const saltRounds = 10;

const conn = mysql.createConnection({
    database: 'thanha',
    host: "localhost",
    user: "root",
    password: ""
});

conn.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

//-----------sign up-------
exports.register = async function (req, res) {
    /*const data = {
        "email": req.body.email,
        "password": req.body.password
    }*/
    var email = req.body.email
    var password = req.body.password
    let errors = []

    if (!email || !password) {
        errors.push({ msg: 'Please fill in all the fields' });
        res.send({ message: 'Please fill in all the fields' });
    }
    /*// Convert empty fields to an empty string so we can use validator functions
    if(password.length < 3){
        errors.push({msg: 'Password should be atleast 3 characters'});
        res.send({message:'Password should be atleast 3 characters'});   
    }
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    //password2 = !isEmpty(password2) ? password2 : "";
    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    /*f (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }
    if (!Validator.isLength(data.password, { min: 2, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
        console.log(errors.password);
    }
    //if (!Validator.equals(data.password, data.password2)) {
    //    errors.password2 = "Passwords must match";
    //}
    //var password = req.body.password;
    //var email = req.body.email;
*/

    // const { errors, isValid } = await validateRegisterInput(data);

    //hash pwd
    else {
        bcrypt.hash(password, saltRounds, (e, hash) => {
            const users = {
                "email": email,
                "password": hash
            }

            conn.query('SELECT COUNT(*) AS cnt FROM nicks WHERE email = ? ', users.email, function (error, result) {
                if (error) {
                    console.log(error)
                    res.send({
                        "code": 400,
                        "failed": "error ocurred"
                    })
                } else {
                    if (result[0].cnt > 0) {
                        // Already exist 
                        errors.push({ msg: 'Email already exits' });
                        res.send({ message: 'Email already exits' });
                    } else {
                        conn.query('INSERT INTO nicks SET ?', users, function (error, results, fields) {
                            if (error) {
                                console.log(error)
                                res.send({
                                    "code": 400,
                                    "failed": "error ocurred"
                                })
                            } else {
                                res.send({
                                    "code": 200,
                                    "success": "user registered sucessfully"
                                });
                            }
                        });
                    }
                }
            });
        })
    }
}
//-------login----
exports.login = async function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    conn.query('SELECT * FROM nicks WHERE email = ?', [email], async function (error, results, fields) {
        if (error) {
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            if (results.length > 0) {
                const comparision = await bcrypt.compare(password, results[0].password)
                if (comparision) {
                    res.send({
                        "code": 200,
                        "success": "login sucessfull"
                    })
                }
                else {
                    res.send({
                        "code": 204,
                        "success": "Email and password does not match"
                    })
                }
            }
            else {
                res.send({
                    "code": 206,
                    "success": "Email does not exits"
                });
            }
        }
    });
}