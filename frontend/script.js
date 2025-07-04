const chatBox = document.getElementById("chat");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const userText = input.value.trim();
  if (!userText) return;

  const userDiv = document.createElement("div");
  userDiv.className = "message user";
  userDiv.textContent = userText;
  chatBox.appendChild(userDiv);
  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  const botDiv = document.createElement("div");
  botDiv.className = "message bot";
  botDiv.textContent = "Typing...";
  chatBox.appendChild(botDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await fetch("call-api.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userText })
    });

    const data = await res.json();
    const reply = data.choices[0].message.content;
    botDiv.textContent = reply;
    chatBox.scrollTop = chatBox.scrollHeight;

    updateChartFromReply(reply);
  } catch (error) {
    botDiv.textContent = "❌ Error: Something went wrong.";
    console.error("API error:", error);
  }
}

// MAP
const map = L.map("map").setView([31.5497, 74.3436], 10);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap"
}).addTo(map);
L.marker([31.5497, 74.3436]).addTo(map).bindPopup("Lahore, Pakistan").openPopup();

// Theme toggle
document.querySelector(".theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// CHART
const ctx = document.getElementById("timeChart").getContext("2d");
const timeChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Restaurant", "Museum", "Hotel", "Park"],
    datasets: [{
      data: [2, 3, 1.5, 1],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#A2E36B']
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  }
});

function updateChartFromReply(reply) {
  const pattern = /(\d+(?:\.\d+)?)\s*(?:hours?|hrs?)\s*(?:at|in)?\s*(?:the\s)?([a-zA-Z\s]+)/gi;
  const newLabels = [];
  const newData = [];
  let match;
  while ((match = pattern.exec(reply)) !== null) {
    const hours = parseFloat(match[1]);
    const location = match[2].trim();
    newLabels.push(location.charAt(0).toUpperCase() + location.slice(1));
    newData.push(hours);
  }
  if (newLabels.length > 0 && newData.length > 0) {
    timeChart.data.labels = newLabels;
    timeChart.data.datasets[0].data = newData;
    timeChart.update();
  }
}
