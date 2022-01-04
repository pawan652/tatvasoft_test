var validator = require("email-validator");
var CryptoJS = require("crypto-js");
var authQry = require('../services/authQry');
var jwt = require('jsonwebtoken');
const config = require("../config/config");

//  Register API Start..........
exports.register = async (db, req, res) => {
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var password = req.body.password;
    var dob = req.body.dob;
    var role = req.body.role;

    if (!first_name) {
        return res.status(400).send({
            success: false,
            msg: 'First name required!!'
        });
    }

    if (!last_name) {
        return res.status(400).send({
            success: false,
            msg: 'Last name required!!'
        });
    }

    if (!email) {
        return res.status(400).send({
            success: false,
            msg: 'Email required!!'
        });
    }

    if (email) {
        if (validator.validate(email) == false) {
            return res.status(400).send({
                success: false,
                msg: 'Email formate not valid!!'
            });
        }
    }

    if (!dob) {
        return res.status(400).send({
            success: false,
            msg: 'DOB required!!'
        });
    }

    if (!password) {
        return res.status(400).send({
            success: false,
            msg: 'Password required!!'
        });
    }

    if (!role) {
        return res.status(400).send({
            success: false,
            msg: 'Role required!!'
        });
    }

    var encryptPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex)

    var userArray = {
        'first_name': first_name,
        'last_name': last_name,
        'email': email,
        'password': encryptPassword,
        'dob': dob,
        'role': role,
    }

    await db.query(authQry.getExistUser, [email], async function (err, response) {
        if (err) {
            return res.status(400).send({
                success: false,
                msg: 'Something went wrong Plese try again!!'
            });
        }
        else if (response.length > 0) {
            return res.status(400).send({
                success: false,
                msg: 'Email already exist!!'
            });
        } else {
            await db.query(authQry.registerUser, [userArray], async function (err, responseregister) {
                if (err) {
                    return res.status(400).send({
                        success: false,
                        msg: 'Something went wrong Plese try again!!'
                    });
                } else {
                    return res.status(200).send({
                        success: true,
                        msg: 'User register successfully!!'
                    });
                }
            })
        }
    });
}

//  Login API Start

exports.login = async (db, req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    if (!email) {
        return res.status(400).send({
            success: false,
            msg: 'Email required!!'
        });
    }

    if (email) {
        if (validator.validate(email) == false) {
            return res.status(400).send({
                success: false,
                msg: 'Email formate not valid!!'
            });
        }
    }

    if (!password) {
        return res.status(400).send({
            success: false,
            msg: 'Password required!!'
        });
    }
    var encryptPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex)
    await db.query(authQry.getExistUser, [email], async function (err, response) {
        if (err) {
            return res.status(400).send({
                success: false,
                msg: 'Something went wrong Plese try again!!'
            });
        }
        else if (response.length > 0) {

            if (response[0].password == encryptPassword) {

                var token = jwt.sign({ email: response[0].email, id: response[0].id },
                    config.JWT_SECRET_KEY, {
                    expiresIn: config.SESSION_EXPIRE_IN
                });

                return res.status(200).send({
                    success: true,
                    msg: 'Login Successfully!!',
                    details: {
                        'id' : response[0].id,
                        'first_name': response[0].first_name,
                        'last_name': response[0].last_name,
                        'email': response[0].email,
                        'tokne': token,
                    }
                });
            } else {
                return res.status(400).send({
                    success: false,
                    msg: 'Password wrong Please try again!!'
                });
            }
        } else {
            return res.status(400).send({
                success: false,
                msg: 'User not found!!'
            });
        }
    });
}

