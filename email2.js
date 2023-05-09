// Load the Gmail API client library
gapi.load('client', () => {
    // Initialize the Gmail API client library
    gapi.client.init({
      apiKey: 'YOUR_API_KEY',
      clientId: 'YOUR_CLIENT_ID',
      scope: 'https://www.googleapis.com/auth/gmail.compose'
    }).then(() => {
      // Authenticate the user and obtain an access token
      gapi.auth2.getAuthInstance().signIn().then(() => {
        // Compose the email message
        const message = 'To: recipient@example.com\r\nSubject: Test email\r\n\r\nThis is a test email sent using the Gmail API.';
        
        // Create a new draft email message
        gapi.client.gmail.users.drafts.create({
          'userId': 'me',
          'resource': {
            'message': {
              'raw': btoa(message)
            }
          }
        }).then(response => {
          // Send the draft email message
          gapi.client.gmail.users.drafts.send({
            'userId': 'me',
            'id': response.result.id
          }).then(response => {
            console.log('Email sent successfully!');
          }, error => {
            console.error('Error occurred while sending email:', error);
          });
        }, error => {
          console.error('Error occurred while creating draft email:', error);
        });
      });
    });
  });
  
