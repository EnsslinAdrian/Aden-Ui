import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RandomMessage {

  public getWelcomeMessage(name?: string): string {
    const namePart = name ? ` ${name}` : '';

    const messages = [
      `Welcome back${namePart}! Ready to build? 🚀`,
      `Great to see you${namePart}!`,
      `Login successful. Let's go!`,
      `Hello${namePart}! Hope you have a productive day.`,
      `Back in the flow.`,
      `Access granted. Welcome${namePart}.`,
      `Your workspace is ready${namePart}.`
    ];

    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  }

  public getGoodbyeMessage(): string {
    const messages = [
      "See you soon! 👋",
      "You have been logged out safely.",
      "Great work today! Have a nice rest.",
      "Catch you later!",
      "Session ended. Stay creative! 🎨",
      "Logged out. Don't be a stranger!",
      "Until next time!",
      "Your workspace is secured. Bye for now.",
      "Time for a break? See you later.",
      "Successfully signed out."
    ];

    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  }

  public getProfileSavedMessage(): string {
    const messages = [
      "Profile updated successfully. ✅",
      "Looking good! Changes saved.",
      "Got it! Your profile is up to date.",
      "All set. Your new details are saved.",
      "Changes saved. You're good to go!",
      "Profile polished and saved. ✨",
      "Your info has been updated secureley.",
      "Fresh new look! Saved.",
      "Update successful.",
      "Saved. Nice choice!"
    ];

    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  }

  public getAvatarMessage(): string {
    const messages = [
      "Looking sharp! 📸",
      "New picture, new energy! ✨",
      "Avatar updated successfully.",
      "Picture perfect!",
      "Great photo! Profile updated.",
      "Looking good today!",
      "Fresh new look. Saved.",
      "Your profile picture has been refreshed.",
      "Nice shot! Avatar saved.",
      "Face of the brand updated! 😉"
    ];

    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  }

  public getDeleteAccountMessage(): string {
    const messages = [
      "We're sorry to see you go. Goodbye! 👋",
      "Your account has been permanently deleted.",
      "All your data has been securely removed.",
      "Account closed. You are always welcome back.",
      "It's been a pleasure. Best of luck!",
      "Deletion successful. Take care.",
      "Your account is gone. Hope to see you again someday.",
      "Account wiped. Thanks for giving us a try.",
      "Your profile has been deleted.",
      "Sad to see you leave. All the best!"
    ];

    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  }

  public getPasswordResetMessage(): string {
    const messages = [
      "Email sent! Check your inbox. 📧",
      "Reset link is on its way!",
      "If an account exists, we sent an email.",
      "Check your mails to reset your password.",
      "Link sent. Don't forget to check spam!"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }

  getEmailChangedMessage(): string {
    const messages = [
      "Email updated! Check your inbox to verify. 📨",
      "Verification link sent. Please confirm your new email.",
      "Almost done! Verify your new address to log in.",
      "For your security, please verify the new email address.",
      "Update successful. Please check your emails.",
      "Link sent! Confirm your new email to continue.",
      "We've sent a confirmation link to your new address."
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }


}
