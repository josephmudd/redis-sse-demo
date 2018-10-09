const evtSource = new EventSource('/eventstream');

evtSource.onmessage = function(e) {
  var newElement = document.createElement("li");
  var eventList = document.getElementById('list');

  newElement.innerHTML = "message: " + e.data;
  eventList.appendChild(newElement);
}
