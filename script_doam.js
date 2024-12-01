const API_KEY = 'AIzaSyDPD8rV8lrQ3FBw1zgec783OGnJ9vIMLOI';
const SHEET_ID = "1onK50bLVOKO7ggIPnQZlUeoVSgOD1SydFa_ukLREZhY";
//  '1onK50bLVOKO7ggIPnQZlUeoVSgOD1SydFa_ukLREZhY';
const RANGE = 'Trang tính1!A:F';

async function fetchLastRow(sheetId, elementId, label, callback) {
    try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${RANGE}?key=${API_KEY}`;
        console.log("Fetching URL:", url);

        const response = await fetch(url, { cache: 'no-cache' });
        if (!response.ok) {
            console.error("Error fetching data. Status:", response.status, response.statusText);
            return;
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (data.values) {
            const lastRow = data.values[data.values.length - 1];
            const element = document.getElementById(elementId);
            element.innerHTML = `${label}: ${lastRow[1]} ${callback}`;
        }
    } catch (err) {
        console.error("Error fetching data:", err);
    }
}
fetchLastRow(
  "1onK50bLVOKO7ggIPnQZlUeoVSgOD1SydFa_ukLREZhY",
  "answer_doam",
  "Độ ẩm",
  ""
);
fetchLastRow(
  "1onK50bLVOKO7ggIPnQZlUeoVSgOD1SydFa_ukLREZhY",
  "answer_nhietdo",
  "Nhiệt độ",
  "°C"
);
fetchLastRow(
  "1onK50bLVOKO7ggIPnQZlUeoVSgOD1SydFa_ukLREZhY",
  "answer_luongmua",
  "Lượng mưa",
  ""
);
fetchLastRow(
  "1onK50bLVOKO7ggIPnQZlUeoVSgOD1SydFa_ukLREZhY",
  "answer_tdgio",
  "Hướng gió: Gió đông nam - tốc độ:",
  "m/s"
);



document.getElementById("Reset").addEventListener("click", () => {
     
       
    fetchLastRow(
      "1onK50bLVOKO7ggIPnQZlUeoVSgOD1SydFa_ukLREZhY",
      "answer_doam",
      "Độ ẩm",
      ""
    );

});

document.getElementById("ResetNhietdo").addEventListener("click", () => {
    fetchLastRow(
      "1onK50bLVOKO7ggIPnQZlUeoVSgOD1SydFa_ukLREZhY",
      "answer_nhietdo",
      "Nhiệt độ",
      "°C"
    );
 
});
document.getElementById("ResetLuongMua").addEventListener("click", () => {
    fetchLastRow(
      "1onK50bLVOKO7ggIPnQZlUeoVSgOD1SydFa_ukLREZhY",
      "answer_luongmua",
      "Lượng mưa",
      ""
    );
    
});

document.getElementById("ResetTDGio").addEventListener("click", () => {
    fetchLastRow(
      "1onK50bLVOKO7ggIPnQZlUeoVSgOD1SydFa_ukLREZhY",
      "answer_tdgio",
      "Hướng gió: Gió đông nam - tốc độ:",
      "m/s"
    );
    // 
});

window.addEventListener('load', function() {
    setTimeout(function() {
        document.querySelector('.preloader').classList.add('preloader-deactivate');
    }, 500);
});

 
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

setInterval(updateClock, 1000);
updateClock();

  
  