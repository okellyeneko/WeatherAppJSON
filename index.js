fetchData();

async function fetchData() {
  const responseDaily = await fetch("Daily.json");
  const daily = await responseDaily.json();
  const responseDetails = await fetch("Detailed.json");
  const details = await responseDetails.json();
  console.log(daily);
  console.log(details)
  displayWeather(daily, details);
}

function formSubmit() {
  fetchData(); 
}

function changeStyle(checkboxId, column) {
  const changeColumn = document.getElementById(column);
  if (document.getElementById(checkboxId).checked) {
    changeColumn.style.visibility = "visible";
  } else {
    changeColumn.style.visibility = "collapse";
  }
}

function moreDetails (details, day) {
  detailsSection = document.getElementById("detailsSection")
  let dates = []
  for (let i = 0; i < details.list.length; i++)
  if (day == 1) {
    dates = [0,1,2,3,4]
  } else if (day == 2) {
    dates = [5,6,7,8,9,10,11,12]
  } else if (day == 3) {
    dates = [13,14,15,16,17,18,19,20]
  } else if (day == 4) {
    dates = [21,22,23,24,25,26,27,28]
  } else if (day == 5) {
    dates = [29,30,31,32,33,34,35,36]
  }
  console.log(dates)
  for (let i = 0; i < dates.length; i++) {
    detailsAttributes = {
      time: details.list[dates[i]].dt_txt.split(' ')[1],
      icon: 'https://openweathermap.org/img/wn/' + details.list[dates[i]].weather[0].icon + '@2x.png',
      desc: details.list[dates[i]].weather[0].description,
      temp: details.list[dates[i]].main.temp + '°C'
    }
    var ul  = document.createElement('ul')
    for (let j in detailsAttributes) {
      if (j === 'icon') {
        var li = document.createElement('li')
        var img = document.createElement('img');
        img.src = detailsAttributes[j];
        li.appendChild(img);
        ul.appendChild(li)
      } else {
        var li = document.createElement('li')
        li.textContent = detailsAttributes[j]
        ul.appendChild(li)
      }
    }
    var div = document.createElement('div')
    div.appendChild(ul)
    detailsSection.appendChild(div)
  }
  dates = []
}

function displayWeather(data, details) {
  const dayList = parseInt(document.getElementById('input').value, 10) || 5;
  const table = document.getElementById('table');
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  

  for (let i = 0; i < dayList; i++) {
    var row = document.createElement('tr');
    const attributes = {
      day: i + 1,
      summary: data.list[i].weather[0].description,
      icon: 'https://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '@2x.png',
      minTemp: data.list[i].temp.min + '°C',
      maxTemp: data.list[i].temp.max + '°C',
      pressure: data.list[i].pressure,
      humidity: data.list[i].humidity + '%',
      speed: data.list[i].speed + 'km/h',
      details: null
    };

    for (let x in attributes) {
      var cell = document.createElement('td');
      if (x === 'icon') {
        var img = document.createElement('img');
        img.src = attributes[x];
        cell.appendChild(img);
        row.appendChild(cell);
      } else if (x === 'details') {
        var button = document.createElement('button')
        button.textContent = 'More details'
        button.addEventListener('click', function() {
          detailsSection = document.getElementById("detailsSection").innerHTML = ""
          moreDetails(details, i + 1);
        });
        row.appendChild(button)
      } else {
        var cellText = document.createTextNode(attributes[x]);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
    }
    table.appendChild(row);
  }
}