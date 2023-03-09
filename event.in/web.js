function scheduleNotifications(event) {
    // Calculate time difference between now and the event date/time
    const eventDate = new Date(event.date + "T" + event.time);
    const now = new Date();
    const timeDifference = eventDate - now;
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
  
    // Schedule Web Push notification before 1 day of the event
    if (timeDifference > oneDay) {
      const oneDayBeforeEvent = new Date(eventDate.getTime() - oneDay);
      registerWebPushNotification(oneDayBeforeEvent, event);
    }
  
    // Schedule Email notification before 1 day of the event
    if (timeDifference > oneDay) {
      const emailSubject = "Reminder: " + event.title + " is tomorrow!";
      const emailBody = "Don't forget to attend " + event.title + " tomorrow at " + event.time + " in " + event.location + ".";
      scheduleEmailNotification(oneDayBeforeEvent, event.attendees, emailSubject, emailBody);
    }
  }
  
  // Function to register Web Push notification for a given date and time
  function registerWebPushNotification(date, event) {
    // Check if Web Push is supported
    if ("Notification" in window && "serviceWorker" in navigator) {
      // Register service worker
      navigator.serviceWorker.register("service-worker.js")
        .then(registration => {
          // Request permission to show notifications
          Notification.requestPermission().then(permission => {
            if (permission === "granted") {
              // Schedule notification
              registration.showNotification(event.title, {
                body: "Don't forget to attend " + event.title + " tomorrow at " + event.time + " in " + event.location + ".",
                icon: event.imageUrl
              });
            }
          });
        });
    }
  }
  
  // Function to schedule Email notification for a given date and time
  function scheduleEmailNotification(date, recipients, subject, body) {
    // Make API call to schedule Email notification
    fetch("https://api.example.com/schedule-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        recipients: recipients,
        subject: subject,
        body: body,
        send_at: date.toISOString()
      })
    })
    .then(response => {
      if (response.ok) {
        console.log("Email notification scheduled successfully.");
      } else {
        console.error("Error scheduling Email notification.");
      }
    })
    .catch(error => {
      console.error("Error scheduling Email notification:", error);
    });
  }
  
