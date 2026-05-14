# Website Manual QA Test Report 

## Home page (/)

**[Low]**  
Landing text font weight is inconsistent
The hero text "Your Door To More", the "MORE" word displays inconsistent font thickness,
causing visible UI inconsistency in the landing section.

![Font weight](screenshots/Landing_Text.png)
---

**[Medium]**  
Dropdown submenus provide no feedback on click.
The submenu items under:
- Your Parcels
- Lockers & Shops
- Help

Users cannot determine whether the elements are functional.

![Dropdown Menu](screenshots/Dropdown_menu.png)
---

**[Medium]**  
Navigation Call To Action buttons appear non-functional
The following buttons:
- Track a Parcel
- Return in Seconds
- Send a Parcel

Do not trigger any visible action or user feedback when clicked.
The interface provides no indication that the interaction was registered or not.

![CTA buttons no feedback](screenshots/CTA_button.png)

---

**[Medium]**  
Newsletter email validation is improperly implemented
The newsletter subscription field accepts invalid email formats
without enforcing standard email validation rules.

![Email Validation](screenshots/newsletter_field.png)
---
**[Low]**  
After subscribing to the newsletter, the email address used for the subscription is not displayed.

![No Email shown after subscription](screenshots/after_newsletter_subs.png)

---
**[Low]**  
Missing punctuation in newsletter consent text
The consent statement:

>"By giving us your email address, you are agreeing to hear about InPost promotions, offers and other services we think will interest you"

is missing a terminating full stop.

![Missing Fullstop](screenshots/missing_fullstop.png)

---

## Login page (/login)

**[High]**  
Sign Up link is non-functional.
Clicking the Sign Up link does not perform any action and no
feedback or error message is displayed to the user.

![Signup not working](screenshots/sign_up_link.png)

---

**[High]**  
The login form has no email validation rules implemented. As long as the field is not empty, it triggers the login functionality, and no feedback is provided regarding user existence (e.g., incorrect email/password or non-existent user).

![Login email validation](screenshots/email_pass_validation.png)

---

**[Medium]**  
Authenticated user is able to manually access the ```/login``` page
instead of being redirected to an authenticated area of the application.

![Missing Fullstop](screenshots/already_loggedin.png)

---

**[Medium]**  
Logging out redirects the user to the home page instead of keeping them on the login page.

---

## Profile page (/profile)

**[High]**  
The profile page is manually accessible ```/profile``` in a logged-out state
and renders as a completely empty page without any user guidance.

![Empty profile page](screenshots/Empty_profile.png)

---

**[Low]**  
The Full Name section displays only a single name "user"
instead of the user's full name.

![Full name](screenshots/Full_name.png)
---

**[High]**  
The membership start date is rendered as "Invalid Date"
instead of displaying a valid formatted date.

![Membership start date](screenshots/membership_date.png)

---

**[Medium]**  
The profile page does not provide any functionality
to edit or update user information.

![Complete profile page](screenshots/no_update_info_option.png)

---

**[Medium]**  
Parcel history section is missing.

---

**[Low]**  
No address field or address-related information
is displayed within the user profile section.