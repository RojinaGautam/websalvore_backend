import { User } from '../../models/index.js'


/**
 *  fetch all users
 */
const getAll = async (req, res) => {
    try {
        //fetching all the data from users table
        const users = await User.findAll();
        res.status(200).send({ data: users, message: "successfully fetched data" })
    } catch (e) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}

/** 
 *  create new user
*/

const create = async (req, res) => {

    try {
        const body = req.body
        console.log(req.body)
        //validation
        if (!body?.email || !body?.name || !body?.password || !body?.phone || !body?.role)
            return res.status(500).send({ message: "Invalid paylod" });
        const users = await User.create({
            name: body.name,
            email: body.email,
            phone: body.phone,
            role: body.role,
            image: body.image || null,
            password: body.password,
            position: body.position || null,
            department: body.department || null,
            hireDate: body.hireDate || null,
            salary: body.salary || null,
            status: body.status || 'active',
            performance: body.performance || null,
            avatar: body.avatar || null
        });
        res.status(201).send({ data: users, message: "successfully created user" })
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}

/**
 *  update existing user
 */

const update = async (req, res) => {

    try {
        const { id = null } = req.params;
        const body = req.body;
        console.log(req.params)
        //checking if user exist or not
        const oldUser = await User.findOne({ where: { id } })
        if (!oldUser) {
            return res.status(500).send({ message: "User not found" });
        }
        oldUser.name = body.name || oldUser.name;
        oldUser.password = body.password || oldUser.password;
        oldUser.email = body.email || oldUser.email;
        oldUser.phone = body.phone || oldUser.phone;
        oldUser.role = body.role || oldUser.role;
        oldUser.image = body.image || oldUser.image;
        oldUser.position = body.position || oldUser.position;
        oldUser.department = body.department || oldUser.department;
        oldUser.hireDate = body.hireDate || oldUser.hireDate;
        oldUser.salary = body.salary || oldUser.salary;
        oldUser.status = body.status || oldUser.status;
        oldUser.performance = body.performance || oldUser.performance;
        oldUser.avatar = body.avatar || oldUser.avatar;
        oldUser.save();
        res.status(201).send({ data: oldUser, message: "user updated successfully" })
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Failed to update users' });
    }
}

/**
 *  delete user 
 */
const delelteById = async (req, res) => {

    try {
        const { id = null } = req.params;
        const oldUser = await User.findOne({ where: { id } })

        //checking if user exist or not
        if (!oldUser) {
            return res.status(500).send({ message: "User not found" });
        }
        oldUser.destroy();
        res.status(201).send({ message: "user deleted successfully" })
    } catch (e) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}

/**
 *  fetch user by id
 */
const getById = async (req, res) => {

    try {
        const { id = null } = req.params;
        const user = await User.findOne({ where: { id } })
        if (!user) {
            return res.status(500).send({ message: "User not found" });
        }
        res.status(201).send({ message: "user fetched successfully", data: user })
    } catch (e) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}


export const userController = {
    getAll,
    create,
    getById,
    delelteById,
    update
}