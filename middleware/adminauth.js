const hasAdminAccess = (req,res, next) =>
{
    if( req.session.userInfo.admin != true)
    {
        res.redirect('/login');

    } else 
    {
        next();
    }
}
module.exports=hasAdminAccess;