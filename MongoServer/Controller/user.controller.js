const user=require("../Model/user.model.js")

// All user
const getUsers=async (req,res)=>{
    try{
        const users=await user.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message:error.message
        });
    } 
};

// Single user
const getUser=async (req,res)=>{
    try{
        const{id}=req.params;
        const users=await user.findById(id);
        if(!users) {
            return res.status(404).json("User doesnt exist");
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message:error.message
        });
    } 
    };
//CREATE
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Check if user with the same email already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with the same email already exists" });
    }

    // Create new user
    const newUser = await user.create({ username, email, password });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteUser=async(req,res)=>{
    try {
        const {id} =req.params;
        const users = await user.findByIdAndDelete(id);
        if(!users) {
            return res.status(404).json("User doesnt exist");
        }
        res.status(200).json("User Deleted");
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const updateUser = async(req,res)=>{
    try {
        const {email} = req.body;
        const {id} = req.params;
        const exisitinguser = await user.findOne({email});
        if (exisitinguser && exisitinguser._id !== id) {
            return res.status(400).json({message:"Already user exist with this email id!"});
        } 
        const users = await user.findByIdAndUpdate(id, req.body);
        if(!users) {
            return res.status(404).json("User doesnt exist");
        }
        res.status(200).json("User Updated successfully !");   
    } catch (error) {
        res.status(500).json({
            message: error.message,
        }); 
    }
}

module.exports={
    getUsers,  //All users
    getUser,   //Single user
    createUser,//Create user
    deleteUser,//Delete user
    updateUser,//Update user
}