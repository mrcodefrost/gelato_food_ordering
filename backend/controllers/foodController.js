import foodModel from "../models/foodModel.js";
import fs from 'fs';


// Add new food item

const addFood = async (req, res) => {

    // to store the name of the image in DB
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category
    }); 

    try{
        // to save food item in DB
        await food.save();
        res.status(201).json({success: true, message : "Food Added Successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({success: false, message : "Something went wrong"});

        // // delete the uploaded image if any error
        // if(fs.existsSync(`uploads/${image_filename}`)){
        //     fs.unlinkSync(`uploads/${image_filename}`);
        // }
    }
}


// All food list
const listFood = async (req, res) => {

    try{
        const foods = await foodModel.find({});
        res.status(200).json({success:true, data: foods});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, message: "Something went wrong"});
    }
}

// Remove food item
const removeFood = async (req, res) => {
    try{
        // find the food item to be removed
        const food = await foodModel.findById(req.body.id);

        // To delete the image from uploads folder
        fs.unlink(`uploads/${food.image}`, (err) => {
            console.log(err);
        })

        // To delete food item from DB
        await foodModel.findByIdAndDelete(req.body.id);

        res.status(200).json({success: true, message: "Food Removed Successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({success: false, message: "Something went wrong"});
    }
}

export { addFood, listFood, removeFood };