<!--------------------------------------------------  USER API -------------------------------------------------------------------->

<!-- Create User Api -->

Method >> Post
Route >> Protected
url   >> http://localhost:5000/api/users/signup 
request -body >> 

{
    "username":"siddeshwar9",
    "password":"1234"
}

<!-- Login User or Admin Api -->

Method >> Post
Route >> UnProtected
url   >> http://localhost:5000/api/users/login
request -body >>
{
    "username":"admin1",
    "password":"1234"
}


<!-- Get list of all Users --> 

Method >> get
Route >> Protected
url   >> http://localhost:5000/api/users/getallusers

<!-- Get Perticular User --> 

Method >> get
Route >> Protected
url   >> http://localhost:5000/api/users/getuser/656c6cbc2273ab9520ef0e85                         -- contain params id


<!-- Update User Profile  -->

Method >> patch
Route >> Protected
url   >> http://localhost:5000/api/users/getuser/update/656c6d772273ab9520ef0e90                      -- contain params id


<!-- Delete Perticular User  -->

Method >> delete
Route >> Protected
url   >> http://localhost:5000/api/users/deluser/656c372298eb9e2bec36e62d                   -- contain params id


<!-- Log Out User  -->

Method >> get
Route >> Protected
url   >> http://localhost:5000/api/users/logout




<!--------------------------------------------------------- Blog Api --------------------------------------------------------------->

<!----------- Add Blog  -------------->

Method >> post
Route >> Protected
url   >> http://localhost:5000/api/blogs/addblog
request - body >>  FormData


<!----------- List of All Blogs -------------->

Method >> get
Route >> Protected
url   >> http://localhost:5000/api/blogs/getallblogs


<!----------- Get Perticular Blog -------------->

Method >> get
Route >> Protected
url   >> http://localhost:5000/api/blogs/blog/656c386498eb9e2bec36e631                    -- contain params id



<!----------- Delete Specific Blog -------------->

Method >> delete
Route >> Protected
url   >> http://localhost:5000/api/blogs/delblog/656c39b29a72e3df024a9b2b                    -- contain params id


<!----------- Update Specific Blog -------------->

Method >> put
Route >> Protected
url   >> http://localhost:5000/api/blogs/update-blog
request - body 
    {
        "_id " :"656c39b29a72e3df024a9b2b "
    }



<!----------- Approve Specific Blog -------------->

Method >> post
Route >> Protected
url   >> http://localhost:5000/api/blogs/approve
request - body 
    {
        "_id " :"656c39b29a72e3df024a9b2b "
    }

<!----------- Reject Specific Blog -------------->

Method >> post
Route >> Protected
url   >> http://localhost:5000/api/blogs/reject
request - body 
    {
        "_id " :"656c39b29a72e3df024a9b2b "
    }





