document.addEventListener('DOMContentLoaded', function() {

  // By default, load the inbox
  load_mailbox('inbox');

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  document.querySelector('#compose-form').addEventListener('submit', sendEmail);

});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#email-view').style.display = 'none';


  // Clear out composeosition fields
  document.querySelector('#compose-recipients').value = "";
  document.querySelector('#compose-subject').value = "";
  document.querySelector('#compose-body').value = "";
}

function viewEmail(id) {
  fetch(`/emails/${id}`)
  .then(response => response.json())
  .then(email => {
      // Print email
      console.log(email);
  
      document.querySelector('#emails-view').style.display = 'none';
      document.querySelector('#compose-view').style.display = 'none';
      document.querySelector('#email-view').style.display = 'block';

      document.querySelector('#email-view').innerHTML = `
      <ul class="list-group">
        <li class="list-group-item disabled"><strong>From:</strong> ${email.sender}</li>
        <li class="list-group-item"><strong>To:</strong> ${email.recipients}</li>
        <li class="list-group-item"><strong>Subject:</strong> ${email.subject}</li>
        <li class="list-group-item"><strong>Date:</strong> ${email.timestamp}</li>
        <li class="list-group-item">${email.body}</li>
      </ul>
      `

      //change email to read
      if(!email.read){
        fetch(`/emails/${email.id}`,{
          method: 'PUT',
          body: JSON.stringify({
            read: true
          })
        })
      }

      //Arch/unarch
      const btnArch = document.createElement('button');
      btnArch.innerHTML = email.archived ? "Unarchive" : "Archive";
      btnArch.className = email.archived ? "btn btn-secondary" : "btn btn-primary";
      btnArch.addEventListener('click', function() {
        fetch(`/emails/${email.id}`, {
          method: 'PUT',
          body: JSON.stringify({
              archived: !email.archived
          })
        })
        .then(() => { load_mailbox('archive')})
      });
      document.querySelector('#email-view').append(btnArch);

      //Reply
      const btnReply = document.createElement('button');
      btnReply.innerHTML = "Reply"
      btnReply.className = "btn btn-info";
      btnReply.addEventListener('click', function() {
        compose_email();

        document.querySelector('#compose-recipients').value = email.sender;
        let subject = email.subject;
        if(subject.split(' ',1)[0] != "Re:"){
          subject = "Re: " + email.subject;
        }
        document.querySelector('#compose-subject').value = subject;
        document.querySelector('#compose-body').value = `On ${email.timestamp} ${email.sender} wrote: ${email.body} `;
      })
      document.querySelector("#email-view").append(btnReply)

    })
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-view').style.display = 'none';


  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // Get emails from mailbox/user
  fetch(`/emails/${mailbox}`) 
  .then(response => response.json())
  .then(emails => {
      emails.forEach(singleEmail => {
        console.log(singleEmail);

        const newEmail = document.createElement('div');
        newEmail.className = "list-group-item";
        newEmail.innerHTML = `
          <h6>Sender: ${singleEmail.sender}</h6>
          <h5>Subject: ${singleEmail.subject}</h5>
          <p>${singleEmail.timestamp}</p>
          `;

        newEmail.className = singleEmail.read ? 'read': 'unread';
        newEmail.addEventListener('click', function() {
            viewEmail(singleEmail.id)
        });
        document.querySelector('#emails-view').append(newEmail);
      });
  });
}

function sendEmail(event){
  event.preventDefault();

  //save fields
  const recipients = document.querySelector('#compose-recipients').value;
  const subject = document.querySelector('#compose-subject').value;
  const body = document.querySelector('#compose-body').value;

  fetch('/emails', {
    method: 'POST',
      body: JSON.stringify({
        recipients: recipients,
        subject: subject,
        body: body
    })
  })
  .then(response => response.json())
  .then(result => {
      console.log(result);
      load_mailbox('sent');
  });
}
