import nodemailer from "nodemailer";
import {User} from "../models/userModels";
import bcrypt from "bcryptjs";

export const sendEmail = async ({email, emailType, userId}:any) => {
    try {
      const hashedToken = await bcrypt.hash(userId.toString(), 10);
      // If email Verify
      if(emailType === "verify") {
        await User.findByIdAndUpdate(userId, {
            $set: {verifyToken: hashedToken,
            verifyTokenExpiry: Date.now() + 10 * 60 * 1000},
        })
      } 
      // if email reset
      else if(emailType === "reset") {
        await User.findByIdAndUpdate(userId, {
         $set: { forgotPasswordToken: hashedToken,
          forgotPasswordExpiry: Date.now() + 10 * 60 * 1000},
        })
      }


        // Please understand this code from chatgpt
       // Looking to send emails in production? Check out our Email API/SMTP product!
        const transporter = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "5027a95647e5cf",
            pass: "43b9f5fad4c449"
          }
        });

          const mailOptions = { 
            from: "learningwithguru1@gmail.com", // sender address
            to: email, // list of receivers
            subject: emailType === "verify" ? "Verify Email" : "Reset your Password", // Subject line
            // text: "Hello world?", // plain text body
            html: `<p>Click <a href='${process.env.Domain}/verifyemail?token=${hashedToken}'>here </a>${emailType === "verify" ? "to verify your email" : "to reset your password"}</p>
            <br>
        ${process.env.Domain}/verifyemail?token=${hashedToken}`, // html body
          }

          const mailResponse = await transporter.sendMail(mailOptions);

          console.log("Email has been sent", mailResponse.messageId);
          return mailResponse;
    } catch (error) {
        console.log("Email has not been sent due to some error", error);
    }
}





