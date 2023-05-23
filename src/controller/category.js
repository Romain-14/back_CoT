import formidable from "formidable";
import Query from "../model/Query.js";

// GET
const all = async (req, res) => {
    try {
        const query = "SELECT id, title, description, url_img FROM category";
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
        const form = formidable({
            uploadDir: "public/img/category",
            keepExtensions: true,
            allowEmptyFiles: false,
        });
        form.parse(req, async (err, fields, files) => {
            console.log(files?.url_img);

            const data = {
                ...fields,
                url_img: files.url_img
                    ? files.url_img.newFilename
                    : "no-picture.jpg",
            };
            const query = "INSERT INTO category (title, description, url_img) VALUES(?,?,?)";
            const result = await Query.write(query, data);
            console.log(result)
            res.status(201).json({msg: "category added"});
        });
    } catch (error) {
        throw new Error(error);
    }
};

export { all, one, add };