// Blog List API Start.........
exports.blogsList = async (db, req, res) => {
    user_id = req.body.user_id;
    category = req.body.category;
    publised_date = req.body.publised_date;
    auther = req.body.auther;
    category_id = req.body.category_id;

    await db.query(authQry.getUserDetails, [user_id], async function (err, userDetails) {

        if (err) {
            return res.status(400).send({
                success: false,
                msg: 'Something went wrong Plese try again!!'
            });
        }
        if (userDetails.length == 0) {
            return res.status(400).send({
                success: false,
                msg: 'User not found!!'
            });
        }   
        role = userDetails[0].role
        if (role == 1) {
            var qry = 'SELECT * FROM blog WHERE 1';
        } else {
            var qry = `SELECT * FROM blog WHERE user_id = ${user_id}`;
        }

        if(publised_date){
            qry = qry+ ` AND publised_date = '${publised_date}'` 
        }

        if(auther){
            qry = qry+ ` AND auther = '${auther}'`
        }

        if(category_id){
            qry = qry+ ` AND category_id = '${category_id}'`
        }        

        console.log(qry);

        await db.query(qry, async function (err, response) {
            console.log(err);
            if (err) {
                return res.status(400).send({
                    success: false,
                    msg: 'Something went wrong Plese try again!!'
                });
            }
            else if (response.length > 0) {
                return res.status(200).send({
                    success: true,
                    msg: 'Blogs get Successfully!!',
                    response: response
                });
            } else {
                return res.status(400).send({
                    success: false,
                    msg: 'Data not found!!'
                });
            }
        });

    })
}

// Add Blog API Start..............
exports.addBlog = async (db, req, res) => {
    var user_id = req.body.user_id;
    var title = req.body.title;
    var description = req.body.description;
    var publised_date = req.body.publised_date;
    var modify_date = req.body.modify_date;
    var category_id = req.body.category_id;
    var auther = req.body.auther;
    var status = req.body.status;

    if (!user_id) {
        return res.status(400).send({
            success: false,
            msg: 'User id required!!'
        });
    }

    if (!title) {
        return res.status(400).send({
            success: false,
            msg: 'Title required!!'
        });
    }

    if (!description) {
        return res.status(400).send({
            success: false,
            msg: 'Description required!!'
        });
    }

    if (!publised_date) {
        return res.status(400).send({
            success: false,
            msg: 'Publised Date required!!'
        });
    }

    if (!modify_date) {
        return res.status(400).send({
            success: false,
            msg: 'Modify date required!!'
        });
    }

    if (!status) {
        return res.status(400).send({
            success: false,
            msg: 'Status required!!'
        });
    }

    if (!category_id) {
        return res.status(400).send({
            success: false,
            msg: 'Category Id required!!'
        });
    }

    if (!auther) {
        return res.status(400).send({
            success: false,
            msg: 'Auther required!!'
        });
    }

    var blogData = {
        'user_id': user_id,
        'title': title,
        'description': description,
        'publised_date': publised_date,
        'modify_date': modify_date,
        'status': status,
        'category_id': category_id,
        'auther': auther,
    }

    await db.query(authQry.addBlog, [blogData], async function (err, response) {
        if (err) {
            return res.status(400).send({
                success: false,
                msg: 'Something went wrong Plese try again!!'
            });
        } else {
            return res.status(200).send({
                success: true,
                msg: 'Blog Added successfully!!'
            });
        }
    });
}

