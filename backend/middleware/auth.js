import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    console.log("HEADERS:",req.headers);
    console.log("BODY:",req.body);
    console.log("=======================");
    // access token from authorization header
    const {token} = req.headers;

    // if token is not present
    if(!token) {
        return res.status(401).json({
            success: false,
            message: "Token not found"
        });
    }

    try{
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
        // when we created the token, a user id was used
        // on decoding the token, we get the user id
        req.body.userId = tokenDecoded.id;
        next();
    } catch(err) { 
        console.log(err);
        return res.status(401).json({
            success: false,
            message: "Unauthorized user"
        });
    }

}

export default authMiddleware;