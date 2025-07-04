 
 
   const  adminAuth= (req, res, next) => {
    console.log('Admin authentication middleware called');
    const token= "RR"
    const isauthenticated = "RR" === token;
    if ( isauthenticated) {
        next(); // User is admin, proceed to the next middleware or route handler
    } else {
        res.status(401).send('Access denied. Admins only.'); // Forbidden access
    }
}

module.exports = {adminAuth};