// Edit Blog API Start..............
exports.editBlog = async (db, req, res) => {
    var id = req.body.id;
    var user_id = req.body.user_id;
    var title = req.body.title;
    var description = req.body.description;
    var publised_date = req.body.publised_date;
    var modify_date = req.body.modify_date;
    var category_id = req.body.category_id;
    var auther = req.body.auther;
    var status = req.body.status;

    if (!id) {
        return res.status(400).send({
            success: false,
            msg: 'Blog Id required!!'
        });
    }

    if (!user_id) {
        return res.status(400).send({
            success: false,
            msg: 'User Id required!!'
        });
    }

    if (!title) {
        return res.status(400).send({
            success: false,
            msg: 'Title required!!'
        });
    }

    if (!description) {
        return res.status(400).send({
            success: false,
            msg: 'Description required!!'
        });
    }

    if (!publised_date) {
        return res.status(400).send({
            success: false,
            msg: 'Publised Date required!!'
        });
    }

    if (!modify_date) {
        return res.status(400).send({
            success: false,
            msg: 'Modify date required!!'
        });
    }

    if (!status) {
        return res.status(400).send({
            success: false,
            msg: 'Status required!!'
        });
    }

    if (!category_id) {
        return res.status(400).send({
            success: false,
            msg: 'Category Id required!!'
        });
    }

    if (!auther) {
        return res.status(400).send({
            success: false,
            msg: 'Auther required!!'
        });
    }

    var BlogData = {
        'title': title,
        'description': description,
        'publised_date': publised_date,
        'modify_date': modify_date,
        'status': status,
        'category_id': category_id,
        'auther': auther,
    }

    await db.query(authQry.getBlogDetails, [id], async function (err, blogRes) {
        if (err) {
            return res.status(400).send({
                success: false,
                msg: 'Something went wrong Plese try again!!'
            });
        } else if (blogRes.length == 0) {
            return res.status(400).send({
                success: false,
                msg: 'Blog not found!!'
            });
        } else {

            await db.query(authQry.getUserDetails, [user_id], async function (err, userDetails) {

                if (err) {
                    return res.status(400).send({
                        success: false,
                        msg: 'Something went wrong Plese try again!!'
                    });
                }
                if (userDetails.length == 0) {
                    return res.status(400).send({
                        success: false,
                        msg: 'User not found!!'
                    });
                }   
                role = userDetails[0].role
                if (role == 1) {
                    await db.query(authQry.editBlog, [BlogData, id], async function (err, response) {
                        if (err) {
                            return res.status(400).send({
                                success: false,
                                msg: 'Something went wrong Plese try again!!'
                            });
                        } else {
                            return res.status(200).send({
                                success: true,
                                msg: 'Blog Updated successfully!!'
                            });
                        }
                    });
                } else {
                    if (user_id != blogRes[0].user_id) {
                        return res.status(200).send({
                            success: true,
                            msg: 'You are not blog owner!!'
                        });
                    }
                    await db.query(authQry.editBlog, [BlogData, id], async function (err, response) {
                        if (err) {
                            return res.status(400).send({
                                success: false,
                                msg: 'Something went wrong Plese try again!!'
                            });
                        } else {
                            return res.status(200).send({
                                success: true,
                                msg: 'Blog Updated successfully!!'
                            });
                        }
                    });
                }

            })
        }
    })
}

// Delete blog API Start.........
exports.deleteBlog = async (db, req, res) => {
    var id = req.body.id
    var user_id = req.body.user_id

    if (!id) {
        return res.status(400).send({
            success: false,
            msg: 'Blog Id required!!'
        });
    }

    if (!user_id) {
        return res.status(400).send({
            success: false,
            msg: 'User Id required!!'
        });
    }

    await db.query(authQry.getBlogDetails, [id], async function (err, blogRes) {
        if (err) {
            return res.status(400).send({
                success: false,
                msg: 'Something went wrong Plese try again!!'
            });
        } else if (blogRes.length == 0) {
            return res.status(400).send({
                success: false,
                msg: 'Blog not found!!'
            });
        } else {

            await db.query(authQry.getUserDetails, [user_id], async function (err, userDetails) {

                if (err) {
                    return res.status(400).send({
                        success: false,
                        msg: 'Something went wrong Plese try again!!'
                    });
                }
                if (userDetails.length == 0) {
                    return res.status(400).send({
                        success: false,
                        msg: 'User not found!!'
                    });
                }                

                role = userDetails[0].role
                if (role == 1) {
                    var qry = `DELETE FROM blog WHERE id = ${id}`
                    await db.query(qry, async function (err, response) {
                        if (err) {
                            console.log(err);
                            return res.status(400).send({
                                success: false,
                                msg: 'Something went wrong Plese try again!!'
                            });
                        } else {
                            return res.status(400).send({
                                success: false,
                                msg: 'Blog deleted successfully!!'
                            });
                        }
                    });
                } else {
                    if (user_id != blogRes[0].user_id) {
                        return res.status(200).send({
                            success: true,
                            msg: 'You are not blog owner!!'
                        });
                    }
                    var qry = `DELETE FROM blog WHERE id = ${id}`
                    await db.query(qry, async function (err, response) {
                        if (err) {
                            console.log(err);
                            return res.status(400).send({
                                success: false,
                                msg: 'Something went wrong Plese try again!!'
                            });
                        } else {
                            return res.status(400).send({
                                success: false,
                                msg: 'Blog deleted successfully!!'
                            });
                        }
                    });
                }

            })
        }
    });
}

// Code End ....