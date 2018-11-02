self.addEventListener('push', function (event) {
    console.log('Received a push message', event);
    var notification = event.data.json().notification
    var title = notification.title;
  
    event.waitUntil(
      self.registration.showNotification(title)
    );
  });
  