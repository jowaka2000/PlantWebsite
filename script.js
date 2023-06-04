document.addEventListener('DOMContentLoaded', function() {
    var plantsContainer = document.getElementById('plants-container');
    var zoneSelect = document.getElementById('zone-select');
    var lightSelect = document.getElementById('light-select');
    var sortButton = document.getElementById('sort-button');
  
// Fetching the data from xml file
fetch('plant.xml')
.then(function(response) {
    return response.text();
})
.then(function(data) {
    // This line of code parse the XML data
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data, 'text/xml');
    var plants = xmlDoc.getElementsByTagName('PLANT');
    
    // Below function is responsible fot filtering plants based on zone and light
    function filterPlants() {
        var selectedZone = zoneSelect.value;
        var selectedLight = lightSelect.value;
        
        plantsContainer.innerHTML = ''; // This clears the plants container
        
        for (var i = 0; i < plants.length; i++) {
            var plant = plants[i];
            var zone = plant.getElementsByTagName('ZONE')[0].textContent;
            var light = plant.getElementsByTagName('LIGHT')[0].textContent;
            
            if ((selectedZone === '' || zone === selectedZone) && (selectedLight === '' || light === selectedLight)) {
                var commonName = plant.getElementsByTagName('COMMON')[0].textContent;
                var botanicalName = plant.getElementsByTagName('BOTANICAL')[0].textContent;
                var price = plant.getElementsByTagName('PRICE')[0].textContent;
                var image = plant.getElementsByTagName('IMAGE')[0].textContent;
                
                var plantCard = document.createElement('div');
                plantCard.classList.add('plant-card');
                
                var img = document.createElement('img');
                img.src = image;
                img.alt = commonName;
                img.addEventListener('click', function() {
                    showPopup(commonName, botanicalName, price, image);
                });
                
                var commonNamePara = document.createElement('p');
                commonNamePara.textContent = commonName;
                
                plantCard.appendChild(img);
                plantCard.appendChild(commonNamePara);
                plantsContainer.appendChild(plantCard);
            }
        }
    }
    
    // This function is responsible to show the plant details popup
    function showPopup(commonName, botanicalName, price, image) {
        var popup = document.createElement('div');
        popup.classList.add('popup');
        
        var popupContent = document.createElement('div');
        popupContent.classList.add('popup-content');
        
        var img = document.createElement('img');
        img.src = image;
        img.alt = commonName;
        
        var commonNamePara = document.createElement('p');
        commonNamePara.textContent = commonName;
        
        var botanicalNamePara = document.createElement('p');
        botanicalNamePara.textContent = 'Botanical Name: ' + botanicalName;
        
        var pricePara = document.createElement('p');
        pricePara.textContent = 'Price: ' + price;
        
        var closeButton = document.createElement('span');
        closeButton.classList.add('popup-close');
        closeButton.textContent = '×';
        closeButton.addEventListener('click', function() {
            popup.parentNode.removeChild(popup);
        });
        
        popupContent.appendChild(img);
        popupContent.appendChild(commonNamePara);
        popupContent.appendChild(botanicalNamePara);
        popupContent.appendChild(pricePara);
        popupContent.appendChild(closeButton);
        
        popup.appendChild(popupContent);
        document.body.appendChild(popup);
    }
    
    //This is an event listener for zone and light select change
    zoneSelect.addEventListener('change', filterPlants);
    lightSelect.addEventListener('change', filterPlants);
    
    // This is another event listener for sort button click
    sortButton.addEventListener('click', function() {
        var sortedPlants = Array.from(plants);
        
        sortedPlants.sort(function(a, b) {
            var aName = a.getElementsByTagName('COMMON')[0].textContent;
            var bName = b.getElementsByTagName('COMMON')[0].textContent;
            var aPrice = parseFloat(a.getElementsByTagName
                ('PRICE')[0].textContent.slice(1));
                var bPrice = parseFloat(b.getElementsByTagName('PRICE')[0].textContent.slice(1));
                if (aName < bName) {
                    return -1;
                } else if (aName > bName) {
                    return 1;
                } else {
                    return aPrice - bPrice;
                }
            });
            
            plantsContainer.innerHTML = ''; // This is responsible fo Clearing the plants container
            
            for (var i = 0; i < sortedPlants.length; i++) {
                var plant = sortedPlants[i];
                var commonName = plant.getElementsByTagName('COMMON')[0].textContent;
                var botanicalName = plant.getElementsByTagName('BOTANICAL')[0].textContent;
                var price = plant.getElementsByTagName('PRICE')[0].textContent;
                var image = plant.getElementsByTagName('IMAGE')[0].textContent;
                
                var plantCard = document.createElement('div');
                plantCard.classList.add('plant-card');
                
                var img = document.createElement('img');
                img.src = image;
                img.alt = commonName;
                img.addEventListener('click', function() {
                    showPopup(commonName, botanicalName, price, image);
                });
                
                var commonNamePara = document.createElement('p');
                commonNamePara.textContent = commonName;
                
                plantCard.appendChild(img);
                plantCard.appendChild(commonNamePara);
                plantsContainer.appendChild(plantCard);
            }
        });
        
        // This is the Initial rendering of all plants
        filterPlants();
    })
    .catch(function(error) {
        console.error(error);
    });
});    