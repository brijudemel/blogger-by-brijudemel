const passport = require("passport");
function validate()
{
    const uname = document.forms["form"]["uname"].value;
    const email = document.forms["form"]["email"].value;
    const password = document.forms["form"]["password"].value;
    const uname_length=uname.length;
    const password_length=password.length;
    const email_length=email.length;

    for (let i = 0; i < uname_length; i++) {
        if(uname[i]===" "||uname[i]=="/"||uname[i]=="+"||uname[i]=="-"||uname[i]=="*"||uname[i]=="{"||uname[i]=="}"||uname[i]=="["||uname[i]=="]"||uname[i]==")"||uname[i]=="("||uname[i]=="!"||uname[i]=="#"||uname[i]=="$"||uname[i]=="%"||uname[i]=="^"||uname[i]=="&"||uname[i]=="="||uname[i]==";"||uname[i]==":"||uname[i]==","||uname[i]=="<"||uname[i]==">"||uname[i]=="?")
        {
            alert("Invalid User Name!!");
            return false;
        }
        
    }
    if(!(email.includes("@")))
    {
        alert("Invalid mail id!!");
        return false;
    }
    else if (email[email.indexOf("@")+1]==".")
    {
        alert("Invalid mail id!!");
        return false;
    }
    else if(email[0]==""||email[0]==".")
    {
        alert("Invalid mail id!!");
        return false;
    }
    else if((((email_length-(email.lastIndexOf(".")))-1)!=3)&&(((email_length-(email.lastIndexOf(".")))-1)!=2))
    {
        alert("Invalid mail id!!");
        return false;
    }
    else
    {
        for (var i = 0; i<email_length-1; i++)
        {
            if(email[i]=="."&&email[i+1]==".")
            {
                alert("Invalid mail id!!");
                return false;
            }
        }
        for (var i = 0; i<email_length-1; i++)
        {
            if(email[i]=="/"||email[i]=="+"||email[i]=="-"||email[i]=="*"||email[i]=="{"||email[i]=="}"||email[i]=="["||email[i]=="]"||email[i]==")"||email[i]=="("||email[i]=="!"||email[i]=="#"||email[i]=="$"||email[i]=="%"||email[i]=="^"||email[i]=="&"||email[i]=="="||email[i]==";"||email[i]==":"||email[i]==","||email[i]=="<"||email[i]==">"||email[i]=="?")
            {
                alert("Invalid mail id!!");
                return false;
            }
        }
    }
    if(password_length<8)
    {
        alert("Password should be of atleast 8 characters");
        return false;
    }
    return true;
    
}