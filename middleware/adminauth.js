const hasAdminAccess = (req,res, next) =>
{
    if( req.session.userInfo._id != process.env.ADMIN_ID)
    {
        res.redirect('/login');

    } else 
    {
        next();
    }
}
module.exports=hasAdminAccess;