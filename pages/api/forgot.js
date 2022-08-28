import Forgot from "../../models/Forgot"

export default async function handler(req, res) {


let token="daoidiandasdoansNndn n32n3en23e3"
let forgot=new Forgot({
  email:req.body.email,
  token:token
})

  
    let email=`We have sent you this email in response to your request to reset your password on onlineDukaan. 

    To reset your password for , please follow the link below:

    <a href="http://localhost:3000/forgot?token=${token}"></a>

    

    We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your My Account Page and clicking on the "Change Email Address or Password" link.

    

    If you need help, or you have any other questions, feel free to email ${customer-service-email}, .

    `
    res.status(200).json({ name: 'John Doe' })
  }
  