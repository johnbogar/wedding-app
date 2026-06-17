****SPRINT 1****
As a guest, I want to create an account so that I can rsvp, view the schedule, etc...

Acceptance criteria:
Given an unregistered user, when they enter the required information, then they are redirected to the login page
Given an unregistered user, when they enter an invalid email format, a weak password, or a mismatched password confirmation, then they are given an error message with the incorrect field highlighted
Given a registered user, when they press the create account button, then they are shown a message saying "An account with this email already exists"

As a guest, I want to log in to my account so that I can access all of the wedding content

Acceptance criteria:
Given a registered user, when they enter a valid email/password combo, they are redirected to the home page
Given a registered user, when they enter an invalid email or password, they are shown an error message 

As a guest, I want to reset my password so that I can regain access to my account

Acceptance criteria:
Given a guest presses the forgot password button, when they enter their email in the proper field and press submit, they are notified that they will receive an email if an account with that email exists
Given a registered user has received an email with a verification code, when they enter the correct verification code, they are redirected to the reset password page
Given a registered user has received an email with a verification code, when they enter the incorrect verification code, they are shown an error message saying the code is incorrect
Given a registered user has received an email with a verification code, when they enter the correct verification code but it has expired, they are shown an error message saying the code has expired
Given a registered user has entered the correct verification code, when they enter a valid new password and confirm it, they are redirected to the login page
Given a registered user has entered the correct verification code, when they enter an invalid new password or incorrectly confirm a password, they are shown an error with the proper field highlighted

As a guest, I want to view the home page so that I can see the feed of photos and activities

Acceptance criteria:
Given a registered user, when they have navigated to the home page, they see photos and activities from all other users
Given a registered user, when they have navigated to the home page and no one else has posted anything, they are shown a message that says "Be the first to post!"
Given an unregistered or not logged in user, when they navigate to the home page, they are redirected to the login page

As a guest, I want to log out so that my session ends

Acceptance criteria:
Given a user is logged in, when they press the logout button and it is successful, they are redirected to the login page and shown a message confirming a successful logout
Given a user is logged in, when they press the logout button and it is unsuccessful, they are shown an error message saying the logout was unsuccessful

****SPRINT 2****
As a guest, I want to RSVP so that I can tell the couple whether I'm coming or not, my song request, which people I'm bringing and my dietary restrictions, and so that I can access the rest of the app.

Acceptance criteria:
Given an invited user, when they have logged in and they have not RSVP'd and they have filled out all the RSVP questions, then their data is saved and they are redirected to the home page with a success message.
Given an invited user, when they have logged in and they have RSVP'd, then they are taken directly to the home page
Given an invited user, when they have RSVP'd 'Maybe' and they login, then they are taken to the home page and have a persistent reminder banner stating they still need to RSVP and telling them the due date
Given an invited user, when they have logged in and responded with a 'No' RSVP, then they are taken to the home page and can access the app normally.

As a guest, I want to be reminded of the due date to RSVP, so that I don't miss my opportunity to go to the wedding.

Acceptance criteria:
Given an invited user, when they have logged in and responded with a 'Maybe' RSVP, then they are shown a reminder banner until they give a 'Yes' or 'No' response or until the due date passes, at which point, they retain normal access without any banner.
