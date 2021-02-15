var nodemailer = require("nodemailer"); 

var sender = nodemailer.createTransport({ 
	service: 'gmail', 
	auth: { 
		user: 'phaneendraphani20@gmail.com', 
		pass: 'Phanindraa@15'
	} 
}); 

var mail = { 
	from: 'phaneendraphani20@gmail.com', 
	to: 'phaneendraphani20@gmail.com', 
	subject: 'Automation Execution Report', 
	text: 'Automation Report!!!',
html: "<h1>Hi,</h1> <p>Please, find the attachment of the automation exceution report.</p> <p> Thanks & Regards,</p><p>Phanindraa</p>", 
attachments: [ 
		{ 
			filename: 'Results.html', 
			path: './chrome-test-report.html', 
		//	cid: 'uniq-mailtrap.png'
		} 
	] 
}; 

sender.sendMail(mail, function (error, info) { 
	if (error) { 
		console.log(error); 
	} else { 
		console.log('Email sent successfully: '
				+ info.response); 
	} 
}); 
