import Query from "../model/Query.js";

// GET
const all = async (req, res) => {
    try {
        const query = "SELECT id, weight FROM packaging";
        const [result] = await Query.findAll(query);
       
        if (!result.length) {
            return res.status(204).end();
        }
        res.status(200).json(result);
    } catch (error) {
        throw new Error(error);
    }
};

const one = async (req, res) => {
    const { id } = req.params;
    const data = {
        msg: `data avec l'id ${id} retrieved`,
    };
    res.status(200).json(data);
};

// POST
const add = async (req, res) => {
    try {
        const query =
            "INSERT INTO packaging (weight) VALUES(?)";
        const result = await Query.write(query, req.body);
        
        res.status(201).json({ msg: "packaging added" });
    } catch (error) {
        throw new Error(error);
    }
};

export { all, one, add };
