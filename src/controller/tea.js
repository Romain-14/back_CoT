import formidable from "formidable";
import Query from "../model/Query.js";

// GET
const all = async (req, res) => {
    try {
        const query =
            "SELECT tea.id, mainTitle, subTitle, description, url_img, isFavorite FROM tea";
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
// ADD TEA
const add = async (req, res) => {
    try {
        const form = formidable({
            uploadDir: "public/img/tea",
            keepExtensions: true,
            allowEmptyFiles: false,
        });
        form.parse(req, async (err, fields, files) => {
            const {
                mainTitle,
                subTitle,
                description,
                category,
                packaging,
                ref,
                price,
            } = fields;
            
            const dataQuery1 = {
                mainTitle,
                subTitle,
                description,
                category,
                url_img: Object.keys(files).length === 0
                    ? "no-picture.jpg"
                    : files.photo.newFilename
            };
            
            const query1 =
                "INSERT INTO tea (mainTitle, subTitle, description, category_id, url_img) VALUES(?,?,?,?,?)";
            const query2 =
                "INSERT INTO tea_packaging (tea_id, packaging_id, ref, price) VALUES(?,?,?,?)";

            const [{ insertId }] = await Query.write(query1, dataQuery1);
            
            const dataQuery2 = {
                insertId,
                packaging,
                ref,
                price,
            };
            await Query.write(query2, dataQuery2);
            
            res.status(201).json({ msg: "tea added" });
        });
    } catch (error) {
        throw new Error(error);
    }
};



const update = async (req, res) => {
    try {
        const data = {
            ...req.body,
            ...req.params,
        };
        const query =
            "UPDATE tea SET mainTitle = ?, subTitle = ?, description = ?, url_img = ?, category_id = ? WHERE id = ?";
        const result = await Query.write(query, data);
    } catch (error) {
        throw new Error(error);
    }
};

export { all, one, add, update };
